const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema object

// peminjaman schema dengan property
const peminjamanTicketSchema = new Schema({ // instance dari Schema
    jumlah_peserta: {type: Number, required: true},
    lokasi_kegiatan: {type: String, required: true},
    tgl_mulai: {type: Date, required: true},
    tgl_selesai: {type: Date, required: true},
    sla: {type: Number, required: true},
    item_peminjaman: {type: Object, required: true},
}) // constructor untuk generate timestamp update

// model peminjaman untuk digunakan save, get, delete data
const peminjamanTicket = mongoose.model('peminjamanTicket', peminjamanTicketSchema) // model(nama_model, nama_schema)
module.exports = peminjamanTicket  // export modelnya