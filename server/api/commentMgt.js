const express = require('express');
const router = express.Router();
const db = require('../db/db');
const sqlMap = require('../db/sql_map');

//删除这条评论
router.delete('/api/admin/comment_mgt/del', (req, res) => {
    let id = parseInt(req.query.id);
    let aid = parseInt(req.query.aid);
	db.query(sqlMap.comment.del, [id]).then(rows => {
		db.query(sqlMap.article.updateArticleComments, [-1, aid]).then(rows => {
			res.json({
		        state: 1
			});
		}).catch(err => {
			console.log(err);
		})
	}).catch(err => {
		console.log(err);
	})
});

module.exports = router;