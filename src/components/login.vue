<template>
    <el-container>
      <el-header>
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
            <el-row :gutter="20" style="margin-bottom:10px;">
              <el-col :span=4 >
                <div class="pageBlock1" >
                 馆藏档案总计：<span class="countClass">{{total}}</span>
                </div>
              </el-col>
              <el-col :span=4 >
                <div class="pageBlock1" >
                 档案分类数：<span class="countClass">{{classifyTotal}}</span>
                </div>
              </el-col>
              <el-col :span=4 >
                <div class="pageBlock1" >
                 系统内借阅总次数：<span class="countClass">{{xborrowTotal}}</span>
                </div>
              </el-col>
              <el-col :span=4 >
                <div class="pageBlock1" >
                 远程借阅总次数：<span class="countClass">{{yborrowTotal}}</span>
                </div>
              </el-col>
              <el-col :span=4 >
                <div class="pageBlock1" >
                 编研总次数：<span class="countClass">{{publishTotal}}</span>
                </div>
              </el-col>
              <el-col :span=4 >
                <div class="pageBlock1" >
                 发布总次数：<span class="countClass">{{cTotal}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="15" style="margin-bottom:10px;">
              <el-col :span=24>
                <div class="pageBlock2" >
                <v-chart1 :options="lcharts"/>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="15" style="margin-bottom:10px;">
              <el-col :span=24>
                <div class="pageBlock2" >
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
  background-color:black;
  box-shadow: 0 0 45px white;
}
.el-header {
  background-color:black;
  text-align: right;
  font-size: 12px;
  opacity: 0.8;
  height: 60px;
  line-height: 60px;
}
.pageBlock1{
  box-shadow: 0 0 45px white;
  height: 60px;
  line-height: 60px;
  color:#fff;
  text-align: center;
  border-radius: 20%;
}
.pageBlock2{
  box-shadow: 0 0 45px white;
  min-width: calc(60vh);
  height: calc(37vh);
}
.echarts {
  width: 100%;
  height: 100%;
}
.countClass{
  color:#d68b91;
  font-weight: 500;
  font-size: 28px !important;
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
      total: 0,
      classifyTotal: 0,
      xborrowTotal: 0,
      yborrowTotal: 0,
      publishTotal: 0,
      cTotal: 0,
      lcharts: {
        color: color,
        title: { text: '进库统计柱状图', textStyle: { color: '#fff' } },
        yAxis: [
          {
            position: 'left',
            type: 'value',
            splitLine: {
              show: false
            },
            name: '数量',
            nameTextStyle: { color: '#fff' },
            axisLabel: {
              formatter: '{value} 个',
              color: '#fff'
            }
          },
          {
            position: 'right',
            splitLine: {
              show: false
            },
            type: 'value',
            name: '时长',
            nameTextStyle: { color: '#fff' },
            axisLabel: {
              formatter: formatter,
              color: '#fff'
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
            nameTextStyle: { color: '#fff' },
            axisLabel: {
              formatter: formatter1,
              color: '#fff'
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
        title: { text: '进库统计折线图', textStyle: { color: '#fff' } },
        yAxis: [
          {
            position: 'left',
            type: 'value',
            splitLine: {
              show: false
            },
            name: '数量',
            nameTextStyle: { color: '#fff' },
            axisLabel: {
              formatter: '{value} 个',
              color: '#fff'
            }
          },
          {
            position: 'right',
            splitLine: {
              show: false
            },
            type: 'value',
            name: '时长',
            nameTextStyle: { color: '#fff' },
            axisLabel: {
              formatter: formatter,
              color: '#fff'
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
            nameTextStyle: { color: '#fff' },
            axisLabel: {
              formatter: formatter1,
              color: '#fff'
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
    this.inStorageQuery()
    this.getCount()
    // window.onresize = function temp () {
    //   console.log(this.lcharts)
    // }
  },
  methods: {
    inStorageQuery () {
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
    getCount () {
      const param = new URLSearchParams()
      param.append('statisticalMethod', 'month')
      this.$http.post('/vue/report/getCount', param)
        .then(response => {
          var data = response.data
          this.total = data.total
          this.classifyTotal = data.classifyTotal
          this.xborrowTotal = data.xborrowTotal
          this.yborrowTotal = data.yborrowTotal
          this.publishTotal = data.publishTotal
          this.cTotal = data.cTotal
        })
    },
    login () {
      window.open('http://139.159.160.28:8080', 'target')
    }
  }
}
</script>
