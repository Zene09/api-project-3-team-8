const mongoose = require('mongoose')

const likesSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
    timestamps: true
    }
)

module.exports = likesSchema