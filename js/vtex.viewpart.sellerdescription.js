/// <reference path="jquery-1.4.1-vsdoc.js" />
/// <reference path="vtex.common.js" />
/// <reference path="vtex.jsevents.js" />
/// <reference path="vtex.skuEvents.js" />


$(document).ready(function () {
    var sellerDescriptionListener = new Vtex.JSEvents.Listener('sellerDescriptionListener', SellerDescription_OnSkuDataReceived);
    skuEventDispatcher.addListener(skuDataReceivedEventName, sellerDescriptionListener);
});

function SellerDescription_OnSkuDataReceived(e) {
    if (e.skuData.id > 0) {
        var sellerhtml = "";
        for (var obj in e.skuData.SkuSellersInformation)
        {
            if (e.skuData.SkuSellersInformation[obj].Name && e.skuData.SkuSellersInformation[obj].IsDefaultSeller == true)
            {
                //sellerhtml += "<div class=\"seller-name\"><strong>Seller: <strong>" + e.skuData.SkuSellersInformation[obj].Name + "</strong></em></p>";
                //sellerhtml += "<p><em class=\"photo\">" + e.skuData.SkuSellersInformation[obj].LogoUrl + "</em></p>";
                var url = '/no-cache/seller/get/snippet/' + e.skuData.SkuSellersInformation[obj].SellerId + "/" + e.skuData.SkuSellersInformation[obj].Name + "/3" ;
                jQuery.ajax(
                {
                    type: 'POST',
                    url: url,
                    data: '',
                    success: function (data) {
                        $('.seller-description').html(data);
                    },
                    error: function () {
                    }
                });
            }
        }
        
    }
}