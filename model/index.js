import User from './User'
import Role from './Role'
import Permission from './Permission'
import UserRole from './UserRole'


// 建立外键关系
User.belongsToMany(Role, {
    as: 'roles_t',
    through: UserRole,
    foreignKey: 'user_id'
});
Role.belongsToMany(User, {
    as: 'users_t',
    through: UserRole,
    foreignKey: 'role_id'
});

export default {
    User,
    Role,
    Permission,
    UserRole
}