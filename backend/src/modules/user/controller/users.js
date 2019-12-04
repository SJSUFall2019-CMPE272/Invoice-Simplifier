'use strict'

import Users from '../../../models/mongoDB/users'
import constants from '../../../utils/constants'
import mongoose from 'mongoose'
import fs from 'fs'
const { PythonShell } = require('python-shell')
const uuid = require('uuid/v1')
import AWS from 'aws-sdk'

const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

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
		console.log("in upload invoice api", req, req.files.file)
		let file = req.files.file
		fs.readFile(file.path, function (err, data) {
			if (err) console.log('err-->', err)
			console.log('data---->', data)
			const params = {
				Bucket: process.env.BUCKET_NAME,
				Key: file.name,
				Body: data
			};
			console.log('params-->', params)
			s3.upload(params, function (s3Err, data) {
				console.log("in upload function")
				if (s3Err) console.log('s3 error-->', s3Err)
				console.log(`File uploaded successfully at ${data.Location}`)

				var options = {
					args:
						[
							data.Location,
							process.env.AWS_ACCESS_KEY,
							process.env.AWS_SECRET_ACCESS_KEY
						]
				}
				PythonShell.run(`${__dirname}/OCRecog/main.py`, options, async function (err, data) {
					console.log('data coming from python script')
					if (err) {
						console.log('error in python script---->', err)
						return res.status(500).send(err)
					}
					console.log('data received from python script before', data)
					let dataObj = JSON.parse(data)
					console.log('data received from python script', dataObj)
					let resultObj = dataObj
					console.log('Result Object', resultObj)
					console.log('userId-->', req.params.userId)
					// await Users.updateOne({ uid: req.params.userId }, { $push: { invoicesData: resultObj } })

					res.status(200).send(resultObj)
				})
			});

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
			{ uid: req.params.userId, 'invoicesData.invoiceId': req.body.invoiceId },
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
		let userObj = await Users.findOne({ uid: req.params.userId, 'invoicesData.invoiceId': req.body.invoiceId })
		console.log("userObj-->", userObj)
		let invoiceList = userObj.invoicesData
		return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(invoiceList)
	} catch (error) {
		console.log(`Error while fetching invoice details ${error}`)
		return res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error.message)
	}
}

/**
 * Fetch monthly stats for a userid.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getMonthlyStats = async (req, res) => {
	console.log("userId-->", req.params.userId, req.query.month)
	try {
		let userObj = await Users.findOne({ uid: req.params.userId })
		console.log("invoicesData-->", userObj.invoicesData)
		let invoicesList = userObj.invoicesData
		let resultObj = {}
		for (let item of invoicesList) {
			console.log("issued by", item.billIssuedBy)
			if (item.date.split('/')[0] === req.query.month) {
				if (resultObj.hasOwnProperty(item.billIssuedBy)) {
					console.log("in ifff")
					resultObj[item.billIssuedBy] = resultObj[item.billIssuedBy] + item.totalBillAfterTax
				} else if(!resultObj.hasOwnProperty(item.billIssuedBy)) {
					console.log("in else")
					resultObj[item.billIssuedBy] = item.totalBillAfterTax
				}
				console.log("resultObj-->", resultObj)

			}
		}
		let responseObj = {
			issuedBy : Object.keys(resultObj),
			totalBillAfterTax : Object.values(resultObj)
		}
		console.log("finallllll  ------>resultObj-->", resultObj,responseObj)
		return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(responseObj)
	} catch (error) {
		console.log(`Error while fetching monthly stats ${error}`)
		return res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error.message)
	}
}

/**
 * Fetch monthly expenditure for a userid.
 * @param  {Object} req request object
 * @param  {Object} res response object
 */
exports.getMonthlyExpenditure = async (req, res) => {
	console.log("userId-->", req.params.userId, req.query.month)
	try {
		let userObj = await Users.findOne({ uid: req.params.userId })
		console.log("invoicesData-->", userObj.invoicesData)
		let invoicesList = userObj.invoicesData
		let resultObj = {
			'January': 0,
			'February': 0,
			'March': 0,
			'April': 0,
			'May': 0,
			'June': 0,
			'July': 0,
			'August': 0,
			'September': 0,
			'October': 0,
			'November': 0,
			'December': 0,
		}
		for (let item of invoicesList) {
			if (item.date.split('/')[0] === '01') {
				resultObj.January += item.totalBillAfterTax
			} else if (item.date.split('/')[0] === '02') {
				resultObj.February += item.totalBillAfterTax
			} else if (item.date.split('/')[0] === '03') {
				resultObj.March += item.totalBillAfterTax
			} else if (item.date.split('/')[0] === '04') {
				resultObj.April += item.totalBillAfterTax
			} else if (item.date.split('/')[0] === '05') {
				resultObj.May += item.totalBillAfterTax
			} else if (item.date.split('/')[0] === '06') {
				resultObj.June += item.totalBillAfterTax
			} else if (item.date.split('/')[0] === '07') {
				resultObj.July += item.totalBillAfterTax
			} else if (item.date.split('/')[0] === '08') {
				resultObj.August += item.totalBillAfterTax
			} else if (item.date.split('/')[0] === '09') {
				resultObj.September += item.totalBillAfterTax
			} else if (item.date.split('/')[0] === '10') {
				resultObj.October += item.totalBillAfterTax
			} else if (item.date.split('/')[0] === '11') {
				resultObj.November += item.totalBillAfterTax
			} else if (item.date.split('/')[0] === '12') {
				resultObj.December += item.totalBillAfterTax
			}
		}
		console.log("resultObj-->", resultObj)
		return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(resultObj)
	} catch (error) {
		console.log(`Error while fetching monthly expenditure ${error}`)
		return res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error.message)
	}
}
