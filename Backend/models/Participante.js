const mongoose = require('mongoose')
const Schema = mongoose.Schema

const participanteSchema = Schema({
    idEventoparticipante: mongoose.ObjectId,
    nombresparticipante: String,
    detallesparticipante: String,
    costoinscripcionparticipante: Number
},
{
    timestamps: true
})

module.exports = mongoose.model('Participante', participanteSchema)