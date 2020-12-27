const express = require('express');
const router = express.Router();
const db = require('../db/db');
const sqlMap = require('../db/sql_map');

// 请求首页的统计数据
router.get('/api/admin/back_home/data_count', (req, res, next) => {
	db.query(sqlMap.stat.getStatBackHome, []).then(rows => {
		res.json({
			state: 1,
			data: rows
		})
	}).catch(err => {
		console.log(err);
	});
});

// 获取表格访问量数据
router.get('/api/admin/back_home/chart_visits', (req, res, next) => {
	db.query(sqlMap.visitsRecords.getVisiRecords, []).then(rows => {
		res.json({
			state: 1,
			data: rows
		})
	}).catch(err => {
		console.log(err);
	});
});

// 获取表格评论数数据
router.get('/api/admin/back_home/chart_comments', (req, res, next) => {
	db.query(sqlMap.commentsRecords.getCommRecords, []).then(rows => {
		res.json({
			state: 1,
			data: rows
		})
	}).catch(err => {
		console.log(err);
	});
});

module.exports = router;