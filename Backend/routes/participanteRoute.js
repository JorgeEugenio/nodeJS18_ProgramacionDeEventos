const express = require('express')
const {
    addParticipante,
    getParticipantes,
    updateParticipante,
    deleteParticipante,
    getParticipante,
    filtrar_participante_IdEvento

} = require('../controllers/participanteController')

const api = express.Router()

    api.post('/participante/', addParticipante)
    api.get('/participante', getParticipantes)
    api.put('/participante/:id', updateParticipante)
    api.delete('/participante/:id',deleteParticipante)
    api.get('/participante/:id',getParticipante)
    api.get('/participantefiltroidevento/:id',filtrar_participante_IdEvento)
    
module.exports = api