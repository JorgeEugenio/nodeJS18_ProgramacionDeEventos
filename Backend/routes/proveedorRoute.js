const express = require('express')
const {
    addProveedor,
    getProveedores,
    updateProveedor,
    deleteProveedor,
    getProveedor
} = require('../controllers/proveedorController')

const api = express.Router()

    api.post('/proveedor/', addProveedor)
    api.get('/proveedor', getProveedores)
    api.put('/proveedor/:id', updateProveedor)
    api.delete('/proveedor/:id',deleteProveedor)
    api.get('/proveedor/:id',getProveedor)
    
module.exports = api