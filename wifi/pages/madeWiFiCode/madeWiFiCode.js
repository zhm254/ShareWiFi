// pages/madeWiFiCode/madeWiFiCode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wifiList: []
  },
  goOperateWiFiCode: function(e) {
    //console.log(e.currentTarget.dataset.wifi);
    var wifi = JSON.stringify(e.currentTarget.dataset.wifi);
    wx.navigateTo({
      url: '../operateWiFiCode/operateWiFiCode?wifi=' + wifi
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    var openid = wx.getStorageSync('openid');
    //console.log(openid);
    wx.request({
      url: 'https://wifi.cou8123.cn/api/wxapp/public/wifilists',
      data: {
        user_id: openid,
      },
      method: 'POST',
      success: (res) => {
        //console.log(res);
        this.data.wifiList = res.data.data.data.data;
        this.setData({
          wifiList: this.data.wifiList
        });
        //console.log(this.data.wifiList);
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