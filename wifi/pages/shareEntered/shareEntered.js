// pages/shareEntered/shareEntered.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wifiName: '',
    wifiPw: ''
  },
  connectWiFi: function() {
    wx.startWifi({
      success: (res) => {
        //console.log(res);
        wx.connectWifi({
          SSID: this.data.wifiName,
          password: this.data.wifiPw,
          success: (res) => {
            wx.showLoading({
              title: '连接中',
            })
            //console.log(res);
            wx.getConnectedWifi({
              success: () => {
                //wx.hideLoading();
                wx.showToast({
                  title: '连接成功',
                  icon: 'success',
                  duration: 3000
                })
                wx.switchTab({
                  url: '../connectWifi/connectWifi'
                })
              },
              fail: () => {
                wx.hideLoading();
                setTimeout(() => {
                  wx.switchTab({
                    url: '../connectWifi/connectWifi'
                  })
                }, 3000)
              }
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.wifiName = options.wifiName;
    this.setData({
      wifiName: this.data.wifiName
    });
    this.data.wifiPw = options.wifiPw;
    this.setData({
      wifiPw: this.data.wifiPw
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