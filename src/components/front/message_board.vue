<template>
	<div>
		<div class="comment-response" id="anchor">
			<h3>留言板</h3>
			<span v-text=replyName class="reply-class"></span>
			<a @click="closeBtn" v-if="replyName" class="opt">取消</a>
			<Form @submit.prevent="submit">
				<fieldset>
					<input type="text" name="name" class="Form-style" placeholder="Your name..." v-model="respondForm.name" autocomplete="off" required>
					<input type="text" name="email" class="Form-style" placeholder="Your email (not be published)..." v-model="emailFrom" autocomplete="off" required>
				</fieldset>
				<fieldset>
					<textarea name="message" id="message" rows="6" class="Form-style" placeholder="Your message..." v-model="respondForm.comment" autocomplete="off" required></textarea>
				</fieldset>
				<fieldset>
					<button type="submit">SEND MESSAGE</button>
					<span class="tip">{{ tip }}</span>
				</fieldset>
			</Form>
		</div>
		<div class="comment-list-box" v-if="FormatCommentList.length">
			<h3>最新评论</h3>
			<CommentList v-for="item in FormatCommentList" :key="item.comment_id" :item="item" :isChild="false"></CommentList>
		</div>
	</div>
</template>

<script>
import { submitMessageBoard, getCommentList } from '@/api/api';
import CommentList from '@/components/front/comment_list';
import Bus from '@/assets/js/bus';
export default {
	components: { CommentList },
	props: {
		id: Number
	},
	data() {
		return {
			respondForm: {
				aid: this.id,
				name: '',
				emailFrom: '',
				emailTo: '',
				comment: '',
				date: '',
				replyId: 1,
				replyName: '',
				replyCommentId: 0,
				replyComment: '',
				url: '',
				articleTitle: ''
			},
			commentList: [],
			FormatCommentList: [],
			replyName: '',
			tip: '',
			emailFrom: ''
		};
	},
	watch: {
		id() {
			this.respondForm.aid = this.id;
			// 设置该评论所在的url
			this.respondForm.url = window.origin + this.$route.fullPath +'/#anchor';
			this.getComments(this.respondForm.aid);
		},
		emailFrom() {
			this.tip = ' ';
		}
	},
	mounted() {
		// 设置该评论所在的url
		this.respondForm.url = window.origin + this.$route.fullPath +'/#anchor';
		Bus.$on('reply', item => {
			if (item.visitor_id === 1) {
				this.replyName = '';
			} else {
				this.replyName = '@' + item.visitor_name;
			}
			this.respondForm.emailTo = item.visitor_email;
			this.respondForm.replyId = item.visitor_id;
			this.respondForm.replyName = item.visitor_name;
			this.respondForm.replyComment = item.comment_content;
			this.respondForm.replyCommentId = item.comment_id;


			// 锚点跳转到留言板
			this.$el.querySelector('#anchor').scrollIntoView();

		});
		this.getComments(this.id);
	},
	methods: {
		submit() {
			// 邮箱验证
			var verify = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (!verify.test(this.emailFrom)) {
				this.tip = '邮箱格式错误';
				return;
			}
			this.tip = '提交中...';
			this.respondForm.emailFrom = this.emailFrom;
			let d = new Date();
			this.respondForm.date = d.toLocaleDateString().replace(/\//g, '-') + ' ' + d.toTimeString().slice(0, 8);
			submitMessageBoard(this.respondForm).then(res => {
				console.log(res);
				this.tip = '';
				this.respondForm.name = '';
				this.respondForm.emailTo = '';
				this.respondForm.emailFrom = '';
				this.respondForm.comment = '';
				this.respondForm.replyComment = '';
				this.getComments(this.id);
				this.closeBtn();
			}).catch(err => {
				console.log(err);
			});
		},
		getComments(id) {
			this.FormatCommentList = [];
			getCommentList({params: {id, order: 'ASC'}}).then(res => {
				console.log(res);
				this.commentList = res.data;
				// 将服务器返回的评论列表转换为需要的格式
				this.commentList.forEach((item, index, array) => {
					if (!item.reply_comment_id) {
						this.FormatCommentList.push({comment: item});
					} else {
						let fc = {
							children:this.FormatCommentList
						};
						this.preOrder(fc, item, {state: false});
						this.FormatCommentList = fc.children;
					}
				});
				this.FormatCommentList.reverse();
			}).catch(err => {
				console.log(err);
			});
		},
		// 深度优先遍历，将新的评论增加到找到（回复）的评论后面
		preOrder(fc, item, f) {
			if (fc) {
				if (fc.hasOwnProperty('comment') && fc.comment.comment_id === item.reply_comment_id) {

					if(!fc.children) {
						Object.assign(fc, {children: []});
					}
					fc.children.push({comment: item});
					f.state = true;
					return;
				}
				if (fc.children) {
					this.preOrder(fc.children, item, f);
				} else {
					for (let i = 0; i < fc.length; i++) {
						if (f.state) {
							return;
						}
						this.preOrder(fc[i], item, f);
					}
				}
			}
		},
		// 取消回复按钮
		closeBtn() {
			this.replyName = '',
			this.respondForm.replyId = 1;
			this.respondForm.replyCommentId = 0;
		}
	}
};
</script>

<style scoped>
	.comment-response {
	    padding: 20px 20px;
	    background-color: #fff;
	    margin-bottom: 30px;
	    box-shadow: 0 0 2px 0 rgba(58, 58, 58, 0.2);
	    width: 100%;
	}

	.comment-response h3 {
	  margin: 0 10px 20px 0;
	  display: inline-block;
	}

	.reply-class {
		color: #6f6f82;
	}

	.cancel {
		color: #5094d5;
		font-size: 14px;
	}

	.comment-response input {
	    margin-bottom: 20px;
	    height: 40px;
	    line-height: 40px;
	    font-size: 14px;
	    width: 48%;
	}

	.comment-response input:last-child {
	    float: right;
	}

	.comment-response textarea {
	    width: 100%;
	    margin-bottom: 14px;
	}

	.Form-style {
	    padding: .375rem .75rem;
	}

	.comment-response button {
	    color: #fff;
	    font-size: 12px;
	    padding: 10px 20px;
	    border: none;
	    cursor: pointer;
	}

	@media (max-width: 992px) {
	    .comment-response input {
	        width: 100%;
	    }
	}
	input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
	    color: #666;
	    font-size: 16px;
	    font-family: Liberation Mono, Menlo,monospace;
	}

	input:-moz-placeholder, textarea:-moz-placeholder {
	    color: #666;
	    font-size: 16px;
	    font-family: Liberation Mono, Menlo,monospace;
	}

	input::-moz-placeholder, textarea::-moz-placeholder {
	    color: #666;
	    font-size: 16px;
	    font-family: Liberation Mono, Menlo,monospace;
	}

	input:-ms-input-placeholder, textarea:-ms-input-placeholder {
	    color: #666;
	    font-size: 16px;
	    font-family: Liberation Mono, Menlo,monospace;
	}

	.content-left .comment-list-box {
	    padding: 20px 20px;
	    background-color: #fff;
	    margin-bottom: 30px;
	    box-shadow: 0 0 2px 0 rgba(58, 58, 58, 0.2);
	    width: 100%;
	}

	.tip {
		color: red;
		font-size: 14px;
		padding-left: 10px;
	}

</style>
