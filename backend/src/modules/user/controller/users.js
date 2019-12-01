'use strict'

import Users from '../../../models/mongoDB/users'
import constants from '../../../utils/constants'
import fs from 'fs'
const {PythonShell} = require('python-shell')


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
		if (user) {
			let token = user.generateToken()
			user = user.toJSON()
			user.token = token
		} else {
			let newUser = new Users(req.body)
			createdUser = await newUser.save()
			const token = createdUser.generateToken()
			createdUser = createdUser.toJSON()
			createdUser.token = token
		}
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
					'https://invoicesimplifiierimagestore.s3.us-east-2.amazonaws.com/walmart1.jpg'
				]
		}
		PythonShell.run('../../../../OCRecog/main.py', options, function (err, data) {
			console.log('data coming from python script')
			if (err) {
				console.log('error in python script---->', err)
				return res.status(500).send(err)
			}
			console.log('data received from python script', data)
			res.status(200).send(data)
		  });
	} catch (error) {
		console.log(`Error while uploading invoice file ${error}`)
		return res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send(error.message)
	}
}