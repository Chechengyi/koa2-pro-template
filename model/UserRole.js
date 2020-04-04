/**
 * @description 用户角色表
 */

import Sequelize from "sequelize"
import sequelize from '../config/db'

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

export default UserRole;