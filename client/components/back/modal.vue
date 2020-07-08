<!-- 模态弹窗 -->
<template>
	<div class="modal" v-show='showModal' :style="styleObj">
		<div class="modal-dialog">
			<button class="close" @click="cancelClick">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>
			</button>
			<slot></slot>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'selfModal',
		data () {
			return {
				showModal: false
			}
		},
		props: {
		    styleObj: { // 用于承接样式类
		    	type: Object,
		    	default: function () {
		    		return {
		    			position: 'fixed',
		    			top: 0,
		    			left: 0,
		    			width: '100%',
		    			height: '100%',
		    			background: 'rgba(113,111,111,0.5)'
		    		}
		    	}
		    }
		},
		methods: {
		    // // 确定
		    // sureClick () {
		    // 
		    // },
		    // 取消
		    cancelClick () {
		    	this.showModal = false;
		    	this.$emit("closeModal");
		    }
		}
	}
</script>
<style scoped>
	.modal{
		z-index: 998;
	}
	.modal-dialog {
		z-index: 999;
		max-width: 600px;
		width: 600px;
		background: #fff;
		position: fixed;
	    margin: auto;
		left:0;
		right:0;
		margin-top: 7%;
		padding: 24px;
		border-radius: 4px;
		box-shadow: 2px 2px 4px #A0A0A0, -2px -2px 4px #A0A0A0;
	}
	.close {
		position: absolute;
		background-color: #fff;
		color: #ccc;
		top: 16px;
		right: 16px;
		width: 24px;
		height: 24px;
		padding: 2px;
		line-height: 28px;
		font-size: .875em;
	}
	.close:hover {
		color: rgba(0, 0, 0, .67);
		background-color: rgba(0,0,0,.05);
		/*隐藏元素轮廓*/
		outline: 0; 
    	text-decoration: none;
	}
	svg.icon {
		width: 1em;
	    height: 1em;
	    fill: currentColor;
	}
	/*IE9使用时需注意*/
	svg:not(:root) { 
		overflow: hidden;
	}
</style>