const express = require('express')
const {
    addEventodetalle,
    getEventodetalles,
    updateEventodetalle,
    deleteEventodetalle,
    getEventodetalle,
    filtrar_Eventodetalle_IdEvento
} = require('../controllers/eventodetalleController')

const api = express.Router()

    api.post('/eventodetalle/', addEventodetalle)
    api.get('/eventodetalle', getEventodetalles)
    api.put('/eventodetalle/:id', updateEventodetalle)
    api.delete('/eventodetalle/:id',deleteEventodetalle)
    api.get('/eventodetalle/:id',getEventodetalle)
    api.get('/eventodetallefiltroidevento/:id',filtrar_Eventodetalle_IdEvento)
    
module.exports = api