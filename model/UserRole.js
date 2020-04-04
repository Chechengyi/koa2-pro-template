/**
 * @description 用户角色表
 */

const Sequelize = require("sequelize");
const sequelize = require('../config/db');

const UserRole = sequelize.define('user_role', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: Sequelize.INTEGER,
  role_id: Sequelize.INTEGER
}, {
  timestamps: false
});

module.exports = UserRole;