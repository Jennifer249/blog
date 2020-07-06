<template>
	<article v-if="!loadOK">{{ tipMsg }}</article>
	<article v-else>
		<div v-for="item in yearList">
			<h2>{{ item.year }}</h2>
			<ul class="map-list">
				<li v-for="(article, index) in articleList" v-if="index > item.index">
					<span class="map-list-time">{{ article.article_time }}</span>
					<router-link :to="{name: 'article_detail', params: {id: article.article_id}}">{{ article.article_title }}</router-link>
				</li>
			</ul>
		</div>
	</article>
</template>

<script>
	import {getPageArticle} from '@/api/api';
export default {
	data() {
		return {
			articleList: [],
			formatArticleList: [],
			loadOK: true,
			tipMsg: '',
			yearList: []
		}
	},
	mounted() {
		this.getArticleAll();
	},
	methods: {
		getArticleAll() {
			let params = {
				state: 1,
				field: 'article_id, article_title, article_time'
			};
			getPageArticle({params: params}).then(res => {
				if(!res.state) {
						this.loading = true;
						this.tipMsg = res.message;
					} else if(res.state === 1) {
						this.tipMsg = "作者很懒，还没写文章";
					} else {
					this.articleList = res.data.articleList;
					this.format();
				}
			});
		},
		format() {
			let i = 0;
			let list = [];
			list.push({year: '', index: -1});
			list[i].year = new Date(this.articleList[0].article_time).getFullYear();

			this.articleList.forEach((item, index, array) => {
				let d = new Date(item.article_time);
				let year = d.getFullYear();
				let month = d.getMonth() + 1;
				let day = d.getDate();
				month = month < 10 ? '0' + month : month;
				day = day < 10 ? '0' + day : day;
				if(list[i].year !== year) {
					list[i].index = index;
					i++;
					list.push({year: '', index: -1});
					list[i].year = year;
				}
				item.article_time = month + '.' + day;
			});
			this.yearList = list;
		}
	}
}	

</script>

<style>
	/*归档*/
	article ul.map-list {
	    margin: 24px 0 24px 20px;

	}

	article ul.map-list li {
	    line-height: 1.6;
	    margin: 0.3em;
	}

	article span.map-list-time {
	    font-size: 14px;
	    color: #999;
	    margin-right: 20px; 
	}
</style>