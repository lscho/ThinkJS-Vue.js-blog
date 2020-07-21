const path = require('path');
const isDev = think.env === 'development';
const isFaas = process.env.isFaas;
module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: isDev||isFaas,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|uploads|favicon\.ico|index\.html|admin\.html)/
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev,
      templates: {
        404: path.join(think.ROOT_PATH, isDev ? 'view/error_404.html' : 'runtime/view/error_404.html'),
        500: path.join(think.ROOT_PATH, isDev ? 'view/error_500.html' : 'runtime/view/error_500.html')
      }
    }
  },
  {
    handle: 'payload',
    options: {
      uploadDir: path.join(think.ROOT_PATH, 'runtime/data')
    }
  },
  {
    handle: 'router',
    options: {
      suffix: ['.html']
    }
  },
  'logic',
  'controller'
];
