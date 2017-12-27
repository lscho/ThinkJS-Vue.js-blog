const path = require('path');
const isDev = think.env === 'development';

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
		enable: isDev,
		options: {
			root: path.join(think.ROOT_PATH, 'www'),
			publicPath: /^\/(static|upload|favicon\.ico|index\.html)/
		}
	},
	{
		handle: 'trace',
		enable: !think.isCli,
		options: {
			debug: isDev
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
		options: {}
	},
	'logic',
	'controller'
];
