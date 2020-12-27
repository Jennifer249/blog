const express = require('express');
const router = express.Router();
const db = require('../db/db');
const sqlMap = require('../db/sql_map');

// 获取子目录列表
router.get('/api/admin/sub_categories/list', (req, res, next) => {
    let id = parseInt(req.query.id);
	db.query(sqlMap.subCategories.list, [id]).then(rows => {
		res.json({
	        state: 1,
			data: rows
		}); 
	})
});

// 修改文章目录
router.post('/api/admin/sub_categories/move', (req, res, next) => {
    let categoriesId = parseInt(req.body.categoriesId);
    let articleList = req.body.articleList;
    
	db.query(sqlMap.subCategories.move, [categoriesId, articleList]).then(rows => {
		res.json({
	        state: 1
		});
	})
});

// 批量删除文章
router.delete('/api/admin/sub_categories/del', (req, res, next) => {
	db.query(sqlMap.subCategories.delete, [req.query.articleList]).then(rows => {
		res.json({
	        state: 1
		});
	})
});

module.exports = router;