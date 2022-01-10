var router = require("express").Router();
var ObjectId = require("mongoose").Types.ObjectId;
var moment = require("moment");
moment.locale();

const { json } = require("body-parser");
var { Registration } = require("../models/registration");
//  O código acima também pode ser escrito como "var Register = require("../models/register").Register"

//  Busca da LISTA DE REGISTROS. Link: localhost:3000/registrations/list
router.get("/", (req, res) => {
  Registration.find((err, docs) => {
    if (err) {
      console.log(
        "Erro listando os registros:" + JSON.stringify(err, undefined, 2)
      );
    } else {
      res.send(docs);
      for (let doc of docs) {
        doc.dateStart = moment(doc.dateStart).format("lll");
        doc.dateEnd = moment(doc.dateEnd).format("lll");

        // docs[i].dateEnd = moment(docs[i].dateEnd).format("lll");
      }
      
    }
  });
});

//  Busca INDIVIDUAL
router.get("/:id", (req, res) => {
  console.log("-> ID: " + req.params.id);
  if (!ObjectId.isValid(req.params.id)) {
    // Cai aqui se o ID NÃO for válido
    console.log("ID na pesquisa individual não é válido");
  } else {
    // Cai aqui se o ID for válido
    Registration.findById(req.params.id, (err, doc) => {
      if (!err) {
        console.log("Sucesso buscando por 1 registro: ", doc);
        res.send(doc);
      } else {
        console.log("Erro procurando o ID: " + err);
        res
          .status(400)
          .send(
            "Não foi encontrado nenhum registro com o id: " + req.params.id
          );
      }
    });
  }
});

//  NOVO REGISTRO. Link: localhost:3000/registrations/newRegistration
router.post("/", (req, res) => {
  //  Deixa as datas legíveis pro banco
  var dateStart = new Date(req.body.dateStart);
  var dateEnd = new Date(req.body.dateEnd);

  //  Declara e já dá os valores de um objeto do tipo Registration
  var newRegistration = new Registration({
    title: req.body.title,
    dateStart: dateStart,
    dateEnd: dateEnd,
  });
  newRegistration.save((err, docs) => {
    if (err) {
      // se der erro registrando:
      console.log("Erro ao registrar: ", JSON.stringify(err, undefined, 2));
    } else {
      // se o registro for concluído
      console.log(
        "-> Registro adicionado: " + docs.title + "\n   id:" + docs._id
      );
      res.json({
        msg: "Registro concluído",
      });
    }
  });
});

router.delete("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    // Cai aqui se o ID NÃO for válido
    console.log("ID na remoção não é válido");
  } else {
    // Cai aqui se o ID for válido
    Registration.findByIdAndDelete(req.params.id, (err, doc) => {
      if (!err) {
        res.send("O ID " + req.params.id + " foi removido");
      }
    });
  }
});

module.exports = router;
