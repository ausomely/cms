const Post = require('../models/PostModel');
const Category = require('../models/CategoryModel');
const { isEmpty } = require('../config/customFunctions');

module.exports = {
    index: (req, res) => {
        res.render('admin/index');
    },

    /* ALL POST METHODS */

    getPosts: (req, res) => {
        Post.find().lean()
            .populate('category')
            .then(post => {
            res.render('admin/posts/index', {posts: post});
        });
    },

    createPostsGet: (req, res) => {
        Category.find().lean().then(cats => {
            res.render('admin/posts/create', {categories: cats});
        });

    },

    submitPost: (req, res) => {
        const commentsAllowed = req.body.allowComments ? true : false;
        // Check for any input file
        let filename = '';
        if (!isEmpty(req.files)) {
            let file = req.files.uploadedFile;
            filename = file.name;
            let uploadDir = './public/uploads/';

            file.mv(uploadDir+filename, (error) => {
                if (error) {
                    throw error;
                }
            });

        }

        const newPost = new Post({
            title: req.body.title,
            status: req.body.status,
            description: req.body.description,
            allowComments: commentsAllowed,
            category: req.body.category,
            file: `/uploads/${filename}`
        });

        newPost.save().then(post => {
           console.log(post); 
           req.flash('success-message', 'Post created successfully');
           res.redirect('/admin/posts');
        });
    },

    editPost: (req, res) => {
        const id = req.params.id;
        Post.findById(id)
            .then(post => {
                Category.find().then(cats => {
                    res.render('admin/posts/edit', {post: post, categories: cats});
                });

        });
    },

    editPostSubmit: (req, res) => {
        const commentsAllowed = req.body.allowComments ? true : false;
        const id = req.params.id;
        Post.findById(id)
            .then(post => {
                post.title = req.body.title;
                post.status = req.body.status;
                post.allowComments = Boolean(req.body.allowComments);
                post.description = req.body.description;
                post.category = req.body.category;

                post.save().then(updatePost => {
                    req.flash('success-message', `The Post ${updatePost.title} has been updated.`);
                    res.redirect('/admin/posts');
                });
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
    },

    createCategories: (req, res) => {
        var categoryName = req.body.name;
        
        if (categoryName) {
            const newCategory = new Category({
                title: categoryName
            });
            newCategory.save().then(category => {
                res.status(200).json(category);
            });
        }
    },

    editCategoriesGetRoute: async (req, res) => {
        const catId = req.params.id;
        const cats = await Category.find();

        Category.findById(catId).then(cat => {
            res.render('admin/category/edit', {category: cat, categories: cats});
        })

    },

    editCategoriesPostRoute: (req, res) => {
        const catId = req.params.id;
        const newTitle = req.body.name;

        if(newTitle) {
            Category.findById(catId).then(cat => {
                cat.title = newTitle;
                cat.save().then(updated => {
                    res.status(200).json({url: '/admin/category'});
                })
            })
        }
    }
};