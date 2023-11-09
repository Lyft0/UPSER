const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema object

// peminjaman schema dengan property
const peminjamanTicketSchema = new Schema({ // instance dari Schema
    jumlah_peserta: {type: Number, required: true},
    tgl_mulai: {type: Date, required: true},
    tgl_selesai: {type: Date, required: true},
    jam_mulai: {type: String, required: true},
    jam_selesai: {type: String, required: true},
    nama_tempat: {type: String, required: true},
    jenis_kegiatan: {type: String, required: true},
    desc_kegiatan: {type: String, required: true},
    sla: {type: Number, required: true},
}) // constructor untuk generate timestamp update

// model peminjaman untuk digunakan save, get, delete data
const peminjamanTicket = mongoose.model('peminjamanTicket', peminjamanTicketSchema) // model(nama_model, nama_schema)
module.exports = peminjamanTicket  // export modelnya