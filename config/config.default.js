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

  // 静态文件配置
  config.static = {
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, 'public'),
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