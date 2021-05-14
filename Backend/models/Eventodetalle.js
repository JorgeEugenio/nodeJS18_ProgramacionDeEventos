const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventodetalleSchema = Schema({
    idEvento: mongoose.ObjectId,
    idProveedor: mongoose.ObjectId,
    idProducto: String,
    costoProductounitario: Number,
    cantidadProductounitario: Number,
    subtotalProductounitario: Number
},
{
    timestamps: true
})

module.exports = mongoose.model('Eventodetalle', eventodetalleSchema)