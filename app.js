/*
 * @Author: 卢天宇
 * @Date: 2023-09-08 22:56:45
 * @Description: 
 */
const Koa = require('koa');
const Router = require('@koa/router');
const { fileLogger, consoleLogger } = require('./logger');

const app = new Koa();
const router = new Router();

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  fileLogger.info(`${ctx.method} [${ctx.url}] - ${rt}`);
  consoleLogger.info(`${ctx.method} [${ctx.url}] - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});


router.get('/', async (ctx) => {
  ctx.body = 'Hello World';
});

router.get('/api', async (ctx) => {
  ctx.body = 'this api page';
})

app.use(router.routes());
app.listen(3000);