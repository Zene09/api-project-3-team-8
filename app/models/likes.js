const mongoose = require('mongoose')

const likesSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true
        },
    },
    {
    timestamps: true
    }
)

module.exports = likesSchema