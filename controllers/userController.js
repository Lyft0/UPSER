const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

const user_login = (req, res) => {
    User.find({
        email: req.body.email,
        password: req.body.password,
    })
        .then((result) => {
            if(result[0]){
                res.cookie('user', result[0])
                if(result[0].role == 'fulfiller'){
                    res.json({ redirect: '/home-ful' })
                }else if(result[0].role == 'admin'){
                    res.json({ redirect: '/home-admin'})
                }else{
                    res.json({ redirect: '/home-req' })
                }
            }else{
                console.log('user not exist')
            }
        })
}

const my_request = (req, res) => {
    Ticket.find({ id_user_req: req.params.id }).sort({ createdAt: -1 })
        .then((result) => {
            res.render('my-request', { ticket: result })
        })  
}

const get_requester = (req, res) => {
    let fungsi = req.params.fungsi
    User.find({ fungsi: fungsi },{ nama:1, _id:0})
        .then((result) => {
            res.json({ requester: result })
        })
}

const all_ticket = (req, res) => {
    Ticket.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('ticket_console', { ticket: result })
        })
}

const profile = async (req, res) => {
    const id_user = req.params.id

    const user = await User.findById(id_user)
    res.render('profile', { user: user })
}

const update = async (req, res) => {
    const user_update = await User.findByIdAndUpdate({_id: req.body.id_user}, {
        ...req.body
    })
    if(req.files){
        const { img } = req.files;
        let img_name = req.body.nama + ".png"
        img.mv(__dirname + '/../public/images/profile/' + img_name);
        const user_img = await User.findByIdAndUpdate({_id: req.body.id_user}, { image: img_name })
    }
    const user = await User.findByIdAndUpdate({_id: req.body.id_user})

    res.clearCookie('user');
    res.cookie('user', await User.findById(req.body.id_user))
    res.render('profile', { user: user })
}

const logout = (req, res) => {
    res.clearCookie('user');
    res.json({ redirect: '/login' })
}

const get_users = (req, res) => {
    User.find()
        .then((result) => {
            res.render('users_admin', { user: result })
        })
}

const add_user = (req, res) => {
    const user = new User(req.body.user)
    console.log(req.body.user)

    user.save()
        .then((result) => {
            res.json({ redirect: '/users-admin'})
        })
        .catch((err) => {
            console.log(err)
        })
}

const update_user = async (req, res) => {
    console.log(req.body)
    const user_update = await User.findByIdAndUpdate({_id: req.body.id}, {
        ...req.body.user
    })
    const user = await User.find()
    res.json({ redirect: '/users-admin'})
}

const delete_user = async (req, res) => {
    User.findByIdAndDelete(req.params.id_user)
        .then(result => {
            res.json({ redirect: "/users-admin" })
        })
        .catch((err) => {
            console.log(err)
        })
}


const logout_admin = (req, res) => {
    res.clearCookie('user');
    res.json({ redirect: '/login' })
}


module.exports = {
    user_login,
    my_request,
    get_requester,
    all_ticket,
    profile,
    update,
    logout,
    get_users,
    add_user,
    update_user,
    delete_user,
    logout_admin
}