const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            default: 0
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
    timestamps: true
    }
)

module.exports = commentSchema

// // {
//     Blog: {
        // type: Schema.Types.ObjectId,
        // ref: 'Blog',
//     }

//     owner: {
		// 	type: Schema.Types.ObjectId,
		// 	ref: 'User',
		// },
// }