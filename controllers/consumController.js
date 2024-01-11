const _ = require('underscore');
const Consum = require('../models/consumModel')
const Ticket = require('../models/ticketModel');
const ConsumTicket = require('../models/consumTicketModel');

// menampilkan jenis consum
const consum_jenis = (req, res) => {
    Consum.find()
        .then((result) => {
            res.render('request_form/consum_request', { nama_produk: result.sort()}) // render file dengan view engine
        })
        .catch((error) => {
            console.log(error)
        })
}

const consum_request = (req, res) => {
    const consum_ticket = new ConsumTicket(req.body.consum_ticket)
    const ticket = new Ticket(req.body.ticket)
    ticket.id_ticket_detail = consum_ticket._id
    // method untuk menyimpan ke database model.save()
    ticket.save()
        .then((result) => {        
            consum_ticket.save()
                .then((result) => {
                    res.json({ redirect: '/request/consum' })
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
    consum_jenis,
    consum_request,
}