App({
  globalData: {
    wifiList: [],
  },
  onLaunch: function() {
    // wx.getUserInfo({
    //   withCredentials: true,
    //   success: (res) => {
    //     console.log(res);
    //   },
    //   fail: (res) => {
    //     console.log(res);
    //     wx.showModal({
    //       title: '警告',
    //       content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
    //       showCancel: false,
    //       success: function(res) {
    //         if (res.confirm) {
    //           console.log('用户点击确定')
    //           wx.navigateTo({
    //             url: '../tologin/tologin',
    //           })
    //         }
    //       }
    //     })
    //   }
    // })

  },
})