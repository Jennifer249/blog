const express = require('express');
const router = express.Router();
const db = require('../db/db');
const sqlMap = require('../db/sql_map');
const mail = require('./email');

//获取目录
router.get('/api/share/categories', (req, res, next) => {
	
	db.query(sqlMap.categories.getCategories).then(rows => {
		res.json({
			state: 1,
			data: rows
		})
	}).catch(err => {
		console.log(err);
	})
});

//获取总的文章数或当前页的文章数
router.get('/api/share/page_aritcle', (req, res, next) => {
	let params = req.query;
	let currPage = params.currPage ? parseInt(params.currPage) : 1;
	//查询的字段
	let field = params.field ? params.field : '';
	//关键字查询
	let key = params.key ? params.key : '';
	let perPageArticle = parseInt(params.perPageArticle);
	let state = parseInt(params.state) ? params.state : '(.*)';
	let categoriesId = params.categoriesId ? parseInt(params.categoriesId) : 0;
	//返回的内容字数
	let reduce = params.reduce ? params.reduce : 0;
	let sql = sqlMap.article.getArticleList;
	
	let value = [];
	//分别按目录、关键字搜索
	if (categoriesId) {
		let index = sql.indexOf('WHERE') + 6;
		sql = sql.slice(0, index) + ' categories_Id = ? AND ' + sql.slice(index);
		value.push(parseInt(categoriesId));
	} else if (key) {
		let index = sql.indexOf('WHERE') + 6;
		sql = sql.slice(0, index) + ' article_title regexp ? AND ' + sql.slice(index);
		value.push(key);
	}

	//获取全部state类型的文章
	if (!perPageArticle) {
		sql = sql.slice(0, sql.indexOf('LIMIT'));
		value.push(state);
	} else {
		//获取对应分页的文章
		let limitRange = [ (currPage-1) * perPageArticle, perPageArticle ];
		value.push(state, ...limitRange);
	}
	// 返回特定字段
	if (field) {
		sql = 'SELECT ' + params.field + sql.slice(8);
	}

	//缩减内容
	if (reduce) {
		sql = 'SELECT LEFT(article_content, ' + reduce + ') AS article_content,' + sql.slice(6);
	} 

	db.query(sql, value).then(rows => {
		res.json({
	        state: 1,
			data: rows
		});
	}).catch(err => {
		console.log(err);
	})
});

//获取文章
router.get('/api/share/get_article', (req, res, next) => {
	db.query(sqlMap.article.getArticle, [req.query.id]).then(rows => {
		res.json({
	        state: 1,
			data: rows
		});
	}).catch(err => {
		console.log(err);
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
	db.query(sql, [id]).then(rows => {
		console.log(rows);
		res.json({
	        state: 1,
			data: rows
		});
	}).catch(err => {
		console.log(err);
	})
});

//保存留言
router.post('/api/share/save_reply', (req, res, next) => {
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
	console.log(params.visitorId);
	db.query(sqlMap.comment.add, [params.articleId, params.visitorId, params.comment, params.date, params.replyId, params.replyCommentId]).then(rows => {
		//发送邮箱
		mail.send(params.emailTo, subject, sendHtml).then(() => {
			res.json({
				state: 1
			});
		}).catch(err => {
			console.log(err);
	        res.status(504).json({
	        	state: 0,
	        	message: "邮件发送失败"
	        });
		});
	}).catch(err => {
		console.log(err);
	})
});

module.exports = router;