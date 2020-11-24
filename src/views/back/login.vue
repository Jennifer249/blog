<template>
	<div class="wrapper">
		<ul class="bg-bubbles">
			<li v-for="n in 5" :key="n+'n'"></li>
		</ul>
		<form class="login-main">
			<h3>管理后台登陆</h3>
			<input type="text" placeholder="用户名" v-model="username"/>
			<input type="password" placeholder="密码" v-model="password" @keyup.enter="handleSubmit"/>
            <p>{{loginMsg + `&nbsp;`}}</p>
			<button @click.prevent="handleSubmit">登陆</button>
		</form>
	</div>
</template>
<script>
    import { requestLogin } from '@/api/api';

	export default {
		data() {
			return {
				username: 'jennifer',
				password: '123456',
                loginMsg: ''
			};
		},
        watch: {
            // 当用户名和密码变动时,清空提示信息
            username() {
                this.loginMsg = '';
            },
            password() {
                this.loginMsg = '';
            }
        },
		methods: {
            // 获取服务器Token
			handleSubmit() {
                let _this = this;
                // 表单验证
                if (this.username == '') {
                    this.loginMsg = '用户名不得为空';
                } else if (this.password == '') {
                    this.loginMsg = '密码不得为空';
                } else {
                    let params = {username: this.username, password: this.password};
                    requestLogin(params).then(res => {
                        if (!res.state) {
                            this.loginMsg = res.message;
                        } else {
                            // 存储token
                            let token = res.data;
                            _this.$store.commit('saveToken', token);

                            this.loginMsg = '获取token成功，等待服务器初始化系统';

                            // 防止重定向
                            if (this.$route.query.redirect === 'login') {
                                this.$router.replace({name: 'back_home'});
                            } else {
                                this.$router.replace({name: this.$route.query.redirect ? this.$route.query.redirect: 'back_home'});
                            }
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                }
			}
		}
	};
</script>

<style scoped>
	.wrapper {
		background: #50a3a2;
		background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
        background: linear-gradient(to bottom right, #127c7b 0, #50a3a2);
        opacity: 0.8;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
	}

	.login-main {
		border-radius: 5px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        z-index: 9999;
        position: relative;
	}

	.login-main h3 {
		margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
	}

	.login-main input {
		padding: 0 15px;
		width: 100%;
		margin-top: 20px;
		display: block;
		color: #606266;
		height: 50px;
		line-height: 36px;
		border-radius: 4px;
		border: 1px solid #DCDFE6;
	}

    .login-main p {
        font-size: 14px;
        padding-left: 10px;
    }

	.login-main button {
		width: 100%;
		line-height: 1;
		margin-bottom: 20px;
		color: #FFF;
        background-color: #409EFF;
        border-color: #409EFF;
        border: 1px solid #DCDFE6;
        transition: .1s;
        cursor: pointer;
        padding: 10px 20px;
        font-size: 14px;
        border-radius: 4px;
	}

    .login-main button:hover {
        background-color: #9CCDFF;
    }

	.bg-bubbles {
		position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
	}

	.bg-bubbles li {
		position: absolute;
        list-style: none;
        display: block;
        width: 40px;
        height: 40px;
        background-color: rgba(255, 255, 255, 0.15);
        bottom: -160px;
        -webkit-animation: square 25s infinite;
        animation: square 25s infinite;
        -webkit-transition-timing-function: linear;
        transition-timing-function: linear;
	}

	.bg-bubbles li:nth-child(2) {
        left: 20%;
        width: 120px;
        height: 120px;
        -webkit-animation-delay: 2s;
        animation-delay: 2s;
        -webkit-animation-duration: 17s;
        animation-duration: 17s;
    }

    .bg-bubbles li:nth-child(3) {
        left: 35%;
        -webkit-animation-delay: 4s;
        animation-delay: 4s;
    }

    .bg-bubbles li:nth-child(4) {
        left: 70%;
        width: 60px;
        height: 60px;
        -webkit-animation-delay: 2s;
        animation-delay: 2s;
        -webkit-animation-duration: 22s;
        animation-duration: 22s;
        background-color: rgba(255, 255, 255, 0.25);
    }

    .bg-bubbles li:nth-child(5) {
        left: 90%;
        width: 100px;
        height: 100px;
    }

    @-webkit-keyframes square {
        0% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }

        100% {
            -webkit-transform: translateY(-900px) rotate(600deg);
            transform: translateY(-900px) rotate(600deg);
        }
    }

    @keyframes square {
        0% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }

        100% {
            -webkit-transform: translateY(-900px) rotate(600deg);
            transform: translateY(-900px) rotate(600deg);
        }
    }
</style>
