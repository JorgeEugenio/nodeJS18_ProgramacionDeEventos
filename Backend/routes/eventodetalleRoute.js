const express = require('express')
const {
    addEventodetalle,
    getEventodetalles,
    updateEventodetalle,
    deleteEventodetalle,
    getEventodetalle
} = require('../controllers/eventodetalleController')

const api = express.Router()

    api.post('/eventodetalle/', addEventodetalle)
    api.get('/eventodetalle', getEventodetalles)
    api.put('/eventodetalle/:id', updateEventodetalle)
    api.delete('/eventodetalle/:id',deleteEventodetalle)
    api.get('/eventodetalle/:id',getEventodetalle)
    
module.exports = api