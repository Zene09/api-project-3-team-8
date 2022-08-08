const express = require('express')
const passport = require('passport')

// pull in Mongoose model for blogs
const Blog = require('../models/blog')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

// POST -> create a like
// POST /blogs/<like_id>
router.post('/likes/:blogId', removeBlanks, (req, res, next) => {
    const like = req.body.like
    const blogId = req.params.blogId

    Blog.findById(blogId)
        .then(handle404)
        .then(blog => {
            // console.log('this is the blog', blog)
            // console.log('this is the like', like)

            blog.amount.push(amount)
            return blog.save()

        })
        // send the newly updated unit as json
        .then(blog => res.status(201).json({ blog: blog }))
        .catch(next)
})

// UPDATE a like
// PATCH /likes/<blog_id>/<like_id>
router.patch('/likes/:blogId/:likeId', requireToken, removeBlanks, (req, res, next) => {
    const blogId = req.params.blogId
    const likeId = req.params.likeId

    Blog.findById(blogId)
        .then(handle404)
        .then(blog => {
            // vvv these are subdocument methods vvv
            // single out the like (.id is a subdoc method to find something in an array of subdocs)
            const theLike = blog.likes.id(likeId)
            // make sure the user sending the request is the owner
            requireOwnership(req, blog)
            // update the like with a subdocument method
            theLike.set(req.body.like)
            // return the saved unit
            return blog.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DELETE a like
// DELETE /likes/<blog_id>/<like_id>
router.delete('/likes/:blogId/:likeId', requireToken, (req, res, next) => {
    // get the stat and the unit ids saved to variables
    const blogId = req.params.blogId
    const likeId = req.params.likeId
    // then we find the unit
    Blog.findById(blogId)
        // handle a 404
        .then(handle404)
        // do stuff with the stat (in this case, delete it)
        .then(blog => {
            // we can get the subdoc the same way as update
            const theLike = blog.likes.id(likeId)
            // require that the user deleting the stat is the unit's owner
            requireOwnership(req, blog)
            // call remove on the subdoc
            theLike.remove()

            // return the saved unit
            return blog.save()
        })
        // send 204 no content status
        .then(() => res.sendStatus(204))
        // handle errors
        .catch(next)
})

module.exports = router