<template>
	<div class="select-btn">
		<div class="dropdown-btn" :style="style">
			{{ selectItem }}
			<div><span class="caret"></span></div>
		</div>
	    <div class="drop-list" :style="style" style="display: none;">
	        <ScrollBar>
	           <ul :style="style">
					<li v-for="(item, index) in info.data" :class="{active:isTrue === index}" @click="handleChangeCurrent(item, index)" >{{item}}</li>
				</ul>
	        </ScrollBar>
	    </div>
	</div>
</template>

<script>
	import ScrollBar from './scroll_bar'
	export default {
		props: {
			initInfo: Object
		},
		components: {ScrollBar},
		data() {
			return {
				isTrue: -1,
				info: this.initInfo,
				fontSize:100
			}
		},
		computed: {
			selectItem() {
				if (this.isTrue === -1) {
					return this.info.name;
				} else {
					return this.info.data[this.isTrue];
				}
			},
			style() {
				return {
					width: this.info.width + "px"
				}
			}
		},
		methods: {
			handleChangeCurrent(item, index) {
				this.isTrue = index;
				this.$emit('selectData', this.info.name, item);
			},
			setIsTrue(index) {
				this.isTrue = index;
			}
		}
	}
</script>

<style scoped>
   
	.select-btn {
		font-size: 14px;
		display: inline-block;
		margin-left: 10px;
		position: relative;

	}
	.select-btn:hover ul {
		display: inline-block !important;
	}
	.dropdown-btn {
		background-color: #fff;
		border: 1px solid #999;
		padding: 6px 12px;
		border-radius: 4px;
		width: 80px;
	}
	.dropdown-btn > div {
	 	display: inline-block;
	 	position: absolute;
		top: 50%;
		right: 5px;
		transform: translate(-50%, -50%);

	}
	.caret {
	 	display: inline-block;
	 	vertical-align: middle;
	 	border-top: 4px dashed;
	 	border-right: 4px solid transparent;
	 	border-left: 4px solid transparent;
	 }
	.select-btn:hover .caret {
	 	transition: transform .3s,-webkit-transform .3s;
	 	transform: rotate(180deg);
	}
	.select-btn:hover .drop-list {
		display: block !important;
	}
	.drop-list {
        background-color: #fff;
	 	width: 80px;
        height: 100%;
        position: absolute;
	 	box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
	ul li {
		padding: 6px 20px;
	 	cursor: pointer;
	 	white-space: nowrap;
	}
	ul li:hover {
	 	background-color: #f5f5f5;
	}
	ul li.active {
		background: #f5f7fa;
		color: #349edf;
	}
</style>