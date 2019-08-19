// pages/connect/connect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      SSID: options.ssid,
      BSSID: options.bssid
    })
  },
  getPasswd: function(event) {
    this.setData({
      passwd: event.detail.value
    });
  },
  connect: function() {
    wx.connectWifi({
      SSID: this.data.SSID,
      BSSID: this.data.BSSID,
      password: this.data.passwd,
      success: function(res) {
        wx.showToast({
          title: '连接成功!',
        });
        wx.switchTab({
          url: '/pages/urlList/urlList',
        })
      },
      fail: function(res) {
        wx.showToast({
          title: '连接失败!',
        });
      }
    })
  }
})