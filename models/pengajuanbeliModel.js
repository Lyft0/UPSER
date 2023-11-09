const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema object

// pengajuanbeli schema dengan property
const pengajuanbeliSchema = new Schema({ // instance dari Schema
    jenis_item: {type: String, required: true},
}) // constructor untuk generate timestamp update

// model pengajuanbeli untuk digunakan save, get, delete data
const pengajuanbeli = mongoose.model('pengajuanbeli', pengajuanbeliSchema) // model(nama_model, nama_schema)
module.exports = pengajuanbeli  // export modelnya
