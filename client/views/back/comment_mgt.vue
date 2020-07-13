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
	import { mapState, mapMutations } from 'vuex';

	export default {
		inject: ['reload'],
		components: { Tag, BackCommentList },
		data() {
			return {
				tags: ["收到的评论","我回复的评论"],
				tipMsg: '',
				rawcommentList: [],
				commentList: []
			}
		},
		mounted() {
			this.initLoadOK();
			this.getComments();
		},
		computed: {
			...mapState(['loadOK'])
		},
		methods: {
			...mapMutations(['chgLoadOK', 'initLoadOK']),
			handleChangeTag(index) {
				if (index) {
					this.commentList = this.commentList.filter(item => item.visitor_id === 1);
				} else {
					this.commentList = this.rawcommentList;
				}
			},
			getComments() {
				getCommentList().then(res => {
					console.log(res)
					if (res.state && res.data.length) {
						this.rawcommentList = res.data;
						this.commentList = res.data;
					} else {
						this.chgLoadOK();
						this.tipMsg = '还没有评论';
					}
				}).catch(err => {
					console.log(err);
				});
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
					this.reload();
				}).catch(err => {
					console.log(err);
				})
			},
			handleDel(id, info) {
				delComment({"params": {id, aid: info.article_id}}).then(res => {
					this.reload();
				}).catch(err => {
					console.log(err);
				})
			}
		}

	}
</script>
