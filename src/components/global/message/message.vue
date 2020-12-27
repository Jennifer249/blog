<template>
	<transition name="slide-fade">
		<div :class="['box', type]" v-if="show">
			<span>{{ text }}</span>
		</div>
	</transition>
</template>

<script>
	export default {
		name: 'Message',
		data() {
			return {
				text: '',
				type: 'info',  // 类型为info、error
				show: false,
				duration: 3000
			};
		},
		mounted() {
	      this.close();
	    },
	    methods: {
	      close() {
	        window.setTimeout(() =>{
	          this.show = false;
	        }, this.duration);
	      }
	    }
	};
</script>

<style scoped>
	.box {
		z-index: 40;
		padding: 16px 24px;
		text-align: center;
	    left: 50%;
	    transform: translateX(-50%);
		border-radius: 4px;
		box-shadow: 2px 2px 4px 0 rgba(0,0,0,.33);
		position: fixed;
		background-color: rgba(63, 63, 63, .9);
		bottom: 55px;
	}
	.info {
		color: #fff;
	}
	.error {
		color: red;
	}
	.slide-fade-enter-active {
		transition: all .5s ease-in-out;
	}
	.slide-fade-enter {
		bottom: -55px;
	}
</style>