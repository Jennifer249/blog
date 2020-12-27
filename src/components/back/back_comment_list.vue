<template>
	<div class="comment-list">
		<div class="tips">
			<span class="visitor-name">{{info.visitor_name}}</span>
			<span class="comment-time">{{date}}</span>
			<span>评论了文章:</span>
			<span class="comment-article">
				<router-link :to="{name:'article_detail', params: {id: info.article_id}}" target="_blank">{{info.article_title}}</router-link></span>
			<span class="comment-delete" @click="handleShowDialog">删除</span>
			<span class="comment-reply"  @click="isShow=isShow?false:true">回复</span>
		</div>
		<blockquote>{{info.comment_content}}</blockquote>
		<div class="reply" v-show="isShow">
			<input v-model="message" type="text" placeholder="发表你的评论">
			<button @click="handleReply">回复评论</button>
		</div>
		<Dialog :info="dialogInfo" @dialogResult="handleDel" ref="dialog"></Dialog>
	</div>
</template>

<script>
	export default {
		props: {
			info: Object
		},
		data() {
			return {
				isShow: false,
				// 评论内容
				message: '',
				dialogInfo: {
					tip: '确认删除吗?',
					// 类型为提示框
					flag: 1
				}
			};
		},
		computed: {
			date() {
				return this.info.comment_time.replace(/\T/g, ' ').slice(0, 19);
			}
		},
		methods: {
			handleReply() {
				if (this.message === '') {
					this.$myMessage('回复不得为空');
					return;
				}
				this.$emit('reply', this.message, this.info);
			},
			handleDel() {
				this.$emit('del', this.info.comment_id, this.info);
			},
			// 显示弹框
			handleShowDialog() {
				this.$refs.dialog.show = true;
			},
		}
	};
</script>
<style scoped> 
	.comment-list {
		font-size: 14px;
		color: #999;
		padding-top: 20px;
		border-bottom: 1px solid #ddd;
	}
	.comment-list .tips span {
		padding: 5px;
	}

	.comment-list .tips .visitor-name {
		color: #4f4f4f;
	}

	.comment-list .tips .comment-article a {
		color: #1296db;
	}

	.comment-list .tips .comment-reply, .comment-delete {
		color: #1296db;
		float: right;
		margin-right: 10px;
		cursor: pointer;
	}
	.comment-list blockquote {
		color: #4f4f4f;
		line-height: 1.6;
	}
	.reply {
		text-align: center;
		display: flex;
		margin-bottom: 10px;
	}
	.reply input {
		width: 90%;
		border-radius: 20px;
		border: 1px solid #ddd;
		padding-left: 10px;
	}
	.reply button {
		white-space: nowrap;
		padding: 5px 10px;
		margin-left: 5px;
		color: #ff654f;
		background-color: #fff;
		transition: all .3s ease-in;
		border: 1px solid #ff654f;
		cursor: pointer;
		border-radius: 4px;
		outline: none;

	}
	.reply button:hover {
		background-color: #ff654f;
		color: #fff;
	}
</style>