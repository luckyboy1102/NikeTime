chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        if (msg == "Get Size") {
            port.postMessage(localStorage.getItem('size'));
        }
        if (msg == "Get Data") {
            port.postMessage(localStorage.getItem(custData));
        }
    });
});