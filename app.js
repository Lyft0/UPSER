// import module
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const helmet = require("helmet");
const cookieparser = require("cookie-parser");
const fileUpload = require('express-fileupload');
// import controller
const consumController = require('./controllers/consumController')
const konsumsiController = require('./controllers/konsumsiController')
const workfurnController = require('./controllers/workfurnController')
const rtkController = require('./controllers/rtkController')
const expecourmailController = require('./controllers/expecourmailController')
const peminjamanController = require('./controllers/peminjamanController')
const pengajuanbeliController = require('./controllers/pengajuanbeliController')
const userController = require('./controllers/userController')
const ticketController = require('./controllers/ticketController')
const anggaranController = require('./controllers/anggaranController')
const productController = require('./controllers/productController')
// import routes
const atkRoute = require('./routes/atkRoute')


const app = express() // setup app server

// mongoDB URI // use node version 2.2.12 or later
let uri = "mongodb://ahmadafdhalx:test12345@ac-pddnmoq-shard-00-00.zxmupfd.mongodb.net:27017,ac-pddnmoq-shard-00-01.zxmupfd.mongodb.net:27017,ac-pddnmoq-shard-00-02.zxmupfd.mongodb.net:27017/ofser?ssl=true&replicaSet=atlas-102c3t-shard-0&authSource=admin&retryWrites=true&w=majority";
// connect to mongoDB
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, ssl: true})
    .then((result) => {
        app.listen(3000)
        console.log('> Connected to database!\n> https://localhost:3000')
    }) // listen for request on port
    .catch((err) => console.log(err))

// set view engine
app.set('view engine','ejs') // set ejs as view engine

// middleware
app.use(express.static('public')) // static file public
app.use(morgan('dev')) // middleware information
app.use(express.urlencoded({ extended: true })) // url encoder request ke json
app.use(express.json())
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        scriptSrc: ["'self'", "'unsafe-inline'"],
        scriptSrcElem: ["'self'", "cdn.jsdelivr.net", "unpkg.com", "cdnjs.cloudflare.com", "s3.amazonaws.com", "'unsafe-inline'"],
        scriptSrcAttr: ["'self'", "'unsafe-inline'"]
      },
    })
  );
app.use(cookieparser());
app.use(fileUpload());

// routes
// route to /request ATK
app.use(atkRoute)
// route to /request event support
app.get('/request/peminjaman', peminjamanController.peminjaman_jenis)
app.post('/peminjaman-request', peminjamanController.peminjaman_request)
// route to /request consumables
app.get('/request/consum', consumController.consum_jenis)
app.post('/consum-request', consumController.consum_request)
// route to /request workstation
app.get('/request/workfurn', workfurnController.workfurn_jenis)
app.post('/workfurn-produk', workfurnController.workfurn_produk)
app.post('/workfurn-request', workfurnController.workfurn_request)
// route to /request rtk
app.get('/request/rtk', rtkController.rtk_jenis)
app.post('/rtk-request', rtkController.rtk_request)
// route to /request expecourmail
app.get('/request/expecourmail', expecourmailController.page)
app.post('/expecourmail-request', expecourmailController.expecourmail_request)
// route to /request pengajuanbeli
app.get('/request/pengajuanbeli', pengajuanbeliController.pengajuanbeli_jenis)
app.post('/pengajuanbeli-request', pengajuanbeliController.pengajuanbeli_request)
// route get to /request konsumsi
app.get('/request/konsumsi', konsumsiController.konsumsi_jenis)
app.post('/konsumsi-paket', konsumsiController.konsumsi_paket)
app.post('/konsumsi-request', konsumsiController.konsumsi_request)

// login page
app.get('/login', (req, res) => {
    res.render('login')
})
app.post('/login-user', userController.user_login)

// home page requester
app.get('/home-req', (req, res) => {
    res.render('home_requester')
})
// get requester
app.get('/get-requester/:fungsi', userController.get_requester)

// home page fulfiller
app.get('/home-ful', (req, res) => {
  res.render('home_fulfiller')
})
// dashboard data
app.get('/get_data/:nama', ticketController.get_data)




// my request page
app.get('/my-request/:id', userController.my_request)
app.get('/get-requester', userController.get_requester)
// delete ticket
app.delete('/delete-ticket/:user/:id', ticketController.delete_ticket)
// get ticket detail
app.post('/ticket-print', ticketController.print_ticket)

// ticket-console page
app.get('/ticket-console', userController.all_ticket)
// one ticket request and work order
app.get('/ticket-request/:id', ticketController.ticket_request)
app.get('/ticket-workorder/:id', ticketController.ticket_workorder)
app.post('/get-ticket', ticketController.get_ticket)

// activity, status, priority
app.post('/assignee', ticketController.user_assignee)
app.post('/set_status', ticketController.set_status)
app.post('/set_priority', ticketController.set_priority)
app.post('/new_activity', ticketController.new_activity)

// my profile
app.get('/profile/:id', userController.profile)
app.post('/update-profile', userController.update)
app.get('/logout', userController.logout)


// home page admin
app.get('/home-admin', (req, res) => {
  res.render('home_admin')
})
// users admin
app.get('/users-admin', userController.get_users)
app.post('/add-user', userController.add_user)
app.post('/update-user', userController.update_user)
app.delete('/delete-user/:id_user', userController.delete_user)
// budgest admin
app.get('/budgets-admin', anggaranController.get_anggaran)
app.get('/budget-detail/:id', anggaranController.detail_anggaran)
app.post('/add-budget', anggaranController.add_anggaran)
app.post('/dec-budget', anggaranController.dec_anggaran)
// product admin
app.get('/products-admin', productController.page)
app.get('/get-product/:type', productController.get_product)
app.post('/update-product/:type', productController.update_product)

