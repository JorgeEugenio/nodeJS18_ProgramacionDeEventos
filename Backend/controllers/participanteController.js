const mongoose = require('mongoose')
const Participante = require('../models/Participante')


async function addParticipante(req, res){
    try {
        const {
            idEventoparticipante,
            nombresparticipante,
            detallesparticipante,
            costoinscripcionparticipante
        } = req.body
        const participante = Participante({
            idEventoparticipante,
            nombresparticipante,
            detallesparticipante,
            costoinscripcionparticipante
        })

        await participante.save()
        res.status(201).send(participante._id)
        
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function getParticipantes(req, res){
    try {
        const participantes = await Participante.find()
                                        
                                        
        res.status(200).send(participantes)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function updateParticipante(req, res){
    try {
        await Participante.findOneAndUpdate(req.params.id, req.body)
        res.status(200).send({ status: 'Participante actualizado'})
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function deleteParticipante(req, res){
    try {
        await Participante.findByIdAndDelete(req.params.id)
        res.status(200).send({ status: 'Participante eliminado'})
    } catch (e) {
        res.status(500).send({ message: e.message})
    }
}

async function getParticipante(req, res){
    try {
        const participante = await Participante.aggregate()
                                        .match({'_id': mongoose.Types.ObjectId(req.params.id)})
                                        .project({
                                            "_id":"$detalles._id",
                                            "idEventoparticipante":1,
                                            "nombresparticipante":1,
                                            "detallesparticipante":1,
                                            "costoinscripcionparticipante":1
                                        })
        res.status(200).send(participante[0])
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function filtrar_participante_IdEvento(req, res){
    try {
        const participante = await Participante.aggregate()
                                        .match({'idEventoparticipante': mongoose.Types.ObjectId(req.params.id)})
                                        

        res.status(200).send(participante)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

module.exports = {
    addParticipante,
    getParticipantes,
    updateParticipante,
    deleteParticipante,
    getParticipante,
    filtrar_participante_IdEvento
}