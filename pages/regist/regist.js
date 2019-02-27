Page({
 
   data:{
     userValue:"",
     pwdValue:"",
   },
   //提交表单
  formSubmit:function(e)
  {
    debugger;
    user=e.detail.userValue;
    pwd=e.detail.pwdValue;
    if(user=="")
    {
       wx.showToast({
         title: '用户名不能为空！',
         icon:"loading",
       })
    }
    if(pwd==""){
      wx.showToast({
        title: '密码不能为空！',
        icon: "loading",
      })
    }
    else{
      this.setData({

      })
    }
    console.log(user);
    console.log(pwd);
  },
 
  //返回返回上一级
  back: function() {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  //前往登录
  login: function() {
    console.log("come on")
  }
})