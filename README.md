## 设计方案  

#### 后台
1.前后端分离
2.RESTful API
3.使用 jwt 身份认证
4.后台使用 iview

#### 前台
1.前台使用 nuxt.js 做服务端渲染

## 结构  

|-[admin](https://github.com/lscho/ThinkJS-Vue.js-blog/tree/master/admin) 后台  
|-[home](https://github.com/lscho/ThinkJS-Vue.js-blog/tree/master/home) 前台  
|-[server](https://github.com/lscho/ThinkJS-Vue.js-blog/tree/master/server) 服务端  


## 依赖 

#### 服务端  

```json
  "dependencies": {
    "think-cache": "^1.0.0",
    "think-cache-file": "^1.0.8",
    "think-logger3": "^1.0.0",
    "think-model": "^1.0.0",
    "think-model-mysql": "^1.0.0",
    "think-session": "^1.0.0",
    "think-session-jwt": "^1.0.8",
    "think-view": "^1.0.11",
    "think-view-ejs": "^0.0.11",
    "thinkjs": "^3.0.0"
  }
```
#### 后台

```json
  "dependencies": {
    "axios": "^0.17.0",
    "echarts": "^3.8.5",
    "iview": "^2.8.0",
    "mavon-editor": "^2.4.13",
    "vue": "^2.5.2",
    "vue-axios": "^2.0.2",
    "vue-router": "^3.0.1",
    "vuex": "^3.0.0",
    "vuex-router-sync": "^5.0.0"
  }
```

#### 前台

```json
  "dependencies": {
    "nuxt": "^1.0.0"
  }
```

## 安装  

#### 开发  

导入sql,修改[配置](https://github.com/lscho/ThinkJS-Vue.js-blog/blob/master/server/src/config/adapter.js)中 mysql 部分,启动服务  
```bash
# 启动服务端
cd ./admin
npm run dev
# 启动前台服务
cd ./home
npm run dev
# 启动后台服务
cd ./admin
npm run dev
```

#### 部署  

```bash
# 编译
cd ./admin
npm run build
cd ./home
npm run build
```

将 server 文件夹上传至服务器，参考[nginx.conf](https://github.com/lscho/ThinkJS-Vue.js-blog/blob/master/server/nginx.conf)进行配置