<template>
	<article v-if="loadOK">
		<div v-for="item in yearList" :key="item.index">
			<h2>{{ item.year }}</h2>
			<ul class="map-list">
				<li v-for="article in filteredArticleList(item.index)" :key="article.article_id">
					<span class="map-list-time">{{ article.article_time }}</span>
					<router-link :to="{name: 'article_detail', params: {id: article.article_id}}">{{ article.article_title }}</router-link>
				</li>
			</ul>
		</div>
	</article>
	<article v-else>{{ tipMsg }}</article>
</template>

<script>
import { getPageArticle } from '@/api/api';
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			articleList: [],
			formatArticleList: [],
			tipMsg: '',
			yearList: []
		};
	},
	mounted() {
		this.initLoadOK();
		this.getArticleAll();
	},
	computed: {
		...mapState(['loadOK'])
	},
	methods: {
		...mapMutations(['chgLoadOK', 'initLoadOK']),
		//获取所有文章
		getArticleAll() {
			let params = {
				state: 1,
				field: 'article_id, article_title, article_time'
			};
			getPageArticle({params: params}).then(res => {
				if (res.state && res.data.length) {
					this.articleList = res.data;
					this.format();
				} else {
					this.chgLoadOK();
					this.tipMsg = '作者很懒，还没写文章';
				}
			}).catch(err => {
				console.log(err);
			});
		},
		//转换数据格式
		format() {
			let i = 0;
			let list = [];
			list.push({year: '', index: -1});
			list[i].year = new Date(this.articleList[0].article_time).getFullYear();

			//转换时间的数据格式,并获取所有年份
			this.articleList.forEach((item, index) => {
				let d = new Date(item.article_time);
				let year = d.getFullYear();
				let month = d.getMonth() + 1;
				let day = d.getDate();
				month = month < 10 ? '0' + month : month;
				day = day < 10 ? '0' + day : day;
				if (list[i].year !== year) {
					list[i].index = index;
					i++;
					list.push({year: '', index: -1});
					list[i].year = year;
				}
				item.article_time = month + '.' + day;
			});
			this.yearList = list;
		},
        //返回年份范围内的文章
        filteredArticleList(divide) {
            let list = [...this.articleList];
            list.filter((item, index) => {
                index > divide;
            });
            return list;
        }
	}
};

</script>

<style>
	/*归档*/
	article ul.map-list {
        margin: 24px 0 24px 20px;

	}

	article ul.map-list li {
        line-height: 1.6;
        margin: 0.3em;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

	article span.map-list-time {
		font-size: 14px;
		color: #999;
		margin-right: 20px;
	}
</style>
