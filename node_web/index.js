let http = require("http");

let fs = require("fs");

let url = require("url");

let path = require("path");

http.createServer((req, res) => {

	let pathName = url.parse(req.url).pathname; //转换为url对象

	//默认加载路径
	if(pathName == '/') {
		pathName = "/index.html";
	}

	//获取文件后缀名
	let extName = path.extname(pathName);

	// console.log("../fore_end" + pathName);  //例如../fore_end/css/style.css
	fs.readFile("../fore_end" + pathName, (err, data) => {
		console.log("../fore_end" + pathName);
		if(err) { //出错则返回404页面
			console.log("\n 404 Not Found!");
			console.log("../fore_end" + pathName);
			fs.readFile("../fore_end/404.html", (errorNotFound, dataNotFound) => {
				if(errorNotFound) {
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
		else {
			// 获取对应后缀的文件类型
			let ext = getExt(extName);

			// 设置请求头
			res.writeHead(200, {"Content-Type": ext + "; charset=utf-8"});

			res.write(data); //返回请求文件
			res.end();
		}
	})
}).listen(8888);

getExt = (extName) => {
	let data = fs.readFileSync("./ext.json");
	let ext = JSON.parse(data.toString()); //转换为js对象
	return ext[extName];
}