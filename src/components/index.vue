<template>
  <el-container>
    <el-aside :style="asidewidth">
      <div class="sidebar-logo-container" title="高校档案系统">
          <img :src="require('../assets/images/logo1.png')"> &nbsp;<span v-show="!isCollapse">高校档案系统</span>
    </div>
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        mode="vertical"
        background-color="#333"
        text-color="#FFF"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item v-for="(obj) in meuns" v-bind:key="obj.id" :index="obj.id" :style="{ width: width}">
          <i :class="obj.icon"></i>
          <span slot="title">{{obj.name}}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container :style="rightStyle">
      <el-header>
        <el-row>
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <span style="float:left;font-size:20px;" @click="setIsCollapse">
              <i :class=iconClass></i>
            </span>
          </el-col>
          <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
            <el-menu
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              background-color="#333"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-menu-item v-for="(obj) in menusHead" v-bind:key="obj.id" :index="obj.id">
                <span slot="title">{{obj.name}}</span>
              </el-menu-item>
            </el-menu>
          </el-col>
          <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
             &nbsp;现在数字为：{{getCount}},{{judgeOdd}}
             <el-button type="primary" @click="changeMenu">切换到过滤器</el-button>
            <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>查看</el-dropdown-item>
                  <el-dropdown-item>新增</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span>{{nikeName}}</span>
          </el-col>
        </el-row>
      </el-header>

      <el-main>
        <!-- <transition name="el-zoom-in-bottom"> -->
          <router-view ></router-view>
        <!-- </transition> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.el-container{
  height:calc(100vh)
}
.sidebar-logo-container {
  position: relative;
  width: 100%;
  text-align: center;
  overflow: hidden;
  color: #fff;
  font-size: 1.2rem;
  padding: 0;
  line-height: 62px;
  height: 62px;
  transition: height 0.8s cubic-bezier(0.075, 0.82, 0.165, 1)
  }
.el-header {
  background-color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 245px;
  min-height: 400px;
}
.el-header {
  text-align: right;
  font-size: 12px;
  color: #fff;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<script>
// eslint-disable-next-line no-unused-vars
import { mapGetters, mapActions } from 'vuex'
const meuns1 = [
  { id: '/user', name: '路由', icon: 'el-icon-user-solid' },
  { id: '/filter', name: '过滤器', icon: 'el-icon-help' }
]

const meuns2 = [
  { id: '/component', name: '组件通信', icon: 'el-icon-s-release' },
  { id: '/component1', name: '组件通信推荐', icon: 'el-icon-s-management' },
  { id: '/transition', name: '动画', icon: 'el-icon-s-promotion' },
  { id: '/transition1', name: '动画推荐', icon: 'el-icon-s-open' }
]

const meuns3 = [
  { id: '/ownComponentUse', name: '自定义主键', icon: 'el-icon-s-shop' },
  { id: '/vuexLearn', name: 'vuex学习', icon: 'el-icon-s-opportunity' },
  { id: '/commonForm', name: 'form表单', icon: 'el-icon-tickets' },
  { id: '/table', name: 'table', icon: 'el-icon-date' }
]

const menusHead = [
  { id: 'menus1Head', name: '路由过滤器' },
  { id: 'menus2Head', name: '组件动画' },
  { id: 'menus3Head', name: '表单' }
]

const map = new Map()
map.menus1Head = meuns1
map.menus2Head = meuns2
map.menus3Head = meuns3

export default {
  data () {
    return {
      isCollapse: false,
      asidewidth: {
        width: '245px',
        height: 'calc(100vh)',
        'background-color': '#333',
        transition: 'width 0.15s'
      },
      rightStyle: {
        'background-color': '#e0e0e0'
      },
      meuns: meuns1,
      menusHead: menusHead,
      width: '245px',
      nikeName: '',
      iconClass: 'el-icon-s-fold'
    }
  },
  mounted: function () {
    // window.addEventListener('beforeunload', this.initMenuAndUser)
    this.initMenuAndUser()
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      this.meuns = map[key]
    },
    setIsCollapse () {
      if (this.isCollapse) {
        this.isCollapse = false
        this.asidewidth.width = '245px'
        this.width = '245px'
        this.iconClass = 'el-icon-s-fold'
      } else {
        this.isCollapse = true
        this.asidewidth.width = '65px'
        this.width = '65px'
        this.iconClass = 'el-icon-s-unfold'
      }
    },
    initMenuAndUser () {
      console.log('3333333333333')
      this.$http.get('vue/index?userKey=' + this.getUserKey)
        .then(response => {
          var curUser = response.data.data.sUserInfo
          this.$store.dispatch('addUser', curUser)
          if (curUser != null && curUser.nikeName != null) {
            this.nikeName = curUser.nikeName
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch(function (error) {
          this.$message.error('后台接口调用失败！')
          this.initCode()
        })
    },
    changeMenu () {
      this.$router.push({ path: 'filter' })
      // this.$router.push('filter');
      // this.$router.push(path):相当于点击路由链接(可以返回到当前路由界面)
      // this.$router.replace(path):用新路由替换当前路由(不可以返回到当前路由界面)
      // this.$router.back(): 请求(返回)上一个记录路由

      // 路由参数传递 获取 方法一
      // 路由参数传递this.$router.push({name:"product‐list", query:{"name":val}});
      // 路由参数获取let searchName = this.$route.query.name
      // 路由参数传递 获取 方法二
      // 路由定义{ path:'/product/:id', name:'product', component: ProductDetail }
      // 模板使用<router‐link :to="{name:'product',params:{id:1}}">产品1连接</router‐link>
      // 获取let id = this.$route.params.id;
    }
  },
  computed: mapGetters([
    'getUserKey',
    'getUser',
    'getCount', 'judgeOdd', 'loading'
  ])
}
</script>
