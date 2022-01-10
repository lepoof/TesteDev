// COMANDO PARA INICIAR O SERVER E O DB: "nodemon index.js"

//package imports
const express = require("express");
const cors = require("cors");
const bodyp = require("body-parser");

//local imports
const { mongoose } = require("./database");
var registerController = require("./controllers/registrationController");

PORT = 3000;
var app = express();

app.use(bodyp.json());
app.use(cors());

app.listen(PORT, () => console.log("Server iniciado no port", PORT));

app.use("/registrations", registerController);
//para as rotas de registro
