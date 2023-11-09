const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema object

// pengajuanbeli schema dengan property
const pengajuanbeliTicketSchema = new Schema({ // instance dari Schema
    tgl_terima: {type: Date, required: true},
    lokasi_terima: {type: String, required: true},
    sla: {type: Number, required: true},
    item_pengajuanbeli: {type: Object, required: true},
}) // constructor untuk generate timestamp update

// model pengajuanbeli untuk digunakan save, get, delete data
const pengajuanbeliTicket = mongoose.model('pengajuanbeliTicket', pengajuanbeliTicketSchema) // model(nama_model, nama_schema)
module.exports = pengajuanbeliTicket  // export modelnya=