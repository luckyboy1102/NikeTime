var _nike_url = 'http://m.nike.com/cn/zh_cn/pw/%E7%94%B7%E5%AD%90-%E9%9E%8B%E7%B1%BB/7puZoi3?sortOrder=publishdate|desc';
var interval = 60;

function load_json(uri, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var response = xhr.responseText;
                callback(response);
            } else {
                console.log("load failed");
            }
        }
    }
}

function sync() {
    console.log(new Date() + " start to sync");
    load_json(_nike_url, function(r){
        if (typeof r != "undefined") {
            var exp = new RegExp(/"products":\[[\s\S]*\}]/);
            var obj = JSON.parse("[{" + r.match(exp)[0]);
            var firstItem = obj[0].products[0];
            if (localStorage.getItem("first") != firstItem.title) {
                localStorage.setItem("first", firstItem.title);
                _show_basic("icon_48.png", "New Arrives!", "Here comes a new sneaker! Seize time to see it!");
            }
        }
    });
}

function _show_basic(icon_uri, title, desc) {
    var opt = {
        type: "basic",
        title: title,
        message: desc,
        iconUrl: icon_uri,
        buttons: [{
            title: "Click to view detail",
            iconUrl: "arrow_25px.png"
        }]
    }
    var nid = "";
    chrome.notifications.create(nid, opt);
}

function add_jump_listener() {
    chrome.notifications.onClicked.addListener(function(notification_id){
        var jump_url = _nike_url;
        !!jump_url && window.open(jump_url);
    });
    chrome.notifications.onButtonClicked.addListener(function(notification_id){
        var jump_url = _nike_url;
        !!jump_url && window.open(jump_url);
    });
}

function initLS() {
    if (typeof localStorage.getItem("first") == "undefined") {
        localStorage.setItem("first", "");
    }
}

function run() {
    sync();
    setInterval(sync, interval * 1000);
}

initLS();
add_jump_listener();
run();
