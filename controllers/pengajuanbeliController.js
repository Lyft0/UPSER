const _ = require('underscore');
const Pengajuanbeli = require('../models/pengajuanbeliModel')
const Ticket = require('../models/ticketModel');
const PengajuanbeliTicket = require('../models/pengajuanbeliTicketModel');

// menampilkan jenis pengajuanbeli
const pengajuanbeli_jenis = (req, res) => {
    Pengajuanbeli.find()
        .then((result) => {
            const jenis_item = result.map(item => item.jenis_item)
            res.render('request_form/pengajuanbeli_request', { jenis_item: jenis_item.sort()}) // render file dengan view engine
        })
        .catch((error) => {
            console.log(error)
        })
}

const pengajuanbeli_request = (req, res) => {
    const pengajuanbeli_ticket = new PengajuanbeliTicket(req.body.pengajuanbeli_ticket)
    const ticket = new Ticket(req.body.ticket)
    ticket.id_ticket_detail = pengajuanbeli_ticket._id
    // method untuk menyimpan ke database model.save()
    ticket.save()
        .then((result) => {        
            pengajuanbeli_ticket.save()
                .then((result) => {
                    res.json({ redirect: '/request/pengajuanbeli' })
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = {
    pengajuanbeli_jenis,
    pengajuanbeli_request,
}