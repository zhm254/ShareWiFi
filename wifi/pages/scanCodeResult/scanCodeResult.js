// pages/scanCodeResult/scanCodeResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scene: '',
    flag: '',
    connectedWifi: ''
  },
  unlockWiFi: function() {
    wx.navigateTo({
      url: '../unlock/unlock'
    })
  },
  changeWiFi: function() {
    wx.navigateTo({
      url: '../unlock/unlock'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //console.log(options);
    this.data.scene = options.scene;
    this.setData({
      scene: this.data.scene
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    setTimeout((id) => {
      wx.reLaunch({
        url: '../webViewPage/webViewPage?id=' + id
      })
    }, 500, this.data.scene)
    wx.getConnectedWifi({
      success: (res) => {
        //console.log(res);
        this.data.flag = 1;
        this.setData({
          flag: this.data.flag
        });
        //console.log(this.data.flag);
        this.data.connectedWifi = res.wifi.SSID;
        this.setData({
          connectedWifi: this.data.connectedWifi
        });
      },
      fail: () => {
        this.data.flag = 2;
        this.setData({
          flag: this.data.flag
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})