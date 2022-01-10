const mongoose = require("mongoose");

// O primeiro parâmetro do "mongoose.model" é o nome da coleção do MongoDB sem o "s" no final
var Registration = mongoose.model("Registration", {
  title: { type: String },
  dateStart: { type: Date },
  dateEnd: { type: Date },
});

module.exports = { Registration };
