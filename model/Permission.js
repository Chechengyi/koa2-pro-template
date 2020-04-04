/**
 * 权限表
 */

import Sequelize from "sequelize"
import sequelize from '../config/db'

const Permission = sequelize.define('permission', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: false
  },
  parent_id: Sequelize.INTEGER,
  menu_type: { // 菜单类型
    type: Sequelize.INTEGER,
    allowNull: false
  },
  menu_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  permission: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});

export default Permission;

