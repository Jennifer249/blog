const express = require('express');
const router = express.Router();
const db = require('../db/db');
const sqlMap = require('../db/sql_map');

//删除这条评论
router.delete('/api/admin/comment_mgt/del', (req, res) => {
    let id = parseInt(req.query.id);
    let aid = parseInt(req.query.aid);
	db.query(sqlMap.comment.del, [id], function(err, rows) {
		if (rows === undefined) {
			res.json({
				state: 0,
				message: "删除失败！"
			});
		} else {
			db.query(sqlMap.article.updateArticleComments, [-1, aid], function(err, rows) {
				if (rows === undefined) {
					res.json({
						state: 0,
						message: "删除失败！"
					});
				} else {
					res.json({
				        state: 1
					});
				}
			});
		}
	})
});

module.exports = router;