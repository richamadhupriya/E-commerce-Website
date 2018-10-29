var items = require("./data/productData.json");
var category = require("./data/category.json");
const express = require('express')
const fs = require('fs')
const parser = require('body-parser')

const app = express()

let products = []
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json())
/*
    @desc: to get the products
*/
app.get('/products', (req, res)=>{
    fs.readFile("./data/productData.json", (err, data)=> {
        products = JSON.parse(data.toString())
       //console.log(products)
        res.send(products)
    })
})

/*
    to add a product
*/
app.post('/addProduct', (req, res)=>{
    items.push(req.body);
  res.send(items);
  fs.writeFileSync("./data/productData.json", JSON.stringify(items));
    console.log("Added a new product");
})

/*
    @desc: to update a product
*/
app.post('/updateProduct', (req, res)=>{
    
  for (var product of items) {
    if (product.id == req.body.id) {
        product.id = req.body.id;
        product.category = req.body.category;
        product.subCategory = req.body.subCategory;
        product.brand = req.body.brand;
        product.productName = req.body.productName;
        product.price = req.body.price;
        product.color = req.body.color;
      
      
    }
  }
  res.send(items);
  fs.writeFileSync("./data/productData.json", JSON.stringify(items));
  
});

/*
    @desc: to delete a product
*/
app.delete('/deleteProduct/:id',(req,res)=>
{
    var id = req.params.id + "";
    for (var i = 0; i < items.length; i++) {
        if (items[i].id == id)
        {
          items.splice(i, 1);
          res.send(items);
        }
      }
      fs.writeFileSync("./data/productData.json", JSON.stringify(items));
      console.log("Deleted product with id: "+ id);
});


app.listen(8080, ()=> console.log("Listening on http://127.0.0.1"));