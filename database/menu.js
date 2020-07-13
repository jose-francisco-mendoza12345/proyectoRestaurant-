var mongoose = require("./connect");
var USERSCHEMA = new mongoose.Schema({
    nombre:{
        type: String,
        required: [true, "el nombre de la comida es necesario"]
    },
    precio:{
        type: Number,
        required: [true, "el precio de la comida es necesario"]
    },
    descripcion:{
        type: String,
    },
    
    fechaderegistro: {
        type: Date,
        default: new Date()
    }

    ////Varible FotoLugar ---->tipo de archivo imagen<---------

});

var USER = mongoose.model("menu", USERSCHEMA);
module.exports = USER;