<template>
	<div>
		<section class="article-list" v-if="showSearch">
			搜索结果如下，<a class="opt back" @click="back">返回</a>
		</section>
		<section class="article-list" v-if="loading">{{ tipMsg }}</section>
		<div v-else>
			<section class="article-list" v-for="(item, index) in articleList" :key="item.article_id">
				<h2><router-link :to="{name: 'article_detail', params: {id: item.article_id, title:item.article_title}}">{{ item.article_title }}</router-link></h2>
				<div class="article-content markdown-body" v-highlight v-html="item.article_content" ></div>
				<div class="article-footer">{{`${new Date(item.article_time).toLocaleDateString().replace(/\//g, '-')}&nbsp;&nbsp;|&nbsp;&nbsp;浏览(${item.article_visits})&nbsp;&nbsp;|&nbsp;&nbsp;留言(${item.article_comments})`}}</div>
			</section>
			<PageNav :info="pageInfo" @page="handleChangePage" ref="page"></PageNav>
		</div>
		<div class="tmp"></div>
	</div>
</template>

<script>
	import PageNav from '@/components/page_nav';
	import {getArticleSum, getPageArticle} from '@/api/api';
	import Bus from '@/assets/js/bus.js';

	var showdown = require('showdown');
	var converter = new showdown.Converter();
	converter.setOption('tables', true);
	converter.setOption('simpleLineBreaks', true);

	export default {
		props: ["id", "title"],
		components: { PageNav },
		data() {
			return {
				pageInfo: {
					articleSum: 1,
					//一页的文章数
					pageArticle: 4
				},
				currPage: 1,
				articleList: [],
				loading: true,
				tipMsg: '加载中...',
				categoriesId: 0,
				search: '',
				showSearch: false
			}
		},
		watch: {
			$route(to, from) {
				if(this.$route.path !== '/home') {
					document.title = this.title + "-陈卓林的博客";
				}
				
				if(this.title && this.$route.path !== '/home') {
					window.sessionStorage.title = this.title + "-陈卓林的博客";
				}
				if(parseInt(to.params.id)) {
					this.categoriesId = to.params.id;
				} else {
					this.categoriesId = 0;
				}
				this.resetPage();
				this.getArticleSumM();
				this.getArticleListM();
			}
		},
		mounted() {
			//避免在目录列表和文章列表切换时,丢失网页title
			if(this.title && this.$route.path !== '/home') {
				window.sessionStorage.title = this.title + "-陈卓林的博客";
			}
			if(this.$route.path !== '/home') {
				document.title = window.sessionStorage.title;
			}
			this.categoriesId = this.id; 
			this.getArticleSumM();
			this.getArticleListM();

			//监听查询事件
			Bus.$on('searchResult', item => {
				if(this.$route.path !== '/home') {
					this.$router.push({path: '/home'});
				}
				this.search = item;
				this.resetPage();
				this.showSearch = true;
				this.categoriesId = 0;

				this.getArticleSumM();
				this.getArticleListM();
			})
		},
		methods: {
			//改变分页
			handleChangePage(index) {
				this.currPage = index;
				this.getArticleListM();
			},
			//获取当前的文章总数和分页的文章列表
			getArticleSumM() {
				let value = {
					id: this.categoriesId,
					key: this.search
				}
				getArticleSum({params: value}).then(res => {
					if (res.state) {
						this.pageInfo.articleSum = res.data.articleSum[0].article_sum;
						this.getArticleListM();
					}
				});
			},
			//获取当前分页下的所有文章列表,或者获取指定目录的所有文章列表
			getArticleListM() {
				let params = {
					currPage: this.currPage,
					perPageArticle: this.pageInfo.pageArticle,
					categoriesId: this.categoriesId,
					key: this.search
				}
				getPageArticle({params: params}).then(res => {
					if (!res.state) {
						this.loading = true;
						this.tipMsg = res.message;
					} else if (res.state === 1) {
						this.loading = true;
						this.tipMsg = "没有文章";
						this.pageInfo.articleSum = 1;
					}
					else {

						this.loading = false;
						let list = res.data.articleList;
						let tmp = document.querySelector('.tmp');
						res.data.articleList.forEach((item, index, array) => {
							tmp.innerHTML = item.article_content;
							list[index].article_content = converter.makeHtml(tmp.innerText);
						})
						tmp.innerHTML = '';
						this.articleList = list;

					}	
				})
			},
			//重置分页
			resetPage() {
				this.currPage = 1;
				if (this.$refs.page) {
					this.$refs.page.currPage = 1;
				}
			},
			//查询页面返回
			back() {
				this.showSearch = false;
				this.search = '';
				this.resetPage();
				this.getArticleSumM();
				this.getArticleListM();

			}
		}
	}
</script>

<style scoped>
	@import '../../assets/css/markdown.css';
	 .article-list {
	    padding: 16px 20px 12px 20px;
	    background-color: #fff;
	    box-shadow: 0 0 2px 0 rgba(58, 58, 58, 0.2);
	    margin-bottom: 30px; 
	    transition: all 0.1s ease-in-out;
	}

	.article-list:hover {
	    box-shadow: 1px 1px 10px #5f5f5f;
	}

	.article-title {
	    padding-bottom: 10px; 
	}

	.article-content {
		overflow: hidden;
	    height: 150px;
	}
	.article-footer {
	    font-size: 14px;
	    margin-top: 12px;
	}
	.back {
		font-size: 16px;
		margin-left: 5px;
	}
</style>