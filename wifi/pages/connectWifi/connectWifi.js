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
    wifi: ''
  },
  unlockWiFi: function() {
    wx.navigateTo({
      url: '../unlock/unlock'
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
        //console.log(res.errMsg);
        wx.connectWifi({
          SSID: e.currentTarget.dataset.wifi.SSID,
          password: this.data.WiFiPassword,
          success: (res) => {
            //console.log(res.errMsg);
            wx.getConnectedWifi({
              success: () => {
                //console.log(this);
                wx.showToast({
                  title: 'WiFi连接成功',
                  icon: 'success',
                  duration: 2000
                })
                this.onShow();
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
            console.log("fail");
          }

        })
      }
    })



  },
  inputChange: function(e) {
    this.data.inputPassword = e.detail.value;
    this.setData({
      inputPassword: this.data.inputPassword
    })
    //console.log(this.data.inputPassword);
  },
  unlockMore: function() {
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
    console.log("onshow");
    var app = getApp();
    for (var i = 0; i < app.wifiList.length; i++) {
      if (app.wifiList[i].SSID != '') {
        this.data.wifiList.push(app.wifiList[i]);
        this.setData({
          wifiList: this.data.wifiList
        });
      }
    }



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
        if (this.data.wifiList.length != 0) {
          this.data.wifiList.length = 0;
          this.setData({
            wifiList: this.data.wifiList
          });
        }
      },
      fail: () => {
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