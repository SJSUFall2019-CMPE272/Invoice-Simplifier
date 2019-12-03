`use strict`

import express from 'express'
let router = express.Router()
import userController from '../controller/users'
import validator from '../validator'
import validation from 'express-validation'
require('../../../middlewares/passport')
import passport from 'passport'
import multiparty from 'connect-multiparty'
let multipartyMiddleware = multiparty();

router.post('/createUser', validation(validator['createUser']), userController.createUser)
router.post('/uploadInvoice/:userId', validation(validator['uploadInvoice']), passport.authenticate('jwt', { session: false }), multipartyMiddleware, userController.uploadInvoice)
router.put('/updateInvoice/:userId', validation(validator['updateInvoice']), passport.authenticate('jwt', { session: false }), userController.updateInvoice)
router.get('/getInvoices/:userId', validation(validator['getInvoices']), passport.authenticate('jwt', { session: false }), userController.getInvoices)
router.get('/getMonthlyStats/:userId', validation(validator['getMonthlyStats']), passport.authenticate('jwt', { session: false }), userController.getMonthlyStats)
router.get('/getMonthlyExpenditure/:userId', validation(validator['getMonthlyExpenditure']), passport.authenticate('jwt', { session: false }), userController.getMonthlyExpenditure)

module.exports = router
