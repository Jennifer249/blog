// 后台系统，分为登陆、数据统计、文章管理、评论管理、目录管理、子目录管理模块
const login = require('./login');
const editArticle = require('./editArticle');
const statMgt = require('./statMgt');
const articleMgt = require('./articleMgt');
const commentMgt = require('./commentMgt');
const catMgt = require('./catMgt');
const subCatMgt = require('./subCatMgt');

// 前台系统
const front = require('./front');

// 公共api
const share = require('./share');

module.exports = (app) => {
	app.use(login);
	app.use(editArticle);
	app.use(statMgt);
	app.use(articleMgt);
	app.use(commentMgt);
	app.use(catMgt);
	app.use(subCatMgt);
	app.use(front);
	app.use(share);
}