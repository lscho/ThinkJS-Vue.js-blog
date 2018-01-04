## 设计方案  

1.前后端分离  
2.RESTful API  
3.使用 jwt 身份认证  
4.后台使用 iview  


## 结构  

|-[client](https://github.com/lscho/ThinkJS-Vue.js-blog/tree/master/client) 前端  
|-[server](https://github.com/lscho/ThinkJS-Vue.js-blog/tree/master/server) 后端  

## 依赖 

#### 服务端  

```json
  "dependencies": {
    "think-logger3": "^1.0.0",
    "think-model": "^1.0.0",
    "think-model-mysql": "^1.0.0",
    "think-session": "^1.0.0",
    "think-session-jwt": "^1.0.8",
    "think-view": "^1.0.11",
    "thinkjs": "^3.0.0"
  }
```
#### 前端 

```json
  "dependencies": {
    "axios": "^0.17.0",
    "iview": "^2.8.0",
    "mavon-editor": "^2.4.13",
    "vue": "^2.5.2",
    "vue-axios": "^2.0.2",
    "vue-router": "^3.0.1",
    "vuex": "^3.0.0",
    "vuex-router-sync": "^5.0.0"
  }
```

## 安装  

#### 开发  

导入sql,修改[配置](https://github.com/lscho/ThinkJS-Vue.js-blog/blob/master/server/src/config/adapter.js)中 mysql 部分,启动服务  
```bash
# 启动后台服务
cd ./server
npm start
# 启动前台服务
cd ./client
npm start
```

#### 部署  

```bash
# 编译
cd ./client
npm run build
```

将 server 文件夹上传至服务器，参考[nginx.conf](https://github.com/lscho/ThinkJS-Vue.js-blog/blob/master/server/nginx.conf)进行配置