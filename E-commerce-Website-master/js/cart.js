var cart = [];


/*
    @desc: display cart
*/
function displayCart() {
   
    $.getJSON("../data/productData.json", function (result) {
        
        var cartData = localStorage.getItem("cartItems").split(',');
        console.log(cartData)

        for(var data of cartData){
             $.each(result.Products, function (key, cartItem) {
                
                 if (data == cartItem.id)
                  {
                    cart.push(cartItem);
                    
                }
             });
        }
        console.log(cart)

        for (var product of cart) {
            var cartItem = document.createElement("div");
            cartItem.setAttribute("id",product.id);
            cartItem.setAttribute("class","thumbnail cart");
            document.getElementById("showCart").appendChild(cartItem);

            var productDetails = document.createElement("div");
            productDetails.setAttribute("id","details"+product.id)
            document.getElementById(product.id).append(productDetails)
            document.getElementById("details"+product.id).innerHTML = 
            `<div class="row" >
            <div class="col-md-6 col-sm-2 col-xs-12">
            <h1 style="color:red;">`+product.brand+`</h1>
            <h3>`+ product.productName+`</h3><h3> &#x20B9; `+product.price+`</h3>
            
            </div>
            <div class="col-md-6 col-sm-2 col-xs-12">
            <img src="` + product.productImage[0] + `" style="width:300px;height:400px;"></img>
            </div>
            </div>`

            var removeFromCart = document.createElement("button");
			removeFromCart.setAttribute("id", "cartBtn" + product.id);
            removeFromCart.setAttribute("class", "btn btn-lg btn-danger");
            document.getElementById("details"+product.id).appendChild(removeFromCart);
            removeFromCart.addEventListener("click",function(e)
			{	
                var prodId = (this.id).slice(-2);
                for(var d of cart){
                    if(d.id == prodId) {
                        
                        cart.splice(cart.indexOf(d),1)
                        var remove = document.getElementById(d.id);
                        remove.parentNode.removeChild(remove);
                       
                        
                    } 
                } 
			});
			document.getElementById("cartBtn" + product.id).innerHTML = "<center>" + "Remove Item" + "</center>";
        }
        
    });

}

/*
    @desc: display wishlist
*/
function displayWishlist() {
    
    //console.log(localStorage.wishlist);
    $.getJSON("../data/productData.json", function (result) {
        var wishlist = [];
        var wishlistData = localStorage.getItem("wishlistItems").split(',');
        //console.log(wishlistData)
        for(var data of wishlistData){
            $.each(result.Products, function (key, wishlistItem) {
               
                if (data == wishlistItem.id)
                 {
                    wishlist.push(wishlistItem);
                   
               }
            });
       }
     //  console.log(wishlist)


     for (var product of wishlist) {
        var wishlistItem = document.createElement("div");
        wishlistItem.setAttribute("id",product.id);
        wishlistItem.setAttribute("class","thumbnail");
        document.getElementById("showWishlist").appendChild(wishlistItem);

        var productDetails = document.createElement("div");
        productDetails.setAttribute("id","details"+product.id)
        document.getElementById(product.id).append(productDetails)
        document.getElementById("details"+product.id).innerHTML = 
            `<div class="row" >
            <div class="col-md-6 col-sm-2 col-xs-12">
            <h1 style="color:red;">`+product.brand+`</h1>
            <h3>`+ product.productName+`</h3><h3> &#x20B9; `+product.price+`</h3>
            </div>
            <div class="col-md-6 col-sm-2 col-xs-12">
            <img src="` + product.productImage[0] + `" style="width:300px;height:400px;"></img>
            </div>
            </div>`

            var removeFromWishlist = document.createElement("button");
			removeFromWishlist.setAttribute("id", "wishlistBtn" + product.id);
            removeFromWishlist.setAttribute("class", "btn btn-lg btn-danger");
            document.getElementById("details"+product.id).appendChild(removeFromWishlist);
            removeFromWishlist.addEventListener("click",function(e)
			{	
                var prodId = (this.id).slice(-2);
                for(var d of wishlist){
                    if(d.id == prodId) {
                        
                        wishlist.splice(wishlist.indexOf(d),1)
                        console.log(wishlist);
                        var remove = document.getElementById(d.id);
                        remove.parentNode.removeChild(remove);

                    } 
                }
                
			});
			document.getElementById("wishlistBtn" + product.id).innerHTML = "<center>" + "Remove Item" + "</center>";
    }
    });

}