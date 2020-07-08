const express = require('express');
const router = express.Router();
const db = require('../db/db');
const sqlMap = require('../db/sql_map');
const mail = require('./email');

//获取目录
router.get('/api/share/categories', (req, res, next) => {
	
	db.query(sqlMap.categories.getCategories, [], function(err, rows) {
		if (rows === undefined) { 
			res.json({
				state: 0,
				message: '初始化数据失败'
			})
		} else {
			res.json({
				state: 1,
				message: '返回统计数据',
				data: {
					categories: rows
				}
			})
		}
	})
});

//获取总的文章数或当前页的文章数
router.get('/api/share/page_aritcle', (req, res) => {
	let params = req.query;
	let index = parseInt(params.index);
	let currPage = params.currPage ? parseInt(params.currPage) : 1;
	//查询的字段
	let field = params.field ? params.field : '';
	//关键字查询
	let key = params.key ? params.key : '';
	let perPageArticle = parseInt(params.perPageArticle);
	let state = index ? index + 1 : '(.*)';
	let categoriesId = params.categoriesId ? parseInt(params.categoriesId) : 0;
	let sql = sqlMap.article.getStateArticle;
	
	let value = [];
	if (categoriesId) {
		let index = sql.indexOf('WHERE') + 6;
		sql = sql.slice(0, index) + ' categories_Id = ? AND ' + sql.slice(index);
		value.push(parseInt(categoriesId));
	} else if (key) {
		let index = sql.indexOf('WHERE') + 6;
		sql = sql.slice(0, index) + ' article_title regexp ? AND ' + sql.slice(index);
		value.push(key);
	}

	if (!perPageArticle) {
		sql = sql.slice(0, sql.indexOf('LIMIT'));
		value.push(state);
	} else {
		let limitRange = [ (currPage-1) * perPageArticle, perPageArticle ];
		value.push(state, ...limitRange);
	}

	if (field) {
		sql = 'select ' + params.field + sql.slice(8);
	}	

	db.query(sql, value, function(err, rows) {
		if (rows === undefined) {
			res.json({
				state: 0,
				message: "操作失败"
			});
		} else if (rows.length === 0) {
			res.json({
				state: 1,
				message: '还没有写文章哦'
			})
		} else {
			res.json({
		        state: 2,
				data: {
					articleList: rows
				}
			});
		}
	})
});

//获取文章
router.get('/api/share/get_article', (req, res) => {
	db.query(sqlMap.article.getArticle, [req.query.id], function(err, rows) {
		if (rows === undefined) {
			res.json({
				state: 0,
				message: "查询失败"
			});
		} else {
			res.json({
		        state: 1,
				message: "查询成功！",
				data: {
					article: rows
				}
			});
		}
	})
});

//获取评论列表
router.get('/api/share/comment_list', (req, res) => {
	let params = req.query;
	let id = params.id ? params.id : '(.*)';
	let order = params.order ? params.order : '';
	let sql = sqlMap.comment.getCommentList;

	if (/^desc$|^asc$/i.test(order)) {
		sql = sql.slice(0, sql.lastIndexOf(' ') + 1) + order;
	}
	db.query(sql, [id], function(err, rows) {
		if (rows === undefined) {
			res.json({
				state: 0,
				message: "操作失败"
			});
		} else if (rows.length == 0) {
			res.json({
				state: 1,
				message: '还没有评论'
			})
		} else {
			res.json({
		        state: 2,
				message: "返回成功！",
				data: {
					commentList: rows
				}
			});
		} 
	})
});

//保存留言
router.post('/api/share/save_reply', (req, res) => {
	let params = req.body;

	let subject = `新的留言-来自文章:${params.articleTitle}-陈卓林|技术博客`;
	let sendHtml = `<div>
	<div>尊敬的${params.replyName}, 您好!</div>
	<div>作者给您回复了。</div>
	<div>来自文章：${params.articleTitle}-陈卓林|技术博客</div>
	<div>您的评论内容：${params.replyComment}</div>
	<div>作者的回复：${params.comment}</div>
	<div>回复时间：${params.date}</div>
	<div><a href="${params.url}">查看和回复，点这里</a></div>
	</div>
	`;


	db.query(sqlMap.comment.add, [params.articleId, params.visitorId, params.comment, params.date, params.replyId, params.replyCommentId], function(err, rows) {
		if (rows === undefined) {
			res.json({
				state: 0,
				message: "存储失败！"
			});
		} else {
			//发送邮箱
			mail.send(params.emailTo, subject, sendHtml, res);
			res.json({
				state: 1
			});
		}
	})
});

module.exports = router;