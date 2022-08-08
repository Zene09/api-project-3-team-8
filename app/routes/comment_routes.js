const express = require('express')
const passport = require('passport')

// pull in Mongoose model for pets
const Blog = require('../models/blog')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// POST -> create a comment
// POST /blogs/<comment_id>
// add requireToken, and req.body.comment.owner = req.user.id
router.post('/comments/:blogId', removeBlanks, (req, res, next) => {
    // req.body.comment.owner = req.user.id
    const comment = req.body.comment
    const blogId = req.params.blogId

    Blog.findById(blogId)
        .populate('owner')
        .then(handle404)
        .then(blog => {
            // console.log('this is the blog', blog)
            // console.log('this is the comment', comment)

            blog.comments.push(comment)
            return blog.save()

        })
        // send the newly updated unit as json
        .then(blog => res.status(201).json({ blog: blog }))
        .catch(next)
})

// UPDATE a comment
// PATCH /comments/<blog_id>/<comment_id>
router.patch('/comments/:blogId/:commentId', requireToken, removeBlanks, (req, res, next) => {
    const blogId = req.params.blogId
    const commentId = req.params.commentId

    Blog.findById(blogId)
        .populate('owner')
        .then(handle404)
        .then(blog => {
            // vvv these are subdocument methods vvv
            // single out the comment (.id is a subdoc method to find something in an array of subdocs)
            const theComment = blog.comments.id(commentId)
            // make sure the user sending the request is the owner
            requireOwnership(req, blog)
            // update the comment with a subdocument method
            theComment.set(req.body.comment)
            // return the saved unit
            return blog.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DELETE a comment
// DELETE /comments/<blog_id>/<comment_id>
router.delete('/comments/:blogId/:commentId', requireToken, (req, res, next) => {
    // get the stat and the unit ids saved to variables
    const blogId = req.params.blogId
    const commentId = req.params.commentId
    // then we find the unit
    Blog.findById(blogId)
        // .populate('owner')
        // handle a 404
        .then(handle404)
        // do stuff with the stat (in this case, delete it)
        .then(blog => {
            // we can get the subdoc the same way as update
            const theComment = blog.comments.id(commentId)
            // require that the user deleting the stat is the unit's owner
            requireOwnership(req, blog)
            // call remove on the subdoc
            theComment.remove()

            // return the saved unit
            return blog.save()
        })
        // send 204 no content status
        .then(() => res.sendStatus(204))
        // handle errors
        .catch(next)
})

module.exports = router