<template>
	<ul v-if="len-1">
		<li v-for="(item, index) in items" :key="item" @click="handlePage(index)" :class="{active:currPage === index}">{{ item }}</li>
	</ul>
</template>

<script>
export default {
	props: {
		info: Object
	},
	data() {
		return {
			currPage: 1
		};
	},
	computed: {
		items() {
			let arr = [];
			for(let i=0; i<this.len; i++) {
				arr[i] = i+1;
			}
			arr = ['上一页', ...arr, '下一页'];
			return arr;
		},
		//分页数，当为1时，隐藏
		len() {
			//articleSum等于0的情况。没有文章时或显示全部文章时，都应设为0，用于隐藏分页
			if (!this.info.articleSum) {
				return 1;
			}
			return Math.ceil(this.info.articleSum / this.info.pageArticle);
		}
	},
	methods: {
		handlePage(index) {
			let old = this.currPage;
			//点击上一页
			if (index === 0) {
				if (this.currPage !== 1) {
					this.currPage--;
				}
				//点击下一页
			} else if (index === (this.len + 1)) {
				if (this.currPage !== this.len) {
					this.currPage++;
				}
			} else {
				this.currPage = index;
			}
			//当页数有变化时，触发
			if (old !== this.currPage) {
				this.$emit('page', this.currPage);
			}
		}
	}
};
</script>

<style scoped>
	ul {
	    display: inline-block;
	}
	ul li {
	    font-size: 14px;
	    line-height: 1.4;
	    padding: 6px 12px;
	    margin: 0px;
	    border: 1px solid #ddd;
	    float: left;
	    background: #fff;
	    margin-left: -1px;
	    cursor: pointer;
	}
	ul li:hover {
	    background: #ddd;
	}
	ul li.active {
		background-color: #edeff2;
	}
</style>
