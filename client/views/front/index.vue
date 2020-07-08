<template>
	<div class="wrapper">
		<FrontHead></FrontHead>
		<main>
			<div class="container clearfix">
				<div class="content-left">
					<transition name="fade" mode="out-in">
						<router-view></router-view>
					</transition>
				</div>
				<aside class="content-right">
					<section class="widget">
						<q>Practice more</q>
						<div class="user-pic"></div>
					</section>
					<section class="widget" v-for="witem in widgetItems">
						<h2 class="widget-title">{{ witem.name }}</h2>
						<ul>
							<li v-for="(ditem, index) in witem.data"><router-link :to="{name: witem.route, params: {id: ditem.id, title: ditem.title}}">{{ ditem.title }}</router-link></li>
						</ul>
					</section>
				</aside>
			</div>
		</main>
		<footer>
			<p>COPYRIGHT © 2020. 陈卓林个人博客 ALL RIGHT RESERVED.</p>
		</footer>
	</div>
</template>

<script>
	import FrontHead from '@/components/front/front_head';
	import { getPageArticle, getCategories } from '@/api/api';
	export default {
		components: { FrontHead },
		data() {
			return {
				widgetItems: [
					{name: 'Recent Posts', route: 'article_detail', data: []},
					{name: 'Categories', route: 'list',data: []}
				]
			}
		},
		mounted() {
			this.getArticleListM();
			this.getCategoriesM();
		},
		methods: {
			//获取文章列表
			getArticleListM() {
				let params = {
					currPage: 1,
					perPageArticle: 6,
					field: 'article_id, article_title'
				};
				getPageArticle({"params": params}).then(res => {
					if(res.state === 2) {
						let tmp = [];
						let obj = {};
						let list = res.data.articleList;
						list.forEach((item, index, array) => {
							obj.id = item.article_id;
							obj.title = item.article_title;
							tmp.push(obj);
							obj = {};
						});
						this.$set(this.widgetItems[0], 'data', tmp)
					}	
				})
			},
			//获取目录列表
			getCategoriesM() {
				getCategories().then(res => {
					if (res.state) {
						let tmp = [];
						let obj = {};
						let list = res.data.categories;
						list.forEach((item, index, array) => {
							obj.id = item.categories_id;
							obj.title = item.categories_name;
							tmp.push(obj);
							obj = {};
						});
						this.$set(this.widgetItems[1], 'data', tmp);
					}
				})
			}
		}
	}
</script>

<style>
	@import '../../assets/css/front.css';
	/*内容的左边*/
	main .content-left {
	    float: left;
	    width: 65%;
	}

	/*内容的右边*/
	main .content-right {
	    padding-left: 30px;
	    width: 35%;
	    float: left;
	}
	.content-right section:first-child {
	    position: relative;
	}
	.content-right .widget {
	    background: #fff;
	    padding: 25px;
	    margin-bottom: 30px;
	}
	.user-pic {
		position: absolute;
	    top: -20px;
	    right: -15px;
	}
	.content-right .widget-title {
	    line-height: 1.5;
	    font-size: 26px;
	    padding-bottom: 10px;
	    margin-bottom: 20px;
	    letter-spacing: 1px;
	    font-family: 'Roboto', sans-serif;
	}

	.content-right .widget-title:after {
	    content: "";
	    display: block;
	    height: 2px;
	    width: 50px;
	    background-color: #33b7ff;
	    border-right: 25px solid #f36619;
	}

	.content-right section ul li {
	    padding: 10px 0;
	    font-size: 14px;
	    border-bottom: 1px dotted #ddd;
	}

	.content-right section ul li:first-child {
	    padding-top: 0px;
	}

	.content-right section ul li:last-child {
	    padding-bottom: 0px;
	    border-bottom: 0px;
	}
	@media (min-width: 767px) {
	    .container {
	        width: 750px;
	    }
	}

	@media (min-width: 992px) {
	    .container {
	        width: 970px;
	    }
	}

	@media (min-width: 1200px) {
	    .container {
	        width: 1200px;
	    }
	}

	@media (max-width: 992px) {
	    .content-right {
	        display: none;
	    }
	    main .content-left {
	        width: 100%;
	    }
	}

	footer {
	  	padding: 3px;
	  	background-color: #fff;
		position: absolute;
		bottom: 0;
		width: 100%;
	}
	footer p {
	    text-align: center;
	    font-size: 14px;
	}
</style>