const Product = require("../models/product");
const Order = require("../models/order");
const { ObjectId } = require("mongodb");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch(console.log);
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        pageTitle: product.title + " Details",
        product,
        path: "/products",
      });
    })
    .catch(console.log);
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch(console.log);
};

exports.getCart = (req, res, next) => {
  req.user.populate("cart.items.productId").execPopulate().then(({cart:{items:products}}) => {
    res.render("shop/cart", {
      products: products,
      path: "/cart",
      pageTitle: "Your Cart",
    });
  });
};
// //   }).catch(console.log)
// //   // Cart.getCart(function (cart) {
// //   //   Product.fetchAll((products) => {
// //   //     const cartProducts = [];
// //   //     for (let product of products) {
// //   //       let prodData = cart.products.find((prod) => prod.id === product.id);

// //   //       if (prodData) {
// //   //         cartProducts.push({ productData: product, qty: prodData.qty });
// //   //       }
// //   //     }
// //   //     res.render("shop/cart", {
// //   //       products: cartProducts,
// //   //       path: "/cart",
// //   //       pageTitle: "Your Cart",
// //   //     });
// //   //   });
// //   // });
// // };

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId).then((product) => {
    return req.user.addToCart(product).then((result) => {
      res.redirect("/cart");
    });
  });}
//   //   let fetchedCart;
//   //   const prodId = req.body.product;
//   //   req.user.getCart().then(cart=>{
//   //     fetchedCart=cart;
//   //     let newQuantity=1
//   //    return cart.getProducts({where:{id:prodId}}).then(([product])=>{
//   //     console.log(222,product)
//   //    if (product) {
//   //       let oldQuantity=product.cartItem.quantity
//   //       newQuantity=oldQuantity+1
//   //     return product
//   //    }
//   //   return Product.findByPk(prodId)
//   //  }).then(product=>{
//   //    return fetchedCart.addProduct(product,{through:{quantity:newQuantity}}).then(_=>res.redirect("/cart")).catch(console.log)
//   //  }).catch(console.log)})
// };

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.removeFromCart(prodId).then((_) => res.redirect("/cart"));
};

// exports.getOrders = (req, res, next) => {
// req.user.getOrders().then(orders=>{
//   res.render("shop/orders",{
//     path:"/orders",
//     pageTitle:"Your Orders",orders
//   })
// })
// };

// exports.postOrder = (req, res, next) => {
//   let fetchedCart;
//   req.user
//     .addOrder()
//     .then((_) => res.redirect("/orders"))
//     .catch(console.log);
// };
