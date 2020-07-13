<template>
	<div class="sub-categories view">
		<h3>{{title}}</h3>
		<span>&nbsp;>&nbsp;管理文章</span>
		<div class="sub-line">
			<select v-model="selectedOption">
				<option value="0">-选择操作-</option>
				<option value="1">移动</option>
				<option value="2">删除</option>
			</select>
			<select v-model="selectedCategories" v-if="isShowed">
				<option value="0">-选择分类-</option>
				<option v-for="item in categoriesList" :value="item.categories_id">{{ item.categories_name }}</option>
			</select>
			<button @click="exec">执行</button>
		</div>
		<ul v-if="articleList.length">
			<li v-for="(item, index) in articleList">
				<input type="checkbox" :id="'awesome' + index" v-model="checkedArticle" :value="item.article_id"/>
				<label :for="'awesome' + index">
					<router-link :to="{name:'article_detail', params: {id: item.article_id}}" target="_blank">{{ item.article_title }}</router-link>
				</label>
			</li>
			<li>
				<input type="checkbox" :id="'awesome' + articleList.length" @click="handleCheckAll" v-model="checkedAll"/>
				<label :for="'awesome' + articleList.length">全选</label>
			</li>
		</ul>
		<div v-else>{{ tipMsg }}</div>
	</div>
</template>
<script>
	import { getSubCategories, moveArticles, delArticles } from '@/api/api';
	export default {
		inject: ['reload'],
		data() {
			return {
				articleList: [],
				tipMsg: '',
				checkedArticle: [],
				checkedAll: false,
				selectedOption: '0',
				selectedCategories: '0',
				isShowed: false
			}
		},
		computed: {
			categoriesList() {
				return JSON.parse(window.sessionStorage.categories);
			},
			id() {
				//刷新时,路径的参数失效.提前保存起来备用
				if(this.$route.params.title !== undefined) {
					window.sessionStorage.currId = parseInt(this.$route.params.id);
				}
				return parseInt(this.$route.params.id) || window.sessionStorage.currId;
			},
			title() {
				if(this.$route.params.title !== undefined) {
					window.sessionStorage.currTitle = this.$route.params.title;
				}
				return this.$route.params.title || window.sessionStorage.currTitle;
			}
		},
		mounted() {
			this.getSubCategoriesInfo();
		},
		watch: {
			//全选控制
			checkedArticle() {
				if (this.checkedArticle.length === this.articleList.length) {
					this.checkedAll = true;
				} else {
					this.checkedAll = false;
				}
			},
			//根据第一个下拉框选择的操作,判断第二个下拉框是否需出现
			selectedOption() {
				if (parseInt(this.selectedOption) === 0 || parseInt(this.selectedOption) === 2) {
					this.isShowed = false;
				} else {
					this.isShowed = true;
				}
			}
		},
		methods: {
			//获得子栏目的文章
			getSubCategoriesInfo() {
				let value = { id: this.id};
				getSubCategories({params: value}).then(res => {
					this.articleList = res.data;
				}).catch(err => {
					console.log(err);
				});
			},
			//点击全选
			handleCheckAll() {
				if (this.checkedAll) {
					this.checkedArticle = [];
				} else {
					this.articleList.forEach((item) => {
						this.checkedArticle.push(item.article_id);
					})
				}
			},
			//执行操作
			exec() {
				//移动操作
				if (parseInt(this.selectedOption) === 1 && parseInt(this.selectedCategories)) {
					let value = {
						articleList: this.checkedArticle,
						categoriesId: this.selectedCategories
					};
					moveArticles(value).then(res => {
						this.$router.go(-1);
					}).catch(err => {
						console.log(err);
					})
				}
				//删除操作
				if (parseInt(this.selectedOption) === 2 && this.checkedArticle.length) {
					let params = {
						articleList: this.checkedArticle
					};
					delArticles({"params": params}).then(res => {
						this.reload();
					}).catch(err => {
						console.log(err);
					})
				}
			}
		}
	}
</script>

<style scoped>
	.sub-categories h3 {
		display: inline-block;
	}

	.sub-categories span {
		font-size: 14px;
		color: #999;
		font-weight: bold;
	}

	.sub-categories .sub-line {
		padding: 20px 10px;
	}
	.sub-line select {
		padding: 5px;
	}

	.sub-line button {
		color: #fff;
	}

	.sub-categories ul li {
		padding: 10px;
		border-top: 1px dotted #ddd;
	}
</style>