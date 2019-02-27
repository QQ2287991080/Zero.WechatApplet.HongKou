var util = require('../../utils/util.js');
var WxParse=require('../../wxParse/wxParse.js')
Page({
  data: {
    data: []
  },
  onLoad: function (option) {
    var that = this;
    var id = option.id
    console.log(id);
    wx.request({
      url: 'http://localhost:16797/api/Information/getId',
      method: "GET",
      data: { id: id },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        // console.log(res.data.data)
        that.setData({
          data: res.data.data,
        })
        var article=res.data.data.content
        WxParse.wxParse('article', 'html', article,that,5);
      }
    })
  }
  // onLoad: function (option) {
  //   var that = this;
  //  var id=option.id
  //   console.log(id)
  //   wx.request({
  //     url: 'http://localhost:16797/api/Information/getId',
  //     method: 'POST',
  //     headers: {
  //       //  'Content-Type':'application/json'
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     },
  //     data: {
  //       id:id
  //     },
  //     success: function(res) {
  //       console.log(res)
  //       that.setData({
  //         list: res.data.data
  //       })
  //     }
  //   })
  // }

});