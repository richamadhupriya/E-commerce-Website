var cart = [];


/*
    @desc: display cart
*/
function displayCart() {
   
    $.getJSON("../data/productData.json", function (result) {
        
        var cartData = localStorage.getItem("cartItems").split(',');
        console.log(cartData)

        for(var data of cartData){
             $.each(result, function (key, cartItem) {
                
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
            <h3>Name: `+ product.productName+`</h3>
            <h3 id="color">Color: `+product.color+`</h3>
            <h3 id="price" value="`+product.price+`">Price: &#x20B9; `+product.price+`</h3>
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
            $.each(result, function (key, wishlistItem) {
               
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

/*
 @desc: display details on clicking the image
*/
function displayDetails() {
   
    $.getJSON("../data/productData.json", function (result) {
        var products = [];
        var productData = localStorage.getItem("productDetails").split(',');
        console.log(productData)

        for(var data of productData){
             $.each(result, function (key, item) {
                
                 if (data == item.id)
                  {
                    products.push(item);
                    
                }
             });
        }
        console.log(products)

        for (var product of products) {
            var item = document.createElement("div");
            item.setAttribute("id",product.id);
            item.setAttribute("class","thumbnail cart");
            document.getElementById("showDetails").appendChild(item);

            var productDetails = document.createElement("div");
            productDetails.setAttribute("id","details"+product.id)
            document.getElementById(product.id).append(productDetails)
            document.getElementById("details"+product.id).innerHTML = 
            `<div class="row" >
            <div class="col-md-6 col-sm-2 col-xs-12">
            <a href="../html/home.html"><span class="glyphicon glyphicon-arrow-left" > </span></a> Back
            <h1 style="color:red;">`+product.brand+`</h1>
            <h3> Name: `+ product.productName+`</h3><h3>Price: &#x20B9; `+product.price+`</h3>
            <h3>Color: `+product.color+`</h3>
            
            </div>
            <div class="col-md-6 col-sm-2 col-xs-12">
            <img src="` + product.productImage[0] + `" style="width:300px;height:400px;"></img>
            </div>
            </div>`

            var wishlist = document.createElement("button");
			wishlist.setAttribute("id", "wishlistBtn" + product.id);
			wishlist.setAttribute("class", "btn btn-md btn-warning");
			wishlist.addEventListener("click",function(e)
			{	var ex = (this.id).slice(-2)
				if(localStorage.getItem("wishlistItems") != null)
				{
					var wishlistItems = [];
					wishlistItems.push(localStorage.getItem("wishlistItems"));
					wishlistItems.push(ex);
					localStorage.setItem("wishlistItems",wishlistItems);
					alert("Added to wishlist");
					console.log(localStorage.wishlistItems);
				}
				else
				{
					var wishlistItems = []
					//localStorage.setItem("cart",product.id)
					wishlistItems.push(product.id);
					localStorage.setItem("wishlistItems",wishlistItems);
					alert("Added to wishlist");
					console.log(localStorage.wishlistItems);
				}
			})
			document.getElementById("details"+product.id).appendChild(wishlist);
			document.getElementById("wishlistBtn" + product.id).innerHTML = "<span class=\"glyphicon glyphicon-heart\">" + "Wishlist" + "</span>";
			

			var addToCart = document.createElement("button");
			addToCart.setAttribute("id", "0" + product.id);
			addToCart.setAttribute("class", "btn btn-md btn-info");
			addToCart.addEventListener("click",function(e)
			{	
				var prodId = (this.id).slice(-2)
				
				
				if(localStorage.getItem("cartItems") != null)
				{
					var cartItems = [];
					cartItems.push(localStorage.getItem("cartItems"));
					cartItems.push(prodId);
					localStorage.setItem("cartItems",cartItems);
					alert("Added to cart");
					console.log(localStorage.cartItems);
				}
				else
				{
					var cartItems = []
					//localStorage.setItem("cart",product.id)
					cartItems.push(product.id);
					localStorage.setItem("cartItems",cartItems);
					alert("Added to cart");
					console.log(localStorage.cartItems);
				}
			})
			document.getElementById("details"+product.id).appendChild(addToCart);
			document.getElementById("0" + product.id).innerHTML = "<span class=\"glyphicon glyphicon-shopping-cart\">" + "Add to Cart" + "</span>";
        }
        
    });

}