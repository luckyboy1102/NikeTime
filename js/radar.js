var _nike_url = 'http://m.nike.com/cn/zh_cn/pw/%E7%94%B7%E5%AD%90-%E9%9E%8B%E7%B1%BB/7puZoi3?sortOrder=publishdate|desc';

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
                syslog("load_json() error: [" + xhr.status +"]" + uri);
            }
        }
    }
}

function sync() {
    load_json(_nike_url, function(r){
        if (typeof r != "undefined") {
            var xmlString = r;
            var dom = new DOMParser().parseFromString(xmlString, "text/xml");
            console.log(dom.getElementById('tmpData-sections').innerHTML);
        }
    });
}

sync();
