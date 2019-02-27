//index.js
import wxbarcode from 'wxbarcode'

Page({

  data: {
    code: '56565656565656565'
  },

  onLoad: function () {
    let that=this;
    wxbarcode.barcode('barcode', '56565656565656565', 680, 200);
    wxbarcode.qrcode('qrcode', that.data.code, 420, 420);
  }
})