<template>
	<div class="article">
		<h2>
			<router-link :to=`/article/${info.id}`>{{ info.title }}</router-link>
		</h2>
		<p>{{ info.content }}</p>
		<div class="article-footer">{{ footerInfo }}</div>
	</div>
</template>

<script>
	export default {
		props: {
			info: Object
		},
		computed: {
			footerInfo() {
				return `${this.info.time}&nbsp;&nbsp;|&nbsp;&nbsp;浏览(${this.info.views})&nbsp;&nbsp;|&nbsp;&nbsp;留言(${this.info.comments})`;
			}
		}
	};
</script>

<style scoped>
	.article {
		padding: 16px 20px 12px 20px;
	    background-color: #fff;
	    box-shadow: 0 0 2px 0 rgba(58, 58, 58, 0.2);
	    margin-bottom: 30px; 
	    transition: all 0.1s ease-in-out;
	}
	.article:hover {
		box-shadow: 1px 1px 10px #5f5f5f;
	}

	.article-footer {
    	font-size: 14px;
	}
</style>