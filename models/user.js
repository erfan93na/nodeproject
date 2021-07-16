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
    // const cartProduct=this.cart.items.findIndex(cp=>{
    //   return cp._id===product._id
    // })

    const updatedCart = { items: [{ productId:new mongodb.ObjectId(product._id), quantity: 1 }] };
    const db = getDb();
    return db.collection("users").updateOne(
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
