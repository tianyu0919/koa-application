const log4js = require("log4js");

log4js.configure({
  appenders: { // * 追加器
    file: {
      type: 'file',
      filename: 'logs/app.log',
      layout: {
        type: 'pattern',
        pattern: '[%d{yyyy-MM-dd hh:mm:ss}] [%p] [%c]: %m', // 设置布局，包括日期时间（%d）、日志级别（%p）和消息内容（%m）
        tokens: {
          // prefix: 'xx', // 添加前缀
        },
      },
    },
    console: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '[%d{yyyy-MM-dd hh:mm:ss}] [%p] \x1b[35m[%c]\x1b[0m: %m', // 设置布局，包括日期时间（%d）、日志级别（%p）和消息内容（%m）
        tokens: {
          prefix: 'xx', // 添加前缀
        },
      },
    },
  },

  categories: { // * 组，用来搭配追加器使用
    default: { appenders: ["file"], level: "ALL" },
    Logger: { appenders: ["console"], level: "ALL" }
  },
});

const fileLogger = log4js.getLogger('entry');
const consoleLogger = log4js.getLogger("Logger");

module.exports = {
  fileLogger,
  consoleLogger
};