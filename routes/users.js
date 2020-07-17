// imports
const router = require('express').Router()
const ctrl = require('../controllers')

// routes
router.post('/register', ctrl.users.register)
router.post('/login', ctrl.users.login)
router.delete('/logout', ctrl.users.logout)
router.get('/user/:id/findUser', ctrl.users.show)
router.get('/user/:id', ctrl.users.findMyCollection)

// exports
module.exports = router