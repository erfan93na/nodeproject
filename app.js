const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/user");
const errorController = require("./controllers/error");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  User.findById("60f3d61bd5ab4e01e0e5b1da")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch(() => console.log(64564564));
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://erfan:kalame@cluster0.8rki4.mongodb.net/shop?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then((_) => {
    
    console.log("connected");
    User.findById("60f3d61bd5ab4e01e0e5b1da").then(user=>{
      if (!user) {
        const user=new User({name:"erfan",email:"erfan",cart:{items:[]}})
        user.save()
      }
    })

    app.listen(5000);
  })
  .catch(console.log);
