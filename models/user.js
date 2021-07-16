const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");
class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }
  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then(console.log)
      .catch(console.log);
  }
  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuanity = 1;
    const updatedCartItems=[...this.cart.items]

    if (cartProductIndex >= 0) {
       newQuanity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity=newQuanity
    }
    else {
      updatedCartItems.push({productId: new mongodb.ObjectId(product._id), quantity:newQuanity})
    }
    const updatedCart = {
      items: updatedCartItems
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }
  static findById(userId) {
    const db = getDb();

    return db
      .collection("users")
      .find({ _id: new mongodb.ObjectId(userId) })
      .next();
  }
}

module.exports = User;
