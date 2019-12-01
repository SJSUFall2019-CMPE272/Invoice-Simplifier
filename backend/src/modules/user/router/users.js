`use strict`

import express from 'express'
let router = express.Router()
import userController from '../controller/users'
import validator from '../validator'
import validation from 'express-validation'
require('../../../middlewares/passport')
import passport from 'passport'

router.post('/createUser', validation(validator['createUser']), userController.createUser)
router.post('/uploadInvoice', validation(validator['uploadInvoice']), userController.uploadInvoice)

module.exports = router
