var getRequest = require('../../utils/request.js')
var result;
Page({
  data: {
    list: [],
    // duration: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    plain: false,
    loadText: '加载更多...',
    disabled: false
  },
  //页面加载时
  onLoad: function () {
    let that = this;
    // this.getData();
    var url = 'http://localhost:16797/api/Information/GetInformationList';
    var datas = {}
    var info = getRequest.GetRequest(url, datas, "GET", that.callBack)
    // list=getRequest.GetRequest(url, pageIndex, pageSize)
  },
  //回调函数
  callBack: function (res) {
    // console.log(res)
    let that = this;
    that.setData({
      list: res.list,
      total:res.total
    })
  },

  //加载更多
  setLoading: function (e) {
    let info = this.data.list

    let that = this;
    var url = 'http://localhost:16797/api/Information/GetInformationList';
    var datas = {}
    var info2 = getRequest.LoadingMore(url, info, datas, that.moreBack)
 
  },
  //回调函数
  moreBack: function (res) {
    // console.log(res.query);
    let that = this;
    that.setData({
      list: res.query,
      loading: res.loading,
      loadText: res.loadText,
      disabled: res.disabled
    })
  },
  //跳详情
  getById: function (result) {
    // console.log(result)
    var data = result.currentTarget.dataset
    // console.log(data.url)
    wx.navigateTo({
      url: '../initial/initial?id=' + data.url,
    })
  }
});
//加载更多
// setLoading: function (e) {
//   var info = this.data.list
//   var that = this
//   var index;
//   wx.showToast({
//     title: '加载中...',
//     icon: 'loading',
//     duration: 200
//   })
//   that.setData({
//     loadText: '数据加载中...',
//     loading: true,
//   })

//   for (var i = 1; i <= info.length / 10 + 1; i++) {
//     index = i
//   }
//   console.log(index);
//   wx.request({
//     url: 'http://localhost:16797/api/Information/GetInformationList',
//     method: 'GET',
//     data: {
//       pageIndex: index,
//       pageSize: 10
//     },
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     success: function (res) {
//       if (res.data.data.total > info.length) {
//         that.setData({
//           list: info.concat(res.data.data.list),
//           loadText: '加载更多...',
//           loading: false,
//         })
//       } else {
//         that.setData({
//           loadText: '我也是有底线的...',
//           loading: false
//         })
//       }
//     }
//   })
// },
//点击进入详情

// getData: function() {
//   wx.showLoading({
//     title: '加载中...',
//   })
//   let that = this;
//   wx.request({
//     url: 'http://localhost:16797/api/Information/GetInformationList',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     data: {
//       pageIndex: 1,
//       pageSize: 10
//     },
//     success: function(res) {
//       //debugger
//       if (res.data.statusCode == '200') {

//         result = res.data.data.list
//         console.log(result)
//         that.setData({
//           list: result
//         })
//         //去除加载框
//         wx.hideLoading()
//       }
//     },
//     //请求失败
//     fail: function(error) {
//       console.log(error)
//       wx.showLoading({
//         title: '获取信息失败',
//       })
//       setTimeout(function() {
//         wx.hideLoading()
//       }, 3000)
//     }
//   })
// },