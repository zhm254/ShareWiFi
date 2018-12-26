// pages/scanCodeEntered/scanCodeEntered.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ssid: '',
    password: ''
  },
  connectWiFi: function() {
    wx.startWifi({
      success: () => {
        wx.connectWifi({
          SSID: this.data.ssid,
          password: this.data.password,
          success: () => {
            wx.getConnectedWifi({
              success: () => {
                wx.switchTab({
                  url: '../connectWifi/connectWifi'
                })
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
    // const scene = decodeURIComponent(query.scene);
    var scene = 6;
    // console.log(scene);
    // console.log(typeof scene);
    wx.request({
      url: 'https://wifi.cou8123.cn/api/wxapp/public/getwfinfo',
      data: {
        id: scene
      },
      method: 'POST',
      success: (res) => {
        console.log(res);
        this.data.ssid = res.data.data.data.ssid;
        this.setData({
          ssid: this.data.ssid
        });
        this.data.password = res.data.data.data.pw;
        this.setData({
          password: this.data.password
        });
        console.log(this.data.ssid);
        console.log(this.data.password);
      }
    })
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