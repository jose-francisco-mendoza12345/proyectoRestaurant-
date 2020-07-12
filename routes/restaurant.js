var express = require('express');
var router = express.Router();
var USER  = require("../database/restaurant");

/* GET */
router.get('/restaurant',(req, res, next) => {
  USER.find({}, (err, docs) => {
    res.status(200).json(docs);
  });
});


//POST
router.post("/restaurant", (req, res) => {
var datos=req.body;

var user={};
user["nombre"]=datos.nombre;
user["nit"]=datos.nit;
user["propietario"]=datos.propietario;
user["calle"]=datos.calle;
user["telefono"]=datos.telefono;
var guardando=new USER(user);  //-->variable para guardar en la base de datos
guardando.save().then(() => {  //-->guardando
    res.status(200).json({"mns" : "Usuario Registrado"});
    });
});

//PUT  ---> falta   <-------solo es un ejemplo
router.put("/restaurant", (req, res) => {
var datos=req.body;
var id = req.query.id
datos["otraclave"]=id;
datos["timeserver"]=new Date();
datos["metodo"] = "PUT";
console.log(datos);
res.status(200).json(datos);
});


//DELETE  --->falta     <-------solo es un ejemplo
router.delete("/restaurant", (req, res) => {
var datos=req.body;
var name = datos.id;
console.log(datos);
console.log(name);
res.status(200).json({
    mns:"DELETE"
    })
});


//PATCH  --->falta <-------
router.patch("/restaurant", (req, res) => {

});
module.exports = router;
