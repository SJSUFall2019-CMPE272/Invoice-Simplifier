`use strict`

import Joi from 'joi'

module.exports = {
	createUser: {
		body: {
			name: Joi.string().required(),
			email: Joi.string().email().required(),
			phone: Joi.number(),
			uid: Joi.string().required()
		},
		model: "createUser",
		group: "User",
		description: "Create user and save details in database"
	},
	uploadInvoice: {
		path: {
			userId: Joi.string().required()
		},
		header: {
			authorization: Joi.string().required()
		},
		model: 'uploadInvoice',
		group: "User",
		description: "Get user profile details based on userid"
	}
}