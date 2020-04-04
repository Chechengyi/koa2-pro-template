const User = require('./User');
const Role = require('./Role');
const Permission = require('./Permission');
const UserRole = require('./UserRole');


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

module.exports = {
    User,
    Role,
    Permission,
    UserRole
}