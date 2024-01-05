const Anggaran = require('../models/anggaranModel')

const get_anggaran = (req, res) => {
    Anggaran.find()
        .then((result) => {
            res.render('budgets_admin', { anggaran: result })
        })
}

const detail_anggaran = async (req, res) => {
    const id_prodi = req.params.id
    const anggaran = await Anggaran.findById(id_prodi)
    res.render('budgets_detail', { anggaran: anggaran })
}

module.exports = {
    get_anggaran,
    detail_anggaran,
}   

