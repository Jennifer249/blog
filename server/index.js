const express = require('express');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const db = require("./db/db");
const sqlMap = require('./db/sql_map');
const cors = require('cors');
const tokenInfo = require('./token/token');
const jwt = require('jsonwebtoken');
const multiparty = require('multiparty');
const path = require('path');
const nodemailer = require('nodemailer');
// 导入token校验文件
const verify = require('./token/verify_token');

const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: 0 });
var jsonParser = bodyParser.json();
app.use(cors());

//定义邮箱服务器，QQ邮箱更容易配置些
var transporter = nodemailer.createTransport({
	host: 'smtp.qq.com',
	service: 'qq',
	secure: true,
	//这里需要登陆到网页邮箱中，配置SMTP和POST服务器的密码
	auth: {
		user: '249542247@qq.com',
		pass: 'hjtiwyhfobebbghb'
	}
})

//跨域请求头，所有请求头都要通过该中间件。对所有路径有效。
app.all('*',function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Credentials', '1');//允许携带cookie
	if (req.method == 'OPTIONS') {
		res.sendStatus(200);
	} else {
		next();
	}
});

app.use('/public', express.static(path.join(__dirname, 'public')));

//验证token是否过期并规定哪些路由不用验证
app.use(expressJwt({
	secret: tokenInfo.secret
}).unless({
	//除了这个地址，其他的URL都需要验证
	path: tokenInfo.unRoute
}));

//当token失效返回提示信息
app.use((err, req, res, next) => {
    if (err.status === 401) {
        return res.status(err.status).json({
            status: err.status,
            message: 'The token is invalid',
            error: err.name + ':' + err.message
        })
    }
});

//创建token
const createToken = (id) => {
	return jwt.sign({id}, tokenInfo.secret, { expiresIn: tokenInfo.expiresIn });
}

//登陆验证
app.post('/api/login', jsonParser, (req, res) => {
	let username = req.body.username;
	let password = req.body.password;

	let selectValue = [username, password];
	db.query(sqlMap.user.check, selectValue, function(err, rows) {
		console.log(rows);
		if (rows === undefined || rows.length === 0) {
			res.json({
				state: 0,
				message: "登陆失败，用户名或密码错误！"
			});
		} else {
			//返回token
			const token = createToken(rows[0].user_id);
			res.json({
		        state: 1,
				message: "登陆成功！",
				data: {
					token
				}
			});
		}
	})
});

//后台请求管理员信息
app.get('/api/admin/userInfo', (req, res, next) => {
	db.query(sqlMap.user.getUserName, req.user.id, function(err, rows) {
		if(rows === undefined || rows.length === 0) {
			res.json({
				state: 0,
				message: '不存在该用户'
			})
		} else {
			res.json({
				state: 1,
				message: '返回用户信息',
				data: {
					username: rows[0].user_name
				}
			})
		}
	})
});

//请求首页的统计数据
app.get('/api/admin/back_home/data_count', (req, res, next) => {
	db.query(sqlMap.stat.getStatBackHome, [], function(err, rows) {
		console.log(rows);
		//当抛出错误时，rows为undefined
		if(rows === undefined || rows.length === 0) { 
			res.json({
				state: 0,
				message: '初始化统计数据失败'
			})
		} else {
			res.json({
				state: 1,
				message: '返回统计数据',
				data: {
					stat: rows
				}
			})
		}
	});
});

app.get('/api/admin/back_home/chart_visits', (req, res, next) => {
	db.query(sqlMap.visitsRecords.getVisiRecords, [], function(err, rows) {
		console.log(rows);
		//当抛出错误时，rows为undefined
		if(rows === undefined || rows.length === 0) { 
			res.json({
				state: 0,
				message: '初始化表格数据失败'
			})
		} else {
			res.json({
				state: 1,
				message: '返回表格数据',
				data: {
					chartVisits: rows
				}
			})
		}
	});
});

app.get('/api/admin/back_home/chart_comments', (req, res, next) => {
	db.query(sqlMap.commentsRecords.getCommRecords, [], function(err, rows) {
		console.log(rows);
		//当抛出错误时，rows为undefined
		if(rows === undefined || rows.length === 0) { 
			res.json({
				state: 0,
				message: '初始化表格数据失败'
			})
		} else {
			res.json({
				state: 1,
				message: '返回表格数据',
				data: {
					chartComments: rows
				}
			})
		}
	});
});

app.get('/api/admin/article_mgt/stat_article', (req, res, next) => {
	db.query(sqlMap.stat.getStatArticle, [], function(err, rows) {
		console.log(rows);
		//当抛出错误时，rows为undefined
		if(rows === undefined || rows.length === 0) { 
			res.json({
				state: 0,
				message: '初始化数据失败'
			})
		} else {
			res.json({
				state: 1,
				message: '返回统计数据',
				data: {
					statArticle: rows
				}
			})
		}
	});
});

app.get('/api/admin/article_mgt/oldest_year', (req, res, next) => {
	db.query(sqlMap.article.getOldestYear, [], function(err, rows) {
		console.log(rows);
		//当抛出错误时，rows为undefined
		if(rows === undefined) { 
			res.json({
				state: 0,
				message: '初始化数据失败'
			})
		} else if(rows.length === 0) {
			res.json({
				state: 1,
				message: '还没有写文章哦'
			})
		} else {
			res.json({
				state: 2,
				message: '返回统计数据',
				data: {
					oldestYear: rows
				}
			})
		}
	});
});

app.get('/api/admin/article_mgt/search_result', (req, res, next) => {
	let year = req.query.year ? req.query.year+'-' : '(.*)';
	let month = req.query.month > 0 && req.query.month < 10 ? '0'+ req.query.month: req.query.month;
	let date = year + month;
	let categories = req.query.categories ? req.query.categories : '(.*)';
	let key = req.query.key ? req.query.key: '(.*)';

	console.log(date);
	console.log(categories);
	console.log(categories);
	db.query(sqlMap.article.getSearchResult, [date, categories, key], (err, rows) => {
		if(rows === undefined) {
			res.json({
				state: 0,
				message: '查找失败'
			})
		} else {
			res.json({
				state: 1,
				message: '查找成功',
				data: {
					articleList: rows
				}
			})
		}
	})
})

app.get('/api/share/categoreis', (req, res, next) => {
	db.query(sqlMap.categories.getCategories, [], function(err, rows) {
		if(rows === undefined) { 
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
})

//修改文章状态
app.post('/api/admin/article_mgt/update_article_state', jsonParser, (req, res) => {
	let state = req.body.state;
	let id = req.body.id;

	let value = [state, id];
	db.query(sqlMap.article.updateArticleState, value, function(err, rows) {
		console.log(rows);
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

app.delete('/api/admin/article_mgt/del', (req, res) => {
	let id = req.query.id;
	let state = parseInt(req.query.state);
	db.query(sqlMap.article.deleteArticle, [id], function(err, rows) {
		console.log(rows);
		if (rows === undefined) {
			res.json({
				state: 0,
				message: "操作失败"
			});
		} else {
			//删除文章的图片
			db.query(sqlMap.blogImages.del, [id]);
			//删除文章的评论
			db.query(sqlMap.comment.delByArticleId, [id]);
			res.json({
		        state: 1,
				message: "删除成功！"
			});
		}
	})
});

app.get('/api/share/page_aritcle', (req, res) => {
	let index = parseInt(req.query.index);
	let currPage = req.query.currPage ? parseInt(req.query.currPage) : 1;
	//查询的字段
	let field = req.query.field ? req.query.field : '';
	//关键字查询
	let key = req.query.key ? req.query.key : '';
	let perPageArticle = parseInt(req.query.perPageArticle);
	let state = index ? index + 1 : '(.*)';
	let categoriesId = req.query.categoriesId ? parseInt(req.query.categoriesId) : 0;
	let sql = sqlMap.article.getStateArticle;
	let value = [];
	if(categoriesId) {
		let index = sql.indexOf('WHERE') + 6;
		sql = sql.slice(0, index) + ' categories_Id = ? AND ' + sql.slice(index);
		value.push(parseInt(categoriesId));
	} else if(key) {
		let index = sql.indexOf('WHERE') + 6;
		sql = sql.slice(0, index) + ' article_title regexp ? AND ' + sql.slice(index);
		value.push(key);
	}

	if(!perPageArticle) {
		sql = sql.slice(0, sql.indexOf('LIMIT'));
		value.push(state);
	} else {
		let limitRange = [ (currPage-1) * perPageArticle, perPageArticle ];
		value.push(state, ...limitRange);
	}

	if(field) {
		sql = 'select ' + req.query.field + sql.slice(8);
	}	

	console.log(sql);
	db.query(sql, value, function(err, rows) {
		console.log(rows);
		if (rows === undefined) {
			res.json({
				state: 0,
				message: "操作失败"
			});
		} else if(rows.length === 0) {
			res.json({
				state: 1,
				message: '还没有写文章哦'
			})
		} else {
			res.json({
		        state: 2,
				message: "返回成功！",
				data: {
					articleList: rows
				}
			});
		}
	})
});

app.get('/api/share/get_article', (req, res) => {
	let id = req.query.id;
	db.query(sqlMap.article.getArticle, [id], function(err, rows) {
		console.log(rows);
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

app.get('/api/share/comment_list', (req, res) => {
	let id = req.query.id ? req.query.id : '(.*)';
	let order = req.query.order ? req.query.order : '';
	let sql = sqlMap.comment.getCommentList;
	console.log(order);
	if(/^desc$|^asc$/i.test(order)) {
	console.log("111"+order);
		sql = sql.slice(0, sql.lastIndexOf(' ') + 1) + order;
	}
	db.query(sql, [id], function(err, rows) {
		console.log(rows);
		if (rows === undefined) {
			res.json({
				state: 0,
				message: "操作失败"
			});
		} else if(rows.length == 0) {
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

app.post('/api/share/save_reply', jsonParser, (req, res) => {
	let articleId = req.body.articleId;
	let articleTitle = req.body.articleTitle;
	let visitorId = req.body.visitorId;
	let comment = req.body.comment;
	let date = req.body.date;
	let replyId = req.body.replyId;
	let replyCommentId = req.body.replyCommentId;
	let replyComment = req.body.replyComment;
	let replyName = req.body.replyName;
	let url = req.body.url;
	let emailTo = req.body.emailTo;

	var sendHtml = `<div>
	<div>尊敬的${replyName}, 您好!</div>
	<div>作者给您回复了。</div>
	<div>来自文章：${articleTitle}-陈卓林|技术博客</div>
	<div>您的评论内容：${replyComment}</div>
	<div>作者的回复：${comment}</div>
	<div>回复时间：${date}</div>
	<div><a href="${url}">查看和回复，点这里</a></div>
	</div>
	`;

	var mailOptions = {
		from: '249542247@qq.com',
		to: `${emailTo}`,
		subject: `新的留言-来自文章:${articleTitle}-陈卓林|技术博客`,
		html: sendHtml
	};

	db.query(sqlMap.comment.add, [articleId, visitorId, comment, date, replyId, replyCommentId], function(err, rows) {
		console.log(rows);
		if (rows === undefined) {
			res.json({
				state: 0,
				message: "存储失败！"
			});
		} else {
			//发送邮箱
			transporter.sendMail(mailOptions, (error, info) => {
				if(error) {
					res.json({
						state: 0,
						message: '邮箱发送失败！'
					})
					console.log(error)
				} else {
					console.log("Message sent: " + info.response);
					res.json({
						state: 1,
						message: '存储成功！'
					});
				}
			});
		}
	})
});

app.delete('/api/admin/comment_mgt/del', (req, res) => {
    let id = parseInt(req.query.id);
    let aid = parseInt(req.query.aid);
	db.query(sqlMap.comment.del, [id], function(err, rows) {
		console.log(rows);
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
				        state: 1,
						message: "删除成功！"
					});
				}
			});
		}
	})
});

app.post('/api/admin/categories/update', jsonParser, (req, res) => {
	let id = req.body.id;
	let name = req.body.name;
	db.query(sqlMap.categories.rename, [name, id], function(err, rows) {
		console.log(rows);
		if (rows === undefined) {
			res.json({
				state: 0,
				message: "修改失败！"
			});
		} else {
			res.json({
		        state: 1,
				message: "修改成功！"
			});
		}
	})
});

app.delete('/api/admin/categories/del', jsonParser, (req, res) => {
	let id = req.query.id;
	db.query(sqlMap.categories.del, [id], function(err, rows) {
		console.log(rows);
		if (rows === undefined) {
			res.json({
				state: 0,
				message: "删除失败！"
			});
		} else {
			db.query(sqlMap.categories.clearArticleCategories, [id]);
			res.json({
		        state: 1,
				message: "删除成功！"
			});
		}
	})
});

app.post('/api/admin/categories/add', jsonParser, (req, res) => {
	let name = req.body.name;
	db.query(sqlMap.categories.add, [name], function(err, rows) {
		console.log(rows);
		if (rows === undefined) {
			res.json({
				state: 0,
				message: "新增失败！"
			});
		} else {
			res.json({
		        state: 1,
				message: "新增成功！",
				data: {
					categoriesId: rows.insertId
				}
			});
		}
	})
});

app.get('/api/admin/sub_categories/list', (req, res) => {
    let id = parseInt(req.query.id);
	db.query(sqlMap.subCategories.list, [id], function(err, rows) {
		console.log(rows);
		if (rows === undefined) {
			res.json({
				state: 0,
				message: "查询失败！"
			});
		} else if(rows.length == 0) {
			res.json({
				state: 1,
				message: '该专栏没有文章!'
			})
		} else {
			res.json({
		        state: 2,
				message: "返回成功！",
				data: {
					subCategoriesList: rows
				}
			});
		} 
	})
});

app.post('/api/admin/sub_categories/move', jsonParser, (req, res) => {
    let categoriesId = parseInt(req.body.categoriesId);
    let articleList = req.body.articleList;
    
	db.query(sqlMap.subCategories.move, [categoriesId, articleList], function(err, rows) {
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

app.delete('/api/admin/sub_categories/del', jsonParser, (req, res) => {
    let articleList = req.query.articleList;

    console.log(articleList);
	db.query(sqlMap.subCategories.delete, [articleList], function(err, rows) {
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

app.post('/api/admin/edit/upload', (req, res) => {
	let form = new multiparty.Form({ uploadDir: './public/' });
    form.parse(req, function(err, fields, files) {
        console.log(fields, files,' fields2')
		if(err) {
			res.json({
				state: 0,
				message: "文件上传失败"
			})
		} else {
			db.query(sqlMap.blogImages.add, [files.file[0].path, -1], function(err, rows) {
				res.json({
			        state: 1,
					message: "文件上传成功！",
					data: {
						imgSrc: files.file[0].path,
						imgId: rows.insertId
					}
				});
			});
		}
	})
});

app.post('/api/admin/edit/add', jsonParser, (req, res) => {
    let id = req.body.article.id;
    let content = req.body.article.content;
    let title = req.body.article.title;
    let categories = req.body.article.categoriesId ? req.body.article.categoriesId : 0;
    
    console.log("id" + id);
    let tags = req.body.article.tags ? req.body.article.tags.join() : "";
    let state = req.body.article.state;
    let date = req.body.article.date;
    let imageId = req.body.imageId;
    if(id) {
    	db.query(sqlMap.edit.update, [title, content, date, state, categories, tags, id], function(err, rows) {
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
			        state: 2,
					message: "操作成功！"
				});
			}
    	})
    	return;
    }
	db.query(sqlMap.edit.add, [title, content, date, 0, 0, state, categories, tags], function(err, rows) {
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

//前台：获取文章总数
app.get('/api/front/get_article_sum', (req, res, next) => {
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
				message: '操作成功！',
				data: {
					articleSum: rows
				}
			})
		}
	})
})

//前台：获取上一篇
app.get('/api/front/get_pre_id', (req, res, next) => {
	let id = req.query.id - 0;
	console.log(id);
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
				message: '操作成功！',
				data: {
					id: rows
				}
			})
		}
	})
})

//前台：获取下一篇
app.get('/api/front/get_next_id', (req, res, next) => {
	let id = req.query.id - 0;
	console.log(id);
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
app.post('/api/front/submit_message_board', jsonParser, (req, res, next) => {
	let aid = req.body.aid;
	let name = req.body.name;
	let emailFrom = req.body.emailFrom;
	let emailTo = req.body.emailTo ? req.body.emailTo : '249542247@qq.com';
	let comment = req.body.comment;
	let replyId = req.body.replyId;
	let replyName = req.body.replyName;
	let date = req.body.date;
	let replyCommentId = req.body.replyCommentId;
	let replyComment = req.body.replyComment;
	let url = req.body.url;
	let articleTitle = req.body.articleTitle;

	//设置邮箱发送内容
	var sendHtml = `<div>
	<div>尊敬的${replyName}, 您好!</div>
	<div>用户名：${name} 给您留言了。</div>
	<div>来自文章：${articleTitle}-陈卓林|技术博客</div>
	`

	if(replyComment) {
		sendHtml += `<div>您的评论内容：${replyComment}</div>`
	}
	sendHtml += `
	<div>该用户留言内容：${comment}</div>
	<div>留言时间：${date}</div>
	<div><a href="${url}">查看和回复，点这里</a></div>
	</div>
	`;

	var mailOptions = {
		from: '249542247@qq.com',
		to: `${emailTo}`,
		subject: `新的留言-来自文章:${articleTitle}-陈卓林|技术博客`,
		html: sendHtml
	};
	//存储新的游客和留言
	db.query(sqlMap.visitor.add, [name, emailFrom], (err, rows) => {
		if(rows === undefined) {
			res.json({
				state: 0,
				message: '操作失败！'
			})
		} else {
			//更新对应文章的评论数
			db.query(sqlMap.article.updateArticleComments, [1, aid], (err, rows1) => {
				if(rows1 == undefined) {
					res.json({
						state: 0,
						message: '操作失败！'
					})
				} else {
					db.query(sqlMap.comment.add, [aid, rows.insertId, comment, date, replyId, replyCommentId], (err, rows2) => {
						if(rows === undefined) {
							res.json({
								state: 0,
								message: '操作失败！'
							})
						} else {
							//发送邮箱
							transporter.sendMail(mailOptions, (error, info) => {
								if(error) {
									res.json({
										state: 0,
										message: '邮箱发送失败！'
									})
									console.log(error)
								} else {
									console.log("Message sent: " + info.response);
									res.json({
										state: 1,
										message: '操作成功！'
									});
								}
							});
						}
					})
				}
			});
		}
	});
});


app.listen(3000, () => {
	console.log('I\'m listening on port 3000!');
})
