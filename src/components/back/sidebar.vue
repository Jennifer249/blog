<template>
	<aside>
		<ul>
			<li v-for="item in routeInfo" :class="{active: isActive(item.name)}" :key="item.name">
				<SvgIcon :icon-class="item.icon"></SvgIcon>
				<router-link :to="{name: item.name, query: {t: Date.now()}}">{{item.meta.title}}</router-link>
			</li>
		</ul>
	</aside>
</template>

<script>
export default {
	name: 'Sidebar',
	data() {
		return {
			routeInfo: this.$router.options.routes[0].children.slice(0, -1),
			isTrue:1
		};
	},
	methods: {
		isActive(pathName) {
			return pathName === this.$route.name;
		}
	}
};
</script>

<style scoped>
	aside {
		width: 220px;
		background: #fff;
		border-right: 4px solid #edeff2;
	}

	aside ul li {
		border-bottom: 1px solid #edeff2;
		padding: 16px;
		font-size: 14px;
		line-height: 14px;
	}

	aside ul li.active {
		border-left: 2px solid #1296db;
	}

	.icon {
		vertical-align:middle;
	}
</style>
