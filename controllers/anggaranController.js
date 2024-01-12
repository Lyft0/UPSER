const Anggaran = require('../models/anggaranModel')

const get_anggaran = (req, res) => {
    Anggaran.find()
        .then((result) => {
            res.render('budgets_admin', { anggaran: result })
        })
}

const detail_anggaran = async (req, res) => {
    Anggaran.findById(req.params.id)
        .then((result) => {
            res.render('budgets_detail', { anggaran: result })
        })
}

const add_anggaran = async (req, res) => {
    let prodi = await Anggaran.findOneAndUpdate({ _id: req.body.id_prodi }, { $push: { riwayat: req.body.riwayat } })

    let harga = req.body.riwayat.total_biaya
    harga = parseInt(harga.replace(/\D/g, ''), 10);
    const result = await Anggaran.findOne({ _id: req.body.id_prodi }, { total_anggaran:1 })
    let total_anggaran = result.total_anggaran

    let update_anggaran = total_anggaran+harga
    const update = await Anggaran.findOneAndUpdate({ _id: req.body.id_prodi }, { total_anggaran: update_anggaran })

    res.json({ redirect: `/budget-detail/${req.body.id_prodi}` })
}

const dec_anggaran = async (req, res) => {
    let prodi = await Anggaran.findOneAndUpdate({ _id: req.body.id_prodi }, { $push: { riwayat: req.body.riwayat } })

    let harga = req.body.riwayat.total_biaya
    harga = parseInt(harga.replace(/\D/g, ''), 10);
    const result = await Anggaran.findOne({ _id: req.body.id_prodi }, { total_anggaran:1 })
    let total_anggaran = result.total_anggaran

    let update_anggaran = total_anggaran-harga
    const update = await Anggaran.findOneAndUpdate({ _id: req.body.id_prodi }, { total_anggaran: update_anggaran })

    res.json({ redirect: `/budget-detail/${req.body.id_prodi}` })
}

const get_riwayat = async (req, res) => {
    const result = await Anggaran.findOne({ _id: req.params.id }, { riwayat:1 })

    res.json({ riwayat: result.riwayat })
}


module.exports = {
    get_anggaran,
    detail_anggaran,
    add_anggaran,
    dec_anggaran,
    get_riwayat,
}   

