`use strict`

import express from 'express'
let router = express.Router()
import userController from '../controller/users'
import validator from '../validator'
import validation from 'express-validation'
require('../../../middlewares/passport')
import passport from 'passport'

router.post('/createUser', validation(validator['createUser']), userController.createUser)
router.post('/uploadInvoice/:userId', validation(validator['uploadInvoice']), passport.authenticate('jwt', { session: false }), userController.uploadInvoice)

module.exports = router
