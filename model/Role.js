/**
 * @description 角色表
 */

import Sequelize from "sequelize"
import sequelize from '../config/db'

const Role = sequelize.define('role', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  roleName: Sequelize.STRING
}, {
});

export default Role;