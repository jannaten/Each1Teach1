const mongoose = require('mongoose');
const { toJSON } = require('../../utilities/models');

const fileSchema = new mongoose.Schema({
	fileId: {
		type: String,
		required: [true, 'file.{PATH}.required']
	},
	fileName: {
		type: String,
		required: [true, 'file.{PATH}.required']
	},
	mimeType: {
		type: String,
		required: [true, 'file.{PATH}.required']
	},
	deletedAt: {
		type: Date,
		default: null
	}
}, {
	timestamps: true
});

fileSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		toJSON(returnedObject);
	}
});

module.exports = (context) => context.model('File', fileSchema);