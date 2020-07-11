<template>
	<div class="article-manage view" v-if="loadOK">
		<Tag :info="tags" @currentTag="handleChangeTag"></Tag>
		<div class="article-search-box" v-if="!currTag">
			<span>筛选: </span>
			<Droplist 
				v-for="(item, index) in dropItems" 
				:init-info="item" 
				:key="index" 
				@selectData="getSelectData"
				:ref="item.ref"></Droplist>
			<div class="search-class">
				<SearchBox @searchData="getSearchData"></SearchBox>
			</div>
		</div>
		<BackArticleList v-for="item in articleList" :info="item" :key="item.article_id" @chgState="chgState" @del="removeArticle"></BackArticleList>
		<div class="page" >
			<PageNav :info="pageInfo" @page="handleChangePage" ref="page"></PageNav>
		</div>
	</div>
	<div class="loadClass" v-else>{{ tipMsg }}</div>
</template>

<script>
	import { getStatArticle, getOldestYear, getCategories, changeArticeState, delArticle, getPageArticle, requestSearchResult } from '@/api/api';
	import Droplist from '@/components/back/droplist';
	import SearchBox from '@/components/search_box';
	import BackArticleList from '@/components/back/back_article_list'
	import Tag from '@/components/back/tag';
	import PageNav from '@/components/page_nav';

	export default {
		components:{ Tag, Droplist, SearchBox, BackArticleList, PageNav },
		inject: ['reload'],
		data() {
			return {
				tags: [],
				currTag: 0,
				currPage: 1,
				statArticle: [],
				loadOK: true,
				tipMsg: '',
				dropItems:[
					{
						name: '年',
						width: '',
						ref: 'year',
						data: []
					},
					{
						name: '月',
						width: '',
						ref: 'month',
						data: ['不限']
					},
					{	
						name: '专栏',
						width: '',
						ref: 'categories',
						data: ['不限']
					}
				],
				searchConditions: {
					year: '',
					month: '',
					categories: '',
					key: ''

				},
				articleList: [],
				pageInfo: {
					articleSum: 0,
					//一页的文章数
					pageArticle: 3
				},
				categories: []
			}
		},
		mounted() {
			this.getTag();
			this.getYearData();
			this.getCategoriesList();
		},
		methods: {
			//获取标题数据
			getTag() {
				getStatArticle().then(res => {
					if (!res.state) {
						this.loadOK = false;
						this.tipMsg = res.message;
					} else {
						this.statArticle = res.data.statArticle;
						let tmp = [];
						tmp[0] = `全部(${this.statArticle[0]["article_sum"]})`;
						tmp[1]  = `私密(${this.statArticle[0]["private_article_sum"]})`;
						tmp[2]  = `草稿箱(${this.statArticle[0]["draft_sum"]})`;
						this.tags = tmp;
						//获取当前标签下的文章
						this.getTagArticle();
					}
				})
			},
			//获取该标题文章
			getTagArticle() {
				let state = this.currTag + 1;
				//全部时，传给服务器的state为0
				if(!this.currTag) {
					state = this.currTag;
				}
				let params = {
					state: state,
					currPage: this.currPage,
					perPageArticle: this.pageInfo.pageArticle
				};
				this.pageInfo.articleSum = this.tags[this.currTag].match(/\d+/)[0] - 0;
				getPageArticle({"params": params}).then(res => {
					if(res.state === 0 || res.state === 1) {
						this.loadOK = false;
						this.tipMsg = res.message;
					} else {
						this.articleList = res.data.articleList;
					}	
				})
			},
			//点击改变标题
			handleChangeTag(index) {
				this.currTag = index;
				this.currPage = 1;
				this.resetPage();
				this.getTagArticle();
			},
			//设置年份
			getYearData() {
				getOldestYear().then(res => {
					if (res.state === 0 || res.state === 1) {
						this.loadOK = false;
						this.tipMsg = res.message;
					} else {
						let oldestYear = parseInt(res.data.oldestYear[0]["article_time"].slice(0, 4));
						
						let yearList = [];
						yearList[0] = "不限";
						let nowYear = parseInt(new Date().getFullYear()); 
						for(let i=0, j=(nowYear-oldestYear)+1; i<=(nowYear-oldestYear); i++, j--) {
							yearList[j] = oldestYear + i;
						}
						this.dropItems[0].data = yearList;
						this.dropItems[0].width = 80;
					}
				});
			},
			//设置专栏
			getCategoriesList() {
				getCategories().then(res => {
					if (!res.state) {
						this.loadOK = true;
					} else {
						this.categories = res.data.categories;
						let categoriesList = [];
						categoriesList[0] = "不限";
						for(let i=0; i<this.categories.length; i++) {
							categoriesList[i+1] = this.categories[i]["categories_name"];
						}
						this.dropItems[2].data = categoriesList;
						this.dropItems[2].width = 200;
					}
				})
			},
			//设置月份
			getSelectData(name, value) {
				if (name === "年") {
					if (value === "不限") {
						this.dropItems[1].data = ["不限"];
						this.$refs.month[0].setIsTrue(0);
						this.searchConditions.year = "";
						this.searchConditions.month = "";
					} else {
						//当年的下拉菜单选项为某一年时，月份的下拉菜单显示所有月份
						let monthList = ["不限", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
						this.dropItems[1].data = monthList;
						this.searchConditions.year = value;
					}
				}
				else if (name === "月") {
					if (value === "不限") {
						this.searchConditions.month = "";
						return;
					}
					this.searchConditions.month = value.match(/\d+/)[0];
				}
				else {
					if (value === "不限") {
						this.searchConditions.categories = "";
						return;
					}
					this.categories.forEach((item, index, array) => {
						if(item.categories_name === value) {
							this.searchConditions.categories = item.categories_id;
						}
					});
				}
			},
			//获取搜索框数据以及向服务器请求查询结果
			getSearchData(value) {
				this.searchConditions.key = value;
				//向服务器请求结果
				requestSearchResult({"params": this.searchConditions}).then(res => {
					if (!res.state) {
						alert(res.message);
					} else {
						this.articleList = res.data.articleList;
						this.pageInfo.articleSum = 0;
					}
				}) 
			},
			//文章状态改变
			chgState(id, oldState) {
				let newState = 0;
				if (oldState === 1) {
					newState = 2;
				} else {
					newState = 1;
				}
				changeArticeState({id, "state": newState}).then( res => {
					if (!res.state) {
						alert(res.message);
					} else {
						this.reload();
					}

				})
			},
			//删除文章
			removeArticle(id) {
				delArticle({params: {id}}).then(res => {
					if (!res.state) {
						alert(res.message);
					} else {
						this.reload();
					}
				})
			},
			//改变分页数
			handleChangePage(index) {
				this.currPage = index;
				this.getTagArticle();
			},
			//更换标题时，重置分页为1
			resetPage() {
				this.$refs.page.currPage = 1;
			}
		}
	}
</script>

<style scoped>
	.article-manage .article-search-box {
		padding: 20px 0;
		border-bottom: 1px solid #ddd;
	}
	.article-search-box .select-btn, input, button:last-child{
		display: inline-block;
		margin-left: 10px;
	}
	.search-class {
		display:inline-block;
		margin-top: 0px;
	}
	.page {
		text-align: center;
		margin-top: 20px;
	}
</style>