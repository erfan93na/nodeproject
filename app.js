const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const User=require("./models/user")
const errorController = require("./controllers/error");
const mongoConnect=require("./util/database").mongoConnect
 const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  User.findById("60eea72f714b61ad5a05017d")
    .then((user) => {
      req.user = new User(user.name,user.email,user.cart,user._id);
      console.log(4343,user)
      next();
    })
    .catch(()=>console.log(64564564));
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
mongoConnect(()=>{
  app.listen(5000)
})