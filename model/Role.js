/**
 * @description 角色表
 */

const Sequelize = require("sequelize");
const sequelize = require('../config/db');

const Role = sequelize.define('role', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  roleName: Sequelize.STRING
}, {
});

module.exports = Role;