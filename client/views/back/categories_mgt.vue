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
				<tr draggable="true" v-for="item in categoriesList">
					<td>{{item.categories_name}}</td>
					<td>
						<span><router-link :to="{name: 'sub_categories_mgt', params: {id: item.categories_id, title: item.categories_name}}">管理</router-link></span>
						<span @click="handleRename(item)">重命名</span>
						<span @click="handleDel(item)">删除</span>
					</td>
					<td>{{item.categories_article_sum ? item.categories_article_sum : '0'}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import {requestCategories, updateCategories, delCategories, addCategories} from '@/api/api';
	export default {
		data() {
			return {
				categoriesList: [],
				newCategories: ''
			}
		},
		mounted() {
			this.getCategories();
		},
		methods: {
			getCategories() {
				requestCategories().then(res => {
					if(!res.state) {
						this.loadOK = true;
					} else {
						this.categoriesList = res.data.categories;
						window.localStorage.categories = JSON.stringify(res.data.categories);
					}
				})
			},
			handleRename(item) {
				let name = prompt("请输入专栏名");
				if(name === item.categories_name) {
					alert("专栏名不得相同");
				} else if(name !== "") {
					let params = {
						id: item.categories_id,
						name
					}
					updateCategories(params).then(res => {
						alert(res.message);
						if(res.state) {
							window.location.reload();
						}
					})
				}
			},
			handleDel(item) {
				let r = confirm("确认删除吗?");
				if(!r) {
					return;
				}
				let params = {id: item.categories_id};
				delCategories({"params": params}).then(res => {
					alert(res.message);
					if(res.state) {
						window.location.reload();
					}
				})
			},
			handleAdd() {
				if(this.newCategories === '') {
					return;
				}
				addCategories({name: this.newCategories}).then(res => {
					alert(res.message);
					if(res.state) {
						window.location.reload();
					}
				})
				this.newCategories === '';
			}
		}
	}
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