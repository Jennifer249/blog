const express = require('express');
const router = express.Router();
const db = require('../db/db');
const sqlMap = require('../db/sql_map');

// 更新目录名称
router.patch('/api/admin/categories/update', (req, res, next) => {
	let params = req.body;
	db.query(sqlMap.categories.rename, [params.name, params.id]).then(rows => {
		res.json({
	        state: 1
		});
	}).catch(err => {
		console.log(err);
	})
});

// 删除目录,将对应文章的归属目录置为空
router.delete('/api/admin/categories/del', (req, res, next) => {
	db.query(sqlMap.categories.del, [req.query.id]).then(rows => {
		db.query(sqlMap.categories.clearArticleCategories, [req.query.id]);
		res.json({
	        state: 1
		});
	}).catch(err => {
		console.log(err);
	})
});

// 增加目录
router.post('/api/admin/categories/add', (req, res, next) => {
	db.query(sqlMap.categories.add, [req.body.name]).then(rows => {
		res.json({
	        state: 1,
			data: rows.insertId
		});
	}).catch(err => {
		console.log(err);
	})
});

module.exports = router;