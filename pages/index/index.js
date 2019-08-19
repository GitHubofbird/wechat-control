//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // marquee_text: "您的树莓派需进行配置,有兴趣可加Q:763801690",   
    enterBtnMsg: "保存服务器连接",
    PromoteMsg: "请输入服务器地址 (exp: http://x.x.x.x:8080)",
    reqURL: ""
  },
  onLoad: function(option) {

  },
  // 获取用户输入的服务器地址
  getURL: function(e) {
    this.setData({
      reqURL: e.detail.value
    });
  },
  /*
   * 用户按下连接服务器按钮    
   */
  enterClicked: function() {
    console.log(this.data.reqURL)
    //1. 判断用户是否在输入框中输入完整的服务器地址
    if (this.data.reqURL == '') {
      wx.showModal({
        title: '提示',
        content: '服务器地址不能为空!'
      })
      return;
    }    
    this.saveUrl(this.data.reqURL);
    //跳转到小车控制界面(/pages/urlList/urlList)
    wx.switchTab({
      url: '/pages/urlList/urlList',
    })
    wx.showModal({
      title: '提示',
      content: '保存成功!',
    })
  },
  /**
   * 将url保存到db
   */
  saveUrl: function(url) {
    //获取云数据库  
    wx.cloud.init({
      env: 'temp-mpyef'
    })
    const db = wx.cloud.database({
      env: 'temp-mpyef'
    });
    db.collection('urlList').add({
      data: {
        url: url
      },
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log(res);
        wx.showModal({
          title: '提示',
          content: '保存失败!',
        })
        return
      }
    })
  }
})