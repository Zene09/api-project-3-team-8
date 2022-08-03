const mongoose = require('mongoose')
// import commentSchema here

const { Schema, model } = mongoose

const blogSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
        // subdoc comments
        // comments: [commentSchema],
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
        toJSON: { virtuals: true }
	}
)

// blogSchema.virtual('blogInfo').get(function () {
//     return `${this.title} by ${this.owner}.`
// })

module.exports = model('Blog', blogSchema)
