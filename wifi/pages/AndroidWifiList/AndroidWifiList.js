// pages/AndroidWifiList/AndroidWifiList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wifiList: [],
    ssid: '',
    wifi: '',
    showModal: false,
    isdisabled: false,
    inputPassword: '',
    WiFiPassword: ''
  },
  unlockMore: function() {
    //console.log(this.data.wifiList);
    if (this.data.wifiList != []) {
      this.data.wifiList = [];
      this.setData({
        wifiList: this.data.wifiList
      });
      //console.log(this.data.wifiList);
    }
    wx.startWifi({
      success: (res) => {
        //console.log(res);
        wx.getWifiList({
          success: (res) => {
            //console.log(res);
            wx.onGetWifiList((res) => {
              //console.log(res.wifiList);
              for (var i = 0; i < res.wifiList.length; i++) {
                if (res.wifiList[i].SSID != '') {
                  this.data.wifiList.push(res.wifiList[i]);
                  this.setData({
                    wifiList: this.data.wifiList
                  });
                }
              }
              //console.log(this.data.wifiList);
            })
          },
          fail: (res) => {
            //console.log(res);
            if (res.errCode === 12005) {
              wx.showToast({
                title: '请先打开WiFi开关',
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      }
    })
  },
  connectWiFi: function(e) {
    //console.log(e);
    this.data.ssid = e.currentTarget.dataset.item.SSID;
    this.data.wifi = e.currentTarget.dataset.item;
    this.setData({
      ssid: this.data.ssid,
      wifi: this.data.wifi
    });
    //console.log(this.data.wifi);
    this.data.showModal = true;
    this.setData({
      showModal: this.data.showModal
    });

  },
  cancel: function() {
    this.data.showModal = false;
    this.setData({
      showModal: this.data.showModal
    });
  },
  inputChange: function(e) {
    // console.log(typeof(e.detail.value));
    // console.log(e.detail.value.length);
    if (e.detail.value.length > 0 && e.detail.value.length < 8) {
      this.data.isdisabled = true;
      this.setData({
        isdisabled: this.data.isdisabled
      });
    } else {
      this.data.isdisabled = false;
      this.setData({
        isdisabled: this.data.isdisabled
      });
    }
    this.data.inputPassword = e.detail.value;
    this.setData({
      inputPassword: this.data.inputPassword
    })
    //console.log(this.data.inputPassword);

  },
  confirm: function(e) {
    //console.log(e.currentTarget.dataset.wifi.SSID);
    //console.log(e);
    this.data.showModal = false;
    this.setData({
      showModal: this.data.showModal
    })
    this.data.WiFiPassword = this.data.inputPassword;
    this.data.inputPassword = '';
    this.setData({
      WiFiPassword: this.data.WiFiPassword,
      inputPassword: this.data.inputPassword
    })
    //console.log(this.data.WiFiPassword);
    //console.log(typeof(this.data.WiFiPassword));
    wx.startWifi({
      success: (res) => {
        wx.showLoading({
          title: '连接中'
        })
        //console.log(res.errMsg);
        // console.log(e.currentTarget.dataset.wifi.SSID);
        // console.log(this.data.WiFiPassword);
        wx.connectWifi({
          SSID: e.currentTarget.dataset.wifi.SSID,
          password: this.data.WiFiPassword,
          success: (res) => {
            //console.log(res);
            wx.getConnectedWifi({
              success: () => {
                wx.showToast({
                  title: 'WiFi连接成功',
                  icon: 'success',
                  duration: 2000
                })
                var ssid = e.currentTarget.dataset.wifi.SSID;
                var bssid = e.currentTarget.dataset.wifi.BSSID;
                var password = this.data.WiFiPassword;
                // console.log(ssid);
                // console.log(bssid);
                // console.log(password);
                // console.log(typeof ssid);
                // console.log(typeof bssid);
                // console.log(typeof password);
                wx.request({
                  url: 'https://wifi.cou8123.cn/api/wxapp/public/connectwifi',
                  data: {
                    ssid: ssid,
                    bssid: bssid,
                    password: password
                  },
                  method: 'POST',
                  success: (res) => {
                    //console.log(res);
                  }
                })
                this.data.WiFiPassword = '';
                this.setData({
                  WiFiPassword: this.data.WiFiPassword
                });
                wx.navigateBack({
                  delta: 1
                })
              },
              fail: (res) => {
                //console.log(res);
              }
            })
          },
          fail: (res) => {
            //wx.hideLoading();
            //console.log(res);
            if (res.errCode === 12005) {
              wx.showToast({
                title: '请先打开WiFi开关',
                icon: 'none',
                duration: 2000
              })
            }
            if (res.errCode === 12002) {
              wx.showToast({
                title: 'WiFi密码错误',
                icon: 'none',
                duration: 2000
              })
            }
            if (res.errCode === 12003) {
              wx.showToast({
                title: '连接超时，请重新连接',
                icon: 'none',
                duration: 2000
              })
            }
          }

        })
      }
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
    if (this.data.wifiList != []) {
      this.data.wifiList = [];
      this.setData({
        wifiList: this.data.wifiList
      });
      //console.log(this.data.wifiList);
    }
    wx.startWifi({
      success: (res) => {
        //console.log(res);
        wx.getWifiList({
          success: (res) => {
            //console.log(res);
            wx.onGetWifiList((res) => {
              //console.log(res.wifiList);
              for (var i = 0; i < res.wifiList.length; i++) {
                if (res.wifiList[i].SSID != '') {
                  this.data.wifiList.push(res.wifiList[i]);
                  this.setData({
                    wifiList: this.data.wifiList
                  });
                }
              }
            })
          },
          fail: (res) => {
            //console.log(res);
          }
        })
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