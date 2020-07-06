<template>
    <div class="scroll-box" ref="box" 
    @mousewheel.stop.prevent="handleMouseWheel" 
    @mouseenter="handleMouseEnter" 
    @mouseleave="handleMouseLeave">
        <transition name="fade">
            <div :class="['scroll-bar', { force: force }]" ref="bar" 
            v-show="show" :style="{ 'height': barHeight + 'px'}" 
            @mousedown="handleMouseDown"></div>
        </transition>
        <slot></slot>
    </div>
</template>

<script>
	export default {
		name: 'ScrollBar',
		data() {
			return {
				box: undefined, // 自定义滚动条盒子
				bar: undefined, // 滚动条
				barHeight: 100, // 滚动条高度
				ratio: 1,       // 滚动条偏移率
				force: false,   // 滚动条是否被鼠标光标按住
				hover: false,   // 鼠标光标是否悬停在盒子上
				show: false     //是否显示滚动条 
			}
		},
		mounted() {
			this.box = this.$refs.box;
			this.bar = this.$refs.bar;
			//监听鼠标点击和拖着移动动作。全局可拖动
			document.addEventListener('mouseup', this.handleMouseUp);
			document.addEventListener('mousemove', this.handleMouseMove);
		},
		methods: {
		    //鼠标滚动事件
		    handleMouseWheel(e) {
		    	this.box.scrollTop -= e.wheelDelta / 4;
		    	this.bar.style.transform = 'translateY(' + (this.box.scrollTop + this.box.scrollTop / this.ratio) + 'px)';
		    },
            //鼠标按下
            handleMouseDown(e) {
             	if (e.target === this.bar) {
             		this.box.prevY = e.pageY;
             		this.force = true;
             	}
            },
            //鼠标按键释放
            handleMouseUp() {
             	this.force = false;
             	this.box.prevY = null;
             	if (!this.hover) {
             		this.show = false;
             	}
            },
           //鼠标移动
           handleMouseMove(e) {
           	if (this.force) {
                // 阻止默认选中事件(IE下无效)
                e.preventDefault();
                this.box.scrollTop += (e.pageY - this.box.prevY) * this.ratio
                this.bar.style.transform = 'translateY(' + (this.box.scrollTop + this.box.scrollTop / this.ratio) + 'px)';
                this.box.prevY = e.pageY;
              }
            },
            //鼠标光标进入盒子范围
            handleMouseEnter() {
           	this.hover = true
           	if (this.box.scrollHeight > this.box.clientHeight) {
                    // 修正进度条高度和位置(建议通过事件触发)
                    this.barHeight = this.box.clientHeight ** 2 / this.box.scrollHeight;
                    //-4由于样式top\bottom而做的调整
                    this.ratio = (this.box.scrollHeight - this.box.clientHeight) / (this.box.clientHeight - this.barHeight - 4);
                    this.bar.style.transform = 'translateY(' + (this.box.scrollTop + this.box.scrollTop / this.ratio) + 'px)';
                    // 显示滚动条
                    this.$nextTick(() => this.show = true);
                }
            },
          	//鼠标光标离开盒子范围
            handleMouseLeave() {
	           	this.hover = false;
	           	if (!this.force) {
	           		this.show = false;
	           	}
            }
        }
   }
</script>

<style scoped>
	.scroll-box {
		width: 100%;
		max-height: 230px;
		background: #fff;
		position: relative;
		padding-right: 8px;
		overflow: hidden;
	}
	.scroll-bar {
		width: 6px;
		top: 2px;
		bottom: 2px;
		right: 2px;
		background-color: rgba(144,147,153,.3);
		position: absolute;
		border-radius: 4px;
	}
	.scroll-bar:hover {
		background-color: rgba(144,147,153,.5);
	}
	.scroll-bar.force {
		background-color: rgba(144,147,153,.5);
	}
	/*Vue进入离开动画*/
	.fade-enter-active, .fade-leave-active {
		transition: opacity .34s ease-out;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>