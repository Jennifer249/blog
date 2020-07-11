const express = require('express');
const router = express.Router();
const db = require('../db/db');
const sqlMap = require('../db/sql_map');
const multiparty = require('multiparty');
var path = require('path');

//上传图片
router.post('/api/admin/edit/upload', (req, res) => {
	//返回的地址
	let form = new multiparty.Form({ uploadDir: 'upload' });  
    form.parse(req, function(err, fields, files) {
		if(err) {
			console.log(err);
			res.json({
				state: 0,
				message: "文件上传失败"
			})
		} else {
			let filePath = files.file[0].path;
			db.query(sqlMap.blogImages.add, [filePath, -1], function(err, rows) {
				res.json({
			        state: 1,
					data: {
						imgSrc: filePath,
						imgId: rows.insertId
					}
				});
			});
		}
	})
});

//增加文章
router.post('/api/admin/edit/add', (req, res) => {
	let params = req.body;
    let imageId = params.imageId;
	let article = params.article;
    article.categoriesId = article.categoriesId ? article.categoriesId : 0;
    article.tags = article.tags ? article.tags.join() : "";

    //更新已有文章
    if(article.id) {
    	db.query(sqlMap.edit.update, [article.title, article.content, article.date, article.state, article.categoriesId, article.tags, article.id], function(err, rows) {
    		if (rows === undefined) {
				res.json({
					state: 0,
					message: "操作失败！"
				});
			} else {
				if(imageId.length) {
					db.query(sqlMap.blogImages.update, [article.id, imageId]);
				}
				res.json({
			        state: 2,
					message: "操作成功！"
				});
			}
    	})
    	return;
    }
    //发表新文章
	db.query(sqlMap.edit.add, [article.title, article.content, article.date, 0, 0, article.state, article.categoriesId, article.tags], function(err, rows) {
		if (rows === undefined) {
			res.json({
				state: 0,
				message: "操作失败！"
			});
		} else {
			if(imageId.length) {
				db.query(sqlMap.blogImages.update, [rows.insertId, imageId]);
			}
			res.json({
		        state: 1,
				message: "操作成功！",
				data: {
					id: rows.insertId
				}
			});
		} 
	})
});

module.exports = router;