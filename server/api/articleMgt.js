const express = require('express');
const router = express.Router();
const db = require('../db/db');
const sqlMap = require('../db/sql_map');
const fs = require('fs');

//获取文章总数、私密文章数、草稿数
router.get('/api/admin/article_mgt/stat_article', (req, res, next) => {
	db.query(sqlMap.stat.getStatArticle, []).then(rows => {
		res.json({
			state: 1,
			data: rows
		})
	}).catch(err => {
		console.log(err);
	});
});

//获取最久的年份
router.get('/api/admin/article_mgt/oldest_year', (req, res, next) => {
	db.query(sqlMap.article.getOldestYear, []).then(rows => {
		res.json({
			state: 1,
			data: rows
		})
	}).catch(err => {
		console.log(err);
	})
});

//获取搜索结果
router.get('/api/admin/article_mgt/search_result', (req, res, next) => {
	let year = req.query.year ? req.query.year+'-' : '(.*)';
	let month = req.query.month > 0 && req.query.month < 10 ? '0'+ req.query.month: req.query.month;
	let date = year + month;
	let categories = req.query.categories ? req.query.categories : '(.*)';
	let key = req.query.key ? req.query.key: '(.*)';

	db.query(sqlMap.article.getSearchResult, [date, categories, key]).then(rows => {
		res.json({
			state: 1,
			data: rows
		})
	}).catch(err => {
		console.log(err);
	});
});

//修改文章状态
router.patch('/api/admin/article_mgt/update_article_state', (req, res, next) => {
	let params = req.body;

	db.query(sqlMap.article.updateArticleState, [params.state, params.id]).then(rows => {
		res.json({
			state: 1
		})
	}).catch(err => {
		console.log(err);
	});
});

//删除文章
router.delete('/api/admin/article_mgt/del', (req, res, next) => {
	let id = req.query.id - 0;
	db.query(sqlMap.article.deleteArticle, [id]).then(rows => {
		//删除文章的图片,包括本地和数据库的
		db.query(sqlMap.blogImages.getImages, [id]).then(rows2 => {
			if (rows2.length) {
				rows2.forEach((item, index, array) => {
					fs.unlinkSync(item.image_path);
				})
				
				db.query(sqlMap.blogImages.del, [id]).catch(err => {
					console.log(err);
				});
			}
		}).catch(err => {
			console.log(err);
		});
		
		//删除文章的评论
		db.query(sqlMap.comment.delByArticleId, [id]).catch(err => {
			console.log(err);
		});
		
		res.json({
	        state: 1
		});
	}).catch(err => {
		console.log(err);
	});
});

module.exports = router;