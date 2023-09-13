/*
 * @Author: 卢天宇
 * @Date: 2023-09-08 22:56:45
 * @Description: 
 */
const Koa = require('koa');
const Router = require('@koa/router');
const koaBodyparser = require('koa-bodyparser');
const { fileLogger, consoleLogger } = require('./logger');

const app = new Koa();
const router = new Router();

app.use(koaBodyparser());

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  ctx.response.set('access-control-allow-origin', '*');
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

router.post('/api', async (ctx) => {
  const data = {
    name: 'lucy',
    age: 18
  }
  console.log(ctx.request.body);
  await delay(2000);
  ctx.body = JSON.stringify(data);
})

// 定义一个延迟函数
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

app.use(router.routes());
app.listen(3000);