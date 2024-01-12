const _ = require('underscore');
const Rtk = require('../models/rtkModel')
const Ticket = require('../models/ticketModel');
const RtkTicket = require('../models/rtkTicketModel');
const Anggaran = require('../models/anggaranModel')

// menampilkan jenis rtk
const rtk_jenis = (req, res) => {
    Rtk.find()
        .then((result) => {
            res.render('request_form/rtk_request', { jenis_produk: result.sort()}) // render file dengan view engine
        })
        .catch((error) => {
            console.log(error)
        })
}

const rtk_request = async (req, res) => {
    const rtk_ticket = new RtkTicket(req.body.rtk_ticket)
    const ticket = new Ticket(req.body.ticket)
    ticket.id_ticket_detail = rtk_ticket._id

    // method untuk menyimpan ke database model.save()
    ticket.save()
        .then((result) => {        
            rtk_ticket.save()
                .then(async (result) => {
                    riwayat = {
                        'nama': ticket.nama_req,
                        'layanan': ticket.jenis_ticket,
                        'tanggal': ticket.activity[0].tgl,
                        'deskripsi': ticket.desc_req,
                        'total_biaya': "Rp. " + Intl.NumberFormat().format(rtk_ticket.total_biaya), 
                    }
                    let prodi = await Anggaran.findOneAndUpdate({ nama_prodi: ticket.fungsi }, { $push: { riwayat: riwayat } })
                    const hasil = await Anggaran.findOne({ nama_prodi: ticket.fungsi }, { total_anggaran:1 })
                    let total_anggaran = hasil.total_anggaran
                    let update_anggaran = total_anggaran-rtk_ticket.total_biaya
                    const update = await Anggaran.findOneAndUpdate({ nama_prodi: ticket.fungsi }, { total_anggaran: update_anggaran })
                    res.json({ redirect: '/request/rtk' })
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
    rtk_jenis,
    rtk_request,
}