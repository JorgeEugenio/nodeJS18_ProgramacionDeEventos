const express = require('express')
const {
    addProveedorproducto,
    getProveedorproductos,
    updateProveedorproducto,
    deleteProveedorproducto,
    getProveedorproducto
} = require('../controllers/proveedorproductoController')

const api = express.Router()
    api.post('/proveedorproducto', addProveedorproducto)
    api.get('/proveedorproducto', getProveedorproductos)
    api.put('/proveedorproducto/:id', updateProveedorproducto)
    api.delete('/proveedorproducto/:id',deleteProveedorproducto)
    api.get('/proveedorproducto/:id',getProveedorproducto)
    
module.exports = api