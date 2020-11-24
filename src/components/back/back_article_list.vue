<template>
	<div class="article-item">
		<span class="state-tip" ref="tip">{{ state }}</span>
		<router-link :to="{name:'article_detail', params: {id: info.article_id}}" target="_blank">{{ info.article_title }}</router-link>
		<div class="item-info">
			<div class="item-info-left">
				<span>{{ articleInfo }}</span>
			</div>
			<div class="item-info-right">
				<router-link :to="{name: 'edit_article', query: {id: info.article_id}}">编辑</router-link>
				<span ref="priSpan" @click="handleChangeState">私密</span>
				<span @click="handleShowDialog">删除</span>
			</div>
		</div>
		<Dialog :info="dialogInfo" @dialogResult="handleDel" ref="dialog"></Dialog>
	</div>
</template>

<script>
export default {
	props: {
		info: Object,
	},
	data() {
		return {
			dialogInfo: {
				tip: '确认删除吗?',
				// 类型为提示框
				flag: 1
			}
		};
	},
	computed: {
		// 文章信息条
		articleInfo() {
			let d = new Date(this.info.article_time);
			return `${d.toLocaleDateString().replace(/\//g, '-') + ' ' + d.toTimeString().slice(0,8)} | 阅读量(${this.info.article_visits}) | 评论数(${this.info.article_comments})`;
		},
		// 文章状态
		state() {
			if (this.info.article_state === 2) {
				return '私密';
			}
			else if (this.info.article_state === 3) {
				return '草稿';
			}
			return '';
		}
	},
	mounted() {
		// 文章状态显示
		if (this.info.article_state === 1) {
			this.$refs.priSpan.innerText = '私密';
			this.$refs.tip.style.display = 'none';
		}
		else if (this.info.article_state === 2) {
			this.$refs.priSpan.innerText = '公开';
		}
		else {
			this.$refs.priSpan.style.display = 'none';
		}
	},
	methods: {
		// 改变文章状态
		handleChangeState() {
			this.$emit('chgState', this.info.article_id, this.info.article_state);
		},
		// 显示弹框
		handleShowDialog() {
			this.$refs.dialog.show = true;
		},
		handleDel() {
			this.$emit('del', this.info.article_id, this.info.article_state);
		}
	}
};
</script>

<style scoped>
	.article-item  {
		padding: 15px 0;
		border-bottom: 1px solid #ddd;
	}
	.article-item > a {
		color: #4d4d4d;
		font-size: 18px;
	}
	.state-tip {
		border: 1px solid #ddd;
		font-size: 12px;
		padding: 5px;
		color: #999;
	}
	.item-info {
        margin-top: 14px;
		font-size: 12px;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		color: #999;
		display: flex;
	}
	.item-info-right {
		margin-right: 10px;
	}
	.item-info-right a, .item-info-right span {
		color: #1296db;
		padding: 0 10px;
		cursor: pointer;
	}
</style>
