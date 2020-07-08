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
	pool.getConnection((err, connection) => {
		if(err) throw err;
		connection.query(sql, values, (err, results, fields) => {
			if(err) throw err;
			callback(err, JSON.parse(JSON.stringify(results))); 
			connection.release();
		})
	})
}

exports.query = query;