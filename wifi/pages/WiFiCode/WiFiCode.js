Page({

  /**
   * 页面的初始数据
   */
  data: {
    wifiCode: '',
    wifiName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options);
    // console.log(JSON.parse(options.WiFidata));
    // console.log(options.wifiName);
    // console.log((JSON.parse(options.WiFidata)).data.data);
    // console.log(typeof((JSON.parse(options.WiFidata)).data.data));
    this.data.wifiCode = (JSON.parse(options.WiFidata)).data.data;
    this.setData({
      wifiCode: this.data.wifiCode
    });
    this.data.wifiName = options.wifiName;
    this.setData({
      wifiName: this.data.wifiName
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