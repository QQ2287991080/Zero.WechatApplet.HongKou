var getRequest = require('../../utils/request.js')
Page({
  data: {
    selectArray1: [{
      "id": "b9765922-b938-47ae-b608-9fa1f3de1518",
      "text": "部门一"
    },
    {
      "id": "fecd0fe0-361e-4924-b797-b1380a6c4924",
      "text": "部门二"
    }],
    selectArray2: [{
      'id': '8dfad498-2eb9-49b8-9fa7-8ea450951727',
      'text': '类型一'
    },
    {
      'id': '899c4932-d7d0-4d58-913a-df1acf99c9ce',
      'text': '类型二'
    }],

  },

  onLoad: function (options) {

  },


  formSubmit: function (e) {
    let that = this;
    console.log(e)
    var username = e.detail.value.username
    var idCard = e.detail.value.idCard
    var phone = e.detail.value.phone
    var department = e.detail.value.department == null ? "" : e.detail.value.department
    var sxType = e.detail.value.sxType == null ? "" : e.detail.value.sxType
    var remark = e.detail.value.remark
    var receptionType =1

    if (username == "") {
      wx.showToast({
        title: '用户名必须填写',
        icon: 'none',
        duration: 2000
      })
    }
    else if (idCard == "") {
      wx.showToast({
        title: '身份证号必须填写',
        icon: 'none',
        duration: 2000
      })
    }
    else if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard))) {
      wx.showToast({
        title: '身份证号格式不正确',
        icon: 'none',
        duration: 2000
      })
    }
    else if (phone == "") {
      wx.showToast({
        title: '联系电话必须填写',
        icon: 'none',
        duration: 2000
      })
    }
    else if (!(/^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/.test(phone))) {
      wx.showToast({
        title: '联系电话格式不正确',
        icon: 'none',
        duration: 2000
      })
    }
    else {
      let url = 'http://localhost:16797/api/ReceptionOrder/Create';
      let data = { name: username, idCard: idCard, phone: phone, department: department, eventType: sxType, eventDetails: remark, receptionType: receptionType };
      var info = getRequest.CreateSubmit(url,data)
      
    }
  }
})