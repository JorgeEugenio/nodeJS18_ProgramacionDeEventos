const mongoose = require('mongoose')
const Proveedorproducto = require('../models/Proveedorproducto')

async function addProveedorproducto(req, res){
    try {
        const {
            idProveedor,
            nombreproveedorproducto,
            detalleproveedorproducto,
            costoproveedorproducto,
        } = req.body
        const proveedorproducto = Proveedorproducto({
            idProveedor,
            nombreproveedorproducto,
            detalleproveedorproducto,
            costoproveedorproducto,
        })
        await proveedorproducto.save()  
        res.status(201).send(proveedorproducto)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function getProveedorproductos(req, res){
    try {
        const proveedorproductos = await Proveedorproducto.aggregate()
                                        .match({})
                                        
        res.status(200).send(proveedorproductos)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function updateProveedorproducto(req, res){
    try {
        await Proveedorproducto.findOneAndUpdate(req.params.id,req.body)
        res.status(200).send({ status: 'Proveedorproducto actualizado'})
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function deleteProveedorproducto(req, res){
    try {
        await Proveedorproducto.findByIdAndDelete(req.params.id)
        res.status(200).send({ status: 'Proveedorproducto eliminado'})
    } catch (e) {
        res.status(500).send({ message: e.message})
    }
}

async function getProveedorproducto(req, res){
    try {
        const proveedorproducto = await Proveedorproducto.aggregate()
                                        .match({'_id': mongoose.Types.ObjectId(req.params.id)})
                                        

        res.status(200).send(proveedorproducto)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

module.exports = {
    addProveedorproducto,
    getProveedorproductos,
    updateProveedorproducto,
    deleteProveedorproducto,
    getProveedorproducto
}