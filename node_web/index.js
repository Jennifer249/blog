// 连接 MySQL：先安装 npm i mysql -D
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '19961209',
	database: 'blog'
});

connection.connect();

//引入相关模块
let http = require("http");
let fs = require("fs");
let url = require("url");
let path = require("path");
let qs = require("querystring");

http.createServer((req, res) => {

	switch (req.method) {
		case 'POST':
			postMehod(req, res);
			break;
		case 'GET':
		default:
			getMethod(req, res);
			break;
	}

}).listen(8888);

//取得后缀对应的响应头部的文件类型
getExt = (extName) => {
	let data = fs.readFileSync("./ext.json");
	let ext = JSON.parse(data.toString()); //转换为js对象
	return ext[extName];
}

//post请求处理
function postMethod(req, res) {
	console.log('\n[POST请求]');
	let pathName = req.url;
	console.log("post请求的接口:");
	console.log(pathName);

	//数据接收中
	req.on('data', function(chunk) {
		tempResult += chunk;
	});

	//数据接收完成
	req.on('end', function() {
		//将post的请求体解析为查询字符串的值键对集合，最后转换为JSON字符串
		var result = JSON.stringify(qs.parse(tempResult));
		console.log("result数据:");
		console.log(result);

		if (pathName == '/login') {
			console.log("\n[/login]");
			result = JSON.parse(result); //转换为Javascript对象

			let selectSql = "SELECT * FROM user_info where user_name = " + result.username + " and " + result.userpassword;
			connection.query(selectSql, function(err, data) {
				if (err) {
					console.log(err);
				}
				else if (data == undefined || data.length == 0) {
					res.write(JSON.stringify({
						code: 0,
						message: "登陆失败，用户名或密码错误！"
					}));
					res.end();
				}
				else {  //登陆成功
					res.write(JSON.stringify({
						code: '1',
						message: "登陆成功！",
						data: {
							id:''
						}
					}))
				}
			})
		}
	})
}

//get请求处理
function getMethod(req, res) {
	console.log('\n[GET请求]');
	let pathName = url.parse(req.url).pathname; //转换为url对象
	let basePath = "../fore_end";
	//默认加载路径
	if (pathName == '/') {
		pathName = "/index.html";
	}

	//获取文件后缀名
	let extName = path.extname(pathName);

	//例如../fore_end/css/style.css
	fs.readFile(path.join(basePath, pathName), (err, data) => {
		//出错则返回404页面
		if (err) { 
			console.log("404 Not Found! " + path.join(basePath,pathName));
			fs.readFile(path.join(basePath,"404.html"), (errorNotFound, dataNotFound) => {
				if (errorNotFound) {
					console.log(errorNotFound);
				} 
				else {
					res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
					res.write(dataNotFound); //返回404页面
					res.end();
				}
			})
			return;
		}

		// 获取对应后缀的文件类型
		let ext = getExt(extName);
		// 设置请求头
		res.writeHead(200, {"Content-Type": ext + "; charset=utf-8"});
		res.end(data);//返回请求文件
	})
}
