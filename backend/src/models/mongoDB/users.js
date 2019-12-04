`use strict`

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import config from '../../../config'
import jwt from 'jsonwebtoken'
require('mongoose-type-email');

const Users = new mongoose.Schema({
	name: {
		type: String,
		maxlength: 50
	},
	uid: {
		type: String
	},
	email: mongoose.SchemaTypes.Email,
	phone: {
		type: Number
	},
	token: {
		type: String
	},
	invoicesData: [{
		invoiceId: String,
		billIssuedBy : String,
		totalItemsPurchased : String,
		subTotal : Number,
		tax : Number,
		totalBillAfterTax : Number,
		totalDiscount: Number,
		receiptDate: String
	}]
})

Users.methods.generateToken = function generateToken() {
	const user = this

	return jwt.sign({
		id: user._id
	}, config.token)
}

export default mongoose.model('users', Users)
