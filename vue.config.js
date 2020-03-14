'use strict';

module.exports = {
  devServer: {
    proxy: {
      '/v2/movie': {
        target: 'http://api.douban.com'
      }
    }
  }
};
