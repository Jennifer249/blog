<template>
	<ul v-if="len-1">
		<li v-for="(item, index) in items" :key="index" @click="handlePage(index)" :class="{active:currPage === index}">{{ item }}</li>
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
			}
		},
		computed: {
			items() {
				let arr = [];
				for(let i=0; i<this.len; i++) {
					arr[i] = i+1;
				}
				arr = ["上一页", ...arr, "下一页"];
				return arr;
			},
			len() {
				if (!this.info.articleSum) {
					return 1;
				}
				return Math.ceil(this.info.articleSum / this.info.pageArticle);
			}
		},
		methods: {
			handlePage(index) {
				let tmp = this.currPage;
				if (index === 0) {
					if (this.currPage === 1) {
						index = 1;
					} else {
						this.currPage--;
					}
				} else if (index === (this.len + 1)) {
					this.currPage = this.len;
				} else {
					this.currPage = index;
				}
				if (tmp !== this.currPage) {
					this.$emit("page", this.currPage);
				}
			}
		}
	}
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