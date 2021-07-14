const getDb=require("../util/database").getDb
const mongodb=require("mongodb")
class User {
  constructor(username,email,cart){
    this.name=username;
    this.email=email
  }
  save(){
    const db=getDb()
return db.collection("users").insertOne(this).then(console.log).catch(console.log)
  }
  addToCart(product){
const cartProduct=this.cart.items.findIndex(cp=>{
  return cp._id===product._id
})
const updatedCart={items:[product]}
  }
  static findById(userId){
    const db=getDb()

          return db.collection("users").find({_id:new mongodb.ObjectId(userId) }).next()
  }
}

module.exports=User