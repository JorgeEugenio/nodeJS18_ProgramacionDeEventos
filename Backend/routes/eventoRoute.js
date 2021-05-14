const express = require('express')
const {
    addEvento,
    getEventos,
    updateEvento,
    deleteEvento,
    getEvento
} = require('../controllers/eventoController')

const api = express.Router()

    api.post('/evento/', addEvento)
    api.get('/evento', getEventos)
    api.put('/evento/:id', updateEvento)
    api.delete('/evento/:id',deleteEvento)
    api.get('/evento/:id',getEvento)
    
module.exports = api