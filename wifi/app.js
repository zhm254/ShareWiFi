const api = require('./utils/api.js')
App({
  globalData: {
    wifiList: [],

  },



  onLaunch: function() {
    api.login();
  },
})