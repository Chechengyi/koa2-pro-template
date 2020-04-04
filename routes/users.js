import router from 'koa-router';
import User from '../controller/user/User';

router.prefix('users');

router.post('/login', User.login);
router.get('/userInfo', User.userInfo);
router.get('/allUsers', User.allUsers);
router.post('/register', User.register);
router.post('/checkUsername', User.checkUsername);

export default router;

