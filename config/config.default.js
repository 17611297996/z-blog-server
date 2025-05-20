/* eslint valid-jsdoc: "off" */

const path = require('path'); // 引入 path 模块

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1745233587584_5173';

  // add your middleware config here
  config.middleware = [];
  // CSRF 配置
  config.security = {
    csrf: {
      enable: false
    }
    // ignore: (ctx) => {
    //   // 忽略特定路径的 CSRF 检查
    //   return ctx.url === '/process-markdown';
    // },
  };
  // 静态文件配置
  // config.static = {
  //   prefix: '/public/',
  //   dir: path.join(appInfo.baseDir, 'public'),
  // };
  // 静态资源配置
  config.static = {
    dir: [
      {
        prefix: '/public', // Web 访问前缀
        dir: path.join(appInfo.baseDir, 'app/public') // 本地存储目录
      }
    ]
  };



  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};