// 连接 MySQL：先安装 npm i mysql -D
const mysql = require('mysql');

let pool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: 'root',
	password: '19961209',
	database: 'blog'
})

function query(sql, values, callback) {
	console.log("[db pool]");
	pool.getConnection((err, connection) => {
		if(err) throw err;
		console.log("get pool connection");

		connection.query(sql, values, (err, results, fields) => {
			if(err) throw err;
			callback(err, JSON.parse(JSON.stringify(results))); //会自动抛出错误
			connection.release();
		})
	})
}

function init () {
	
	// query()
}

exports.query = query;