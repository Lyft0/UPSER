const Atk = require('../models/atkModel')
const Consum = require('../models/consumModel')
const Konsumsi = require('../models/konsumsiModel')
const Rtk = require('../models/rtkModel')
const Workfurn = require('../models/workfurnModel')

const page = async (req, res) => {
    res.render('products_admin')
}

const get_product = async (req, res) => {
    product_type = req.params.type

    switch(product_type){
        case "atk":
            const atk = await Atk.find()
            res.json({ atk })
            break;

        case "consum":
            const consum = await Consum.find()
            res.json({ consum })
            break;

        case "konsumsi":
            const konsumsi = await Konsumsi.find()
            res.json({ konsumsi })
            break;

        case "rtk":
            const rtk = await Rtk.find()
            res.json({ rtk })
            break;

        case "workfurn":
            const workfurn = await Workfurn.find()
            res.json({ workfurn })
            break;    
    }
      
}

const update_product = async (req, res) => {
    product_type = req.params.type

    switch(product_type){
        case "atk":
            let atk = await Atk.deleteMany({})
            atk = await Atk.insertMany(req.body.product)
            break;
        case "consum":
            let consum = await Consum.deleteMany({})
            consum = await Consum.insertMany(req.body.product)
            break;

        case "konsumsi":
            let konsumsi = await Konsumsi.deleteMany({})
            konsumsi = await Konsumsi.insertMany(req.body.product)
            break;

        case "rtk":
            let rtk = await Rtk.deleteMany({})
            rtk = await Rtk.insertMany(req.body.product)
            break;

        case "workfurn":
            let workfurn = await Workfurn.deleteMany({})
            workfurn = await Workfurn.insertMany(req.body.product)
            break;    
    }
    
    res.json({redirect: '/products-admin'})
}

module.exports = {
    page,
    get_product,
    update_product,
}