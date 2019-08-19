//import drive from '/pages/drive/drive.js'
const ctx = wx.createCanvasContext('myCanvas')
//获取应用实例
const app = getApp()
Page({
  data: {
    x: 0,
    y: 0
  },
  /**
   * 手指触摸动作开始
   */
  start(e) {
    this.setData({
      x: Math.floor(e.touches[0].x),
      y: Math.floor(e.touches[0].y)
    });
    this.carMove("T");
    ctx.moveTo(e.touches[0].x, e.touches[0].y);
  },
  /**
   * 手指触摸后移动
   */
  move(e) {

    let X = Math.floor(e.touches[0].x);
    let Y = Math.floor(e.touches[0].y);
    this.getDirection(X, Y);
    this.setData({
      x: X,
      y: Y
    });
    ctx.lineTo(X, Y)
  },
  /**
   * 手指触摸动作结束
   */
  end(e) {
    this.carMove("S")
    this.setData({
      x: 0,
      y: 0
    });
    ctx.stroke();
    ctx.draw();
  },
  /**
   * 小车移动函数
   * 根据按钮获取指令参数(data-direction),并将指令发送到服务器端
   */
  carMove: function(cmd) {
    let postURL = app.globalData.postURL
    console.log("postUrl:" + postURL)
    wx.request({
      url: postURL,
      data: {
        cmd: cmd
      },
      method: "GET",
      success: function(res) {
        console.log("success")
      },
      fail: function(res) {
        console.log("fail")
      }
    })
  },
  /**
   * 根据坐标判断小车是否应该移动及移动方向
   */
  getDirection: function(x, y, postUrl) {
    let count = 0;
    let oldX = this.data.x;
    let oldY = this.data.y;
    //小车前进或后退
    if (x - oldX >= 2) {
      count++;
      if (count % 3 == 0) {
        this.carMove("T")
        this.carMove("S")
      }
      //判断小车转向
      if (y - oldY >= 2) {
        count++;
        if (count % 3 == 0) {
          this.carMove("L")
          this.carMove("S")
        }

      } else if (oldY - y >= 2) {
        if (count % 3 == 0) {
          this.carMove("R")
          this.carMove("S")
        }
      }
    } else if (oldX - x >= 2) {
      if (count % 3 == 0) {
        this.carMove("B")
        this.carMove("S")
      }
      if (y - oldY >= 2) {
        if (count % 3 == 0) {
          this.carMove("L")
          this.carMove("S")
        }

      } else if (oldY - y >= 2) {
        if (count % 3 == 0) {
          this.carMove("R")
          this.carMove("S")
        }
      }
    }

  }
})