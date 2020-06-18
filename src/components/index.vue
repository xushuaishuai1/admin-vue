/* eslint-disable use-isnan */
/* eslint-disable use-isnan */
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

const color = ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
  '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
  '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
  '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089']

function formatter (val, index) {
  var v1 = (val % 60).toFixed(0)
  var v2 = parseInt(val % 3600 / 60)
  var v3 = parseInt(val / 3600)
  v1 = (v1 < 10 ? '0' : '') + v1
  v2 = (v2 < 10 ? '0' : '') + v2
  v3 = (v3 < 10 ? '0' : '') + v3
  return v3 + ':' + v2 + ':' + v1
}

function formatter1 (val, index) {
  val = val / (1024 * 1024)
  return val.toFixed(2) + 'MB'
}

export default {
  components: {
    'v-chart1': ECharts,
    'v-chart3': ECharts,
    'v-chart5': ECharts
  },
  data () {
    return {
      lcharts: {
        color: color,
        yAxis: [
          {
            position: 'left',
            type: 'value',
            splitLine: {
              show: false
            },
            name: '数量',
            axisLabel: {
              formatter: '{value} 个'
            }
          },
          {
            position: 'right',
            splitLine: {
              show: false
            },
            type: 'value',
            name: '时长',
            axisLabel: {
              formatter: formatter
            }
          },
          {
            position: 'right',
            splitLine: {
              show: false
            },
            offset: 70,
            type: 'value',
            name: '大小',
            axisLabel: {
              formatter: formatter1
            }
          }
        ],
        xAxis: { data: [] },
        legend: {},
        series: [],
        tooltip: {
          axisPointer: {
            type: 'cross',
            label: {
              formatter: function (params, ticket, callback) {
                var axisIndex = params.axisIndex
                var axisDimension = params.axisDimension
                var val = params.value
                // eslint-disable-next-line eqeqeq
                if (axisDimension == 'y' && axisIndex == '1') {
                  return formatter(val)
                // eslint-disable-next-line eqeqeq
                } else if (axisDimension == 'y' && axisIndex == '2') {
                  return formatter1(val)
                } else {
                  if (typeof (val) === 'number') return Number(val).toFixed(0)
                  else return val
                }
              }
            }
          },
          trigger: 'item',
          formatter: function (params, ticket, callback) {
            var seriesName = params.seriesName
            var val = params.data
            // eslint-disable-next-line eqeqeq
            if (seriesName == '音频文件时长' || seriesName == '视频文件时长') {
              return seriesName + ':' + formatter(val)
            // eslint-disable-next-line eqeqeq
            } else if (seriesName == '原文大小') {
              return seriesName + ':' + formatter1(val)
            } else {
              return seriesName + ':' + val
            }
          }
        },
        title: {}
      },
      zcharts: {
        color: color,
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
        color: color,
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
      // console.log('3333333333333')
      const param = new URLSearchParams()
      param.append('statisticalMethod', 'month')
      this.$http.post('/vue/report/inStorageQuery', param)
        .then(response => {
          var data = response.data
          this.lcharts.xAxis = data.xAxis
          this.lcharts.legend = data.legend
          this.lcharts.series = data.series
          this.lcharts.title = data.title
        })
    }
  }
}
</script>
