import result from '../result'

export default function () {
  return function (ctx, next) {
    return next().catch((err) => {
      if (401 == err.status) {
        // ctx.status = 401;
        // ctx.body = 'Protected resource, use Authorization header to get access\n';
        result.noLogin(ctx)
      } else {
        throw err;
      }
    });
  }
}