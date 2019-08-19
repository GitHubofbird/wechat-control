Page({

  /**
   * 页面的初始数据
   */
  data: {
    wifiStatus: "",
    wifiList: [],
    password: ""
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    /**
     * 初始化wifi设备
     */
    if (wx.startWifi) {
      wx.startWifi({
        success(res) {
          that.setData({
            wifiStatus: "已开启"
          });
        },
        fail(res) {
          that.setData({
            wifiStatus: "未开启!"
          });
        }

      });
    } else {
      that.setData({
        wifiStatus: "微信版本过低!"
      });
    }

  },
  /**
   * 获取wifi列表
   */
  getWifiList: function() {
    var that = this;
    that.setData({
      wifiList: []
    })
    //获取wifi列表
    wx.getWifiList({
      success(res) {
        wx.onGetWifiList(function(res) {
          that.setData({
            wifiList: res.wifiList
          });
        });
      },
      fail(res) {
        that.setData({
          wifiStatus: "请尝试打开GPS"
        });
      }
    });
  },
  /**
   * 连接wifi
   */
  connectWifi: function(event) {
    wx.navigateTo({
      url: '/pages/connect/connect?ssid=' + event.currentTarget.dataset.wifi.SSID + '&bssid=' + event.currentTarget.dataset.wifi.BSSID,
    })
  }
})