<template>
	<div class="dialog" v-show="show">
		<div class="prompt-box" v-if="info.flag === 1">{{info.tip}}</div>
		<div class="input-box" v-else>
			<p>{{info.title}}</p>
			<input type="text" v-model="msg" />
		</div>
		<div class="footer-btn">
			<button class="sure" @click="handleSure">确定</button>
			<button class="cancel" @click="handleCloseModal">取消</button>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			//包含tip提示信息，title输入框标题，flag是dialog类型，1为提示框，2为输入框
			info: Object
		},
		data() {
			return {
				show: false,
				msg: ''
			};
		},
		methods: {
			handleSure() {
				if (this.info.flag === 1) {
					this.$emit('dialogResult');
				} else {
					if(this.msg.trim()) {
						this.$emit('dialogResult', this.msg);
						this.msg = '';
					}
				}
				this.show = false;
			},
			handleCloseModal() {
				this.msg = '';
				this.show = false;
			}
		}
	};
</script>

<style scoped>
	.dialog {
		width: 450px;
		padding: 20px;
		position: fixed;
	    margin: auto;
	    top: 2%;
		left:0;
		right:0;
		border-radius: 4px;
		background-color: #fff;
		border: 1px solid #ddd;
		z-index: 60;
		box-shadow: 2px 2px 4px 0 rgba(0,0,0,.33);
		position: fixed;
	}
	/*提示框*/
	.prompt-box {
		padding: 10px 20px;
		height: 65px;
		color: #666;
	}
	/*输入框*/
	.input-box {
		padding-bottom: 20px; 
	}
	.input-box p {
		color: #666;
		font-size: 14px;
		line-height: 14px;
	}
	.input-box input {
		width: 100%;
		height: 30px;
		border-radius: 4px;
		border: 1px solid #ddd;
	}
	.footer-btn {
		float: right;
	}
	.footer-btn button {
		width: 70px;
		outline: none;
	}
	.sure {
		background-color: rgba(66,133,244);
		color: #fff;
		border: 1px solid transparent;
	}
	.sure:hover {
		opacity: .8;
	}
	.cancel {
		color: rgba(66,133,244);
		background-color: #fff;
		border: 1px solid #ddd;
	}
	.cancel:hover {
		background-color: rgba(211,211,211,.2);
	}
</style>