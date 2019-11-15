'use strict';

module.exports = {
  devServer: {
    proxy: {
      '/v2/movie': {    // search为转发路径
        target: 'http://api.douban.com',  // 目标地址
        // ws: true, // 是否代理websockets
        changeOrigin: true,   // 设置同源  默认false，是否需要改变原始主机头为目标URL,
      }
    }
  }
};
