<template>
	<ul class="comment-list">
		<li class="comment-line-box d-flex">
			<div>
				<div class="sm-user-pic" v-if="item.comment.visitor_id  === 1"></div>
				<div class="visitor-pic" v-else></div>
			</div>
			<div class="box-right">
				<span class="comment-author">{{ item.comment.visitor_name }}</span>
				<span class="colon" v-if="!isChild">:</span>
				<span v-else>
					<span class="text">回复</span>
					<span class="comment-reply">{{ item.comment.reply_name }}</span>
				</span>
				<span class="opt opt-response" @click="replyMsg(item.comment)">回复</span>
				<span class="comment-content">
					{{ item.comment.comment_content }}
					<span class="comment-time">{{ new Date(item.comment.comment_time).toLocaleDateString().replace(/\//g, '-') + " " + new Date(item.comment.comment_time).toTimeString().slice(0, 5)}}</span>
				</span>
			</div>
		</li>
		<li class="comment-line-reponse"  v-if="item.children">
			<CommentList v-for="(child, index) in item.children" :item="child" :key="index" :isChild="true"></CommentList>
		</li>
	</ul>
</template>

<script>
	import Bus from '@/assets/js/bus';
	export default {
		name: "CommentList",
		props: {
			item: {
				type: Object,
				required: true
			},
			isChild: {
				type: Boolean
			}
		},
		data() {
			return {
				isOpen: false,
			}
		},
		methods: {
			replyMsg(item) {
				Bus.$emit('reply', item);
			}
		}
	}
</script>

<style scoped>
	.comment-list {
	    margin-top: 20px;
	}

	.comment-list li{
	    margin-bottom: 15px;
	}

	ul, li {
	    position: relative;
	}

	.comment-list-box > ul:not(:last-child) {
	    border-bottom: 1px solid #f7f7fc; 
	}

	.visitor-pic {
	    width: 24px;
	    height: 24px;
	    border-radius: 50%;
	    margin: 0 8px 0 0;
    	background: url(~@/assets/images/visitor.jpg);
    	background-size: 24px 24px;
	}

	.box-right {
	    font-size: 14px;
	    line-height: 1.6;
	    display: inline-block;
	}

	span.comment-author, span.comment-reply {
	    color: #555666;
	}

	.colon {
	    font-weight: bold;
	}

	.box-right span.comment-content {
	    display: block;
	    margin-top: 8px;
	    padding-right: 45px;
	    word-break: break-all;
	}

	.box-right span.comment-time {
	    color: #999aaa;
	    margin-left: 8px;
	    font-size: 12px;
	    vertical-align: top;
	    word-break: keep-all;
	}

	.opt-response {
	    position: absolute;
	    padding: 0 8px;
	    top: 0px;
	    right: 0px;
	}

	.opt:hover {
	    color: #277ccc;
	    cursor: pointer;
	}

	.comment-line-reponse {
	    margin-left: 20px;
	    padding-left: 10px;
	    border-left: 2px solid #f5f6f7;
	}

	span.text {
	    margin: 0 6px;
	    font-size: 12px;
	    color: #999;
	    font-weight: normal;
	}

	.sm-user-pic {
	    width: 24px;
	    height: 24px;
	    border-radius: 50%;
	    margin: 0 8px 0 0;
    	background: url(~@/assets/images/user.jpg);
    	background-size: 24px 24px;
	}
</style>