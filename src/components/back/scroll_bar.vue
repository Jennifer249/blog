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
				box: undefined, // �Զ������������
				bar: undefined, // ������
				barHeight: 100, // �������߶�
				ratio: 1,       // ������ƫ����
				force: false,   // �������Ƿ�����갴ס
				hover: false,   // ������Ƿ���ͣ�ں�����
				show: false     //�Ƿ���ʾ������ 
			};
		},
		mounted() {
			this.box = this.$refs.box;
			this.bar = this.$refs.bar;
			//����������������ƶ�������ȫ�ֿ��϶�
			document.addEventListener('mouseup', this.handleMouseUp);
			document.addEventListener('mousemove', this.handleMouseMove);
		},
		methods: {
		    //�������¼�
		    handleMouseWheel(e) {
		    	this.box.scrollTop -= e.wheelDelta / 4;
		    	this.bar.style.transform = 'translateY(' + (this.box.scrollTop + this.box.scrollTop / this.ratio) + 'px)';
		    },
            //��갴��
            handleMouseDown(e) {
             	if (e.target === this.bar) {
             		this.box.prevY = e.pageY;
             		this.force = true;
             	}
            },
            //��갴���ͷ�
            handleMouseUp() {
             	this.force = false;
             	this.box.prevY = null;
             	if (!this.hover) {
             		this.show = false;
             	}
            },
           //����ƶ�
           handleMouseMove(e) {
           	if (this.force) {
                // ��ֹĬ��ѡ���¼�(IE����Ч)
                e.preventDefault();
                this.box.scrollTop += (e.pageY - this.box.prevY) * this.ratio;
                this.bar.style.transform = 'translateY(' + (this.box.scrollTop + this.box.scrollTop / this.ratio) + 'px)';
                this.box.prevY = e.pageY;
              }
            },
            //����������ӷ�Χ
            handleMouseEnter() {
           	this.hover = true;
           	if (this.box.scrollHeight > this.box.clientHeight) {
                    // �����������߶Ⱥ�λ��(����ͨ���¼�����)
                    this.barHeight = this.box.clientHeight ** 2 / this.box.scrollHeight;
                    //-4������ʽtop\bottom�����ĵ���
                    this.ratio = (this.box.scrollHeight - this.box.clientHeight) / (this.box.clientHeight - this.barHeight - 4);
                    this.bar.style.transform = 'translateY(' + (this.box.scrollTop + this.box.scrollTop / this.ratio) + 'px)';
                    // ��ʾ������
                    this.$nextTick(() => this.show = true);
                }
            },
          	//������뿪���ӷ�Χ
            handleMouseLeave() {
	           	this.hover = false;
	           	if (!this.force) {
	           		this.show = false;
	           	}
            }
        }
   };
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
	/*Vue�����뿪����*/
	.fade-enter-active, .fade-leave-active {
		transition: opacity .34s ease-out;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>