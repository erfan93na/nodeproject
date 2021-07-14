const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://erfan:kalame@cluster0.8rki4.mongodb.net/shop?retryWrites=true&w=majority"
  ,{useUnifiedTopology:true})
    .then((client) => {
      console.log("connected");
      _db=client.db()
      callback();
    })
    .catch(err=>{
      
      console.log(err);
    throw err});
};
const getDb=()=>{
  if (_db) {
    return _db
  }
  throw "No DB found"
}

module.exports={mongoConnect,getDb}