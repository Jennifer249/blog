<template>
	<header class='clearfix'>
		<div class="container">
			<div class="logo">{{ sysName }}</div>
			<div class="user">
				<span>
					Hi~
				</span>
				<div>
					<div class="user-pic"></div>
					<ul class="dropdown">
						<li>设置</li>
						<li @click="goGithub">github</li>
						<li @click="logout">退出登陆</li>
					</ul>
				</div>
				
			</div>
		</div>
		</header>
</template>

<script>	
	export default {
		data() {
			return {
				sysName: '博客后台系统'
			}
		},
		methods: {
			goGithub() {
				window.open("https://github.com/Jennifer249/blog");
			},
			logout() {
				var r = confirm("确认退出吗?");
				if(r) {
					window.localStorage.user = '';
					window.localStorage.token = '';
					this.$router.go({name: 'login'});
				}
			}
		}
	}
</script>

<style scoped>
	header {
		width: expression(document.body.clientWidth <= 1200? 1200px: auto);
		min-width:1200px;
		height: 70px;
		line-height: 70px;
		position: relative;
	}

	.logo {
		font-size: 22px;
		font-weight: bold;
		float: left;
		margin-left: 20px;
	}

	.user {
		float: right;
	}

	.user span {
		font-size: 14px;
		padding-right: 5px;
		bottom: 15px;
		position: relative;
	}

	.user > div {
		display: inline-block; 
		position: relative;
	}

	.user .user-pic {
	    width: 50px;
	    height: 50px;
	    background-size: 46px 46px;
	    border: 2px solid #fff;
	    float: right;
	    margin: 5px;
	    cursor: pointer;
	    float: right;

	}

	.user:hover ul.dropdown {
		display: block;
	}

	ul.dropdown {
		font-size: 14px;
		line-height: 2.5;
    	position: absolute;
    	top: 70px;
		color: #606266;
		border: 1px solid #ebeef5;
		box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
		right: 0px;
		white-space:nowrap;
		background: #fff;
		display: none;
		z-index: 10;
	}

	ul.dropdown li {
    	padding: 0 17px;
    	cursor: pointer;
	}

	ul.dropdown li:hover {
		background-color: #ecf5ff;
		color: #66b1ff;
	}
</style>