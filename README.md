## 设计方案  

#### 后台
1.前后端分离 
2.RESTful API 
3.使用 jwt 身份认证 
4.后台使用 iview 

## 安装  

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

将 src/ view/ www/ 文件夹上传至服务器
执行`npm install`
修改[配置](https://github.com/lscho/ThinkJS-Vue.js-blog/blob/master/server/src/config/adapter.js)中 mysql 部分,启动服务
参考[nginx.conf](https://github.com/lscho/ThinkJS-Vue.js-blog/blob/master/server/nginx.conf)进行配置