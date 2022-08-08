const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            default: 0
        },
    },
    {
    timestamps: true
    }
)

module.exports = commentSchema