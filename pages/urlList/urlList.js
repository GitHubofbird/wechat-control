//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      urlList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {    
    wx.cloud.init({
      env:'temp-mpyef'
    })   
    
  },
  onShow:function(){
    var that = this
    const db = wx.cloud.database();
    db.collection('urlList').get({
      success: function (res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        console.log(res.data)
        that.setData({
          urlList: res.data
        })
      }
    });
  },
  /*
   * 用户按下连接服务器按钮    
   */
  connect: function(e) {
    console.log(e)
    var url = e.currentTarget.dataset.url;
    //1. 判断用户是否在输入框中输入完整的服务器地址
    if (url == '') {
      wx.showModal({
        title: '提示',
        content: '当前服务器不可用!'
      })
      return;
    }
    // 发起到服务器的GET请求,并分析服务器的响应结果
    wx.request({
      url: url,
      data: {
        cmd: '0'
      },
      success: function(res) {
        // 获取请求响应地址,供control页面调用     
        console.log("url:" + url)
        app.globalData.postURL = url
        //跳转到小车控制界面(/pages/drive/drive)
        wx.switchTab({
          url: '/pages/drive/drive',
        })
        wx.showModal({
          title: '提示',
          content: '服务器链接成功!',
        })
      },
      fail: function(res) {
        wx.showModal({
          title: '提示',
          content: '当前服务器不可用！',
        })
      }
    })

  },
  addUrl: function() {
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },
})