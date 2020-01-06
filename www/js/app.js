///// Save memo and return to top page
function onSaveBtn() {
    var text = $("#Memo").val();
    if (text != '') {
        // Save to local storage
        addMemo(text);
        ncmbController.sendText(text);
        // Clear form
        $("#Memo").val("");
        // Initialize top page
        initTopPage();
    }
    $.mobile.changePage("#TopPage", { reverse: true });
}

///// Initialize top page
function initTopPage() {
    ncmbController.init();
    ncmbController.showList();
}

///// Move to detail page
function onShowLink() {
    var $li = $(this).parent();
    var memoTitle = $li.find("h3").text();
    var memoHtml = $li.find("p").html().replace(/\n/g, "<br>");
    
    $("#ShowPage h1").text(memoTitle);
    $("#ShowPage p").html(memoHtml);
    $.mobile.changePage("#ShowPage");
}

///// Delete memo
function onDeleteLink() {
    if (!confirm("Are you sure to delete this memo?")) {
      return;
    }
    var $li = $(this).parent();
    var id = $li.data("id");
    deleteMemo(id);
    
    initTopPage();
    
    // Return to top
    $.mobile.changePage("#TopPage", { reverse: true });
}

///// Called when app launch
function onReady() {
    initTopPage();
    $("#SaveBtn").click(onSaveBtn);
    $("#TopListView").on("click", "a.show", onShowLink);
    $("#TopListView").on("click", "a.delete", onDeleteLink);
}

$(onReady); // on DOMContentLoaded

