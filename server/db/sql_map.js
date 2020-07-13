var sqlMap = {
	user: {
		check: 'SELECT * FROM user_info WHERE user_name = ? && user_password = ?'
	},
	stat: {
		getStatBackHome: "SELECT a.*, b.*, c.* FROM (SELECT COUNT(*) AS article_sum FROM article) a LEFT JOIN (SELECT COUNT(*) AS comment_sum FROM comment) b ON 1 =1 LEFT JOIN (SELECT stat_value AS visit_sum FROM stat_data WHERE stat_name = 'visit_sum') c ON 1=1",
		getStatArticle: "SELECT COUNT(*) AS article_sum, sum(CASE WHEN article_state = 2 THEN 1 ELSE 0 END) AS private_article_sum, sum(CASE WHEN article_state = 3 THEN 1 ELSE 0 END) AS draft_sum FROM article",
		updateStats: 'UPDATE stat_data SET stat_value = stat_value + ? WHERE stat_name IN (?)',
		getArticleSum: 'SELECT COUNT(*) AS article_sum FROM article WHERE article_state = 1'
	},
	commentsRecords: {
		getCommRecords: 'SELECT comments_date, comments_day_count FROM comments_records  ORDER BY comments_date DESC LIMIT 7'
	},
	visitsRecords: {
		getVisiRecords: 'SELECT visits_date, visits_day_count FROM visits_records  ORDER BY visits_date DESC LIMIT 7'
	},
	article: {
		updateArticleState: 'UPDATE article SET article_state = ? WHERE article_id = ?',
		updateArticleComments: 'UPDATE article SET article_comments = article_comments + ? WHERE article_id = ?',
		deleteArticle: 'DELETE FROM article WHERE article_id = ?',
		getOldestYear: 'SELECT article_time FROM article order by article_time asc LIMIT 1',
		getArticleList: 'SELECT * FROM article WHERE article_state regexp ? ORDER BY article_time DESC LIMIT ?, ?',
		getArticle: 'SELECT a.*, b.categories_name FROM article a LEFT JOIN categories b ON a.categories_id = b.categories_id WHERE a.article_id = ?',
		getSearchResult: "SELECT * FROM article WHERE article_time regexp ? and categories_id regexp ? and article_title regexp ?",
		getPreId: 'SELECT article_id, article_title FROM article WHERE article_state = 1 AND article_id < ? ORDER BY article_id DESC LIMIT 1',
		getNextId: 'SELECT article_id, article_title FROM article WHERE article_state = 1 AND article_id > ? ORDER BY article_id LIMIT 1'
	},
	categories: {
		getCategories: 'SELECT a.categories_id, a.categories_name, b.categories_article_sum FROM categories AS a LEFT OUTER JOIN ( SELECT categories_id , COUNT(categories_id) AS categories_article_sum FROM article GROUP BY categories_id) AS b ON a.categories_id = b.categories_id',
		rename: 'UPDATE categories SET categories_name = ? WHERE categories_id = ?',
		del: 'DELETE FROM categories WHERE categories_id = ?',
		add: 'INSERT INTO categories VALUES(0, ?)',
		clearArticleCategories: 'UPDATE article SET categories_id = null WHERE categories_id = ?'
	},
	subCategories: {
		list: 'SELECT article_id, article_title FROM article WHERE categories_id = ?',
		move: 'UPDATE article SET categories_id = ? WHERE article_id in (?)',
		delete: 'DELETE FROM article WHERE article_id in (?)'
	},
	comment: {
		getCommentList: "SELECT comment.comment_id, comment.article_id, article_title, comment.visitor_id, visitor_name,comment_content, comment_time, reply_name, visitor_email, reply_comment_id FROM comment, article, visitor AS a, (select comment_id, visitor_name as reply_name from comment, visitor where comment.reply_id = visitor.visitor_id) AS b WHERE comment.article_id = article.article_id AND comment.visitor_id = a.visitor_id AND comment.comment_id = b.comment_id AND comment.article_id regexp ? ORDER BY comment_time DESC",
		add: 'INSERT INTO comment VALUES(0, ?, ?, ?, ?, ?, ?)',
		del: 'DELETE FROM comment WHERE comment_id = ?',
		delByArticleId: 'DELETE FROM comment WHERE article_id = ?'
	},
	visitor: {
		getVisitor: 'SELECT * FROM visitor WHERE visitor_id = ?',
		add:'INSERT INTO visitor VALUES(0, ?, ?)'
	},
	blogImages: {
		add: 'INSERT INTO blog_images VALUES(0, ?, ?)',
		update: 'UPDATE blog_images SET article_id = ? WHERE image_id IN (?)',
		del: 'DELETE FROM blog_images WHERE article_id = ?',
		getImages: 'SELECT * FROM blog_images WHERE article_id = ?'
	},
	edit: {
		add: 'INSERT INTO article VALUES(0, ?, ?, ?, ?, ?, ?, ?, ?)',
		update: 'UPDATE article SET article_title = ?, article_content = ?, article_time = ?, article_state = ?, categories_id = ?, tags = ? WHERE article_id = ?'
	},
};

module.exports = sqlMap;