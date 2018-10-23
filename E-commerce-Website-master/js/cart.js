var cart = [];
var wishlist = [];

/*
    desc: Adding to cart
*/
function addToCart(id)
{
    $.ajax({
        type: "GET",
        data : "json",
        url: "../data/productData.json",
        success : function(result){
            for (var product of result)
            {
                if(product.id == id)
                {
                    cart.push(product);
                    alert("Added to cart");

                }
            }
        },
        error : function(error){
            console.log(error);
        }
    });
}

/*
    desc: Adding to wishlist
*/
function addToWishlist(id){
    $.ajax({
        type: "GET",
        data : "json",
        url: "../data/productData.json",
        success : function(result){
            for (var product of result)
            { 
                if(product.id == id)
                {  
                    wishlist.push(product);
                    alert("Added to wishlist");
                }
            }
        },
        error : function(error){
            console.log(error);
        }
    });
}