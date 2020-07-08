const express = require('express');
const router = express.Router();
const db = require('../db/db');
const sqlMap = require('../db/sql_map');
const mail = require('./email');

//前台：获取文章总数
router.get('/api/front/get_article_sum', (req, res, next) => {
	let id = parseInt(req.query.id);
	let key = req.query.key ? req.query.key : '';
	let value = [];
    let sql = sqlMap.stat.getArticleSum;

	if(id) {
    	sql = sql + " WHERE categories_id = ?";
    	value = [id];
    } else if(key) {
		sql = sql + " WHERE article_title regexp ? "
		value = [key];
	}

	db.query(sql, value, (err, rows) => {
		if(rows === undefined) {
			res.json({
				state: 0,
				message: '操作失败！'
			})
		} else {
			res.json({
				state: 1,
				data: {
					articleSum: rows
				}
			})
		}
	})
})

//前台：获取上一篇
router.get('/api/front/get_pre_id', (req, res, next) => {
	let id = req.query.id - 0;
	db.query(sqlMap.article.getPreId, [id], (err, rows) => {
		if(rows == undefined) {
			res.json({
				state: 0,
				message: '操作失败！'
			})
		} else if(rows.length === 0) {
			res.json({
				state: 1,
				message: '文章到头了'
			})
		} else {
			res.json({
				state: 2,
				data: {
					id: rows
				}
			})
		}
	})
})

//前台：获取下一篇
router.get('/api/front/get_next_id', (req, res, next) => {
	let id = req.query.id - 0;
	db.query(sqlMap.article.getNextId, [id], (err, rows) => {
		if(rows == undefined) {
			res.json({
				state: 0,
				message: '操作失败！'
			})
		} else if(rows.length === 0) {
			res.json({
				state: 1,
				message: '文章到头了'
			})
		} else {
			res.json({
				state: 2,
				message: '操作成功！',
				data: {
					id: rows
				}
			})
		}
	})
})

//前台:提交留言板，这一块包括发送邮箱
router.post('/api/front/submit_message_board', (req, res, next) => {

	let params = req.body;
	params.emailTo = params.emailTo ? params.emailTo : '249542247@qq.com';
	
	let subject = `新的留言-来自文章:${params.articleTitle}-陈卓林|技术博客`;
	//设置邮箱发送内容
	var sendHtml = `<div>
	<div>尊敬的${params.replyName}, 您好!</div>
	<div>用户名：${params.name} 给您留言了。</div>
	<div>来自文章：${params.articleTitle}-陈卓林|技术博客</div>
	`
	if(params.replyComment) {
		sendHtml += `<div>您的评论内容：${params.replyComment}</div>`
	}
	sendHtml += `
	<div>该用户留言内容：${params.comment}</div>
	<div>留言时间：${params.date}</div>
	<div><a href="${params.url}">查看和回复，点这里</a></div>
	</div>
	`;

	//存储新的游客和留言
	db.query(sqlMap.visitor.add, [params.name, params.emailFrom], (err, rows) => {
		if(rows === undefined) {
			res.json({
				state: 0,
				message: '操作失败！'
			})
		} else {
			//更新对应文章的评论数
			db.query(sqlMap.article.updateArticleComments, [1, params.aid], (err, rows1) => {
				if(rows1 == undefined) {
					res.json({
						state: 0,
						message: '操作失败！'
					})
				} else {
					db.query(sqlMap.comment.add, [params.aid, rows.insertId, params.comment, params.date, params.replyId, params.replyCommentId], (err, rows2) => {
						if(rows === undefined) {
							res.json({
								state: 0,
								message: '操作失败！'
							})
						} else {
							//发送邮箱
							mail.send(params.emailTo, subject, sendHtml, res);
							res.json({
								state: 1
							});
						}
					})
				}
			});
		}
	});
});

module.exports = router;