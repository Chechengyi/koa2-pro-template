import model from "../../model"
import jwt from 'jsonwebtoken'
import util from 'util'
import conf from '../../config/conf'
import result from '../../result'
import crypto from 'crypto'
import { Validator } from '../../utils'

const verify = util.promisify(jwt.verify) // 解密
let Users = model.User;

class User {
  constructor() {
    this.login = this.login.bind(this);
    this.userInfo = this.userInfo.bind(this);
    this.allUsers = this.allUsers.bind(this);
    this.checkUsername = this.checkUsername.bind(this);
    this.register = this.register.bind(this);
  }

  /**
   * 登录
   * @param username: string
   * @param password: string
   */
  async login(ctx) {
    const user = ctx.request.body;
    let password = user.password;
    let username = user.username;
    let md5 = crypto.createHash('md5');
    md5.update(password);
    password = md5.digest('hex');
    let res = await Users.findAll({
      where: {
        username,
        password
      }
    })

    if (res.length === 0) {
      result.success(ctx, '用户名或密码错误')
      return
    }
    let userToken = {
      userId: res[0].id,
      username: user.username
    };
    const token = jwt.sign(userToken, conf.jwtSecret, { expiresIn: '1h' })  //token签名 有效期为1小时
    result.success(ctx, {
      token
    });
  }

  /**
   * 根据token解出用户信息
   */
  async userInfo(ctx) {
    const token = ctx.header.authorization  // 获取jwt
    let payload
    if (token) {
      payload = await verify(token.split(' ')[1], conf.jwtSecret)  // // 解密，获取payload
      result.success(ctx, {
        ...payload
      });
    } else {
      result.success(ctx, 'authorization错误');
    }
  }

  async allUsers(ctx, next) {
    const allUsers = await Users.findAll();
    result.success(ctx, allUsers);
  }


  /**
   * 检查用户名是否重复
   * @param username: string
   */
  async checkUsername(ctx) {
    const user = ctx.request.body;
    const searchRes = await Users.findAll({
      attributes: ['username'],
      where: { username: user.username }
    });
    if (searchRes.length > 0) {
      result.success(ctx, '用户名重复了');
      return false;
    }
    return true;
  }


  /**
   * 注册
   * @param username: string
   * @param password: string
   * @param sex?: number
   */
  async register(ctx) {
    const user = ctx.request.body;

    let valida = new Validator();
    valida.add(user.username, [{
      validaName: 'isUsername',
      errMsg: '用户名只能由字母或者数字组成，长度至少为4'
    }]);
    let err = valida.start();
    if (err) {
      result.error(ctx, err);
      return
    }
    // 检验username是否已经存在 调用检查用户名方法，将ctx传给它。
    let res = await this.checkUsername(ctx);
    if (!res) return;
    let md5 = crypto.createHash('md5');
    md5.update(user.password);
    user.password = md5.digest('hex');
    Users.create(user);
    result.success(ctx, '注册成功');
  }

}

export default new User();