const express = require('express');
const router = express.Router();
const db = require('../db/db');
const sqlMap = require('../db/sql_map');

//更新目录名称
router.patch('/api/admin/categories/update', (req, res, next) => {
	let params = req.body;
	db.query(sqlMap.categories.rename, [params.name, params.id], function(err, rows) {
		if (rows === undefined) {
			res.json({
				state: 0,
				message: "修改失败！"
			});
		} else {
			res.json({
		        state: 1
			});
		}
	})
});

//删除目录,将对应文章的归属目录置为空
router.delete('/api/admin/categories/del', (req, res, next) => {
	db.query(sqlMap.categories.del, [req.query.id], function(err, rows) {
		
		if (rows === undefined) {
			res.json({
				state: 0,
				message: "删除失败！"
			});
		} else {
			db.query(sqlMap.categories.clearArticleCategories, [req.query.id]);
			res.json({
		        state: 1
			});
		}
	})
});

//增加目录
router.post('/api/admin/categories/add', (req, res, next) => {
	db.query(sqlMap.categories.add, [req.body.name], function(err, rows) {
		
		if (rows === undefined) {
			res.json({
				state: 0,
				message: "新增失败！"
			});
		} else {
			res.json({
		        state: 1,
				data: {
					categoriesId: rows.insertId
				}
			});
		}
	})
});

module.exports = router;