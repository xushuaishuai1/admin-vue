<template>
    <el-container>
      <el-header style="width: 100%;height: 60px;line-height: 60px;">
        <el-col :span=18>
              <div style="cursor: pointer;color: #fff;font-family: 微软雅黑;font-size:23px;padding-left: 5%;float:left;" >
                <img :src="require('../assets/images/logo1.png')" style="width:36px;height:24px;margin-bottom:-3px;"/> &nbsp;<span>高校档案展示界面</span>
              </div>
          </el-col>
        <el-col :span=6>
             <el-button @click="login" size="small" round icon="el-icon-s-promotion">登录系统</el-button>
          </el-col>
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
              <el-col :span=24>
                <div class="pageBlock1" >
                <v-chart5 :options="dcharts"/>
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
  background-color:#348fc6 !important;
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
    'v-chart5': ECharts
  },
  data () {
    return {
      lcharts: {
        color: color,
        title: { text: '进库统计柱状图' },
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
        }
      },
      dcharts: {
        color: color,
        title: { text: '进库统计折线图' },
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
        }
      }
    }
  },
  mounted: function () {
    this.initMenuAndUser()
    // window.onresize = function temp () {
    //   console.log(this.lcharts)
    // }
  },
  methods: {
    initMenuAndUser () {
      const param = new URLSearchParams()
      param.append('statisticalMethod', 'month')
      this.$http.post('/vue/report/inStorageQuery', param)
        .then(response => {
          var data = response.data
          this.lcharts.xAxis = data.xAxis
          this.lcharts.legend = data.legend
          this.lcharts.series = data.series
          this.dcharts.xAxis = data.xAxis
          this.dcharts.legend = data.legend
          this.dcharts.series = data.series1
        })
    },
    login () {
      window.open('http://192.168.0.164:8080', 'target')
    }
  }
}
</script>
