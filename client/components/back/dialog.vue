<template>
	<div class="dialog" v-show="isShowed">
		<div class="info">{{msg}}</div>
		<div class="footer-btn">
			<button class="sure" @click="handleSure">确定</button>
			<button class="cancel" @click="handleCloseModal">取消</button>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			msg: String
		},
		data() {
			return {
				isShowed: false
			}
		},
		methods: {
			handleSure() {
				this.$emit('dialogResult');
				this.isShowed = false;
			},
			handleCloseModal() {
				this.isShowed = false;
			}
		}
	}
</script>

<style scoped>
	.dialog {
		width: 500px;
		padding: 20px;
		position: fixed;
	    margin: auto;
	    top: 20%;
		left:0;
		right:0;
		border-radius: 4px;
		background-color: #fff;
		border: 1px solid #ddd;
		z-index: 20px;
		box-shadow: 1px 1px #A0A0A0;
		position: fixed;
	}
	.info {
		/*text-align: center;*/
		padding: 30px 50px;
	}
	.footer-btn {
		float: right;
	}
	.footer-btn button {
		width: 80px;
		outline: none;
	}
	.sure {
		background-color: #1C86EE;
		color: #fff;
		border: 1px solid transparent;
	}
	.sure:hover {
		opacity: .8;
	}
	.cancel {
		background-color: #fff;
		border: 1px solid #ddd;
	}
	.cancel:hover {
		background-color: rgba(211,211,211,.2);
	}
</style>