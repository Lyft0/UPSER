const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema object

// anggaran schema dengan property
const AnggaranSchema = new Schema({ // instance dari Schema
    nama_prodi: {type: String, required: true},
    total_anggaran: {type: Number, required: true},
    riwayat: {type: Object, required: true},
    fakultas: {type: String, required: true},
}) //

// model anggaran untuk digunakan save, get, delete data
const Anggaran = mongoose.model('Anggaran', AnggaranSchema) // model(nama_model, nama_schema)
module.exports = Anggaran  // export modelnya
