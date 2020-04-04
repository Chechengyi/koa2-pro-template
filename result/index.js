const SUCCESS = 1; //成功
const SUCCESS_TEXT = "调用成功";
const ERROR = 2; //失败
const ERROR_TEXT = '接口异常';
const NO_LOGIN = 3;  // 未登录

module.exports = {
    success: function (ctx, arg1, arg2) {
        if (arguments.length === 1) {
            arg1 = SUCCESS_TEXT;
            arg2 = {};
        }
        if (arguments.length === 2 && typeof arg1 !== 'string') {
            arg2 = arg1;
            arg1 = SUCCESS_TEXT;
        }
        arg1 = arg1 || SUCCESS_TEXT;
        arg2 = arg2 || {};
        ctx.status = 200;
        ctx.body = {
            success: 'true',
            code: SUCCESS,
            msg: arg1,
            result: arg2
        };
    },
    error: function (ctx, arg1, arg2) {
        if (arguments.length === 1) {
            arg1 = ERROR_TEXT;
            arg2 = {};
        }
        if (arguments.length === 2 && typeof arg1 !== 'string') {
            arg2 = arg1;
            arg1 = ERROR_TEXT;
        }
        arg1 = arg1 || ERROR_TEXT;
        arg2 = arg2 || {};
        ctx.status = 200;
        ctx.body = {
            success: 'false',
            code: ERROR,
            msg: arg1,
            result: arg2
        };
    },
    stream: function (ctx, result) {
        ctx.status = 206;
        ctx.body = result;
    },
    noLogin: function (ctx) {
        ctx.status = 200;
        ctx.body = {
            success: 'true',
            code: NO_LOGIN,
            result: {},
            info: 'token过期'
        }
    }
}