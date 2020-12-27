const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const tokenInfo = require('../token/token');
const sha1 = require('sha1');
const db = require('../db/db');
const sqlMap = require('../db/sql_map');

// 创建token
const createToken = (id) => {
	return jwt.sign(
		{id}, 
		tokenInfo.secret, 
		{ expiresIn: tokenInfo.expiresIn });
};

// 登陆验证
router.post('/api/login', (req, res, next) => {
	let username = req.body.username;
	let password = sha1(req.body.password + 'czl_blog');

	db.query(sqlMap.user.check, [username, password]).then(rows => {
		if (!rows.length) {
			res.json({
				state: 0,
				message: "登陆失败，用户名或密码错误！"
			});
		} else {
			// 返回token
			const token = createToken(rows[0].user_id);
			res.json({
		        state: 1,
				data: token
			});
		}
	}).catch(err => {
		console.log(err);
	})
});

module.exports = router;