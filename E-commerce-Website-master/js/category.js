$(document).ready(function () {

	/*
		@desc: to display the categories
	*/
	$.getJSON("../data/category.json", function (result) {

		$.each(result.categoryList, function (data, categoryItem) {

			var menuData = "<li >" + categoryItem.category + "</a></li>";

			var subMenu = '';
			$.each(categoryItem.sub_category, function (i, sub_category) {
				subMenu += "<li style=\"list-style-type:none; text-transform:capitalize; font-family:garamond;\" ><a type=\"button\" onclick=displayItems($(this).text()); >" + sub_category.category + "</a></li>";

			});

			var menuData = "<li class=\"categories\"><a type=\"button\" >"
				+ categoryItem.category + "</a><ul id=\"submenu\" >" + subMenu + "</ul></li>";

			// var id = "ShowCategory";
			// $(menuData).appendTo("#ShowCategory");

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

		$.each(result.Products, function (data, product) {
			productList = result.Products;
			//console.log(productList);
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
	$.getJSON("../data/productData.json", function (result) {
		$.each(result.Products, function (data, product) {

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
			//$( "productItems" ).replaceWith( productItem );

			var thumbnail = document.createElement("div");
			thumbnail.setAttribute("class", "thumbnail");
			thumbnail.setAttribute("id", "thumbnail" + product.id);
			document.getElementById(product.id).appendChild(thumbnail);
			//$( product.id ).replaceWith( thumbnail );

			var productImage = document.createElement("img");
			productImage.setAttribute("src", product.productImage[0]);
			document.getElementById("thumbnail" + product.id).appendChild(productImage);
			//$("thumbnail" + product.id ).replaceWith(productImage);

			var brand = document.createElement("h4");
			brand.setAttribute("id", product.brand + product.id);
			document.getElementById("thumbnail" + product.id).append(brand);
			document.getElementById(product.brand + product.id).innerHTML = product.brand;
			//$( "thumbnail" + product.id ).replaceWith( brand );

			var name = document.createElement("p");
			name.setAttribute("id", product.productName + product.id);
			document.getElementById("thumbnail" + product.id).append(name);
			document.getElementById(product.productName + product.id).innerHTML = product.productName;
			//$("thumbnail" + product.id ).replaceWith( name );

			var price = document.createElement("p");
			price.setAttribute("id", product.price + product.id);
			document.getElementById("thumbnail" + product.id).append(price);
			document.getElementById(product.price + product.id).innerHTML = "&#x20B9;" + " " + product.price;
			//$( "thumbnail" + product.id).replaceWith(price );

			var wishlist = document.createElement("button");
			wishlist.setAttribute("id", "wishlistBtn" + product.id);
			wishlist.setAttribute("class", "btn btn-md btn-warning");
			wishlist.setAttribute("onclick", "addToWishlist($(product.id));");
			document.getElementById("thumbnail" + product.id).appendChild(wishlist);
			document.getElementById("wishlistBtn" + product.id).innerHTML = "<span class=\"glyphicon glyphicon-heart\">" + "Wishlist" + "</span>";
			//$( "thumbnail" + product.id ).replaceWith(wishlist );

			var addToCart = document.createElement("button");
			addToCart.setAttribute("id", "cartBtn" + product.id);
			addToCart.setAttribute("class", "btn btn-md btn-info");
			addToCart.setAttribute("onclick", "addToCart($(product.id));");
			document.getElementById("thumbnail" + product.id).appendChild(addToCart);
			document.getElementById("cartBtn" + product.id).innerHTML = "<span class=\"glyphicon glyphicon-shopping-cart\">" + "Add to Cart" + "</span>";
			//$("thumbnail" + product.id ).replaceWith(addToCart );
		}

	});
}

