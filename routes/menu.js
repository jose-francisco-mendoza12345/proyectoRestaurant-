var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var fileupload = require('express-fileupload')
var USER  = require("../database/menu");

/* GET */
router.get('/menu',(req, res, next) => {
  USER.find({}, (err, docs) => {
    res.status(200).json(docs);
  });
});


//POST
 router.post("/menu", (req, res) => {
  var datos=req.body;
  var user={};
  user["nombre"]=datos.nombre;
  user["precio"]=datos.precio;
  user["descripcion"]=datos.descripcion;
  var guardando=new USER(user);  //-->variable para guardar en la base de datos
  guardando.save().then(() => {  //-->guardando
    res.status(200).json({"mns" : "Usuario Registrado"});
  });
 });

 router.use(fileupload({
    fileSize: 50 * 1024 * 1024
}));

router.put("/sendfile",(req, res) => { 
 var params = req.query;
 var bodydata = req.body;
if  (params.id == null ){
    res.status(300).json({msn: "el parametro ID es necesario"});
    return;
}
 var image = req.files.file;
 var path = __dirname.replace(/\/routes/g, "/Fotolugar");
 console.log(path);
 var date = new Date();
 var foto = sha1(date.toString()).substr(1, 5);
 var totalpath = path + "/" + foto + "_" + image.name.replace(/\s/g, "_");
 console.log(totalpath);
 image.mv(totalpath, (err) => {
 if (err){
     return res.status(300).send({msn: "error al subir la foto "});
} 
var obj = {};
obj ["pathfile"] = totalpath;
obj ["relativepath"] = "/getfile/?=id" + totalpath;
console.log(obj);
var objhelp2={};
objhelp2['Fotolugar']=obj;
USER.update({ _id: params.id}, {$set: objhelp2},  (err, docs) => {
    if (err) {
        res.status(500).json({msn: "Existen problemas en la base de datos"});
         return;
     } 
     res.status(200).json(docs);
    });
  });
});

 router.put("/menu", (req, res) => {
 var params = req.query;
    var bodydata = req.body;
    if (params.id == null) {
        res.status(300).json({msn: "El parámetro ID es necesario"});
        return;
    }
    var allowkeylist = ["nombre", "precio", "descripcion"];
    var keys = Object.keys(bodydata);
    var updateobjectdata ={};
    for (var i=0; i<keys.length; i++) {
        if(allowkeylist.indexOf(keys[i]> -1)) {
            updateobjectdata[keys[i]] = bodydata[keys[i]];
        }
    }
    USER.update({ _id: params.id}, {$set: bodydata}, (err, docs) => {
       if (err) {
           res.status(500).json({msn: "Existen problemas en la base de datos"});
            return;
       }
        res.status(200).json(docs);
    });

});
 
 //DELETE  
 router.delete("/menu", (req, res) => {
  var params = req.query;
    if (params.id == null) {
        res.status(300).json({msn: "El parámetro ID es necesario"});
        return;
    }
    USER.remove({_id: params.id}, (err, docs) => {
        if (err) {
            res.status(500).json({msn: "Existen problemas en la base de datos"});
             return;
         } 
         res.status(200).json(docs);
    });
});
module.exports = router;
