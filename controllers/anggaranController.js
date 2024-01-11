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
    // BUAT ANGGAARN BERTAMBA DAN BERKURANG
    let prodi = await Anggaran.findOneAndUpdate({ _id: req.body.id_prodi }, { $push: { riwayat: req.body.riwayat } })

    res.json({ redirect: `/budget-detail/${req.body.id_prodi}` })
}

const dec_anggaran = async (req, res) => {
    let prodi = await Anggaran.findOneAndUpdate({ _id: req.body.id_prodi }, { $push: { riwayat: req.body.riwayat } })

    res.json({ redirect: `/budget-detail/${req.body.id_prodi}` })
}

module.exports = {
    get_anggaran,
    detail_anggaran,
    add_anggaran,
    dec_anggaran,
}   

