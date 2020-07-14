<template>
	<div class="statistics view" v-if="loadOK">
		<h3>数据</h3>
		<div class="data-count d-flex">
			<div class="item" v-for="item in stat" :key="item.description">
				<p class="num">{{ item.sum }}</p>
				<p class="title">{{ item.description }}</p>
			</div>
		</div>
		<div class="data-chart">
			<ul>
				<li v-for="(item, index) in items" :class="{active: isTrue === index}" @click="handleShowChartData(index)" :key="item.title">{{ item.title }}</li>
			</ul>
			<chart ref="chart1" :options="orgOptions" :auto-resize="true"></chart>
		</div>
	</div>
	<div class="loadClass" v-else>{{ tipMsg }}</div>
</template>

<script>
import { getDataCount, getChartVisits, getChartComments } from '@/api/api';
import ECharts from 'vue-echarts/components/ECharts';
import 'echarts/lib/chart/line';
import { mapState, mapMutations } from 'vuex';

export default {
	components: {
		'chart': ECharts
	},
	data () {
		return {
			tipMsg: '',
			stat: [
				{sum: 0, description: '文章总数'},
				{sum: 0, description: '评论数'},
				{sum: 0, description: '访问量'}
			],
			chartVisits: [],
			chartComments: [],
			//作为active的判断
			isTrue: 0,
			items: [
				{title: '访问量'},
				{title: '评论数'}
			],
			//表格数据
			orgOptions: {
				color: ['#1296db'],
				tooltip: {},
				legend: {
					data:['销量']
				},
				xAxis: {
					data:[],
					boundaryGap: false
				},
				yAxis: {
					type: 'value'
				},
				series: [{
					type: 'line',
					smooth: true,
					data: [],
                    areaStyle: {}
               }]
            },
		};
	},
	computed: {
		...mapState(['loadOK'])
	},
	mounted() {
		this.initLoadOK();
		//初始化数据,获取统计数据和图表数据
		this.getDataCount();
		this.getChartVisi();
	},
	methods: {
		...mapMutations(['chgLoadOK', 'initLoadOK']),
		//切换图表显示,访问量/评论数
		handleShowChartData(index) {
			this.isTrue = index;
			if (this.isTrue) {
				this.getChartComm();
			} else {
				this.getChartVisi();
			}
		},
		//将服务器传来的数据转化为图表要求的数组形式
		formatChartData(dataType, atrDate, atrCount) {
			let formatDate = [];
			let formatValue = [];
			let len = dataType.length;

			for (var i = 0, j = len - 1; i < len; i++, j--) {
				formatDate[j] = new Date(dataType[i][atrDate]).toLocaleDateString().replace(/\//g, '-');
				formatValue[j]= dataType[i][atrCount];
			}
			this.orgOptions.xAxis.data = formatDate;
			this.orgOptions.series[0].data = formatValue;
		},
		//获取统计数据
		getDataCount() {
			getDataCount().then((res) => {
				if (res.state && res.data.length) {
					let s = this.stat;
					let num = 0;
					for (let item in res.data[0]) {
						s[num].sum = res.data[0][item];
						num++;
					}
				} else {
					this.chgLoadOK();
					this.tipMsg = '初始化数据失败';
				}
			}).catch(err => {
				console.log(err);
			});
		},
		//获取图表的访问量
		getChartVisi() {
			getChartVisits().then((res) => {
				if (res.state && res.data.length) {
					this.formatChartData(res.data, 'visits_date', 'visits_day_count');
				} else {
					this.chgLoadOK();
					this.tipMsg = '初始化数据失败';
				}
			}).catch(err => {
				console.log(err);
			});
		},
		//获取图表的评论数
		getChartComm() {
			getChartComments().then((res) => {
				if (res.state && res.data.length) {
					this.formatChartData(res.data, 'comments_date', 'comments_day_count');
				} else {
					this.chgLoadOK();
					this.tipMsg = '初始化数据失败';
				}
			}).catch(err => {
				console.log(err);
			});
		}
	}
};
</script>

<style scoped>
	.statistics .data-count {
		padding: 30px 0;
        flex-wrap: wrap;
        text-align: center;
        border-bottom: 1px solid #e9e9e9;
	}

	.statistics .item {
		background-color: #f2f5f7;
		display: inline-block;
		width: 30%;
		margin: 10px;
	}

	.item p.num {
		font-size: 20px;
		color: #111;
		font-weight: bold;
		margin-bottom: 0px;
	}

	.item p.title {
		font-size: 14px;
		color: #999;
	}

	.data-chart {
		width: 600px;
		margin: 0 auto;
	}

	.data-chart ul {
		margin: 30px 0 -10px 30px;
	}

	.data-chart ul li {
		display: inline-block;
		margin-right: 10px;
		cursor: pointer;
	}

	.data-chart ul li.active {
		border-bottom: 2px solid #1296db;
	}
</style>
