module.exports = {
  GetRequest: GetRequest,
  LoadingMore: LoadingMore,
  CreateSubmit: CreateSubmit
}
//普通请求
function GetRequest(url, datas, method, callback) {
  var list = 
    {pageIndex: 1,
    pageSize: 10}
  //将data插入到list中
  for (var key in datas) {
    list[key] = datas[key]
  }
  var header;
  //判断请求方式
  if (method == "GET") {
    header = {
      'content-type': 'application/json'
    }
  } else if (method == "POST") {
    header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }
  //加载状态
  wx.showLoading({
    title: '加载中...',
  })

  wx.request({
    url: url,
     data:  list,
    // data:datas,
    header: header,
    method: method,
    success: function(res) { //成功
    
      if (res.data.statusCode == '200') {
        var info = res.data.data;
        //去除加载框
        wx.hideLoading(info)
        callback(info)
      }
    },
    fail: function(error) { //失败
      // console.log(error)
      wx.showLoading({
        title: '获取信息失败',
      })
      setTimeout(function() {
        wx.hideLoading()
      }, 3000)
    },
  })
}
//列表加载更多
function LoadingMore(url, info, data, callback) {
  // var info = this.data.list
  // var that = this
  var index;
  var arr = [];
  var query;
  var loadText;
  var loading;
  var disabled;
  wx.showToast({
    title: '加载中...',
    icon: 'loading',
    duration: 200
  });
  //加载状态
  loadText = '数据加载中...',
    loading = true,
    disabled = false
  arr = {
    'query': query,
    'loading': loading,
    'loadText': loadText,
    'disabled': disabled
  }
  callback(arr)

  for (var i = 1; i <= info.length / 10 + 1; i++) {
    index = i
  }
  // console.log(index);
  var list = {
    pageIndex: index,
    pageSize: 10,
   
  }
  //将data插入到list中
  for (var key in data) {
    list[key]=data[key]
  }
  // console.log(list)
  wx.request({
    url: url,
    method: 'GET',
    data:list,
    headers: {
      'Content-Type': 'application/json'
    },
    success: function(res) {
      if (res.data.data.total > info.length) {
        // console.log(res)
        query = info.concat(res.data.data.list)
        // console.log(query)
        loadText = '加载更多...',
          loading = false
        disabled = false
        arr = {
          'query': query,
          'loading': loading,
          'loadText': loadText,
          'disabled': disabled
        }
        callback(arr)
      } else {
        loadText = '我也是有底线的...',
          loading = false
        disabled = true
        arr = {
          'query': query,
          'loading': loading,
          'loadText': loadText, 
          'disabled': disabled
        }
        callback(arr)
      }
    }
  })
}
//添加请求
function CreateSubmit(url,data){
  wx.request({
    url: url,
    data: data,
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    method: 'POST',
    success: function (res) {
      console.log(res.data.statusCode);
      if (res.data.statusCode == 200) {
        // that.setData({
        //   username: "",
        //   idCard: "",
        //   phone: "",
        //   nowText: "",
        //   remark: ""
        // })
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
      }
    },
    fail: function (res) {
      wx.showToast({
        title: '提交失败',
        icon: 'loading',
        duration: 2000
      })
    },
  })
}
