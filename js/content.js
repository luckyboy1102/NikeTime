var sku = null;
var size;
var xxLDjal = new Date(03/01/2015);
var xxEDjal = new Date(05/01/2016);
var GMTd = new Date();

getSize();

function atc() {
    if (document.getElementsByName("skuAndSize")[0] == null) {
        setTimeout(atc, 100, false);
    } else {
        document.getElementsByName("skuAndSize")[0].value = sku;
        document.getElementById("buyingtools-add-to-cart-button").click();
        setInterval(function() {
            if ($('.notification-button').length > 0) {
                $('.notification-button').click();
                atc();
            }
        }, 1000);
    }
}

function getSize() {
    var port = chrome.extension.connect();
    port.postMessage("Get Size");
    port.onMessage.addListener(function(msg) {
        size = msg;
        console.log(msg);
        getSku();
        atc();
    })
}

function getSku() {
    if (document.getElementById("product-data") == null) {
        setTimeout(getSku, 500, false);
    } else {
        varskuData = JSON.parse(document.getElementById("product-data").innerHTML);
        var c = varskuData.skuContainer.productSkus;
        for (i = 0; i < c.length; i++) {
            if (c[i].displaySize == size) {
                sku = c[i].sku + ':' + c[i].displaySize;
				break;
            }
        }
    }
}