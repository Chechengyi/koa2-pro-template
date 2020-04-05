/**
 * 将数据模型同步到数据库表中
 * 执行 npm run sync_database命令
 */
import seq from "../config/db"

import model from './index'

seq.sync({
  force: false,
  alter: true
});

console.log('数据库表构建成功')