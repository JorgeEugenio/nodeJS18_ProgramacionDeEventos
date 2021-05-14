const mongoose = require('mongoose')
const Evento = require('../models/Evento')


async function addEvento(req, res){
    try {
        const {
            fechaevento,
            detalleevento,
            egresoevento,
            ingresoevento
        } = req.body
        const evento = Evento({
            fechaevento,
            detalleevento,
            egresoevento,
            ingresoevento
        })

        await evento.save()
        res.status(201).send(evento._id)
        
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function getEventos(req, res){
    try {
        const eventos = await Evento.find()
                                        
                                        
        res.status(200).send(eventos)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function updateEvento(req, res){
    try {
        console.log(req.body);
        await Evento.findOneAndUpdate(req.params.id, req.body)
        res.status(200).send({ status: 'Evento actualizado'})
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function deleteEvento(req, res){
    try {
        await Evento.findByIdAndDelete(req.params.id)
        res.status(200).send({ status: 'Evento eliminado'})
    } catch (e) {
        res.status(500).send({ message: e.message})
    }
}

async function getEvento(req, res){
    try {
        const evento = await Evento.aggregate()
                                        .match({'_id': mongoose.Types.ObjectId(req.params.id)})
                                        .project({
                                            "_id":"$detalles._id",
                                            "fechaevento":1,
                                            "detalleevento":1,
                                            "egresoevento":1,
                                            "ingresoevento":1
                                        })
        res.status(200).send(evento[0])
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

module.exports = {
    addEvento,
    getEventos,
    updateEvento,
    deleteEvento,
    getEvento
}