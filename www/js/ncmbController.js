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
        initTopPage();
      })
      .catch(function (err) {
        console.log(err);
      });
  },

  deleteText: function (id) {
    var self = this;
    var Text = self.ncmb.DataStore("Memo");
    var TextId = new Text({ objectId: id});

    TextId.delete()
      .then(function () {
        alert("削除しました");
        initTopPage();
      })
      .catch(function (err) {
        console.log(err);
      });
  },

  showList: function () {
    var self = this;

    var Text = self.ncmb.DataStore("Memo");

    Text.order("text", true)
      // .limit(10)
      .fetchAll()
      .then(function (results) {
        if (results.length > 0) {
          for (i = 0; i < results.length; i++) {
            var text = results[i]
              order = i + 1
              text = text.text;

            // console.log(order + ": " + text);
          }
        } else {
          console.log("メモがありません");
        }
        $("#TopListView").empty();
        for (var i = 0; i < Object.keys(results).length; i++) {
            var memo = results[i];
            var d = new Date(memo.updateDate);
            var date = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
            
            $li = $("<li><a href='#' class='show'><h3></h3><p></p></a><a href='#' class='delete'>Delete</a></li>");
            $li.data("id", memo.objectId);
            $li.find("h3").text(date);
            $li.find("p").text(memo.text);
            $("#TopListView").prepend($li);
        }
        if (Object.keys(results).length == 0) {
            $li = $("<li>No memo found</li>");
            $("#TopListView").prepend($li);
        }
        $("#TopListView").listview("refresh");
      })
      .catch(function (err) {
        console.log(err);
      });
  },
}