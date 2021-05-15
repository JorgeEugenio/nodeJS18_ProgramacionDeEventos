const mongoose = require('mongoose')
const Eventodetalle = require('../models/Eventodetalle')

async function addEventodetalle(req, res){
    try {
        const {
            idEvento,
            idProveedor,
            idProducto,
            costoProductounitario,
            cantidadProductounitario,
            subtotalProductounitario
        } = req.body
        const eventodetalle = Eventodetalle({
            idEvento,
            idProveedor,
            idProducto,
            costoProductounitario,
            cantidadProductounitario,
            subtotalProductounitario
        })
        await eventodetalle.save()  
        res.status(201).send(eventodetalle)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function getEventodetalles(req, res){
    try {
        const eventodetalles = await Eventodetalle.aggregate()
                                        .match({})
                                        
        res.status(200).send(eventodetalles)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function updateEventodetalle(req, res){
    try {
        await Eventodetalle.findOneAndUpdate(req.params.id,req.body)
        res.status(200).send({ status: 'Eventodetalle actualizado'})
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function deleteEventodetalle(req, res){
    try {
        await Eventodetalle.findByIdAndDelete(req.params.id)
        res.status(200).send({ status: 'Eventodetalle eliminado'})
    } catch (e) {
        res.status(500).send({ message: e.message})
    }
}

async function getEventodetalle(req, res){
    try {
        const eventodetalle = await Eventodetalle.aggregate()
                                        .match({'_id': mongoose.Types.ObjectId(req.params.id)})
                                        

        res.status(200).send(eventodetalle)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function filtrar_Eventodetalle_IdEvento(req, res){
    try {
        const eventodetalle = await Eventodetalle.aggregate()
                                        .match({'idEvento': mongoose.Types.ObjectId(req.params.id)})
                                        

        res.status(200).send(eventodetalle)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}
module.exports = {
    addEventodetalle,
    getEventodetalles,
    updateEventodetalle,
    deleteEventodetalle,
    getEventodetalle,
    filtrar_Eventodetalle_IdEvento
}