const _ = require('underscore');
const Peminjaman = require('../models/peminjamanModel')
const Ticket = require('../models/ticketModel');
const PeminjamanTicket = require('../models/peminjamanTicketModel');

// menampilkan jenis atk
const peminjaman_jenis = (req, res) => {
    Peminjaman.find()
        .then((result) => {
            const jenis = result.map(item => item.jenis)
            res.render('request_form/peminjaman_request', { jenis: jenis.sort()}) // render file dengan view engine
        })
        .catch((error) => {
            console.log(error)
        })
}

const peminjaman_request = (req, res) => {
    const peminjaman_ticket = new PeminjamanTicket(req.body.peminjaman_ticket)
    const ticket = new Ticket(req.body.ticket)
    ticket.id_ticket_detail = peminjaman_ticket._id
    
    // method untuk menyimpan ke database model.save()
    ticket.save()
        .then((result) => {        
            peminjaman_ticket.save()
                .then((result) => {
                    res.json({ redirect: '/request/peminjaman' })
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            res.json({ error: 'error'}) // --->
            console.log(err)
        })
}

module.exports = {
    peminjaman_jenis,
    peminjaman_request,
}