const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/TesteDevDB", (err) => {
  if (!err) {
    console.log("Conexão com o banco funcionando");
  } else {
    console.log(JSON.stringify(err, undefined, 2));
  }
});
