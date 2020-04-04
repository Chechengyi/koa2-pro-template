import Koa from 'koa'
import json from 'koa-json'
import onerror from 'koa-onerror'
import jwtKoa from 'koa-jwt'
import path from 'path'
import conf from './config/conf'

import index from './routes/index'
import users from './routes/users'
import video from './routes/video'
import cors from 'koa2-cors'

const app = new Koa();
const KoaBody = require('koa-body');
const tokenConfirm = require('./middle/tokenConfirm');

const { accessLogger, systemLogger, } = require('./middle/logger');
const fetch = require('node-fetch')

const isDev = process.env.npm_lifecycle_event === 'dev';

// error handler
isDev && onerror(app);

// middlewares
app.use(KoaBody({
  multipart: true,
  strict: false,
  formidable: {
    uploadDir: path.join(__dirname, `/temp`), //设置上传缓存文件夹
    maxFileSize: 1024 * 1024 * 10 * 1024, // 设置上传文件大小最大限制，默认1G 1024M
    keepExtensions: true
  },
  jsonLimit: '10mb',
  formLimit: '10mb',
  textLimit: '10mb'
}));

app.use(json());
app.use(cors());
app.use(accessLogger());
app.use(require('koa-static')(__dirname + '/public'));
app.use(tokenConfirm());

app
  .use(jwtKoa({
    secret: conf.jwtSecret
  }).unless({
    path: [
      /^\/users\/login/,
      /^\/users\/register/,
      /^\/users\/checkUsername/,
      /^\/uploadVideo/,
      /^\/video\/get/,
      /^\/favicon.ico/,
    ] //数组中的路径不需要通过jwt验证
  }))

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(video.routes(), video.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  systemLogger.error(err);
});

export default app;
