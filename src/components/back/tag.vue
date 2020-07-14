<template>
	<ul>
		<li
			v-for="(item, index) in info"
			:class="{active:isTrue === index}"
			@click="handleChangeTitle(index)"
			:key="item">
			{{ item }}
		</li>
	</ul>
</template>

<script>
export default {
	props: {
		info: Array
	},
	data() {
		return {
			isTrue: 0,
		};
	},
	methods: {
		handleChangeTitle(index) {
			this.isTrue = index;
			this.$emit('currentTag', index);
		}
	}

};
</script>
<style scoped>
	ul {
		border-bottom: 1px solid #ddd;
	}
	ul li {
		font-size: 14px;
		color: #999;
		display: inline-block;
		margin-right: 20px;
		font-family: 'Microsoft YaHei','SF Pro Display',Roboto,Noto,Arial,'PingFang SC',sans-serif£»
	}
	ul li:hover{
		color: #1296db;
		cursor: pointer;
	}
	ul li.active {
		color: #111;
		padding-bottom: 10px;
		border-bottom: 2px solid #1296db;
	}
</style>
