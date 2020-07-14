<template>
    <header id="site-header">
        <div class="container header-inner" @mouseleave="toggle">
            <div class="header-brand">
                <h1>
                    <router-link :to="{name: 'front_home'}">陈卓林&nbsp;|&nbsp;技术博客</router-link>
                </h1>
                <div :class="['menu-toggle', {x: isActive}]" @click="isActive=!isActive" ref="menu">
                    <span></span>
                    <span></span>
                </div>
            </div>
            <transition name="fade">
                <div class="header-main" v-if="isActive">
                    <ul>
                        <li :class="{active:activeClass(item.name)}" v-for="(item, index) in tag" :key="item.name"><router-link :to="{name: item.name}">{{ item.title }}</router-link></li>
                    </ul>
                    <div class="header-search">
                        <SearchBox @searchData="getSearchData" :styleObj="styleObj"></SearchBox>
                    </div>
                </div>
            </transition>
        </div>
    </header>
</template>

<script>
    import SearchBox from '@/components/search_box';
    import Bus from '@/assets/js/bus';
    export default {
        components: {SearchBox},
        data() {
            return {
                styleObj: {
                    border: '1px solid #ccc'
                },
                scrollWidth: 0,
                isActive: false,
                tag: [
                {
                    name: 'front_home', title: '首页'
                },
                {
                    name: 'map_site', title: '归档'
                }],
                isTrue: 0
            };
        },
        mounted() {
            //计算右侧滚动条的宽度
            this.scrollWidth = this.getScrollbarWidth();
            window.addEventListener('resize', this.toggle);
            this.toggle();
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.toggle);
        },
        methods: {
            getSearchData(value) {
                if (!value) {
                    return;
                }
                Bus.$emit('searchResult', value);
            },
            toggle() {
                var offsetWid = document.documentElement.clientWidth;
                // 减去右侧滚动条的宽度
                if (offsetWid > (767 - this.scrollWidth)) {
                    this.isActive = true;
                } else {
                    this.isActive = false;
                }
            },
            // 计算右侧滚动条的宽度
            getScrollbarWidth() {
                var oP = document.createElement('p'),
                styles = {
                    width: '100px',
                    height: '100px',
                    overflowY: 'scroll'
                }, i, scrollbarWidth;

                for (i in styles) {
                    oP.style[i] = styles[i];
                }
                document.body.appendChild(oP);
                scrollbarWidth = oP.offsetWidth - oP.clientWidth;
                oP.remove();
                return scrollbarWidth;
            },
            activeClass(pathName) {
                return pathName === this.$route.name;
            }
        }
    }
</script>
<style scoped>
    /*头部flex布局*/
    header .header-inner {
        display: flex;
        display: -webkit-flex;  /*webkit内核的浏览器必须加上-webkit-*/
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
        padding: 20px 15px;
        position: relative;
    }

    /*头部左侧*/
    header .header-brand {
        position: relative;
        padding: 20px 0px;
        width: 100%;
    }
    /*logo*/
    header .header-brand a {
        color: #111;
        white-space: nowrap;
    }
    /*菜单栏折叠*/
    header .menu-toggle {
        width: 32px;
        height: 32px;
        position: absolute;
        cursor: pointer;
        top: 25%;
        right: 15px;
        display: none;
    }

    header .menu-toggle:hover span {    /*划过父元素，子元素变色*/
        background-color: #33B7FF;
    }

    .menu-toggle span {
        background-color: #000;
        display: block;
        width: 20px;
        height: 2px;
        position: absolute;
        top: 19px;
        right: 6px;
        border-radius: 100px;
        transition: transform 0.5s;
    }

    .menu-toggle span:first-child {
        -webkit-transform: translateY(-6px);
        transform: translateY(-6px);
    }

    .menu-toggle.x span:first-child {
        transform: rotate(-45deg);
    }

    .menu-toggle.x span{
        transform: rotate(45deg);
    }

    /*头部右侧*/
    header .header-main {
        display: flex;
        display: -webkit-flex;
    }

    /*菜单栏*/
    .header-main ul {
        margin: 16px 0;
        white-space: nowrap;
    }

    .header-main ul li {
        display: inline-block;
    }

    .header-main ul li a {
        padding: 45px 20px;
    }

    .header-main ul li.active a {
        color: #33B7FF;
    }
    /*搜索框*/
    .header-main .header-search {
        padding: 0px 0px 0px 20px;
        align-self: center;
        display: flex;
    }
    .fade-enter-active {
        transition: opacity .34s ease-out;
    }
    .fade-enter {
        opacity: 0;
    }
    /*响应式*/
    @media (max-width: 767px) {
        header .menu-toggle {
            display: block;
        }
        header .header-main {
            display: block;
            width: 100%;
            background-color: #111;
            position: absolute;
            top: 108px;
            left: 0px;

        }
        .header-main .header-search {
            padding: 20px 0px 20px 20px;
        }
        .header-main ul {
            padding-left: 0px;
            margin: 0px;
        }
        .header-main ul li {
            display: block;
            border-bottom: 1px solid rgba(255, 255, 255, 0.5);
        }
        .header-main ul li.active a {
            color: #fff;
        }
        .header-main ul li a {
            display: block;
            padding: 1em 5%;
            width: 100%;
            color: #fff;
        }
        .header-main ul li a:hover {
            color: #fff;
            background-color: #FA6161;
            transition: all 0.5s ease-in-out;
        }
        header .header-inner {
            flex-wrap: wrap;
            justify-content: space-between;
        }
    }
</style>
