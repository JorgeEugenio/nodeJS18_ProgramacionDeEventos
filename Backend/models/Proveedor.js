const mongoose = require('mongoose')

const Schema = mongoose.Schema

const projectSchema = Schema({
    rucProveedor: String,
    razonSocialProveedor: String,
},
{
    timestamps: true
})

module.exports = mongoose.model('Proveedor', projectSchema)