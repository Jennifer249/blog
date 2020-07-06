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
				<option v-for="item in categoriesList" :value="item.categories_id">{{item.categories_name}}</option>
			</select>
			<button @click="exec">执行</button>
		</div>
		<ul v-if="articleList.length">
			<li v-for="(item, index) in articleList">
				<input type="checkbox" :id="'awesome' + index" v-model="checkedArticle" :value="item.article_id"/>
				<label :for="'awesome' + index">{{item.article_title}}</label>
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
	import {getSubCategories, moveArticles, delArticles} from '@/api/api';
	export default {
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
				return JSON.parse(window.localStorage.categories);
			},
			id() {
				if(window.localStorage.currId === "undefined") {
					window.localStorage.currId = parseInt(this.$route.params.id);
				}
				return parseInt(this.$route.params.id) || window.localStorage.currId;
			},
			title() {
				if(window.localStorage.currTitle === "undefined") {
					window.localStorage.currTitle = this.$route.params.title;
				}
				return this.$route.params.title || window.localStorage.currTitle;
			}
		},
		mounted() {
			this.getSubCategoriesInfo();
		},
		watch: {
			checkedArticle() {
				if(this.checkedArticle.length === this.articleList.length) {
					this.checkedAll = true;
				} else {
					this.checkedAll = false;
				}
			},
			selectedOption() {
				if(parseInt(this.selectedOption) === 0 || parseInt(this.selectedOption) === 2) {
					this.isShowed = false;
				} else {
					this.isShowed = true;
				}
			}
		},
		methods: {
			getSubCategoriesInfo() {
				let value = { id: this.id};
				getSubCategories({params: value}).then(res => {
					if(res.state === 0 || res.state === 1) {
						this.tipMsg = res.message;
					} else {
						this.articleList = res.data.subCategoriesList;
					}
				})
			},
			handleCheckAll() {
				if(this.checkedAll) {
					this.checkedArticle = [];
				} else {
					this.articleList.forEach((item) => {
						this.checkedArticle.push(item.article_id);
					})
				}
			},
			exec() {
				if (parseInt(this.selectedOption) === 1 && parseInt(this.selectedCategories)) {
					let value = {
						articleList: this.checkedArticle,
						categoriesId: this.selectedCategories
					};
					console.log(this.checkedArticle);
					moveArticles(value).then(res => {
						alert(res.message);
						if(res.state) {
							this.$router.go(-1);
						}
					})
				}
				if(parseInt(this.selectedOption) === 2 && this.checkedArticle.length) {
					let params = {
						articleList: this.checkedArticle
					};
					delArticles({"params": params}).then(res => {
						alert(res.message);
						if(res.state) {
							window.location.reload();
						}
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