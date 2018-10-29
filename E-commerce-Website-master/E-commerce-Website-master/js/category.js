$(document).ready(function () {

	/*
		@desc: to display the categories
	*/
	$.getJSON("../data/category.json", function (result) {

		$.each(result.categoryList, function (data, categoryItem) {

			var menuData = "<li >" + categoryItem.category + "</a></li>";

			var subMenu = '';
			$.each(categoryItem.sub_category, function (i, sub_category) {
				subMenu += "<li style=\"list-style-type:none; text-transform:capitalize; font-family:garamond;\" ><a type=\"button\" onclick=\"displayItems($(this).text()); displayFilter($(this).text());\" >" + sub_category.category + "</a></li>";

			});

			var menuData = "<li class=\"categories\"><a type=\"button\" >"+ categoryItem.category + "</a><ul id=\"submenu\" >" + subMenu + "</ul></li>";

			$(menuData).appendTo($(".nav-stacked"));
		});

		$(".nav-stacked ul").hide();
		$('.categories').click(function () {
			$(this).find('ul').slideToggle();
		});
	});

	/*
		@desc: to display the products
	*/
	var productList = [];

	$.getJSON("../data/productData.json", function (result) {

		$.each(result, function (data, product) {
			productList = result;
		});
		$("#productItems").empty();

		for (var product of productList) {

			var thumbnail = document.createElement("div");
			thumbnail.setAttribute("class", "col-lg-12");
			thumbnail.setAttribute("id", "thumbnail");
			document.getElementById("productItems").appendChild(thumbnail);

			var message = document.createElement("h1");
			message.setAttribute("id", "message");
			document.getElementById("thumbnail").appendChild(message);
			document.getElementById("message").innerHTML = " Select category to view products."

		}
	});
});

/*
	@desc : displaying category wise product
*/
var categoryProducts = [];
var prod = [];
function displayItems(category) {
	//alert(category);
	categoryProducts = [];
	$.get("../data/productData.json", function (result) {
		$.each(result, function (data, product) {

			if (product.subCategory == category) {

				categoryProducts.push(product)
			}
		});
		$("#productItems").empty();
		

		for (var product of categoryProducts) {
			var productItem = document.createElement("div");
			productItem.setAttribute("id", product.id);
			productItem.setAttribute("class", "col-md-4 col-sm-6 col-xs-12");
			document.getElementById("productItems").appendChild(productItem);
			
			var thumbnail = document.createElement("section");
			thumbnail.setAttribute("class", "thumbnail");
			thumbnail.setAttribute("id", "thumbnail" + product.id);
			document.getElementById(product.id).appendChild(thumbnail);
			
			var productImage = document.createElement("img");
			productImage.setAttribute("src", product.productImage[0]);
			productImage.setAttribute("id", "img"+product.id);
			document.getElementById("thumbnail" + product.id).appendChild(productImage);
			productImage.addEventListener("click",function(e){
				var ex = (this.id).slice(-2)
				
				var productDetails = []
				productDetails.push(ex);
				localStorage.setItem("productDetails",productDetails);
				window.location.assign('../html/productDetails.html')
			}
			);
			

			var brand = document.createElement("h4");
			brand.setAttribute("id", product.brand + product.id);
			document.getElementById("thumbnail" + product.id).append(brand);
			document.getElementById(product.brand + product.id).innerHTML = product.brand;
			

			var name = document.createElement("p");
			name.setAttribute("id", product.productName + product.id);
			document.getElementById("thumbnail" + product.id).append(name);
			document.getElementById(product.productName + product.id).innerHTML = product.productName;
			

			var price = document.createElement("p");
			price.setAttribute("id", product.price + product.id);
			document.getElementById("thumbnail" + product.id).append(price);
			document.getElementById(product.price + product.id).innerHTML = "&#x20B9;" + " " + product.price;
			

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
					console.log(localStorage.wishlistItems);
				}
				else
				{
					var wishlistItems = []
					//localStorage.setItem("cart",product.id)
					wishlistItems.push(product.id);
					localStorage.setItem("wishlistItems",wishlistItems);
					console.log(localStorage.wishlistItems);
				}
			})
			document.getElementById("thumbnail" + product.id).appendChild(wishlist);
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
					cartItems.push(prodId);
					console.log(product.id)
					localStorage.setItem("cartItems",cartItems);
					alert("Added to cart");
					console.log(localStorage.cartItems);
				}
			})
			document.getElementById("thumbnail" + product.id).appendChild(addToCart);
			document.getElementById("0" + product.id).innerHTML = "<span class=\"glyphicon glyphicon-shopping-cart\">" + "Add to Cart" + "</span>";
			
		}

	});
}


/*
	@desc: to bring filters
*/

var filters = [];
function displayFilter(category)
{
	filters = [];
	$.get("../data/productData.json", function (result) {
		$.each(result, function (data, product) {

			if (product.subCategory == category ) {
				if(filters.brand != product.brand )
				{
					filters.push(product.brand)
				}
				
				
			}
		});
		$("#sortItems").empty();
		for(var f of filters)
		{
			var filter;
			filter = '<li style="display:inline; list-style-type:none; padding-right:20px;" >';
			filter += '<input type="checkbox" name="filters" id="filters" value="'+f+'" onclick=display(this.value);>' + f +'</li>'

			$(filter).appendTo($("#sortItems"))
		}
	});
}
var filterResult = [];
function display(filterValue) {
	//alert(category);
	filterResult = [];
	$.get("../data/productData.json", function (result) {
		$.each(result, function (data, product) {

			if (product.brand == filterValue) {

				filterResult.push(product)
				console.log(filterResult)
			}
		});
		$("#productItems").empty();
		

		for (var product of filterResult) {
			var productItem = document.createElement("div");
			productItem.setAttribute("id", product.id);
			productItem.setAttribute("class", "col-md-4 col-sm-6 col-xs-12");
			document.getElementById("productItems").appendChild(productItem);
			
			var thumbnail = document.createElement("section");
			thumbnail.setAttribute("class", "thumbnail");
			thumbnail.setAttribute("id", "thumbnail" + product.id);
			document.getElementById(product.id).appendChild(thumbnail);
			
			var productImage = document.createElement("img");
			productImage.setAttribute("src", product.productImage[0]);
			productImage.setAttribute("id", "img"+product.id);
			document.getElementById("thumbnail" + product.id).appendChild(productImage);
			productImage.addEventListener("click",function(e){
				var ex = (this.id).slice(-2)
				
				var productDetails = []
				productDetails.push(ex);
				localStorage.setItem("productDetails",productDetails);
				window.location.assign('../html/productDetails.html')
			}
			);
			

			var brand = document.createElement("h4");
			brand.setAttribute("id", product.brand + product.id);
			document.getElementById("thumbnail" + product.id).append(brand);
			document.getElementById(product.brand + product.id).innerHTML = product.brand;
			

			var name = document.createElement("p");
			name.setAttribute("id", product.productName + product.id);
			document.getElementById("thumbnail" + product.id).append(name);
			document.getElementById(product.productName + product.id).innerHTML = product.productName;
			

			var price = document.createElement("p");
			price.setAttribute("id", product.price + product.id);
			document.getElementById("thumbnail" + product.id).append(price);
			document.getElementById(product.price + product.id).innerHTML = "&#x20B9;" + " " + product.price;
			

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
					console.log(localStorage.wishlistItems);
				}
				else
				{
					var wishlistItems = []
					//localStorage.setItem("cart",product.id)
					wishlistItems.push(product.id);
					localStorage.setItem("wishlistItems",wishlistItems);
					console.log(localStorage.wishlistItems);
				}
			})
			document.getElementById("thumbnail" + product.id).appendChild(wishlist);
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
					cartItems.push(prodId);
					console.log(product.id)
					localStorage.setItem("cartItems",cartItems);
					alert("Added to cart");
					console.log(localStorage.cartItems);
				}
			})
			document.getElementById("thumbnail" + product.id).appendChild(addToCart);
			document.getElementById("0" + product.id).innerHTML = "<span class=\"glyphicon glyphicon-shopping-cart\">" + "Add to Cart" + "</span>";
			
		}

	});
}





