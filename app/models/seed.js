const mongoose = require('mongoose')
const Blog = require('./blog')
const db = require('../../config/db')

const startBlogs = [
    { 
        title: 'My trip to Japan', 
        body: 'I went to Japan. I ate Japanese food. My favorite place was Kyoto. I really enjoyed using the onsen. I could use it all day. We stopped by the Nishiki fish market. I have never had such fresh fish in my life. We also visited Gion Corner, we got to see geishas walking around and perform. I would recommend a trip here to anyone.', 
    },
    {
        title: 'We went to Thailand',
        body: 'We visited Thailand this summer. It was full of temples and other historic sites. One temple was built into the mountain, and had a million steps. It hurt my knees. Their curry was the greatest. I would recommend a trip here to anyone with strong knees.',
    },
    {
        title: 'Today was terrible!',
        body: 'I just had the worst experience at AMC! The floor was sticky and my corn wasn\'t popped! I\'ll never come back here again.',
    },
    {
        title: 'Just got promoted',
        body: 'Wow I just got promoted.',
    },
    {
        title: 'Top 10 reasons to wear glasses.',
        body: '#1 They help you see things clearly. #2 They make you appear intelligent. #3 My parents said they make me look handsome. #4 Modern lenses have coatings to protect your eyes from blue light, perfect for heavy computer users. #5 They are a fun fashion accessory. #6 etc #7 etc #8 etc #9 etc #10 etc.',
    },

]

const startUser = {
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
}

mongoose.connect(db, {
    useNewUrlParser: true
})
    // .then -> create user -> then assign owner to blogs
        // User.create({
        //     schema schema
        // })
    .then(() => {
        Blog.deleteMany({ owner: null })
            .then(deletedBlogs => {
                // console.log('deletedBlogs', deletedBlogs)
                Blog.create(startBlogs)
                    .then(newBlogs => {
                        // console.log('the new blogs', newBlogs)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log(error)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                conole.log(error)
                mongoose.connection.close()
            })
    })
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
})