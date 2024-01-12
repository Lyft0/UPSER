const _ = require('underscore');
const Consum = require('../models/consumModel')
const Ticket = require('../models/ticketModel');
const ConsumTicket = require('../models/consumTicketModel');
const Anggaran = require('../models/anggaranModel')

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

const consum_request = async (req, res) => {
    const consum_ticket = new ConsumTicket(req.body.consum_ticket)
    const ticket = new Ticket(req.body.ticket)
    ticket.id_ticket_detail = consum_ticket._id

    // method untuk menyimpan ke database model.save()
    ticket.save()
        .then((result) => {        
            consum_ticket.save()
                .then(async (result) => {
                    riwayat = {
                        'nama': ticket.nama_req,
                        'layanan': ticket.jenis_ticket,
                        'tanggal': ticket.activity[0].tgl,
                        'deskripsi': ticket.desc_req,
                        'total_biaya': "Rp. " + Intl.NumberFormat().format(consum_ticket.total_biaya), 
                    }
                    let prodi = await Anggaran.findOneAndUpdate({ nama_prodi: ticket.fungsi }, { $push: { riwayat: riwayat } })
                    const hasil = await Anggaran.findOne({ nama_prodi: ticket.fungsi }, { total_anggaran:1 })
                    let total_anggaran = hasil.total_anggaran
                    let update_anggaran = total_anggaran-consum_ticket.total_biaya
                    const update = await Anggaran.findOneAndUpdate({ nama_prodi: ticket.fungsi }, { total_anggaran: update_anggaran })

                    res.json({ redirect: '/request/consum' })
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            console.log(err)
            res.json({ error: 'error'}) // --->
        })
}

module.exports = {
    consum_jenis,
    consum_request,
}