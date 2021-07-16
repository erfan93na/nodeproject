const Product = require("../models/product");
const Order = require("../models/order");

  exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(products=>{
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    }).catch(console.log)
   
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findAll({where:{id:prodId}}).then(products=>
  //   {
  //     console.log(products)
  //     res.render("shop/product-detail", {
  //     pageTitle: products[0].title + " Details",
  //     product:products[0],
  //     path: "/products",
  //   });

    // }).catch(console.log)
  Product.findById(prodId).then(product=>{
    res.render("shop/product-detail", {
      pageTitle: product.title + " Details",
      product,
      path: "/products",
    });
  }).catch(console.log)
}
    
   


exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(products=>{
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  }).catch(console.log)
  
};

// exports.getCart = (req, res, next) => {
//   req.user.getCart().then(cart=>{
//    return cart.getProducts()
//   }).then(products=>{
//          res.render("shop/cart", {
//         products: products,
//         path: "/cart",
//         pageTitle: "Your Cart",
//       });
    
//   }).catch(console.log)
//   // Cart.getCart(function (cart) {
//   //   Product.fetchAll((products) => {
//   //     const cartProducts = [];
//   //     for (let product of products) {
//   //       let prodData = cart.products.find((prod) => prod.id === product.id);

//   //       if (prodData) {
//   //         cartProducts.push({ productData: product, qty: prodData.qty });
//   //       }
//   //     }
//   //     res.render("shop/cart", {
//   //       products: cartProducts,
//   //       path: "/cart",
//   //       pageTitle: "Your Cart",
//   //     });
//   //   });
//   // });
// };

exports.postCart = (req, res, next) => {
  const prodId=req.body.productId;
  console.log("addro",prodId)
  Product.findById(prodId).then(product=>{
    
  return  req.user.addToCart(product).then(result=>{
    console.log(result)
  })
  })
//   let fetchedCart;
//   const prodId = req.body.product;
//   req.user.getCart().then(cart=>{
//     fetchedCart=cart;
//     let newQuantity=1
//    return cart.getProducts({where:{id:prodId}}).then(([product])=>{
//     console.log(222,product)
//    if (product) {
//       let oldQuantity=product.cartItem.quantity
//       newQuantity=oldQuantity+1
//     return product
//    }
//   return Product.findByPk(prodId)
//  }).then(product=>{
//    return fetchedCart.addProduct(product,{through:{quantity:newQuantity}}).then(_=>res.redirect("/cart")).catch(console.log)
//  }).catch(console.log)})
};

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   req.user.getCart().then(cart=>{
//    return cart.getProducts({where:{id:prodId}})
//   }).then(([product])=>{
// product.cartItem.destroy().then(_=>res.redirect("/cart"))
//   }).catch(console.log)

//   ;
// };

// exports.getOrders = (req, res, next) => {
//   req.user.getOrders({include:["products"]}).then(orders=>{
//     res.render("shop/orders", {
//       path: "/orders",
//       pageTitle: "Your Orders",
//       orders
//     });
//   }).catch
//   (console.log)
  
// };

// exports.postOrder=(req,res,next)=>{
//   let fetchedCart;
//   req.user.getCart().then(cart=>{
//     fetchedCart=cart
// return cart.getProducts()
//   }).then(products=>{
// return req.user.createOrder().then(order=>{
//  return order.addProducts(products.map(product=>{product.orderItem={quantity:product.cartItem.quantity};return product}))
// })
//   }).then(_=>{
//     return fetchedCart.setProducts(null)
//   }).then(_=>res.redirect("/orders")).catch(console.log)
// }

