## 结构

	├── admin			//后台vue项目，vue-cli创建
	│   ├── build
	│   ├── config
	│   ├── index.html
	│   ├── package.json
	│   ├── src
	│   └── static
	├── development.js		//开发模式入口
	├── package.json
	├── production.js		//生产模式入口
	├── src
	│   ├── bootstrap		//启动自动执行目录
	│   ├── config			//配置目录
	│   ├── controller		//控制器目录
	│   │   ├── api			//接口控制器目录
	│   ├── extend
	│   ├── logic
	│   ├── model			//模型目录
	│   └── service
	├── view			//前台模版目录
	└── www				//对外开放目录
	    ├── admin.html		//后台入口文件
	    └── static			//静态资源



## 安装

后台默认账号：admin 默认密码：123456

#### 开发

导入sql,修改[配置](https://github.com/lscho/ThinkJS-Vue.js-blog/blob/master/server/src/config/adapter.js)中 mysql 部分,启动服务

```bash
# 启动服务端
npm start
# 启动后台服务
cd ./admin
npm start
```

#### 部署

```bash
# 编译
cd ./admin
npm run build
```

将 `src/` `view/` `www/` `production.js` `package.json` 上传至服务器

执行`npm install`

修改[配置](https://github.com/lscho/ThinkJS-Vue.js-blog/blob/master/src/config/adapter.production.js)中 mysql 部分

修改[pm2.json](https://github.com/lscho/ThinkJS-Vue.js-blog/blob/master/pm2.json)中 `cwd` 部分，`pm2 start pm2.json` 启动服务

参考[nginx.conf](https://github.com/lscho/ThinkJS-Vue.js-blog/blob/master/nginx.conf)进行配置

