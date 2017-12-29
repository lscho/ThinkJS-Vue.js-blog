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