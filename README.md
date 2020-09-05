
## 博客介绍

该项目使用Vue.js、Node.js、Express、Axios、MySQL、Webpack4开发的个人博客，包括前台展示，后台管理。

#### 项目地址
前台展示（初次加载等待的时间会比较长）：http://119.45.55.131:3000

后台管理：http://119.45.55.131:3000/login

####  技术栈
前台：Vue.js、Vue Router、 Vuex、Vue-Echarts、Axios

后台：Node.js、Express、MySQL

打包工具：Webpack4

## 博客功能
前台：
- [x] 文章列表 
- [x] 文章归档
- [x] 文章分类
- [x] 文章详情
- [x] 搜索文章
- [x] 留言板
- [x] 发送邮箱

后台：
- [x] 登陆：sha1密码加密
- [x] Express-jwt Token验证
- [x] Markdown编辑器：图片上传回显、代码高亮、发布文章、保存草稿
- [x] 文章管理
- [x] 评论管理：回复评论
- [x] 专栏管理：移动专栏文章
- [ ]  统计数据展示：未实现每日访问量和评论数的定期存储
- [ ]  个人中心

以上都实现了文章、评论、专栏的增删改查功能

基本组件实现：
滚动条、下拉框、分页、模拟框、全局提示框、Dialog

## 目录
```
├─ blog.sql				mysql数据库
├─ build								
│    ├─ webpack.base.config.js	
│    ├─ webpack.dev.config.js
│    └─ webpack.prod.config.js
├─ package.json
├─ server				服务器
│    ├─ api				Restful接口
│    │    ├─ articleMgt.js		文章接口
│    │    ├─ catMgt.js			专栏列表接口
│    │    ├─ commentMgt.js		评论接口
│    │    ├─ editArticle.js		写文章接口
│    │    ├─ email.js			发送邮箱接口
│    │    ├─ front.js			前台接口
│    │    ├─ index.js			路由
│    │    ├─ login.js			登陆接口
│    │    ├─ share.js			公共接口
│    │    ├─ statMgt.js			数据接口
│    │    └─ subCatMgt.js		专栏文章接口
│    ├─ app.js
│    ├─ db				数据库接口
│    │    ├─ db.js
│    │    └─ sql_map.js
│    ├─ public				打包存放处
│    ├─ token				token验证
│    └─ upload				图片存放目录
├─ src					客户端
│    ├─ api				axios接口
│    ├─ app.vue				根组件
│    ├─ assets				外部引用文件
│    │    ├─ css
│    │    ├─ images
│    │    └─ js
│    ├─ components
│    │    ├─ back			后台组件
│    │    ├─ front			前台组件
│    │    ├─ global			全局消息组件	
│    │    ├─ page_nav.vue		公共的分页组件
│    │    └─ search_box.vue		公共的搜索组件
│    ├─ icons				svg
│    │    ├─ index.js
│    │    └─ svg
│    ├─ index.html
│    ├─ main.js				项目入口
│    ├─ router				路由
│    │    └─ index.js
│    ├─ store.js			vuex
│    └─ views
│           ├─ 404.vue
│           ├─ back			后台页面
│           └─ front			前台页面
├─ static
│    ├─ .gitkeep
│    └─ favicon.ico						
```
## How to start
```bash
# install dependencies
npm install 

# open MySQL database and enter the MySQL command line, create and import mysql databases
create database blog;
use blog;
set names utf8;
source C:\Users\PC\Desktop\blog.sql;

# enter ./server directory and turn on the server at localhost:3000
cd ./server
node app.js

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification under ./server/public directory
npm run build
```
## TIPS
发送邮箱server/api/email.js的xxxx和数据库存储的邮箱地址，需改成自己的邮箱，用于发送邮件。
## 展示效果
#### 前台页面
**首页：**

![Image text](https://raw.githubusercontent.com/Jennifer249/blog/master/doc/front/home.png)

**文章搜索：**

![Image text](https://raw.githubusercontent.com/Jennifer249/blog/master/doc/front/articleSearch.png)



**归档：**

![Image text](https://raw.githubusercontent.com/Jennifer249/blog/master/doc/front/map.png)

**文章详情：**

![Image text](https://raw.githubusercontent.com/Jennifer249/blog/master/doc/front/articleDetail.png)



**留言板：**

![Image text](https://raw.githubusercontent.com/Jennifer249/blog/master/doc/front/comment.png)



**邮件发送：**

![Image text](https://raw.githubusercontent.com/Jennifer249/blog/master/doc/front/email.png)

#### 后台页面
**登陆：**

![Image text](https://raw.githubusercontent.com/Jennifer249/blog/master/doc/back/login.png)



**Markdown编辑器：**

![Image text](https://raw.githubusercontent.com/Jennifer249/blog/master/doc/back/edit.png)



**统计数据展示：**

![Image text](https://raw.githubusercontent.com/Jennifer249/blog/master/doc/back/stat.png)



**文章管理：**

![Image text](https://raw.githubusercontent.com/Jennifer249/blog/master/doc/back/articleMgt.png)



**评论管理：**

![Image text](https://raw.githubusercontent.com/Jennifer249/blog/master/doc/back/commentMgt.png)



**专栏列表管理：**

![Image text](https://raw.githubusercontent.com/Jennifer249/blog/master/doc/back/catMgt.png)



**专栏文章管理：**

![Image text](https://raw.githubusercontent.com/Jennifer249/blog/master/doc/back/subCatMgt.png)

## TODO

- 个人中心
- 数据库定期存储
- 学习jest，编写测试用例
- 适配移动端

## 总结

- 编写基础组件编写，加深了对Vue方法的理解。
- 看官方文档和源码，可以节省很多不必要的时间。通过借鉴源码，发现新知，进而深入学习，例如AOP编程等。
- 工具使用：Postman服务器接口测试、liver-server前端临时服务器、supervisor和pm2用于node进程管理、配置PostCSS省去写浏览器前缀。
- 为实现留言列表嵌套的效果，参照多层嵌套目录，递归组件处理视图，前序遍历算法处理数据，但最关键的一点是，为了建立起两条留言间的关联，仅有被回复的用户id是不够的，留言表需增加一个字段被回复的留言id。如一条新增的COMMENT(comment_id, article_id,visitor_id,content,time,reply_visitor_id,**reply_comment_id**)。在这里，为了得到想要的效果，需考虑下数据库的设计。
- 整个项目涵盖了，数据库设计与使用、服务器、客户端，webpack4最新的配置、部署腾讯云(PM2)，站点统计。稍微体验了一点全栈开发，收获颇丰。
