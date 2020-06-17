<template>
    <el-container>
      <el-header>
        <el-row>
          <el-col :span=24>
             <el-button type="primary">登录</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
            <el-row :gutter="15" style="margin-bottom:14px;">
              <el-col :span=24>
                <div class="pageBlock1" >
                <v-chart1 :options="lcharts"/>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="15" style="margin-bottom:14px;">
              <el-col :span=8>
                <div class="pageBlock" >
                <v-chart3 :options="bcharts"/>
                </div>
              </el-col>
              <el-col :span=16>
                <div class="pageBlock1" >
                <v-chart5 :options="zcharts"/>
                </div>
              </el-col>
            </el-row>
      </el-main>
    </el-container>
</template>

<style scoped>
.el-container{
  height:calc(100vh);
  background-color: #fff;
}
.el-header {
  background-color: #333;
  line-height: 60px;
  text-align: right;
  font-size: 12px;
}
.pageBlock{
  box-shadow: 0 0 45px rgba(0,0,0,.2);
  min-width: calc(30vh);
  height: calc(44vh);
}
.pageBlock1{
  box-shadow: 0 0 45px rgba(0,0,0,.2);
  min-width: calc(60vh);
  height: calc(44vh);
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'

var months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

export default {
  components: {
    'v-chart1': ECharts,
    'v-chart3': ECharts,
    'v-chart5': ECharts
  },
  data () {
    return {
      lcharts: {
        title: { // 标题，可以自定义标题的位置和样式
          text: '某地区的、单位数、职工人数、和平均工资'
        },
        legend: { // 图例，每一个系列独有一个图例，注意：图例的名字必须跟下面series数组里面的name一致。
          data: ['单位数', '职工数', '平均工资', '平均工资1']
        },
        tooltip: { // 鼠标悬浮时的样式，可自定义
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'cross' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: { // x轴的配置
          data: months
        },
        yAxis: [
          { // 第一个y轴位置在左侧
            position: 'left',
            type: 'value',
            splitLine: { show: false },
            name: '单位数',
            axisLabel: {
              formatter: '{value} 个'
            }
          },
          { // 第二个y轴在右侧
            position: 'right',
            splitLine: { show: false },
            type: 'value',
            name: '职工数',
            axisLabel: {
              formatter: '{value} 人'
            }
          },
          { // 第三个y轴也在右侧，距第二个70个像素
            position: 'right',
            splitLine: { show: false },
            offset: 70,
            type: 'value',
            name: '平均工资',
            axisLabel: {
              formatter: '{value} 万元'
            }
          }
        ],
        series: [
          {
            name: '单位数',
            type: 'bar',
            yAxisIndex: '0', // 使用第一个y轴，序号从0开始
            data: [23, 27, 28, 30, 34, 36, 39, 41, 45, 46, 56, 60]
          },
          {
            name: '职工数',
            type: 'bar',
            yAxisIndex: '1', // 使用第二个y轴
            data: [1500, 1700, 1750, 1800, 1850, 1900, 1910, 1941, 1980, 2000, 2100, 2200]
          },
          {
            name: '平均工资',
            type: 'bar',
            yAxisIndex: '2', // 使用第三个y轴
            data: [3500, 3600, 4200, 4800, 5500, 6500, 4900, 3500, 5400, 5500, 6500, 7000]
          },
          {
            name: '平均工资1',
            type: 'bar',
            yAxisIndex: '2', // 使用第三个y轴
            data: [2500, 2600, 2200, 3800, 4500, 6500, 4900, 3500, 5400, 5500, 6500, 7000]
          }
        ]
      },
      zcharts: {
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ['product', '2015', '2016', '2017'],
          source: [
            { product: 'Matcha Latte', 2015: 43.3, 2016: 85.8, 2017: 93.7 },
            { product: 'Milk Tea', 2015: 83.1, 2016: 73.4, 2017: 55.1 },
            { product: 'Cheese Cocoa', 2015: 86.4, 2016: 65.2, 2017: 82.5 },
            { product: 'Walnut Brownie', 2015: 72.4, 2016: 53.9, 2017: 39.1 }
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: [
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' }
        ]
      },
      bcharts: {
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  mounted: function () {
    this.initMenuAndUser()
  },
  methods: {
    initMenuAndUser () {
      console.log('3333333333333')
      const param = new URLSearchParams()
      param.append('statisticalMethod', 'month')
      this.$http.post('/vue/report/inStorageQuery', param)
        .then(response => {
          var data = response.data
          console.log(data)
        })
    }
  }
}
</script>
