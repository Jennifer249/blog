<template>
	<div>
		<article>
			<h2><router-link :to="{name: 'article_detail', params: {id}}">{{ article.article_title }}</router-link></h2>
			<p class="article-info">作者：陈卓林 日期：{{ date }}</p>
			<div class="markdown-body" v-html="mdHtml" v-highlight ></div>
			<div class="article-copyright">
				<ul>
					<li>转载请注明出处</li>
					<li>本文链接: <router-link :to="{name: 'article_detail', params: {id}}">{{ url }}</router-link></li>
				</ul>
			</div>
			<nav>
				<ul class="d-flex">
					<li><a @click="getPre">上一篇</a></li>
					<li><a @click="getNext">下一篇</a></li>
				</ul>
			</nav>
		</article>
		<div class="tmp"></div>
		<MessageBoard :id="parseInt(id)" ref="board"></MessageBoard>
	</div>
</template>

<script>
	import {getArticle, getPreId, getNextId} from '@/api/api';
	import MessageBoard from '@/components/front/message_board';
	var showdown = require('showdown');
	var converter = new showdown.Converter();
	converter.setOption('tables', true);
	converter.setOption('simpleLineBreaks', true);
	export default {
		components: {MessageBoard},
		props: ["id", "title"],
		data() {
			return {
				converter: Object,
				article: {},
				url: '',
				mdHtml: ''
			}
		},
		computed: {
			date() {
				return new Date(this.article.article_time).toLocaleDateString().replace(/\//g, '.');
			},
		},
		mounted() {
			this.getArticleM(this.id);
			this.url = window.location.href;
		},
		beforeRouteUpdate (to, from, next) {
			this.url = window.origin + to.fullPath;
			this.getArticleM(to.params.id);
			next();
		},
		methods: {
			getArticleM(id) {
				getArticle({"params": {id}}).then(res => {
					if(!res.state) {
						alert(res.message);
					} else {
						this.article = res.data.article[0];
						document.title = this.article.article_title + "-陈卓林的博客";
						this.$refs.board.respondForm.articleTitle = this.article.article_title;

						let tmp = document.querySelector('.tmp');
						tmp.innerHTML = this.article.article_content;
						this.mdHtml = converter.makeHtml(tmp.innerText);
						tmp.innerHTML = '';
					}
				})
			},
			getPre() {
				getPreId({params: {id: this.id}}).then(res => {
					if(!res.state) {
						alert(res.message);
					} else if(res.state === 1) {
						alert("没有文章了");
					} else {
						this.$router.push({name:'article_detail', params: {id: res.data.id[0].article_id, title: res.data.id[0].article_title}});
					}
				})
			},
			getNext() {
				getNextId({params: {id: this.id}}).then(res => {
					if(!res.state) {
						alert(res.message);
					} else if(res.state === 1) {
						alert("没有文章了");
					} else {
						this.$router.push({name: 'article_detail', params: {id: res.data.id[0].article_id, title: res.data.id[0].article_title}});
					}
				})
			}
		}
	}	
</script>

<style>
	@import '../../assets/css/markdown.css';
	/*文章内容*/
	.article-info {
	    font-size: 14px;
	    color: #6f6f82;
	    margin-bottom: -3px;
	    line-height: 1.8em;
	}

	.article-copyright ul {
	    margin: 1.2em;
	}

	.article-copyright ul li{
	    font-size: 13px;
	    line-height: 1.6;
	    color: #6f6f82;
	    list-style-type: disc; 
	}
	.article-copyright ul li a {
		color: #6f6f82;
	}
	/*路径导航*/
	nav ul {
		justify-content: space-between;
	    box-shadow: none;
	    display: inline-block;
	}

	nav ul li {
	    border: 1px solid #ddd;
	    float: left;
	    background: #fff;
	    margin-left: -1px;
	    box-shadow: 0 0 2px 0 rgba(58, 58, 58, 0.2);
	    cursor: pointer;
	}

	nav ul li:hover {
	    background: #ddd;
	}

	nav ul li a {
		padding: 6px 12px;
		display: inline-block;
	    font-size: 14px;
	    line-height: 1.4;
	}
</style>