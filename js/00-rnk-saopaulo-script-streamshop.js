$(document).ready(() => {
    configStreamShop();
});

function configStreamShop() {
    try {
        if (!$('.rnk-comp-live-stories').length) return;

        $(window).on('message', (e) => {
            const event = e.originalEvent;
    
            if (!event.origin.includes("streamshop.com.br")) {
                return;
            };
            
            if (event.data.action.includes("addProductToCart")) {
                const skuId = event.data.data.cartItem.selectedItem.sku;
                const qty = event.data.data.cartItem.quantity;
                const sellerId = event.data.data.cartItem.selectedItem.sellerId;
                const sallesChannelId = event.data.data.cartItem.selectedItem.salePolicy;
    
                const urlAddToCart = '/checkout/cart/add?sku=' + skuId + '&qty=' + qty + '&seller=' + sellerId + '&sc=' + sallesChannelId + '&redirect=false';
    
                $.ajax({
                    type: 'GET',
                    url: urlAddToCart,
                    contentType: 'application/json'
                }).done((response) => {
                    $.header_atualizaQuantidadeItensCarrinho();
                    $.header_exibirProdutoAdicionadoCarrinho(null, skuId);
                });
            }
    
            if (event.data.action.includes("removeFromCart")) {
                const skuId = event.data.data.cartItem.selectedItem.sku;
                const qty = event.data.data.cartItem.quantity;
    
                vtexjs.checkout.getOrderForm().then((orderForm) => {
                    const item = orderForm.items.find(i => i.id == skuId);
                    if (!item) return;
    
                    const index = orderForm.items.indexOf(item);
    
                    vtexjs.checkout.updateItems([{ index, quantity: qty }])
                        .done((orderForm) => {
                            $.header_atualizaQuantidadeItensCarrinho();
                        })
                        .fail((err) => console.error(err));
                });
            }
        });        
    } catch (error) {
        console.log(error);        
    }
}