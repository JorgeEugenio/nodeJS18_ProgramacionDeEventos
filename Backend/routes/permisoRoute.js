const express = require('express')
const {
    getPermisos,
    addPermiso,
    getPermiso,
    updatePermiso,
    deletePermiso
} = require('../controllers/permisoController')

const api = express.Router()
    api.get('/permiso', getPermisos)
    api.post('/permiso/', addPermiso)
    api.get('/permiso/:id', getPermiso)
    api.put('/permiso/:id', updatePermiso)
    api.delete('/permiso/:id',deletePermiso)
    
module.exports = api