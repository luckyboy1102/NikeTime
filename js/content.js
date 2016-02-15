var sku = null;
var size;

var quantity = 3;
var funInterval;

getSize();

function act() {
    if (document.getElementsByName("skuAndSize")[0] == null) {
        setTimeout(act, 100, false);
    } else {
        buy();
        funInterval = setInterval("addToCart()", 1000);
    }
}

function buy() {
	document.getElementsByName("skuAndSize")[0].value = sku;
	document.getElementById("buyingtools-add-to-cart-button").click();
	console.log("Clicked!" + " Current:" + quantity);
}

function addToCart() {
	if (quantity > 0) {
		buy();
		quantity--;
	} else {
		clearInterval(funInterval);
	}
}

function getSize() {
    var port = chrome.extension.connect();
    port.postMessage("Get Size");
    port.onMessage.addListener(function(msg) {
        size = msg;
        console.log(msg);
        getSku();
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
				if (c[i].inStock) {
					sku = c[i].sku + ':' + c[i].displaySize;
					act();
				} else {
					console.log(size + " not in stock!");
				}
				break;
            }
        }
    }
}