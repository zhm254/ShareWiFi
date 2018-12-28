Page({

  /**
   * 页面的初始数据
   */
  data: {
    wifiCode: '',
    wifiName: '',
    wifiPw: ''
  },

  saveCode: function(e) {
    //console.log(e);
    wx.getImageInfo({
      src: e.currentTarget.dataset.wificode,
      success: (res) => {
        //console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.path,
          success: (res) => {
            //console.log(res);
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: (res) => {
            //console.log(res);
            wx.getSetting({
              success: (res) => {
                if (!res.authSetting['scope.writePhotosAlbum']) {
                  wx.showModal({
                    title: '扫码连WiFi提醒您',
                    content: '保存到相册失败，需要获取您的授权才能保存哦',
                    showCancel: false,
                    success: (res) => {
                      if (res.confirm) {
                        //console.log('用户点击确定');
                        wx.openSetting({
                          success: (res) => {
                            //console.log(res.authSetting);
                          }
                        })
                      }
                    }
                  })
                }
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
  onShareAppMessage: function(res) {
    return {
      title: '邀请你连WiFi',
      path: '/pages/shareEntered/shareEntered?wifiName=' + this.data.wifiName + '&wifiPw=' + this.data.wifiPw,
      success: (res) => {
        wx.showToast({
          title: "分享成功",
          icon: 'success',
          duration: 2000
        })
      },

    }
  }
})