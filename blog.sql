-- MySQL dump 10.13  Distrib 5.6.48, for Linux (x86_64)
--
-- Host: localhost    Database: blog
-- ------------------------------------------------------
-- Server version	5.6.48

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `article` (
  `article_id` int(11) NOT NULL AUTO_INCREMENT,
  `article_title` varchar(225) DEFAULT NULL,
  `article_content` text,
  `article_time` datetime DEFAULT NULL,
  `article_visits` int(11) DEFAULT NULL,
  `article_comments` int(11) DEFAULT NULL,
  `article_state` int(11) DEFAULT NULL,
  `categories_id` int(11) DEFAULT NULL,
  `tags` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`article_id`)
) ENGINE=InnoDB AUTO_INCREMENT=245 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (222,'box-shadow','<div><div>参数说明</div><div>```</div><div>box-shadow: 2px 2px 4px 1px red insert;</div><div>```</div><div><br></div><div>参数从左到右依次是，水平阴影位置(必须)、垂直阴影位置（必须）、模糊距离（可选）、阴影扩展半径（可选） 阴影颜色（可选）、阴影向内（可选，不选向外）</div><div><br></div><div>1、**水平阴影位置、垂直阴影位置**：水平/垂直移动阴影的距离</div><div>box-shadow: 200px 10px 0px 0px black; （这里的矩形宽度为200px）</div></div><div><span class=\"img-wrapper\"></span><span class=\"img-wrapper\"><img src=\"http://119.45.55.131:3000/upload/oBksxEiJJYs60aTWtk3adHlH.png\"><span>![在这里插入图片描述](http://119.45.55.131:3000/upload/oBksxEiJJYs60aTWtk3adHlH.png)</span></span><br></div><div><div>2、**阴影扩展半径**：在原矩形阴影的基础上，向外延伸阴影扩展半径区域</div><div><br></div><div>box-shadow: 210px 0px 0px **0px** black; &nbsp;</div></div><div><span class=\"img-wrapper\"><img src=\"http://119.45.55.131:3000/upload/I_QvzC8PXJqPRjYEOHZlQCgu.png\"><span>![在这里插入图片描述](http://119.45.55.131:3000/upload/I_QvzC8PXJqPRjYEOHZlQCgu.png)</span></span><br></div><div>box-shadow: 210px 0px 0px **10px** black; （增加的阴影扩展半径10px刚好填满中间的距离10px）<br></div><div><span class=\"img-wrapper\"><img src=\"http://119.45.55.131:3000/upload/uP18Zjt9rdcLFnzh_kxFxlt0.png\"><span>![在这里插入图片描述](http://119.45.55.131:3000/upload/uP18Zjt9rdcLFnzh_kxFxlt0.png)</span></span><br></div><div><div>3、**模糊距离：阴影大小（加上模糊的） = 原矩形大小 +&nbsp; &nbsp;阴影扩展半径区域 + 模糊距离区域/2**</div><div>box-shadow: 230px 0px **0px** 30px black;&nbsp;</div></div><div><span class=\"img-wrapper\"><img src=\"http://119.45.55.131:3000/upload/9v2G9kZRKzXv_M6ybMjKSw3z.png\"><span>![在这里插入图片描述](http://119.45.55.131:3000/upload/9v2G9kZRKzXv_M6ybMjKSw3z.png)</span></span><br></div><div><div>box-shadow: 230px 0px **10px** 30px black;&nbsp;</div><div>增加了模糊距离10px，模糊部分超出原矩形右边框。模糊部分也包含原矩形右边框的右侧。</div></div><div><span class=\"img-wrapper\"><img src=\"http://119.45.55.131:3000/upload/lz4HkfppMWun7bLxeDP5VZKS.png\"><span>![在这里插入图片描述](http://119.45.55.131:3000/upload/lz4HkfppMWun7bLxeDP5VZKS.png)</span></span><br></div><div><div>box-shadow: **235px** 0px 10px 30px black;</div><div>矩形间的距离，增大5px，就刚好填满中间的距离。中间距离35px = 阴影扩展半径30px + 模糊距离/2 （5px）</div></div><div><span class=\"img-wrapper\"><img src=\"http://119.45.55.131:3000/upload/gl5kbaAvh9ebGc-wc__xfE_b.png\"><span>![在这里插入图片描述](http://119.45.55.131:3000/upload/gl5kbaAvh9ebGc-wc__xfE_b.png)</span></span><br></div><div><div>**两者的关系：**</div><div>通过取色器发现阴影部分中间的颜色都是一样的，只有边缘有颜色由深到浅的变化（模糊距离）。结合上面得出，**模糊距离，是以最外层的阴影边框为中间线（最外层为，阴影扩展半径区域+原矩形阴影部分）向两边延伸各一半的长度。该中间线两边的模糊变化由内到外，颜色由深变浅，其中变化范围长度为模糊距离。**</div></div><div><br></div><div><br></div><div><br></div>','2020-07-11 01:23:08',0,0,1,11,'box-shadow'),(223,'Node.js简单使用cookie，帮助理解实现原理和交互过程','<div>HTTP是一个无状态的协议，而现实中的业务是需要一定状态的，否则无法区分用户的身份。通过使用Cookie能帮助我们标识不同身份的用户。可用于记录服务器于客户端之间的状态，最早的用处是用于判断用户是否第一次登陆，如下面部分的代码。</div><div><br></div><div>Cookie的处理分为：</div><div><br></div><div> - 服务器向客户端发送Cookie</div><div>&nbsp;- 浏览器保存Cookie</div><div>&nbsp;- 之后浏览器的每次请求都会将Cookie发给服务器端。</div><div><br></div><div>服务器响应的Cookie值在Set-Cookie中，最后将Set-Cookie设置在响应报文头部中返回，格式与请求中的格式不太一样，请求的cookie为对象：</div><div>```javascript</div><div>Set-Cookie: name=value; Path=/; Expires=Sun, 23-Apr-23 09:01:35 GMT; Domain=.domain.com;</div><div>```</div><div><br></div><div>服务端：</div><div>```javascript</div><div>var http = require(\'http\');</div><div><br></div><div>http.createServer(function (req, res) {</div><div><span style=\"white-space:pre\">	</span>req.cookies = parseCookie(req.headers.cookie);<span style=\"white-space:pre\">	</span>//解析客户端的cookie，,暂存在req.cookies上</div><div><span style=\"white-space:pre\">	</span>handle(req, res); //进一步业务处理</div><div>}).listen(8888);</div><div><br></div><div>//解析客户端传来的cookie</div><div>var parseCookie = function(cookie) {</div><div><span style=\"white-space:pre\">	</span>var cookies = {};</div><div><span style=\"white-space:pre\">	</span>if(!cookie) { //为空，返回cookies</div><div><span style=\"white-space:pre\">		</span>return cookies;</div><div><span style=\"white-space:pre\">	</span>}</div><div><span style=\"white-space:pre\">	</span>//存在cookie，则解析客户端的cookie，存储于cookies给服务端使用</div><div><span style=\"white-space:pre\">	</span>var list = cookie.split(\';\'); //将Cookie值：key1=value; key2=value2转变为数组的形式</div><div><span style=\"white-space:pre\">	</span>for(var i = 0; i &lt; list.length; i++) {&nbsp;&nbsp;</div><div><span style=\"white-space:pre\">		</span>var pair = list[i].split(\'=\');</div><div><span style=\"white-space:pre\">		</span>cookies[pair[0].trim()] = pair[1].trim(); //trim用于删除字符串头尾的空格</div><div><span style=\"white-space:pre\">	</span>}</div><div><span style=\"white-space:pre\">	</span>return cookies; //以数组形式返回</div><div>}</div><div><br></div><div>//业务处理</div><div>var handle = function(req, res) {</div><div><span style=\"white-space:pre\">	</span>if(!req.cookies.isVisit) {</div><div><span style=\"white-space:pre\">		</span>res.setHeader(\'Set-Cookie\', serialize(\'isVisit\', \'1\'));&nbsp; //设置</div><div><span style=\"white-space:pre\">		</span>res.writeHead(200, {\"Content-Type\": \"text/html;charset=utf-8\"});</div><div><span style=\"white-space:pre\">		</span>res.write(\'&lt;h1&gt;第一次登陆&lt;/h1&gt;\');</div><div><span style=\"white-space:pre\">		</span>res.end();</div><div><span style=\"white-space:pre\">	</span>}</div><div><span style=\"white-space:pre\">	</span>else {</div><div><span style=\"white-space:pre\">		</span>res.writeHead(200, {\"Content-Type\": \"text/html;charset=utf-8\"});</div><div><span style=\"white-space:pre\">		</span>res.write(\'&lt;h1&gt;欢迎再次登陆&lt;/h1&gt;\');</div><div><span style=\"white-space:pre\">		</span>res.end();</div><div><span style=\"white-space:pre\">	</span>}</div><div>}</div><div><br></div><div>//格式化将返回的cookie</div><div>var serialize = function (name, val, opt) {</div><div><span style=\"white-space:pre\">	</span>var pairs = [name + \'=\' + encodeURIComponent(val)];</div><div><span style=\"white-space:pre\">	</span>opt = opt || {};</div><div><br></div><div><span style=\"white-space:pre\">	</span>if(opt.path) pair.push(\'Path=\' + opt.path);<span style=\"white-space:pre\">	</span>//还可以设置其他选项Domain、Expires等</div><div><span style=\"white-space:pre\">	</span>return pairs.join(\';\');&nbsp; //将数组拼接成用分号连接的字符串</div><div>}</div><div>```</div><div>通过console.log(res); 会发现此时的服务器端响应报头加上了Set-Cookie。而之后没通过setHeader设置的Set-Cookie响应报头，是不会再出现Set-Cookie的，为null。</div><div><span class=\"img-wrapper\"></span><span class=\"img-wrapper\"><img src=\"http://119.45.55.131:3000/upload/ldDq3ckvWYljlatB9p1vxN0M.png\"><span>![在这里插入图片描述](http://119.45.55.131:3000/upload/ldDq3ckvWYljlatB9p1vxN0M.png)</span></span><br></div><div><span class=\"img-wrapper\"><span class=\"img-wrapper\"><img src=\"http://119.45.55.131:3000/upload/nofmUXLoF-SY-Uq9jJ6jEgEX.png\"><span>![在这里插入图片描述](http://119.45.55.131:3000/upload/nofmUXLoF-SY-Uq9jJ6jEgEX.png)</span></span><br></span></div><div>客户端通过控制台输入，document.cookie查看：<br><span class=\"img-wrapper\"><span class=\"img-wrapper\"><img src=\"http://119.45.55.131:3000/upload/mOiRqzw_opzWzQbGgW3G0Hew.png\"><span>![在这里插入图片描述](http://119.45.55.131:3000/upload/mOiRqzw_opzWzQbGgW3G0Hew.png)</span></span><br></span></div><div>客户端收到带Set-Cookie的响应后，在之后的请求时会在Cookie字段中带上这个值。</div><div><span class=\"img-wrapper\"><span class=\"img-wrapper\"><img src=\"http://119.45.55.131:3000/upload/RSMCKJTCthnYDdhyDGjaVRx-.png\"><span>![在这里插入图片描述](http://119.45.55.131:3000/upload/RSMCKJTCthnYDdhyDGjaVRx-.png)</span></span><br></span></div><div><div>Set-Cookie在报头中可能存在多个字段。因此res.setHeader的第二个参数可以是一个数组：</div><div><br></div><div>```javascript</div><div>res.setHeader(\'Set-Cookie\', [serialize(\'foo\', \'bar\'), serialize(\'baz\', \'val\')]);</div><div>```</div><div>最后生成两条Set-Cookie字段：</div><div><br></div><div>```javascript</div><div>Set-Cookie: foo=bar; Path=/; Expires=Sun, 23-Apr-23 09:01:35 GMT; Domain=.domain.com;&nbsp;</div><div>Set-Cookie: baz=val; Path=/; Expires=Sun, 23-Apr-23 09:01:35 GMT; Domain=.domain.com;</div><div>```</div><div><br></div><div>&gt;《深入浅出Node.js》<br></div><div><br></div><br><br></div>','2020-07-11 01:43:24',0,0,1,12,'node,cookie'),(224,'babel-loader配置 @beta版','<div>## 作用</div><div>使用ES6编写js语法时，由于有些浏览器不支持，故需使用babel插件将ES6转换为ES5。</div><div><br></div><div>## 安装</div><div>webpack 3.x | babel-loader 8.x | babel 7.x</div><div>```javascript</div><div>npm install babel-loader@8.0.0-beta.0 @babel/core @babel/preset-env webpack --save-dev</div><div>```</div><div>webpack 3.x babel-loader 7.x | babel 6.x</div><div>```javascript</div><div>npm install babel-loader babel-core babel-preset-env webpack --save-dev</div><div>```</div><div>我这里用第一种。</div><div><br></div><div>## 配置</div><div>webpack.config.js</div><div>```javascript</div><div>{</div><div><span style=\"white-space:pre\">	</span>test: /\\.js$/,</div><div><span style=\"white-space:pre\">	</span>loader: [\'babel-loader\'],</div><div><span style=\"white-space:pre\">	</span>exclude: /node_modules/</div><div>}</div><div>```</div><div><br></div><div>新建.babelrc文件，并写入babel的配置，webpack会依赖此配置文件来使用babel编译ES6代码</div><div><br></div><div>```javascript</div><div>{</div><div><span style=\"white-space:pre\">	</span>\"presets\": [\"@babel/preset-env\"]</div><div>}</div><div>```</div><div>或者不使用.babelrc文件，直接加在webpack.config.js</div><div><br></div><div>```javascript</div><div>module: {\n  rules: [\n    {\n      test: /\\.js$/,\n      exclude: /(node_modules|bower_components)/,\n      use: {\n        loader: \'babel-loader\',\n        options: {\n          presets: [\'@babel/preset-env\']\n        }\n      }\n    }\n  ]\n}<br></div><div>```</div><div>添加配置</div><div>1、babel会在每个文件都插入辅助代码，使得体积过大，可以引入 babel runtime 作为一个独立模块，来避免重复引入。</div><div>```javascript</div><div>npm install @babel/plugin-transform-runtime --save-dev</div><div>npm install @babel/runtime --save</div><div>```</div><div>2、\'modules\':false：设置模块引用规则，可以设置成\"amd\" | \"umd\" | \"systemjs\" | \"commonjs\" | false, defaults to \"commonjs\",设置了false，就是用es6以上默认的规则。</div><div><br></div><div>3、targets.browsers:设置兼容的浏览器范围</div><div><br></div><div>4、\"comments\": false 删除已编译代码的注释</div><div><br></div><div>.babelrc完整版</div><div><br></div><div>```javascript</div><div>{\n  \"presets\": [\n    [\"@babel/preset-env\", {\n      \"modules\": false,\n      \"targets\": {\n        \"browsers\": [\"&gt; 1%\", \"last 2 versions\", \"not ie &lt;= 8\"]\n      }\n    }]\n  ],\n  \"plugins\": [\"@babel/transform-runtime\"]，\n  \"comments\": false\n}<br></div><div>```</div><div><br></div><div><br></div><div>&gt; https://www.jianshu.com/p/0dc3bddb6da8?utm_campaign=maleskine&amp;utm_content=note&amp;utm_medium=seo_notes&amp;utm_source=recommendation</div><div>&gt; https://babeljs.io/docs/en/babel-preset-stage-2/</div><div>&gt; https://www.webpackjs.com/loaders/babel-loader/</div><div><br></div>','2020-07-11 01:44:13',0,0,1,13,'babel-loader'),(226,'浏览器窗口缩小后,滚动条拉至右边显示空白','<div><div>**问题描述:**</div><div>当浏览器缩小后,出现滚动条,拉至右边,显示出来的部分为空白．</div><div><br></div><div>**原因：**</div><div>通过控制台的查看，可得知，由于固定了子元素的宽度，当浏览器窗口缩小后，将导致子元素宽度大于父元素的宽度，子元素将父元素撑开所致，如图：</div></div><div><span class=\"img-wrapper\"></span><span class=\"img-wrapper\"><img src=\"http://119.45.55.131:3000/upload/ZsKJsDbLTq7gxEA8mrCt3hyf.png\"><span>![在这里插入图片描述](http://119.45.55.131:3000/upload/ZsKJsDbLTq7gxEA8mrCt3hyf.png)</span></span><br></div><div><div>**解决方案：**</div><div>第一种：在父元素上添加样式:</div><div>```javascript</div><div>style=\"width:expression(document.body.clientWidth &lt;= 1200? \'1200px\': \'auto\');min-width:1200px\"</div><div>```</div><div>由于IE6不支持min、max,为了兼容,故使用width:expression[^1](document.body.clientWidth &lt;= 1200? \'1200px\': \'auto\');</div><div>expression将CSS属性和Javascript脚本关联起来，是动态设置CSS属性的强大方法。但expression对浏览器的资源要求高（因为它的计算频率高）。在性能优化方面，可以将第一次计算出的结果赋值给指定的样式属性，并用这个属性代替expression。但仍存在很多问题，所以尽量不使用。<br></div><div><br></div><div>第二种：修改子元素样式的固定宽度,将width: 1170px;改为max-width: 1170px;</div><div><br></div><div>第三种：相应式布局，随着浏览器宽度的变化，调整子元素宽度和布局，避免撑开父元素宽度的情况出现。</div><div><br></div><div><br></div></div><div><br></div>','2020-07-11 03:14:50',0,1,1,11,''),(228,'最简单的SVG图标使用方式','<div>## 简介</div><div>**Icon Sprite** ：CSS精灵或雪碧图，是一种网页图片应用处理方式。原理是，把网页中一些Icon整合到一张图片文件中。再通过一定方式从图片文件中取出所需Icon并显示。其中CSS Sprite、Icon Font使用最多。</div><div><br></div><div>**CSS Sprite**：</div><div>原理是将多个icon按一定规律整合到图片文件中，再利用CSS的\"background-image\"，\"background-repeat\"，\"background-position\"的组合进行图片定位并显示。优点：技术成熟，兼容性好；缺点：在实际需求中需为保存不用颜色、大小的Icon，最终难以管理。</div><div><br></div><div>**Icon Font**：</div><div>原理是将Icon定义为图片字体，在CSS中用@font-face引入Icon Font自定义字体, 再利用font-family和字符码显示出指定的图标。优点：维护比图片方便；缺点：只有单色，字体生成比CSS Sprite更复杂。</div><div> </div><div>## SVG Sprite介绍</div><div> SVG即可缩放矢量图形 (Scalable Vector Graphics)的简称, 是一种用来描述二维矢量图形的XML标记语言. SVG图形不依赖于分辨率, 因此图形不会因为放大而显示出明显的锯齿边缘。</div><div>&nbsp;</div><div>**优点**</div><div>相比CSS Sprite和Icon Font有着明显的优势，CSS Sprite技术成熟兼容性好，</div><div><br></div><div>&nbsp;- 放大缩小不会失真（不依赖于分辨率，放大显示出明显得锯齿边缘）</div><div>&nbsp;- 大小颜色等属性自定义灵活</div><div>&nbsp;- 体积小同时管理方便</div><div>&nbsp;</div><div>**缺点**</div><div>&nbsp;虽然灵活度高，但SVG兼容性有待考究，其渲染性能也不及图片和字体那么高，可能在某些情况下不适用。但在一般的场景中，svg sprite 还能够给开发带来很大的便利。</div><div>## 使用</div><div>1、在阿里巴巴的图标库(https://www.iconfont.cn/)选择图标后 -&gt; 点击下载SVG -&gt;（选择颜色、大小后）点击复制SVG。</div><div><span class=\"img-wrapper\"><img src=\"http://119.45.55.131:3000/upload/yg_68YrNG67zaONrRHBOQuUc.png\"><span>![在这里插入图片描述](http://119.45.55.131:3000/upload/yg_68YrNG67zaONrRHBOQuUc.png)</span></span><br></div><div>2、粘贴在html中。也可在粘贴的代码中修改Icon大小和颜色。<br></div><div><span class=\"img-wrapper\"></span><span class=\"img-wrapper\"><img src=\"http://119.45.55.131:3000/upload/HiakhIu-OMWsE2Uwy1Mcsk9i.png\"><span>![在这里插入图片描述](http://119.45.55.131:3000/upload/HiakhIu-OMWsE2Uwy1Mcsk9i.png)</span></span></div><div><span class=\"img-wrapper\"><span class=\"img-wrapper\"><img src=\"http://119.45.55.131:3000/upload/BvfOqfjuqftWP_SSvjE2UTjb.png\"><span>![在这里插入图片描述](http://119.45.55.131:3000/upload/BvfOqfjuqftWP_SSvjE2UTjb.png)</span></span><br></span></div><div><div>&gt;进一步深入了解和使用，参考文章：&nbsp;</div><div>&gt; https://www.jianshu.com/p/5723a9dacd92</div><div>&gt; https://www.runoob.com/svg/svg-tutorial.html</div><br></div>','2020-07-11 03:20:08',0,0,1,15,'svg sprite,雪碧图'),(229,'Node.js简单使用session，帮助理解实现原理','<div>## 一、session使用</div><div>Cookie可以实现浏览器和服务器状态的记录，但Cookie会出现存储体积过大和可以在前后端修改的问题。</div><div>为了解决Cookie的数据敏感问题，Session应运而生。常见的实现方式是基于Cookie。只将口令放置Cookie，通过口令实现前后端数据的映射，大部分数据存储于服务器的session中，这里会有一个全局sessions去存储每个用户的session，并设置每个的有效期，一般20分钟。超时则重新生成和更新全局sessions。</div><div><br></div><div>以下代码为，在有效期内，判断用户是否第一次登陆。</div><div>服务器端：</div><div>```</div><div>var http = require(\'http\');</div><div><br></div><div>//全局sessions存放所有的session</div><div>var sessions = {};</div><div>var key = \'session_id\';</div><div>var EXPIRES = 20 * 60 * 1000;<span style=\"white-space:pre\">	</span>//过期时长</div><div><br></div><div>http.createServer(function (req, res) {</div><div><span style=\"white-space:pre\">	</span>req.cookies = parseCookie(req.headers.cookie);<span style=\"white-space:pre\">	</span>//解析客户端的cookie，,暂存在req.cookies上</div><div><span style=\"white-space:pre\">	</span>var id = req.cookies[key];  //取出每个用户唯一的id口令</div><div><span style=\"white-space:pre\">	</span>//更新session状态</div><div><span style=\"white-space:pre\">	</span>if (!id) {</div><div><span style=\"white-space:pre\">		</span>req.session = generate();  //生成新的session</div><div><span style=\"white-space:pre\">	</span>}</div><div><span style=\"white-space:pre\">	</span>else {</div><div><span style=\"white-space:pre\">		</span>var session = sessions[id]; //从全局sessions中取出对应id的session，判断session状态</div><div><span style=\"white-space:pre\">		</span>if (session) {</div><div><span style=\"white-space:pre\">			</span>if (session.cookie.expire &gt; (new Date()).getTime()) {</div><div><span style=\"white-space:pre\">				</span>//更新超时时间</div><div><span style=\"white-space:pre\">				</span>session.cookie.expire = (new Date()).getTime() + EXPIRES;</div><div><span style=\"white-space:pre\">				</span>req.session = session;</div><div><span style=\"white-space:pre\">			</span>}</div><div><span style=\"white-space:pre\">			</span>else {</div><div><span style=\"white-space:pre\">				</span>//超时了，删除旧的数据，重新生成</div><div><span style=\"white-space:pre\">				</span>delete sessions[id];</div><div><span style=\"white-space:pre\">				</span>req.session = generate();</div><div><span style=\"white-space:pre\">			</span>}</div><div><span style=\"white-space:pre\">		</span>}</div><div><span style=\"white-space:pre\">		</span>else {</div><div><span style=\"white-space:pre\">			</span>//sessions中不存在该id的session（id口令匹配错误或客户端保存着id，但服务器端因超时导致session已取消）,重新生成</div><div><span style=\"white-space:pre\">			</span>req.session = generate();</div><div><span style=\"white-space:pre\">		</span>}</div><div><span style=\"white-space:pre\">	</span>}</div><div><br></div><div><span style=\"white-space:pre\">	</span>//业务处理，返回客户端</div><div><span style=\"white-space:pre\">	</span>handle(req, res);</div><div><br></div><div>}).listen(8888);</div><div><br></div><div><br></div><div>//生成新的session,并存储于sessions</div><div>var generate = function() {</div><div><span style=\"white-space:pre\">	</span>var session = {};</div><div><span style=\"white-space:pre\">	</span>session.id = (new Date()).getTime() + Math.random();&nbsp; //id为当前时间加上随机值</div><div><span style=\"white-space:pre\">	</span>session.cookie = {</div><div><span style=\"white-space:pre\">		</span>expire: (new Date()).getTime() + EXPIRES //cookie为当前时间加上超时时长</div><div><span style=\"white-space:pre\">	</span>};</div><div><span style=\"white-space:pre\">	</span>sessions[session.id] = session;</div><div><span style=\"white-space:pre\">	</span>return session;&nbsp; //返回当前新建的session</div><div>};</div><div><br></div><div>//业务处理</div><div>var handle = function (req,res) {</div><div><span style=\"white-space:pre\">	</span>if (!req.session.isVisit) {</div><div><span style=\"white-space:pre\">		</span>sessions[req.session.id].isVisit = true;<span style=\"white-space:pre\">	</span>//修改服务器相应的session状态</div><div><span style=\"white-space:pre\">		</span>res.setHeader(\'Set-Cookie\', serialize(key, req.session.id));&nbsp; //头部写入session的id</div><div><span style=\"white-space:pre\">		</span>res.writeHead(200, {\"Content-Type\":\"text/html;charset=utf-8\"});</div><div><span style=\"white-space:pre\">		</span>res.end(\"&lt;h1&gt;第一次登陆&lt;/h1&gt;\");</div><div><span style=\"white-space:pre\">	</span>}</div><div><span style=\"white-space:pre\">	</span>else {</div><div><span style=\"white-space:pre\">		</span>res.writeHead(200, {\"Content-Type\":\"text/html;charset=utf-8\"});</div><div><span style=\"white-space:pre\">		</span>res.end(\'&lt;h1&gt;再次登陆&lt;/h1&gt;\');</div><div><span style=\"white-space:pre\">	</span>}</div><div>}</div><div><br></div><div>//解析客户端传来的cookie</div><div>var parseCookie = function(cookie) {</div><div><span style=\"white-space:pre\">	</span>var cookies = {};</div><div><span style=\"white-space:pre\">	</span>if(!cookie) { //为空，返回cookies</div><div><span style=\"white-space:pre\">		</span>return cookies;</div><div><span style=\"white-space:pre\">	</span>}</div><div><span style=\"white-space:pre\">	</span>//存在cookie，则解析客户端的cookie，存储于cookies给服务端使用</div><div><span style=\"white-space:pre\">	</span>var list = cookie.split(\';\'); //将Cookie值：key1=value; key2=value2转变为数组的形式</div><div><span style=\"white-space:pre\">	</span>for(var i = 0; i &lt; list.length; i++) {&nbsp;&nbsp;</div><div><span style=\"white-space:pre\">		</span>var pair = list[i].split(\'=\');</div><div><span style=\"white-space:pre\">		</span>cookies[pair[0].trim()] = pair[1].trim();//trim用于删除字符串头尾的空格</div><div><span style=\"white-space:pre\">	</span>}</div><div><span style=\"white-space:pre\">	</span>return cookies;</div><div>}</div><div><br></div><div>//格式化cookie</div><div>var serialize = function (name, val, opt) {</div><div><span style=\"white-space:pre\">	</span>var pairs = [name + \'=\' + encodeURIComponent(val)];</div><div><span style=\"white-space:pre\">	</span>opt = opt || {};</div><div><br></div><div><span style=\"white-space:pre\">	</span>if(opt.path) pair.push(\'Path=\' + opt.path);<span style=\"white-space:pre\">	</span>//还可以设置其他选项Domain、Expires等</div><div><span style=\"white-space:pre\">	</span>if (opt.maxAge) pairs.push(\'Max-Age=\' + opt.maxAge); //告诉浏览器多久后过期</div><div><span style=\"white-space:pre\">	</span>return pairs.join(\';\');&nbsp; //将数组拼接成用分号连接的字符串</div><div>}</div><div>```</div><div>服务器端查看：</div><div><span class=\"img-wrapper\"><img src=\"http://119.45.55.131:3000/upload/CgXiLoTYDeJJ_BB2NpubBzPu.png\"><span>![在这里插入图片描述](http://119.45.55.131:3000/upload/CgXiLoTYDeJJ_BB2NpubBzPu.png)</span></span><br></div><div>客户端查看：</div><div><span class=\"img-wrapper\"><img src=\"http://119.45.55.131:3000/upload/j7aG2ghKtzMvJlbk8gcqhJAU.png\"><span>![在这里插入图片描述](http://119.45.55.131:3000/upload/j7aG2ghKtzMvJlbk8gcqhJAU.png)</span></span><br></div><div><div>当关闭浏览器时，cookie便会消失，可通过maxAge去设置永久时长：<br></div><div><br></div><div>```</div><div>var opt = {};</div><div>opt.maxAge = 12000;<span style=\"white-space:pre\">	</span>//设置永久过期时间</div><div>res.setHeader(\'Set-Cookie\', serialize(key, req.session.id, opt));</div><div>```</div><div><br></div><div>## 二、session安全性</div><div>由于Session的口令保存在客户端，会存在口令被盗用的情况。一种做法是将口令通过私钥加密进行签名。会用到crypto模块。</div><div>访问过程为：</div><div>&nbsp;- 服务器将加密的口令发送给客户端</div><div>&nbsp;- 客户端保存口令</div><div>&nbsp;- 客户端每次访问服务器，带着加密口令</div><div>&nbsp;- 服务器解析口令，进行业务处理</div><div><br></div><div>```</div><div>var crypto = require(\'crypto\');</div><div><br></div><div>//加密函数</div><div>var sign = function (val, secret) {</div><div><span style=\"white-space:pre\">	</span>return val + \'.\' + crypto</div><div><span style=\"white-space:pre\">		</span>.createHmac(\'sha256\', secret)&nbsp; //使用给定的sha256哈希函数算法和密钥,返回一个Hmac对象</div><div><span style=\"white-space:pre\">		</span>.update(val+\'\')&nbsp; //传入需要加密的数据,转换为字符串,更新Hamc</div><div><span style=\"white-space:pre\">		</span>.digest(\'base64\') //base64编码后,返回摘要</div><div>&nbsp;<span style=\"white-space:pre\">		</span>.replace(/\\=+$/, \'\'); //将字符串的多个=为结尾部分替换为\'\'</div><div>}</div><div>//解密函数</div><div>var unsign = function(val, secret) {</div><div><span style=\"white-space:pre\">	</span>var str = (val || \'\').slice(0, (val || \'\').lastIndexOf(\'.\'));&nbsp; //取得加密前的口令</div><div><span style=\"white-space:pre\">	</span>return sign(str, secret) == val ? str: false;<span style=\"white-space:pre\">	</span>//将取得的口令与服务端的签名加密，比较是否与客户端发来的加密口令匹配</div><div>}</div><div>```</div><div>使用如下：</div><div><span class=\"img-wrapper\"><img src=\"http://119.45.55.131:3000/upload/boKmSowZvPGEB-mrc023krbl.png\"><span>![在这里插入图片描述](http://119.45.55.131:3000/upload/boKmSowZvPGEB-mrc023krbl.png)</span></span><br></div><div>在响应头部插入加密口令。</div><div><span class=\"img-wrapper\"><img src=\"http://119.45.55.131:3000/upload/yt99gNu7GiZ2EBN1AQ_rCqXv.png\"><span>![在这里插入图片描述](http://119.45.55.131:3000/upload/yt99gNu7GiZ2EBN1AQ_rCqXv.png)</span></span><br></div><div><div>对收到的请求报文的口令进行解密。</div><div><br></div><div>客户端：</div></div><div><br></div><br></div><div><div>&gt; 《深入浅出Node.js》</div><div>&gt; http://nodejs.cn/api/crypto.html</div></div>','2020-07-11 03:27:51',0,0,1,12,'session'),(230,'test','test','2020-07-11 03:28:22',0,0,2,0,''),(231,'box','box','2020-07-11 03:28:37',0,0,3,0,''),(233,'node服务器响应浏览器请求的html页面（包括该页面引入的js、css、icon文件等）','<div>运行服务端node index.js后，在浏览器上输入http://localhost:8888/，服务器根据路径判断，返回默认的页面index.html。浏览器得到index.html后，再依次向服务器请求index.html上需加载的css、js、图片等。服务器根据请求的不同后缀，修改对应响应头部，并返回对应文件。若没有该文件，则返回404界面。</div><div>```</div><div>const http = require(\"http\");</div><div>const fs = require(\"fs\");</div><div>const url = require(\"url\");</div><div>const path = require(\"path\");</div><div><br></div><div>http.createServer((req, res) =&gt; {</div><div><br></div><div><span style=\"white-space: pre;\">	</span>let pathName = url.parse(req.url).pathname; //转换为url对象</div><div><br></div><div><span style=\"white-space: pre;\">	</span>//默认加载路径</div><div><span style=\"white-space: pre;\">	</span>if(pathName == \'/\') {</div><div><span style=\"white-space: pre;\">		</span>pathName = \"/index.html\";</div><div><span style=\"white-space: pre;\">	</span>}</div><div><br></div><div><span style=\"white-space: pre;\">	</span>//获取文件后缀名</div><div><span style=\"white-space: pre;\">	</span>let extName = path.extname(pathName);</div><div><br></div><div><span style=\"white-space: pre;\">	</span>// console.log(\"../fore_end\" + pathName); //例如../fore_end/css/style.css</div><div><span style=\"white-space: pre;\">	</span>fs.readFile(\"../fore_end\" + pathName, (err, data) =&gt; {</div><div><span style=\"white-space: pre;\">		</span>if(err) { //出错则返回404页面</div><div><span style=\"white-space: pre;\">			</span>console.log(\"404 Not Found!\");<span style=\"white-space: pre;\">			</span></div><div><span style=\"white-space: pre;\">			</span>fs.readFile(\"../fore_end/404.html\", (errorNotFound, dataNotFound) =&gt; {</div><div><span style=\"white-space: pre;\">				</span>if(errorNotFound) {</div><div><span style=\"white-space: pre;\">					</span>console.log(errorNotFound);</div><div><span style=\"white-space: pre;\">				</span>}</div><div><span style=\"white-space: pre;\">				</span>else {</div><div><span style=\"white-space: pre;\">					</span>res.writeHead(200, {\"Content-Type\": \"text/html;charset=utf-8\"});</div><div><span style=\"white-space: pre;\">					</span>res.write(dataNotFound); //返回404页面</div><div><span style=\"white-space: pre;\">					</span>res.end();</div><div><span style=\"white-space: pre;\">				</span>}</div><div><span style=\"white-space: pre;\">			</span>})</div><div><span style=\"white-space: pre;\">			</span>return;</div><div><span style=\"white-space: pre;\">		</span>}</div><div><span style=\"white-space: pre;\">		</span>else {</div><div><span style=\"white-space: pre;\">			</span>// 获取对应后缀的文件类型</div><div><span style=\"white-space: pre;\">			</span>let ext = getExt(extName);</div><div><br></div><div><span style=\"white-space: pre;\">			</span>// 设置请求头</div><div><span style=\"white-space: pre;\">			</span>res.writeHead(200, {\"Content-Type\": ext + \"; charset=utf-8\"});</div><div><span style=\"white-space: pre;\">			</span>res.write(data); //返回请求文件</div><div><span style=\"white-space: pre;\">			</span>res.end();</div><div><span style=\"white-space: pre;\">		</span>}</div><div><span style=\"white-space: pre;\">	</span>})</div><div>}).listen(8888);</div><div><br></div><div>// 获取后缀名</div><div>getExt = (extName) =&gt; {</div><div>switch(extName) {</div><div>  &nbsp; case \'.html\': return \'text/html\';</div><div>&nbsp; &nbsp; case \'.css\': return \'text/css\';</div><div>&nbsp; &nbsp; case \'.js\': return \'text/js\';</div><div>&nbsp; &nbsp; default: return \'text/html\';</div><div>&nbsp; }</div><div>}</div><div>```</div><div>要注意，上面返回文件的路径是相对于服务端的index.js文件。</div><div><br></div><div>要获取更多的文件类型，可通过读取文件判断。[ext.json文件获取](https://github.com/LiangJunrong/Node/blob/master/NodeBase/08_ext.json)</div><div><br></div><div><br></div><div>```javascript</div><div>getExt = (extName) =&gt; {</div><div><span style=\"white-space: pre;\">	</span>let data = fs.readFileSync(\"./ext.json\");</div><div><span style=\"white-space: pre;\">	</span>let ext = JSON.parse(data.toString()); //转换为js对象</div><div><span style=\"white-space: pre;\">	</span>return ext[extName];</div><div>}</div><div>```</div><div>对于浏览器请求的 favicon.icon文件，可在html头部添加下面部分。浏览器会向服务器请求favicon.icon</div><div><br></div><div>```javascript</div><div>&lt;link rel=\"shortcut icon\" href=\"img/favicon.icon\" /&gt;</div><div>```</div><div><br></div><div>&gt; 参考链接：</div><div>&gt; https://github.com/LiangJunrong/document-library/blob/master/other-library/Node/Node-base.md#chapter-three-ten</div><div>&gt; https://blog.csdn.net/guzhao593/article/details/93972193（网站 favicon.icon图标的设置）</div>','2020-07-11 08:27:29',0,5,1,12,'ajax'),(244,'Webpack4 配置copy-webpack-plugin^6.0.3的ignore','<div>最新版的CopyWebpackPlugin ，已经改变了ignore的配置方式。</div><div>我的版本 copy-webpack-plugin: ^6.0.3</div><div>```</div><div>const CopyWebpackPlugin = require(\'copy-webpack-plugin\');</div><div><br></div><div>plugins: [</div><div>  &nbsp; new CopyWebpackPlugin({</div><div>&nbsp; &nbsp; &nbsp; &nbsp; patterns: [{</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; from: path.join(__dirname,\'../static\'),</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; to: \'static\',</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; globOptions: {</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ignore: [</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; \'**/.*\'</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ]</div><div>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }</div><div>&nbsp; &nbsp; &nbsp; &nbsp; }]</div><div>&nbsp; &nbsp; })</div><div>]</div><div>```</div><div>注意 :&nbsp; ** 两个星号的意思是在当前路径 (我这里匹配的是static/.gitkeep)</div><div>&gt; 参考资料：</div><div>&gt; https://stackoverflow.com/questions/56670264/copywebpackplugin-ignore-a-folder</div><div>&gt; https://www.npmjs.com/package/copy-webpack-plugin#globoptions</div><div><br></div>','2020-07-15 00:41:53',0,0,1,13,'');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_images`
--

DROP TABLE IF EXISTS `blog_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blog_images` (
  `image_id` int(11) NOT NULL AUTO_INCREMENT,
  `image_path` varchar(225) DEFAULT NULL,
  `article_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=280 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_images`
--

LOCK TABLES `blog_images` WRITE;
/*!40000 ALTER TABLE `blog_images` DISABLE KEYS */;
INSERT INTO `blog_images` VALUES (257,'upload/CgXiLoTYDeJJ_BB2NpubBzPu.png',229),(258,'upload/j7aG2ghKtzMvJlbk8gcqhJAU.png',229),(259,'upload/boKmSowZvPGEB-mrc023krbl.png',229),(260,'upload/yt99gNu7GiZ2EBN1AQ_rCqXv.png',229),(261,'upload/MU42-FpLCBiGE-LAZ-jxNJXL.png',229),(262,'upload/yg_68YrNG67zaONrRHBOQuUc.png',228),(263,'upload/HiakhIu-OMWsE2Uwy1Mcsk9i.png',228),(264,'upload/BvfOqfjuqftWP_SSvjE2UTjb.png',228),(265,'upload/ZsKJsDbLTq7gxEA8mrCt3hyf.png',226),(266,'upload/ldDq3ckvWYljlatB9p1vxN0M.png',223),(267,'upload/nofmUXLoF-SY-Uq9jJ6jEgEX.png',223),(268,'upload/mOiRqzw_opzWzQbGgW3G0Hew.png',223),(269,'upload/RSMCKJTCthnYDdhyDGjaVRx-.png',223),(270,'upload/oBksxEiJJYs60aTWtk3adHlH.png',222),(271,'upload/I_QvzC8PXJqPRjYEOHZlQCgu.png',222),(272,'upload/uP18Zjt9rdcLFnzh_kxFxlt0.png',222),(273,'upload/9v2G9kZRKzXv_M6ybMjKSw3z.png',222),(274,'upload/lz4HkfppMWun7bLxeDP5VZKS.png',222),(275,'upload/gl5kbaAvh9ebGc-wc__xfE_b.png',222),(278,'upload/PtwBqRcI1VvzFgOLVoYkSz0K.png',-1),(279,'upload/8el7AwTDhh-URHxwOzcjJHHA.png',-1);
/*!40000 ALTER TABLE `blog_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `categories_id` int(11) NOT NULL AUTO_INCREMENT,
  `categories_name` varchar(20) NOT NULL,
  PRIMARY KEY (`categories_id`,`categories_name`),
  UNIQUE KEY `AK_categories_name` (`categories_name`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (15,'css'),(12,'node'),(14,'python'),(13,'webpack'),(11,'前端');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `article_id` int(11) DEFAULT NULL,
  `visitor_id` int(11) DEFAULT NULL,
  `comment_content` varchar(225) DEFAULT NULL,
  `comment_time` datetime DEFAULT NULL,
  `reply_id` int(11) DEFAULT NULL,
  `reply_comment_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (109,233,99,'look look','2020-07-11 10:37:47',1,0),(110,233,1,'hi','2020-07-11 11:18:17',99,109),(111,233,100,'xixi','2020-07-11 11:22:18',1,110),(112,233,101,'你好','2020-07-11 13:12:45',99,109),(113,233,102,'zai','2020-07-11 13:14:51',1,0),(114,226,103,'你好','2020-07-11 17:32:49',1,0),(115,233,104,'123','2020-07-11 17:54:42',102,113);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments_records`
--

DROP TABLE IF EXISTS `comments_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments_records` (
  `comments_record_id` int(11) NOT NULL AUTO_INCREMENT,
  `comments_date` date DEFAULT NULL,
  `comments_day_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`comments_record_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments_records`
--

LOCK TABLES `comments_records` WRITE;
/*!40000 ALTER TABLE `comments_records` DISABLE KEYS */;
INSERT INTO `comments_records` VALUES (9,'2020-06-11',2),(10,'2020-06-12',30),(11,'2020-06-13',4),(12,'2020-06-14',1),(13,'2020-06-15',4),(14,'2020-06-16',7),(15,'2020-06-17',8),(16,'2020-06-18',9),(18,'2020-06-19',50);
/*!40000 ALTER TABLE `comments_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session_user_state`
--

DROP TABLE IF EXISTS `session_user_state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `session_user_state` (
  `session_id` int(11) NOT NULL AUTO_INCREMENT,
  `session_cookie_id` int(11) DEFAULT NULL,
  `session_created` datetime DEFAULT NULL,
  `session_expired` datetime DEFAULT NULL,
  `session_role` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session_user_state`
--

LOCK TABLES `session_user_state` WRITE;
/*!40000 ALTER TABLE `session_user_state` DISABLE KEYS */;
/*!40000 ALTER TABLE `session_user_state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stat_data`
--

DROP TABLE IF EXISTS `stat_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stat_data` (
  `stat_id` int(11) NOT NULL AUTO_INCREMENT,
  `stat_name` varchar(20) DEFAULT NULL,
  `stat_value` int(11) DEFAULT NULL,
  `stat_description` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`stat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stat_data`
--

LOCK TABLES `stat_data` WRITE;
/*!40000 ALTER TABLE `stat_data` DISABLE KEYS */;
INSERT INTO `stat_data` VALUES (1,'article_sum',2,'文章总数'),(2,'comment_sum',0,'评论数'),(3,'visit_sum',4,'访问量'),(4,'categories_sum',5,'专栏数'),(5,'tag_sum',6,'标签数'),(7,'private_article_sum',2,'私密'),(8,'draft_sum',0,'草稿箱');
/*!40000 ALTER TABLE `stat_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statistics_data`
--

DROP TABLE IF EXISTS `statistics_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `statistics_data` (
  `article_sum` int(11) DEFAULT NULL,
  `comment_sum` int(11) DEFAULT NULL,
  `visit_sum` int(11) DEFAULT NULL,
  `categories_sum` int(11) DEFAULT NULL,
  `tag_sum` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statistics_data`
--

LOCK TABLES `statistics_data` WRITE;
/*!40000 ALTER TABLE `statistics_data` DISABLE KEYS */;
INSERT INTO `statistics_data` VALUES (0,0,0,0,0);
/*!40000 ALTER TABLE `statistics_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag` (
  `tag_id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(20) NOT NULL,
  `tag_articles` int(11) DEFAULT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_map`
--

DROP TABLE IF EXISTS `tag_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag_map` (
  `article_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  PRIMARY KEY (`article_id`,`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_map`
--

LOCK TABLES `tag_map` WRITE;
/*!40000 ALTER TABLE `tag_map` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_info`
--

DROP TABLE IF EXISTS `token_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `token_info` (
  `token` varchar(225) NOT NULL,
  `expire_in` datetime DEFAULT NULL,
  PRIMARY KEY (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_info`
--

LOCK TABLES `token_info` WRITE;
/*!40000 ALTER TABLE `token_info` DISABLE KEYS */;
INSERT INTO `token_info` VALUES ('1','2020-06-17 00:00:00'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImlhdCI6MTU5MjM3MTExNiwiZXhwIjoxNTkyMzc0NzE2fQ.bkvKA73V0y55VjhzrrXIcsy-rLxX0vZjGmjgcF5uBkw','2020-06-17 14:18:36'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImlhdCI6MTU5MjM4NDYyOCwiZXhwIjoxNTkyMzg4MjI4fQ.c_lk37P7HqsB1M2v6TmlwKr9XowzxSJKnrlManJDMm0','2020-06-17 18:03:48'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImlhdCI6MTU5MjM4Nzc2NiwiZXhwIjoxNTkyMzkxMzY2fQ.aP8yCeZ0XfPMRWOK0JKiY87Cgl8hazb5MhSBwXCxCX8','2020-06-17 18:56:07'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImlhdCI6MTU5MjM4Nzc2OSwiZXhwIjoxNTkyMzkxMzY5fQ.W0SbKoP1fRDeudpYngRoqfzRmhF5IZQCCuAg5U0-aZw','2020-06-17 18:56:10'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsImlhdCI6MTU5MjM4Nzg1MywiZXhwIjoxNTkyMzkxNDUzfQ.FMrMP97VEzVAiec1wqAhFEw104rr8QKH7ylM6MXBtDQ','2020-06-17 18:57:34');
/*!40000 ALTER TABLE `token_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_info`
--

DROP TABLE IF EXISTS `user_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_info` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(20) DEFAULT NULL,
  `user_password` varchar(225) DEFAULT NULL,
  `user_img` varchar(225) DEFAULT NULL,
  `user_sign` varchar(225) DEFAULT NULL,
  `user_description` varchar(225) DEFAULT NULL,
  `user_email` varchar(225) DEFAULT NULL,
  `blog_name` varchar(20) DEFAULT NULL,
  `sign` varbinary(225) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_info`
--

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;
INSERT INTO `user_info` VALUES (1,'jennifer','7ac7893de2fdf1d004626fa3562406696c07747e','../img/user.jpg','Pratice more','say something','249542247@qq.com','陈卓林 | 个人博客','czl_blog');
/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitor`
--

DROP TABLE IF EXISTS `visitor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visitor` (
  `visitor_id` int(11) NOT NULL AUTO_INCREMENT,
  `visitor_name` varchar(20) DEFAULT NULL,
  `visitor_email` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`visitor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitor`
--

LOCK TABLES `visitor` WRITE;
/*!40000 ALTER TABLE `visitor` DISABLE KEYS */;
INSERT INTO `visitor` VALUES (1,'作者','249542247@qq.com'),(2,'四平','24w3839@163.com'),(3,'aa','2w83839@163.com'),(4,'bds','249383839@163.com'),(5,'cc','24ss3839@163.com'),(6,'bb','249d839@163.com'),(7,'1','1'),(8,'1','1'),(9,'1','1'),(10,'1','1'),(11,'1','1'),(12,'1','1'),(13,'1','1'),(14,'四平','24'),(15,'小明','23'),(16,'11','1'),(17,'4','4'),(18,'4','4'),(19,'6','6'),(20,'6','6'),(21,'8','8'),(22,'8','8'),(23,'9','9'),(24,'9','9'),(25,'1','1'),(26,'5','5'),(27,'1','1'),(28,'1','1'),(29,'1','1'),(30,'1','1'),(31,'1','1'),(32,'1','1'),(33,'1','1'),(34,'2','2'),(35,'3','3'),(36,'3','4'),(37,'5','5'),(38,'1','1'),(39,'2','2'),(40,'3','3'),(41,'1','1'),(42,'2','2'),(43,'3','3'),(44,'5','5'),(45,'1','1'),(46,'1','1'),(47,'2','2'),(48,'3','3'),(49,'7','7'),(50,'7','7'),(51,'8','9'),(52,'11','11'),(53,'12','12'),(54,'1','1'),(55,'2','249542247@qq.com'),(56,'2','249542247@qq.com'),(57,'1','249542247@qq.com'),(58,'1','249542247@qq.com'),(59,'3','249542247@qq.com'),(60,'czl','jennifer123249@163.com'),(61,'哈哈','jennif333er249@163.com'),(62,'8','123@qq.com'),(63,'1','123@qq.com'),(64,'3','123@qq.com'),(65,'123','249542247@qq.com'),(66,'555','jennifer249@163.com'),(67,'3','249542247@qq.com'),(68,'1','24@qq.com'),(69,'1','24@qq.com'),(70,'1','24@qq.com'),(71,'1','24@qq.com'),(72,'1','249542247@qq.com'),(73,'1','249542247@qq.com'),(74,'1','249542247@qq.com'),(75,'1','249542247@qq.com'),(76,'1','249542247@qq.com'),(77,'jen','jennifer249@163.com'),(78,'hella','249542247@qq.com'),(79,'1','24@qq.com'),(80,'1','24@qq.com'),(81,'1','24@qq.com'),(82,'1','24@qq.com'),(83,'1','24@qq.com'),(84,'jen','jennifer249@163.com'),(85,'1','249542247@qq.com'),(86,'1','249542247@qq.com'),(87,'123','249542247@qq.com'),(88,'2','249542247@qq.com'),(89,'123','249542247@qq.com'),(90,'123','249542247@qq.com'),(91,'123','249542247@qq.com'),(92,'3','249542247@qq.com'),(93,'5','249542247@qq.com'),(94,'1','249542247@qq.com'),(95,'1','249542247@qq.com'),(96,'1','249542247@qq.cpm'),(97,'1','249542247@qq.com'),(98,'12','249542247@qq.com'),(99,'haha','249542247@qq.com'),(100,'123','249542247@qq.com'),(101,'yi','249542247@qq.com'),(102,'在在','249542247@qq.com'),(103,'hi','249542247@qq.com'),(104,'1','249542247@qq.com');
/*!40000 ALTER TABLE `visitor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visits_records`
--

DROP TABLE IF EXISTS `visits_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visits_records` (
  `visits_record_id` int(11) NOT NULL AUTO_INCREMENT,
  `visits_date` date DEFAULT NULL,
  `visits_day_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`visits_record_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visits_records`
--

LOCK TABLES `visits_records` WRITE;
/*!40000 ALTER TABLE `visits_records` DISABLE KEYS */;
INSERT INTO `visits_records` VALUES (17,'2020-06-11',1),(18,'2020-06-12',20),(19,'2020-06-13',1),(20,'2020-06-14',0),(21,'2020-06-15',40),(22,'2020-06-16',70),(23,'2020-06-17',80),(24,'2020-06-18',80),(26,'2020-06-19',80);
/*!40000 ALTER TABLE `visits_records` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-15 15:00:20
