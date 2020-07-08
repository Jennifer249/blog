const express = require('express');
const router = express.Router();
const db = require('../db/db');
const sqlMap = require('../db/sql_map');

//获取文章总数、私密文章数、草稿数
router.get('/api/admin/article_mgt/stat_article', (req, res, next) => {
	db.query(sqlMap.stat.getStatArticle, [], function(err, rows) {
		if (rows === undefined || rows.length === 0) { 
			res.json({
				state: 0,
				message: '初始化数据失败'
			})
		} else {
			res.json({
				state: 1,
				data: {
					statArticle: rows
				}
			})
		}
	});
});

//获取最久的年份
router.get('/api/admin/article_mgt/oldest_year', (req, res, next) => {
	db.query(sqlMap.article.getOldestYear, [], function(err, rows) {
		if (rows === undefined) { 
			res.json({
				state: 0,
				message: '初始化数据失败'
			})
		} else if (rows.length === 0) {
			res.json({
				state: 1,
				message: '还没有写文章哦'
			})
		} else {
			res.json({
				state: 2,
				data: {
					oldestYear: rows
				}
			})
		}
	});
});

//获取搜索结果
router.get('/api/admin/article_mgt/search_result', (req, res, next) => {
	let year = req.query.year ? req.query.year+'-' : '(.*)';
	let month = req.query.month > 0 && req.query.month < 10 ? '0'+ req.query.month: req.query.month;
	let date = year + month;
	let categories = req.query.categories ? req.query.categories : '(.*)';
	let key = req.query.key ? req.query.key: '(.*)';

	db.query(sqlMap.article.getSearchResult, [date, categories, key], (err, rows) => {
		if (rows === undefined) {
			res.json({
				state: 0,
				message: '查找失败'
			})
		} else {
			res.json({
				state: 1,
				data: {
					articleList: rows
				}
			})
		}
	})
});

//修改文章状态
router.patch('/api/admin/article_mgt/update_article_state', (req, res) => {
	let params = req.body;

	db.query(sqlMap.article.updateArticleState, [params.state, params.id], function(err, rows) {
		if (rows === undefined) {
			res.json({
				state: 0,
				message: "操作失败"
			});
		} else {
			res.json({
		        state: 1,
				message: "修改成功！"
			});
		}
	})
});

router.delete('/api/admin/article_mgt/del', (req, res) => {
	let id = req.query.id - 0;
	db.query(sqlMap.article.deleteArticle, [id], function(err, rows) {
		if (rows === undefined) {
			res.json({
				state: 0,
				message: "操作失败"
			});
		} else {
			//删除文章的图片
			db.query(sqlMap.blogImages.del, [id],  function(err, rows) {
				if (rows === undefined) {
					res.json({
						state: 0,
						message: "操作失败"
					});
				}
			});
			//删除文章的评论
			db.query(sqlMap.comment.delByArticleId, [id], function(err, rows) {
				if (rows === undefined) {
					res.json({
						state: 0,
						message: "操作失败"
					});
				}
			});
			
			res.json({
		        state: 1
			});
		}
	})
});


module.exports = router;