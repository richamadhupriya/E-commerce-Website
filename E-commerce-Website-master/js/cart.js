var cart = [];
var wishlist = [];

/*
    @desc: display cart
*/
function displayCart() {
    //console.log(localStorage.wishlist);
    $.getJSON("../data/productData.json", function (result) {
        $.each(result.Products, function (data, cartItem) {
            if (localStorage.cart == cartItem.id) {
                cart.push(cartItem);
                console.log(cart);
            }
        });

        
        for (var product of cart) {
            var cartItem = ' ';
            cartItem += "<div class=\"row\""
            cartItem += "<div class=\"col-md-6\" id=\"prodImage\"> "
            cartItem += "<img src=" + product.productImage[0] + " style=\"width:300px;height:300px;\"></img>"
            cartItem += "<div class=\"col-md-6\" id=\"prodDetail\">"
            cartItem += "<h1>" + product.productName + "</h1>"
            cartItem += "<h4>" + "&#x20B9; " + product.price + "</h4>"
            cartItem += "<button class=\"btn btn-lg btn-success\">Buy now</button>"
            cartItem += "</div></div></div>"
        }
        $("#showCart").append(cartItem);
    });

}

/*
    @desc: display wishlist
*/
function displayWishlist() {
    //console.log(localStorage.wishlist);
    $.getJSON("../data/productData.json", function (result) {
        $.each(result.Products, function (data, wishlistItem) {
            if (localStorage.wishlist == wishlistItem.id) {
                cart.push(wishlistItem)
                console.log(wishlist);
            }
        });


        for (var product of cart) {
            var wishlistItem = ' ';
            wishlistItem += "<div class=\"row\""
            wishlistItem += "<div class=\"col-md-6\" id=\"prodImage\"> "
            wishlistItem += "<img src=" + product.productImage[0] + " style=\"width:300px;height:300px;\"></img>"
            wishlistItem += "<div class=\"col-md-6\" id=\"prodDetail\">"
            wishlistItem += "<h1>" + product.productName + "</h1>"
            wishlistItem += "<h4>" + "&#x20B9; " + product.price + "</h4>"
            wishlistItem += "<button class=\"btn btn-lg btn-success\">Buy now</button>"
            wishlistItem += "</div></div></div>"
            
        }
        $("#showCart").append(wishlistItem);
    });

}