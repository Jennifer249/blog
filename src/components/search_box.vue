<template>
	<div class="search-box">
		<input type="text" name="" id="" placeholder="输入关键字搜索" v-model="value" :style="styleObj">
		<button class="search-btn" @click="search">
			<div class="icon-search">
				<svg t="1592749641003" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2549" width="20" height="20">
					<path d="M192 448c0-141.152 114.848-256 256-256s256 114.848 256 256-114.848 256-256 256-256-114.848-256-256z m710.624 409.376l-206.88-206.88A318.784 318.784 0 0 0 768 448c0-176.736-143.264-320-320-320S128 271.264 128 448s143.264 320 320 320a318.784 318.784 0 0 0 202.496-72.256l206.88 206.88 45.248-45.248z" fill="#fff" p-id="2550"></path>
				</svg>
			</div>
		</button>
	</div>				
</template>

<script>
	export default {
		data() {
			return {
				value: ''
			};
		},
		props: {
			styleObj: {
				type: Object,
				default() {
					return {
						border: '1px solid #999'
					};
				}
			}
		},
		methods: {
			search() {
				this.$emit('searchData', this.value.trim());
				this.value = '';
			}
		}
	};
</script>

<style scoped>
	.search-box {
		display: flex;
	}
	input {
	    background-color: #fff;
	    height: 33px;
	    padding: 6px 12px;
	    border-radius: 4px 0 0 4px;
	}
	.search-btn {
	    width: 40px;
	    border: 1px solid transparent;
	    color: #fff;
	    background: #33b7ff; 
	    cursor: pointer;  
	    border-radius: 0 4px 4px 0;
	}
	.icon-search {
		position: relative;
	}
	svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>