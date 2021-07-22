const Post = require('../models/PostModel');
const Category = require('../models/CategoryModel');

module.exports = {
    index: (req, res) => {
        res.render('admin/index');
    },

    /* ALL POST METHODS */

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
    },

    deletePost: (req, res) => {
        Post.findByIdAndDelete(req.params.id)
            .then(deletedPost => {
                req.flash('success-message', `The post ${deletedPost.title} has been deleted.`);
                res.redirect('/admin/posts');
            });
    },

    /* ALL CATEGORY METHODS */
    
    getCategories: (req, res) => {
        Category.find().lean().then(cats => {
            res.render('admin/category/index', {categories: cats});
        });
    }
};