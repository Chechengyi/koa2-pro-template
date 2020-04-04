const router = require('koa-router')();
const model = require("../../model");
const jwt = require('jsonwebtoken');
const util = require('util')
const verify = util.promisify(jwt.verify) // 解密
const conf = require('../../config/conf');
const result = require('../../result');
const crypto = require('crypto');

let Users = model.User;

class User {
  constructor() {
    this.login = this.login.bind(this);
  }

  async login(ctx, next) {
    const user = ctx.request.body;
    let userToken = {
      name: user.username
    };
    const token = jwt.sign(userToken, conf.jwtSecret, { expiresIn: '1h' })  //token签名 有效期为1小时
    result.success(ctx, {
      token
    });
  }

  async userInfo(ctx) {
    const token = ctx.header.authorization  // 获取jwt
    let payload
    if (token) {
      payload = await verify(token.split(' ')[1], conf.jwtSecret)  // // 解密，获取payload
      result.success(ctx, {
        ...payload
      });
    } else {
      result.error(ctx, 'authorization错误');
    }
  }

  async allUsers(ctx, next) {
    const allUsers = await Users.findAll();
    result.success(ctx, allUsers);
  }

  /**
   * 检查用户名是否重复
   * @param { username } ctx 
   */
  async checkUsername(ctx) {
    const user = ctx.request.body;
    const searchRes = await Users.findAll({
      attributes: ['username'],
      where: { username: user.username }
    });
    if (searchRes.length > 0) {
      result.error(ctx, '用户名重复了');
      return;
    }
  }

  async register(ctx) {
    const user = ctx.request.body;
    // 检验username是否重复
    this.checkUsername(ctx);
    let md5 = crypto.createHash('md5');
    md5.update(user.password);
    user.password = md5.digest('hex');
    Users.create(user);
    result.success(ctx, '注册成功');
  }

}

export default new User();