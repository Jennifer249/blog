const express = require('express');
const router = express.Router();
const db = require('../db/db');
const sqlMap = require('../db/sql_map');

//请求首页的统计数据
router.get('/api/admin/back_home/data_count', (req, res, next) => {
	db.query(sqlMap.stat.getStatBackHome, [], function(err, rows) {
		if (rows === undefined || rows.length === 0) { 
			res.json({
				state: 0,
				message: '初始化统计数据失败'
			})
		} else {
			res.json({
				state: 1,
				data: {
					stat: rows
				}
			})
		}
	});
});

//获取表格访问量数据
router.get('/api/admin/back_home/chart_visits', (req, res, next) => {
	db.query(sqlMap.visitsRecords.getVisiRecords, [], function(err, rows) {
		if (rows === undefined || rows.length === 0) { 
			res.json({
				state: 0,
				message: '初始化表格数据失败'
			})
		} else {
			res.json({
				state: 1,
				data: {
					chartVisits: rows
				}
			})
		}
	});
});

//获取表格评论数数据
router.get('/api/admin/back_home/chart_comments', (req, res, next) => {
	db.query(sqlMap.commentsRecords.getCommRecords, [], function(err, rows) {
		if (rows === undefined || rows.length === 0) { 
			res.json({
				state: 0,
				message: '初始化表格数据失败'
			})
		} else {
			res.json({
				state: 1,
				data: {
					chartComments: rows
				}
			})
		}
	});
});

module.exports = router;