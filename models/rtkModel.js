const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema object

// rtk schema dengan property
const rtkSchema = new Schema({ // instance dari Schema
    nama_produk: {type: String, required: true},
    harga: {type: Number, required: true},
}) // constructor untuk generate timestamp update

// model rtk untuk digunakan save, get, delete data
const Rtk = mongoose.model('Rtk', rtkSchema) // model(nama_model, nama_schema)
module.exports = Rtk  // export modelnya