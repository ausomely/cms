const Post = require('../models/PostModel');

module.exports = {
    index: (req, res) => {
        res.render('admin/index');
    },

    getPosts: (req, res) => {
        Post.find().lean().then(post => {
            res.render('admin/posts/index', {posts: post});
        });
    },

    submitPost: (req, res) => {
        const commentsAllowed = req.body.allowedComments ? true : false;

        const newPost = new Post({
            title: req.body.title,
            status: req.body.status,
            description: req.body.description,
            allowComments: commentsAllowed
        });

        newPost.save().then(post => {
           console.log(post); 
           req.flash('success-message', 'Post created successfully');
           res.redirect('/admin/posts');
        });
    },

    createPost: (req, res) => {
        res.render('admin/posts/create');
    },

    editPost: (req, res) => {
        const id = req.params.id;
        Post.findById(id).then(post => {
            res.render('admin/posts/edit', {post: post});
        });
    }
};