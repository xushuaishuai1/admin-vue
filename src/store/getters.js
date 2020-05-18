/* eslint-disable eqeqeq */
// 4.获取数据，由组件使用
export default {
  getCount (state) {
    return state.count
  },
  judgeOdd (state) {
    state.isOdd = '奇数'
    if (state.count % 2 == 0) {
      state.isOdd = '偶数'
    }
    return state.isOdd
  },
  loading (state) {
    return state.loading
  },
  getUserKey (state) {
    var userKey = state.userKey
    if (userKey == null) {
      userKey = sessionStorage.getItem('userKey')
    }
    return userKey
  },
  getUser (state) {
    var user = state.user
    if (user == null) {
      user = sessionStorage.getItem('user')
    }
    return user
  }
}
