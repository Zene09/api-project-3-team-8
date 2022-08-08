const mongoose = require('mongoose')
const commentSchema = require('./comment')
const likeSchema = require('./likes')

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
        comments: [commentSchema],
		likes: [likeSchema],
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

blogSchema.virtual('commentsAvail').get(function () {
    if (this.comments.length > 0) {
        return `This post has some comments!`
    } else {
        return `No one has commented on this post yet.`
    }
})

module.exports = model('Blog', blogSchema)
