const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema object

// consum schema dengan property
const consumSchema = new Schema({ // instance dari Schema
    nama_produk: {type: String, required: true},
    harga: {type: Number, required: true},
}) // constructor untuk generate timestamp update

// model consum untuk digunakan save, get, delete data
const Consum = mongoose.model('Consum', consumSchema) // model(nama_model, nama_schema)
module.exports = Consum  // export modelnya
