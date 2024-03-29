const _ = require('underscore');
const Konsumsi = require('../models/konsumsiModel')
const Ticket = require('../models/ticketModel');
const KonsumsiTicket = require('../models/konsumsiTicketModel');
const Anggaran = require('../models/anggaranModel')

// menampilkan jenis konsumsi
const konsumsi_jenis = (req, res) => {
    Konsumsi.find()
        .then((result) => {
            const jenis_konsumsi = _.keys(_.countBy(result, function(result) { return result.jenis_konsumsi; }))
            res.render('request_form/konsumsi_request', { jenis_konsumsi: jenis_konsumsi.sort()}) // render file dengan view engine
        })
        .catch((error) => {
            console.log(error)
        })
}

// menampilkan paket dari jenis
const konsumsi_paket = (req, res) => {
    const jenis = req.body.jenis
    Konsumsi.find()
        .then((result) => {
            const paket = result.filter(item => item.jenis_konsumsi == jenis)
            res.json({ paket })
        })
        .catch((error) => {
            console.log(error)
        })
}

const konsumsi_request = async (req, res) => {
    const konsumsi_ticket = new KonsumsiTicket(req.body.konsumsi_ticket)
    const ticket = new Ticket(req.body.ticket)
    ticket.id_ticket_detail = konsumsi_ticket._id
    
    // method untuk menyimpan ke database model.save()
    ticket.save()
        .then((result) => {        
            konsumsi_ticket.save()
                .then(async(result) => {
                    riwayat = {
                        'nama': ticket.nama_req,
                        'layanan': ticket.jenis_ticket,
                        'tanggal': ticket.activity[0].tgl,
                        'deskripsi': ticket.desc_req,
                        'total_biaya': "Rp. " + Intl.NumberFormat().format(konsumsi_ticket.total_biaya), 
                    }
                    let prodi = await Anggaran.findOneAndUpdate({ nama_prodi: ticket.fungsi }, { $push: { riwayat: riwayat } })
                    const hasil = await Anggaran.findOne({ nama_prodi: ticket.fungsi }, { total_anggaran:1 })
                    let total_anggaran = hasil.total_anggaran
                    let update_anggaran = total_anggaran-konsumsi_ticket.total_biaya
                    const update = await Anggaran.findOneAndUpdate({ nama_prodi: ticket.fungsi }, { total_anggaran: update_anggaran })
                    res.json({ redirect: '/request/konsumsi' })
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
    konsumsi_jenis,
    konsumsi_paket,
    konsumsi_request
}