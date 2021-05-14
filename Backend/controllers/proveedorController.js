const mongoose = require('mongoose')
const fs = require('fs')
const Proveedor = require('../models/Proveedor')


async function addProveedor(req, res){
    try {
        const {
            rucProveedor,
            razonSocialProveedor
        } = req.body
        const proveedor = Proveedor({
            rucProveedor,
            razonSocialProveedor
        })

        await proveedor.save()
        res.status(201).send(proveedor._id)
        
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function getProveedores(req, res){
    try {
        const proveedores = await Proveedor.find()
                                        
                                        
        res.status(200).send(proveedores)
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function updateProveedor(req, res){
    try {
        console.log(req.body);
        await Proveedor.findOneAndUpdate(req.params.id, req.body)
        res.status(200).send({ status: 'Proveedor actualizado'})
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function deleteProveedor(req, res){
    try {
        await Proveedor.findByIdAndDelete(req.params.id)
        res.status(200).send({ status: 'Proveedor eliminado'})
    } catch (e) {
        res.status(500).send({ message: e.message})
    }
}

async function getProveedor(req, res){
    try {
        const proveedor = await Proveedor.aggregate()
                                        .match({'_id': mongoose.Types.ObjectId(req.params.id)})
                                        .project({
                                            "_id":"$detalles._id",
                                            "rucProveedor":1,
                                            "razonSocialProveedor":1
                                        })
        res.status(200).send(proveedor[0])
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

module.exports = {
    addProveedor,
    getProveedores,
    updateProveedor,
    deleteProveedor,
    getProveedor
}