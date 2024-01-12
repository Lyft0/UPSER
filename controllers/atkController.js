const _ = require('underscore');
const Atk = require('../models/atkModel')
const Ticket = require('../models/ticketModel');
const AtkTicket = require('../models/atkTicketModel');
const Anggaran = require('../models/anggaranModel')

// menampilkan jenis atk
const atk_jenis = (req, res) => {
    Atk.find()
        .then((result) => {
            const jenis_atk = _.keys(_.countBy(result, function(result) { return result.jenis_produk; }))
            res.render('request_form/atk_request', { jenis_atk: jenis_atk.sort()}) // render file dengan view engine
        })
        .catch((error) => {
            console.log(error)
        })
}
// menampilkan produk dari jenis
const atk_produk = (req, res) => {
    const jenis = req.body.jenis
    Atk.find()
        .then((result) => {
            const produk = result.filter(item => item.jenis_produk == jenis)
            res.json({ produk })
        })
        .catch((error) => {
            console.log(error)
        })
}

const atk_request = async (req, res) => {
    const atk_ticket = new AtkTicket(req.body.atk_ticket)
    const ticket = new Ticket(req.body.ticket)
    ticket.id_ticket_detail = atk_ticket._id

    // method untuk menyimpan ke database model.save()
    ticket.save()
        .then((result) => {        
            atk_ticket.save()
                .then( async(result) => {
                    riwayat = {
                        'nama': ticket.nama_req,
                        'layanan': ticket.jenis_ticket,
                        'tanggal': ticket.activity[0].tgl,
                        'deskripsi': ticket.desc_req,
                        'total_biaya': "Rp. " + Intl.NumberFormat().format(atk_ticket.total_biaya), 
                    }
                    let prodi = await Anggaran.findOneAndUpdate({ nama_prodi: ticket.fungsi }, { $push: { riwayat: riwayat } })
                    const hasil = await Anggaran.findOne({ nama_prodi: ticket.fungsi }, { total_anggaran:1 })
                    let total_anggaran = hasil.total_anggaran
                    let update_anggaran = total_anggaran-atk_ticket.total_biaya 
                    const update = await Anggaran.findOneAndUpdate({ nama_prodi: ticket.fungsi }, { total_anggaran: update_anggaran })

                    res.json({ redirect: '/request/atk' })
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
    atk_jenis,
    atk_produk,
    atk_request
}