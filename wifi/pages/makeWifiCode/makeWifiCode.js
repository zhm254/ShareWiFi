// pages/makeWifiCode/makeWifiCode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wifiName: '',
    wifiPw: ''
  },
  inputChange: function(e) {
    // console.log(e);
    // console.log(this);
    if (e.currentTarget.dataset.type === 'wifiName') {
      this.data.wifiName = e.detail.value;
      this.setData({
        wifiName: this.data.wifiName
      });
    } else if (e.currentTarget.dataset.type === 'wifiPw') {
      this.data.wifiPw = e.detail.value;
      this.setData({
        wifiPw: this.data.wifiPw
      });
    }
    // console.log(this.data.wifiName + 'name');
    // console.log(this.data.wifiPw + 'pw');
    // console.log(typeof(this.data.wifiName));
    // console.log(typeof(this.data.wifiPw));
    // console.log(this.data.wifiPw.length);
  },
  getWiFiCode: function() {
    if (this.data.wifiName == '') {
      wx.showToast({
        title: 'WiFi名称不能为空',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.wifiName != '' && this.data.wifiPw != '') {
      if (this.data.wifiPw.length < 8) {
        wx.showToast({
          title: '密码长度需不少于8位',
          icon: 'none',
          duration: 2000
        })
      } else if (this.data.wifiPw.length >= 8) {
        wx.request({
          url: 'https://wifi.cou8123.cn/api/wxapp/public/getWXACode',
          data: {
            ssid: this.data.wifiName,
            password: this.data.wifiPw,
            bssid: '', //可选的
            user_id: '', //可选的，openid
          },
          method: 'POST',
          success: (res) => {
            //console.log(res);
            var WiFidata = res.data;
            wx.navigateTo({
              url: '../WiFiCode/WiFiCode?WiFidata=' + JSON.stringify(WiFidata) + '&' + 'wifiName=' + this.data.wifiName
            })
            this.data.wifiName = '';
            this.setData({
              wifiName: this.data.wifiName
            });
            this.data.wifiPw = '';
            this.setData({
              wifiPw: this.data.wifiPw
            });
          }
        })

      }
    } else if (this.data.wifiName != '' && this.data.wifiPw.length === 0) {
      wx.request({
        url: 'https://wifi.cou8123.cn/api/wxapp/public/getWXACode',
        data: {
          ssid: this.data.wifiName,
          password: this.data.wifiPw,
          bssid: '', //可选的
          user_id: '', //可选的，openid
        },
        method: 'POST',
        success: (res) => {
          //console.log(res);
          var WiFidata = res.data;
          wx.navigateTo({
            url: '../WiFiCode/WiFiCode?WiFidata=' + JSON.stringify(WiFidata) + '&' + 'wifiName=' + this.data.wifiName
          })
          this.data.wifiName = '';
          this.setData({
            wifiName: this.data.wifiName
          });
          this.data.wifiPw = '';
          this.setData({
            wifiPw: this.data.wifiPw
          });

        }
      })
    }
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