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
            <router-view ></router-view>
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
}
</style>

<script>
export default {
  data () {
    return {
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
