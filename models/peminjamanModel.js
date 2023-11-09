const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema object

// peminjaman schema dengan property
const peminjamanSchema = new Schema({ // instance dari Schema
    jenis: {type: String, required: true},
})

// model peminjaman untuk digunakan save, get, delete data
const Peminjaman = mongoose.model('peminjaman', peminjamanSchema) // model(nama_model, nama_schema)
module.exports = Peminjaman  // export modelnya
