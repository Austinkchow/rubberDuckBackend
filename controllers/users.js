const db = require('../models')
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    console.log(req.body)
    try {
        const foundUser = await db.User.findOne({
            email: req.body.email,
        });
        if (foundUser) {
            return res.send({
                message: 'Account is already registered',
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
        const newUser = await db.User.create(req.body);
        console.log(newUser)
        res.status(200).json({ user: newUser })
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: err })
    }
}

const login = async (req, res) => {
    try {
        const foundUser = await db.User.findOne({
            email: req.body.email,
        });
        if (!foundUser) res.status(404).json({ message: 'Invalid Email or Password' });
        const match = await bcrypt.compare(req.body.password, foundUser.password);
        if (!match) res.status(404).json({ message: 'Invalid Email or Password' });
        req.session.currentUser = {
            id: foundUser._id,
            username: foundUser.username,
            type: foundUser.type
        };
        res.status(200).json({ user: req.session.currentUser })
    } catch (err) {
        res.status(404).json({ message: err })
    };
}
const logout = async (req, res) => {
    await req.session.destroy();
    res.status(200).json({ message: 'destroy succeed' })
}

const findMyCollection = async (req, res) => {
    try {
        const foundUser = await db.User.findById(req.params.id).populate("questionSet")
        res.status(200).json({ foundUser })
    }
    catch (err) {
        res.status(404).json({ message: err })
    }
}

const show = (req, res) => {
    db.User.findById(req.params.id, (err, foundUser) => {
        if (err) console.log('Error in user#show:', err)
        if (!foundUser) return res.json({ message: 'no User set with ID found' });
        res.status(200).json({ foundUser: foundUser });
    })
}

module.exports = {
    register,
    login,
    logout,
    findMyCollection,
    show
}