const mongoose = require('mongoose')
const Schema = mongoose.Schema

const proveedorproductoSchema = Schema({
    idProveedor: mongoose.ObjectId,
    nombreproveedorproducto: String,
    detalleproveedorproducto: String,
    costoproveedorproducto: Number
},
{
    timestamps: true
})

module.exports = mongoose.model('Proveedorproducto', proveedorproductoSchema)