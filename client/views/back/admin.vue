<template>
	<transition v-if="!$route.meta.noNeedAdmin" name="fade" mode="out-in">
		<div class="wrapper">
			<BackHeader></BackHeader>
			<main>
				<div class="container d-flex">
					<Sidebar></Sidebar>
					<transition name="fade" mode="out-in">
						<div class="view-box">
							<router-view v-if="isRouterAlive" :key="$route.path + $route.query.t"></router-view>
						</div>
					</transition>	
				</div>
			</main>
		</div>
	</transition>
	<transition v-else name="fade" mode="out-in">
		<router-view></router-view>	
	</transition>
</template>

<script>
	import BackHeader from '@/components/back/back_header';
	import Sidebar from '@/components/back/sidebar';
	export default {
		components: { BackHeader, Sidebar },
		provide() {
			return {
				reload: this.reload
			}
		},
		data() {
			return {
				isRouterAlive: true
			}
		},
		methods: {
			reload() {
				this.isRouterAlive = false;
				this.$nextTick(() => {
					this.isRouterAlive = true;
				})
			}
		}
	}
</script>

<style scoped>
	@import '../../assets/css/back.css';
	.wrapper {
		margin-bottom: 100px;
	}

	main {
	    width: 100%;
	    padding-top: 30px;
	    padding-bottom: 30px;
	}  

	main .container {
		width: 1200px;
		max-width: none;
	}

	main div.view-box {
		background: #fff;
		width: 100%;
	}
</style>