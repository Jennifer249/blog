<template>
	<div class="wrapper">
    <FrontHead></FrontHead> 
		<!-- <front-head></front-head> -->
		<main>
			<div class="container clearfix">
				<div class="content-left">
					<transition name="fade" mode="out-in">
						<router-view :key="$route.path + $route.query.t"></router-view>
					</transition>
				</div>
				<aside class="content-right">
					<section class="widget">
						<q>Practice more</q>
						<div class="user-pic"></div>
					</section>
					<section class="widget" v-for="witem in widgetItems" :key="witem.name">
						<h2 class="widget-title">{{ witem.name }}</h2>
						<ul>
							<li v-for="ditem in witem.data" :key="ditem.id">
								<router-link :to="{name: witem.route, params: {id: ditem.id, title: ditem.title}, query: {t: Date.now()}}">{{ ditem.title }}</router-link>
							</li>
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
  /* component 的命名方式 和 template 的使用，驼峰首字母大写或短横线命名，如下：
   * import frontHead ... 
   * 组件内为 name: 'front-name'
   * components: { [FrontHead.name]: frontHead} 或 components: {frontHead}
   * template 使用时，front-name 和 frontHead 都可。但推荐 template 中使用短横线命名。
   */
	data() {
		return {
			widgetItems: [
				{name: 'Recent Posts', route: 'article_detail', data: []},
				{name: 'Categories', route: 'list',data: []}
			]
		};
	},
	mounted() {
		this.getArticleListM();
        this.getCategoriesM();
	},
	methods: {
		// 获取文章列表
		getArticleListM() {
			let params = {
				currPage: 1,
				perPageArticle: 6,
				state: 1,
				field: 'article_id, article_title'
			};
			getPageArticle({'params': params}).then(res => {
				let tmp = [];
				let obj = {};
				let list = res.data;
				list.forEach((item) => {
					obj.id = item.article_id;
					obj.title = item.article_title;
					tmp.push(obj);
					obj = {};
				});
				this.$set(this.widgetItems[0], 'data', tmp);
			}).catch(err => {
				console.log(err);
			});
		},
		// 获取目录列表
		getCategoriesM() {
			getCategories().then(res => {
				let tmp = [];
				let obj = {};
				let list = res.data;
				list.forEach((item) => {
					obj.id = item.categories_id;
					obj.title = item.categories_name;
					tmp.push(obj);
					obj = {};
				});
				this.$set(this.widgetItems[1], 'data', tmp);
			}).catch(err => {
				console.log(err);
			});
		}
	}
};
</script>

<style>
    @import '../../assets/css/front.css';
    .wrapper {
        min-height: 100%;
        padding-bottom: 50px;
        position: relative;
    }
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

    .content-right section ul li {
        overflow: hidden;
        word-break: keep-all;
        white-space: nowrap;
        text-overflow: ellipsis;
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
        height: 50px;
    }
    footer p {
        text-align: center;
        font-size: 14px;
    }
</style>
