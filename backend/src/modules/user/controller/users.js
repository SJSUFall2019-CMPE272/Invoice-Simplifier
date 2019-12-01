'use strict'

import Users from '../../../models/mongoDB/users'
import constants from '../../../utils/constants'
import mongoose from 'mongoose'
const { PythonShell } = require('python-shell')
const uuid = require('uuid/v1');

/**
 * Create user and save data in database.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.createUser = async (req, res) => {
	let createdUser,
		filter = {},
		resObj = {}
	try {
		filter.email = req.body.email

		let user = await Users.findOne(filter)
		let token
		if (user) {
			token = user.generateToken()
			user = user.toJSON()
			user.token = token
		} else {
			let newUser = new Users(req.body)
			createdUser = await newUser.save()
			token = createdUser.generateToken()
			createdUser = createdUser.toJSON()
			createdUser.token = token
		}
		let userId = user ? user._id : createdUser._id
		console.log('userid-->', userId)
		await Users.findByIdAndUpdate(mongoose.Types.ObjectId(userId), { token: token })

		resObj = user || createdUser
		return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(resObj)
	} catch (error) {
		console.log(`Error while creating user ${error}`)
		return res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error.message)
	}
}

/**
 * Upload invoice file.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.uploadInvoice = async (req, res) => {
	try {
		console.log("in upload invoice api")

		// put code for s3 file upload
		var options = {
			args:
				[
					//put the s3 url below after uploading the received file in request
					'https://invoicesimplifiierimagestore.s3.us-east-2.amazonaws.com/walmart1.jpg'
				]
		}
		PythonShell.run(`${__dirname}/OCRecog/main.py`, options, async function (err, data) {
			console.log('data coming from python script')
			if (err) {
				console.log('error in python script---->', err)
				return res.status(500).send(err)
			}
			let dataObj = JSON.parse(data)
			console.log('data received from python script', dataObj)
			let resultObj = {}
			for (var key in dataObj) {
				if (dataObj.hasOwnProperty(key)) {
					if (key === constants.DATA_FIELDS.BILL_ISSUED_BY) {
						resultObj['billIssuedBy'] = dataObj[key]
					} else if (key === constants.DATA_FIELDS.TOTAL_ITEMS_PURCHASED) {
						resultObj['totalItemsPurchased'] = dataObj[key]
					} else if (key === constants.DATA_FIELDS.SUBTOTAL) {
						resultObj['subtotal'] = dataObj[key]
					} else if (key === constants.DATA_FIELDS.TAX) {
						resultObj['tax'] = dataObj[key]
					} else if (key === constants.DATA_FIELDS.TOTAL_BILL_AFTER_TAX) {
						resultObj['totalBillAfterTax'] = dataObj[key]
					} else if (key === constants.DATA_FIELDS.TOTAL_DISCOUNT) {
						resultObj['totalDiscount'] = dataObj[key]
					}
				}
			}
			let invoiceId = uuid()
			resultObj['invoiceId'] = invoiceId
			console.log('Result Object', resultObj)
			console.log('userId-->', req.params.userId)
			await Users.updateOne({ _id: mongoose.Types.ObjectId(req.params.userId) }, { $push: { invoicesData: resultObj } })

			res.status(200).send(resultObj)
		})
	} catch (error) {
		console.log(`Error while uploading invoice file ${error}`)
		return res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error.message)
	}
}

/**
 * Update invoice details for an invoice.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.updateInvoice = async (req, res) => {
	console.log("userId & invoiceId-->", req.params.userId, req.body.invoiceId)
	try {
		await Users.updateOne(
			{ _id: mongoose.Types.ObjectId(req.params.userId), 'invoicesData.invoiceId': req.body.invoiceId },
			{
				$set: {
					'invoicesData.$.billIssuedBy': req.body.billIssuedBy,
					'invoicesData.$.totalItemsPurchased': req.body.totalItemsPurchased,
					'invoicesData.$.subtotal': req.body.subtotal,
					'invoicesData.$.tax': req.body.tax,
					'invoicesData.$.totalDiscount': req.body.totalDiscount
				}
			}
		)
		return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send('Invoice successfully updated')
	} catch (error) {
		console.log(`Error while updating invoice details user ${error}`)
		return res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error.message)
	}
}

/**
 * Fetch invoice details for a userid.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getInvoices = async (req, res) => {
	console.log("userId-->", req.params.userId)
	try {
		let userObj = await Users.findOne({ _id: mongoose.Types.ObjectId(req.params.userId), 'invoicesData.invoiceId': req.body.invoiceId })
		console.log("userObj-->", userObj)
		let invoiceList = userObj.invoicesData
		return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(invoiceList)
	} catch (error) {
		console.log(`Error while fetching invoice details ${error}`)
		return res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error.message)
	}
}