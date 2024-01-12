const _ = require('underscore');
const Workfurn = require('../models/workfurnModel')
const Ticket = require('../models/ticketModel');
const WorkfurnTicket = require('../models/workfurnTicketModel');
const Anggaran = require('../models/anggaranModel')

// menampilkan jenis workfurn
const workfurn_jenis = (req, res) => {
    Workfurn.find()
        .then((result) => {
            const jenis_workfurn = _.keys(_.countBy(result, function(result) { return result.jenis_produk; }))
            res.render('request_form/workfurn_request', { jenis_workfurn: jenis_workfurn.sort()}) // render file dengan view engine
        })
        .catch((error) => {
            console.log(error)
        })
}
// menampilkan produk dari jenis
const workfurn_produk = (req, res) => {
    const jenis = req.body.jenis
    Workfurn.find()
        .then((result) => {
            const produk = result.filter(item => item.jenis_produk == jenis)
            res.json({ produk })
        })
        .catch((error) => {
            console.log(error)
        })
}

const workfurn_request = async (req, res) => {
    const workfurn_ticket = new WorkfurnTicket(req.body.workfurn_ticket)
    const ticket = new Ticket(req.body.ticket)
    ticket.id_ticket_detail = workfurn_ticket._id

    // method untuk menyimpan ke database model.save()
    ticket.save()
        .then((result) => {        
            workfurn_ticket.save()
                .then(async (result) => {
                    riwayat = {
                        'nama': ticket.nama_req,
                        'layanan': ticket.jenis_ticket,
                        'tanggal': ticket.activity[0].tgl,
                        'deskripsi': ticket.desc_req,
                        'total_biaya': "Rp. " + Intl.NumberFormat().format(workfurn_ticket.total_biaya), 
                    }
                    let prodi = await Anggaran.findOneAndUpdate({ nama_prodi: ticket.fungsi }, { $push: { riwayat: riwayat } })
                    const hasil = await Anggaran.findOne({ nama_prodi: ticket.fungsi }, { total_anggaran:1 })
                    let total_anggaran = hasil.total_anggaran
                    let update_anggaran = total_anggaran-workfurn_ticket.total_biaya
                    const update = await Anggaran.findOneAndUpdate({ nama_prodi: ticket.fungsi }, { total_anggaran: update_anggaran })

                    res.json({ redirect: '/request/workfurn' })
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
    workfurn_jenis,
    workfurn_produk,
    workfurn_request
}