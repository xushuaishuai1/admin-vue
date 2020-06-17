<template>
    <el-container>
      <el-header>
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
             <el-button type="primary">登录</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <transition name="fade">
          <div class="pageBlock" >
            <v-chart :options="polar"/>
          </div>
        </transition>
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
.el-main{
  padding: 8px;
  background-color: #fff;
}
.pageBlock{
  box-shadow: 0 0 45px rgba(0,0,0,.2);
  background-color: #fff;
  width: 100%;
  height: 100%;
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

const data = []

for (let i = 0; i <= 360; i++) {
  const t = i / 180 * Math.PI
  const r = Math.sin(2 * t) * Math.cos(2 * t)
  data.push([r, i])
}

export default {
  components: {
    'v-chart': ECharts
  },
  data () {
    return {
      polar: {
        title: {
          text: '极坐标双数值轴'
        },
        legend: {
          data: ['line']
        },
        polar: {
          center: ['50%', '54%']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        angleAxis: {
          type: 'value',
          startAngle: 0
        },
        radiusAxis: {
          min: 0
        },
        series: [
          {
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: data
          }
        ],
        animationDuration: 2000
      }
    }
  },
  mounted: function () {
    this.initMenuAndUser()
  },
  methods: {
    initMenuAndUser () {
      console.log('3333333333333')
    }
  }
}
</script>
