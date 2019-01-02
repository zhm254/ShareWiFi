// pages/connectWifi/connectWifi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wifiList: [],
    flag: '',
    connectedWifi: '',
    showModal: false,
    ssid: '',
    inputPassword: '',
    WiFiPassword: '',
    wifi: '',
    isdisabled: false
  },
  unlockWiFi: function() {
    wx.getSystemInfo({
      success: (res) => {
        //console.log(res);
        //console.log(res.platform);
        if (res.platform === 'android') {
          wx.startWifi({
            success: (res) => {
              wx.getWifiList({
                success: (res) => {
                  //console.log(res);
                  wx.navigateTo({
                    url: '../AndroidWifiList/AndroidWifiList'
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
        } else if (res.platform === 'ios' && (parseInt(res.system.substr(4))) >= 11) {
          //console.log(parseInt(res.system.substr(4)));
          wx.navigateTo({
            url: '../unlock/unlock'
          })
        } else if (res.platform === 'ios' && (parseInt(res.system.substr(4))) < 11) {
          wx.showToast({
            title: '请升级到ios11或以上版本',
            icon: 'none',
            duration: 2000
          })
        }
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
        wx.connectWifi({
          SSID: e.currentTarget.dataset.wifi.SSID,
          password: this.data.WiFiPassword,
          success: (res) => {
            //console.log(res.errMsg);
            wx.getConnectedWifi({
              success: () => {
                wx.showToast({
                  title: 'WiFi连接成功',
                  icon: 'success',
                  duration: 2000
                })
                this.onShow();
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
                    //console.log(res)
                  }
                })
                this.data.WiFiPassword = '';
                this.setData({
                  WiFiPassword: this.data.WiFiPassword
                });
              },
              fail: () => {
                wx.showToast({
                  title: 'WiFi密码错误',
                  icon: 'none',
                  duration: 3000
                })
              }
            })
          },
          fail: () => {
            wx.hideLoading();
            //console.log("fail");
          }

        })
      }
    })



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
  unlockMore: function() {
    //console.log(this.data.wifiList);
    if (this.data.wifiList != []) {
      this.data.wifiList = [];
      this.setData({
        wifiList: this.data.wifiList
      });
      //console.log(this.data.wifiList);
    }
    //console.log(getApp().globalData.wifiList);
    if (getApp().globalData.wifiList != []) {
      getApp().globalData.wifiList = [];
      this.setData({
        wifiList: getApp().globalData.wifiList
      });
      //console.log(getApp().globalData.wifiList);
    }
    wx.navigateTo({
      url: '../unlock/unlock'
    })
  },
  changeWiFi: function() {
    wx.getSystemInfo({
      success: (res) => {
        //console.log(res);
        //console.log(res.platform);
        if (res.platform === 'android') {
          wx.navigateTo({
            url: '../AndroidWifiList/AndroidWifiList'
          })
        } else if (res.platform === 'ios' && (parseInt(res.system.substr(4))) >= 11) {
          wx.navigateTo({
            url: '../unlock/unlock'
          })
        } else if (res.platform === 'ios' && (parseInt(res.system.substr(4))) < 11) {
          wx.showToast({
            title: '请升级到ios11或以上版本',
            icon: 'none',
            duration: 2000
          })
        }
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
    wx.getSystemInfo({
      success: (res) => {
        //console.log(res);
        //console.log(res.platform);
        if (res.platform === 'android') {
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
        } else if (res.platform === 'ios') {
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
              //console.log(this.data.wifiList);
              if (this.data.wifiList != []) {
                this.data.wifiList = [];
                this.setData({
                  wifiList: this.data.wifiList
                });
                //console.log(this.data.wifiList);
              }
              //console.log(getApp().globalData.wifiList);
              if (getApp().globalData.wifiList != []) {
                getApp().globalData.wifiList = [];
                this.setData({
                  wifiList: getApp().globalData.wifiList
                });
                //console.log(getApp().globalData.wifiList);
              }

            },
            fail: () => {
              var app = getApp();
              for (var i = 0; i < app.globalData.wifiList.length; i++) {
                if (app.globalData.wifiList[i].SSID != '') {
                  this.data.wifiList.push(app.globalData.wifiList[i]);
                  this.setData({
                    wifiList: this.data.wifiList
                  });
                }
              }
              //console.log(this.data.wifiList.length);
              // console.log(this.data.wifiList);
              //console.log("fail");
              if (this.data.wifiList.length === 0) {
                this.data.flag = 2;
                this.setData({
                  flag: this.data.flag
                });
              } else {
                this.data.flag = 3;
                this.setData({
                  flag: this.data.flag
                });
              }
              //console.log(this.data.flag);
            }
          })
        }
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