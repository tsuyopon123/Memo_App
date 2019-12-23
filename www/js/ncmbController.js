// This is a JavaScript file

var ncmbController = {
  APPLICATION_KEY: appKey,
  CLIENT_KEY: clientKey,

  ncmb: null,
  currentUser: null,
  screenSize: null,

  init: function () {
    var self = this;
    self.ncmb = new NCMB(self.APPLICATION_KEY, self.CLIENT_KEY);    // mobile backendの初期化
  },

  sendText: function (text) {
    var self = this;

    var Text = self.ncmb.DataStore("Memo");

    var TextData = new Text({ text: text });

    TextData.save()
      .then(function (saved) {
        alert("Text送信完了！");
      })
      .catch(function (err) {
        console.log(err);
      });
  },
}