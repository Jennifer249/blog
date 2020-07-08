<template>
	<div class="comment-manage view">
		<Tag :info="tags" @currentTag="handleChangeTag"></Tag>
		<div v-if="loadOK">
			<BackCommentList @reply="handleSendReply" @del="handleDel" v-for="(item, index) in commentList" :key="item.comment_id" :info="item"></BackCommentList>
		</div>
		<div class="loadClass" v-else>{{ tipMsg }}</div>
	</div>
</template>

<script>
	import { getCommentList, sendReply, delComment } from '@/api/api';
	import Tag from '@/components/back/tag';
	import BackCommentList from '@/components/back/back_comment_list';

	export default {
		inject: ['reload'],
		components: { Tag, BackCommentList },
		data() {
			return {
				tags: ["收到的评论","我回复的评论"],
				loadOK: true,
				tipMsg: '',
				rawcommentList: [],
				commentList: []
			}
		},
		mounted() {
			this.getComments();
		},
		methods: {
			handleChangeTag(index) {
				if (index) {
					this.commentList = this.commentList.filter(item => item.visitor_id === 1);
				} else {
					this.commentList = this.rawcommentList;
				}
			},
			getComments() {
				getCommentList().then(res => {
					if (res.state === 0 || res.state === 1) {
						this.loadOK = false;
						this.tipMsg = res.message;
					} else {
						this.rawcommentList = res.data.commentList;
						this.commentList = res.data.commentList;
					}
				})
			},
			handleSendReply(msg, info) {
				let d = new Date();
				let fd = d.toLocaleDateString().replace(/\//g, '-') +" " + d.toTimeString().slice(0,8);
				let value = {
					articleId: info.article_id,
					visitorId: 1,
					comment: msg,
					date: fd,
					replyId: info.visitor_id,
					replyCommentId: info.comment_id,
					replyComment: info.comment_content,
					replyName: info.visitor_name,
					articleTitle: info.article_title,
					emailTo: info.visitor_email,
					url: window.origin + `/article_detail/${info.article_id}#anchor`
				}
				sendReply(value).then(res => {
					if (!res.state) {
						this.loadOK = false;
						this.tipMsg = res.message;
					}
					this.reload();
				})
			},
			handleDel(id, info) {
				delComment({"params": {id, aid: info.article_id}}).then(res => {
					if (!res.state) {
						this.loadOK = false;
						this.tipMsg = res.message;
					}
					this.reload();
				})
			}
		}

	}
</script>
