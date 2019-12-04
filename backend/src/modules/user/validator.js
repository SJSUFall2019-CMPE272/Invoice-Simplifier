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
		description: "Upload invoice"
	},
	updateInvoice: {
		path: {
			userId: Joi.string().required()
		},
		body: {
			invoiceId: Joi.string().required(),
			billIssuedBy: Joi.string(),
			totalItemsPurchased: Joi.string(),
			subtotal: Joi.number(),
			tax: Joi.number(),
			totalBillAfterTax: Joi.number(),
			totalDiscount: Joi.number(),
			receiptDate: Joi.string()
		},
		header: {
			authorization: Joi.string().required()
		},
		model: 'uploadInvoice',
		group: "User",
		description: "Update invoice details based on userid"
	},
	getInvoices: {
		path: {
			userId: Joi.string().required()
		},
		header: {
			authorization: Joi.string().required()
		},
		model: 'getInvoices',
		group: "User",
		description: "Get all the invoices based on userid"
	},
	getMonthlyStats: {
		path: {
			userId: Joi.string().required()
		},
		query: {
			month: Joi.string().required()
		},
		header: {
			authorization: Joi.string().required()
		},
		model: 'getMonthlyStats',
		group: "User",
		description: "Get all the monthly stats based on userid and month"
	}, 
	getMonthlyExpenditure: {
		path: {
			userId: Joi.string().required()
		},
		header: {
			authorization: Joi.string().required()
		},
		model: 'getMonthlyStats',
		group: "User",
		description: "Get all the monthly stats based on userid and month"
	}
}