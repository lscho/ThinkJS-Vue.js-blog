const fileCache = require('think-cache-file');
const JWTSession = require('think-session-jwt');
const mysql = require('think-model-mysql');
const { Console, File, DateFile } = require('think-logger3');
const path = require('path');
const isDev = think.env === 'development';
const ejs = require('think-view-ejs');

/**
 * cache adapter config
 * @type {Object}
 */
exports.cache = {
  type: 'file',
  common: {
    timeout: 24 * 60 * 60 * 1000 // millisecond
  },
  file: {
    handle: fileCache,
    cachePath: path.join(think.ROOT_PATH, 'runtime/cache'), // absoulte path is necessarily required
    pathDepth: 1,
    gcInterval: 24 * 60 * 60 * 1000 // gc interval
  }
};

/**
 * model adapter config
 * @type {Object}
 */
exports.model = {
  type: 'mysql',
  common: {
    logConnect: isDev,
    logSql: isDev,
    logger: msg => think.logger.info(msg)
  },
  mysql: {
    handle: mysql,
    database: process.env.MYSQL_DATABASE || 'blog',
    prefix: 'ls_',
    encoding: 'utf8',
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: '',
    user: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD || '123456',
    dateStrings: true
  }
};

/**
 * session adapter config
 * @type {Object}
 */
exports.session = {
  type: 'jwt',
  common: {
    cookie: {
      name: 'thinkjs'
    }
  },
  jwt: {
    handle: JWTSession,
    secret: 'lscho', // secret is reqired
    tokenType: 'header', // ['query', 'body', 'header', 'cookie'], 'cookie' is default
    tokenName: 'authorization', // if tokenType not 'cookie', this will be token name, 'jwt' is default
    sign: {
      expiresIn: 60 * 60 * 12
    },
    verify: {
      // verify options is not required
    }
  }
};

/**
 * view adapter config
 * @type {Object}
 */
exports.view = {
  type: 'ejs',
  common: {
    viewPath: path.join(think.ROOT_PATH, isDev ? 'view' : 'runtime/view'),
    extname: '.html',
    sep: '_' // seperator between controller and action
  },
  ejs: {
    // options
    handle: ejs,
    beforeRender: (ejs, handleOptions) => {
      // do something before render the template.
    }
  }
};

/**
 * logger adapter config
 * @type {Object}
 */
exports.logger = {
  type: isDev ? 'console' : 'dateFile',
  console: {
    handle: Console
  },
  file: {
    handle: File,
    backups: 10, // max chunk number
    absolute: true,
    maxLogSize: 50 * 1024, // 50M
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  },
  dateFile: {
    handle: DateFile,
    level: 'ALL',
    absolute: true,
    pattern: '-yyyy-MM-dd',
    alwaysIncludePattern: true,
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  }
};
