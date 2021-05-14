const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventoSchema = Schema({
    fechaevento: Date,
    detalleevento: String,
    egresoevento: Number,
    ingresoevento: Number
},
{
    timestamps: true
})

module.exports = mongoose.model('Evento', eventoSchema)