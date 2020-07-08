const express = require('express');
const router = express.Router();
const db = require('../db/db');
const sqlMap = require('../db/sql_map');

//获取子目录列表
router.get('/api/admin/sub_categories/list', (req, res) => {
    let id = parseInt(req.query.id);
	db.query(sqlMap.subCategories.list, [id], function(err, rows) {
		console.log(rows);
		if (rows === undefined) {
			res.json({
				state: 0,
				message: "查询失败！"
			});
		} else if (rows.length == 0) {
			res.json({
				state: 1,
				message: '该专栏没有文章!'
			})
		} else {
			res.json({
		        state: 2,
				data: {
					subCategoriesList: rows
				}
			});
		} 
	})
});

//修改文章目录
router.post('/api/admin/sub_categories/move', (req, res) => {
    let categoriesId = parseInt(req.body.categoriesId);
    let articleList = req.body.articleList;
    
	db.query(sqlMap.subCategories.move, [categoriesId, articleList], function(err, rows) {
		if (rows === undefined) {
			res.json({
				state: 0,
				message: "操作失败！"
			});
		} else {
			res.json({
		        state: 1,
				message: "操作成功！"
			});
		} 
	})
});

//批量删除文章
router.delete('/api/admin/sub_categories/del', (req, res) => {
	db.query(sqlMap.subCategories.delete, [req.query.articleList], function(err, rows) {
		console.log(rows);
		if (rows === undefined) {
			res.json({
				state: 0,
				message: "操作失败！"
			});
		} else {
			res.json({
		        state: 1,
				message: "操作成功！"
			});
		} 
	})
});

module.exports = router;