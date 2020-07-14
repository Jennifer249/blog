<template>
	<div class="categories-manage view">
		<div class="categories-title clearfix">
			<h3>分类管理</h3>
			<button class="search-btn" @click="handleAdd">增加</button>
			<input type="text" placeholder="输入新的分类" v-model="newCategories">
		</div>
		<table id="catogories-table">
			<thead>
				<tr>
					<th>类别</th>
					<th>操作</th>
					<th>文章数</th>
				</tr>
			</thead>
			<tbody>
				<tr draggable="true" v-for="item in categoriesList" :key="item.categories_id">
					<td>{{ item.categories_name }}</td>
					<td>
						<span><router-link :to="{name: 'sub_categories_mgt', params: {id: item.categories_id, title: item.categories_name}}">管理</router-link></span>
						<span @click="handleShowDialog(item, 2)">重命名</span>
						<span @click="handleShowDialog(item, 1)">删除</span>
					</td>
					<td>{{ item.categories_article_sum ? item.categories_article_sum : '0' }}</td>
				</tr>
			</tbody>
		</table>
		<Dialog :info="dialogInfo" @dialogResult="handleProcess" ref="dialog"></Dialog>
	</div>
</template>

<script>
	import { getCategories, updateCategories, delCategories, addCategories } from '@/api/api';
	export default {
		inject: ['reload'],
		data() {
			return {
				categoriesList: [],
				newCategories: '',
				dialogInfo: {
					tip: '确认删除吗?',
					//类型为提示框
					flag: 1,
					title: '请输入专栏名'
				},
				pendingItem: {},
			};
		},
		mounted() {
			this.getCategoriesM();
		},
		methods: {
			//获取目录
			getCategoriesM() {
				getCategories().then(res => {
					this.categoriesList = res.data;
					window.sessionStorage.categories = JSON.stringify(res.data);
				}).catch(err => {
					console.log(err);
				});
			},
			//显示弹框
			handleShowDialog(item, option) {
				this.dialogInfo.flag = option;
				this.$refs.dialog.show = true;
				this.pendingItem = item;
			},
			//处理重命名或删除
			handleProcess(name) {
				if (this.dialogInfo.flag === 1) {
					this.del();
				} else {
					this.rename(name);
				}
			},
			//重命名目录
			rename(name) {
				let params = {
					id: this.pendingItem.categories_id,
					name
				};
				updateCategories(params).then(res => {
					this.reload();
				}).catch(err => {
					console.log(err);
				});
			},
			//删除目录
			del() {
				let params = {id: this.pendingItem.categories_id};
				delCategories({'params': params}).then(res => {
					this.reload();
				}).catch(err => {
					console.log(err);
				});
			},
			//新增目录
			handleAdd() {
				if (this.newCategories === '') {
					return;
				}
				addCategories({name: this.newCategories}).then(res => {
					this.reload();
				}).catch(err => {
					console.log(err);
				});
				this.newCategories = '';
			}
		}
	};
</script>

<style scoped>
	.categories-title h3 {
		display: inline-block;
	}

	.categories-title > input {
		border-bottom-right-radius: 0px;
		border-top-right-radius: 0px;
		border: 1px solid #ccc;
		height: 30px;
		padding: 0 10px;
		float: right;
	}

	.categories-title > button {
		float: right;
		width: 40px;
	    height: 30px;
		border-bottom-left-radius: 0px;
		border-top-left-radius: 0px;
		background: #33B7FF;
		font-size: 12px;
		color: #fff;
		border: 1px solid transparent;
	    cursor: pointer;
	    text-align: center;
	}
	table {
	  width: 100%;
	  border-collapse: collapse;
	}

	table tr th, td {
	  padding: 20px;
	  line-height: 1.6;
	  border-bottom: 1px solid #ddd;
	}

	table tr th {
	  text-align: left;
	  border-bottom: 2px solid #ddd;
	}

	table tr:first-child th {
	  border-top: 0;
	}

	table tr td:not(:first-child), th:not(:first-child) {
		text-align: center;
	}

	.categories-manage table tr td span, a {
		font-size: 12px;
		color: #1296db;
		padding: 8px;
		cursor: pointer;
	}

	table tr td span:not(:first-child) {
		border-left: 1px solid #ddd;
	}
</style>
