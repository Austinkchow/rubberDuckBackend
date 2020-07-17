// imports
const router = require('express').Router()
const ctrl = require('../controllers')
// routes
router.get('/', ctrl.questionSets.index)
router.get('/:id', ctrl.questionSets.show)
router.post('/', ctrl.questionSets.create)
router.post('/:id', ctrl.questionSets.addQuestion)
router.delete('/:id/deleteQuestion', ctrl.questionSets.deleteQuestion)
router.put('/:id', ctrl.questionSets.update)
router.delete('/:id', ctrl.questionSets.destroy)

// exports
module.exports = router