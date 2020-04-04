/**
 * 将数据模型同步到数据库表中
 * 执行 npm run sync_database命令
 */
const seq = require("../config/db");

const model = require('./index');

seq.sync({
  force: true,
  alter: true
});

console.log('数据库表构建成功')