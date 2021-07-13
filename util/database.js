const Sequelize = require("sequelize");

const sequelize = new Sequelize("node_complete", "root", "kalame", {
  dialect: "mysql",
  host: "localhost",
});


module.exports=sequelize