const Post = require('../models/PostModel');
const Category = require('../models/CategoryModel');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

module.exports = {
    index: async (req, res) => {
        const posts = await Post.find();
        const categories = await Category.find();

        res.render('default/index', {posts: posts, categories: categories});
    },

    loginGet: (req, res) => {
        res.render('default/login');
    },

    loginPost: (req, res) => {
        res.send('Data has been successfully been submitted.');
    },

    registerGet: (req, res) => {
        res.render('default/register');
    },

    registerPost: (req, res) => {
        let errors = [];

        if(!req.body.firstName) {
            errors.push({message: 'First name is mandatory'});
        }
        if(!req.body.lastName) {
            errors.push({message: 'Last name is mandatory'});
        }
        if(!req.body.email) {
            errors.push({message: 'Email field is mandatory'});
        }
        if(req.body.password != req.body.passwordConfirmation) {
            errors.push({message: 'Passwords do not match'});
        }

        if (errors.length > 0) {
            res.render('default/register', {
                errors: errors,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            });
        } else {
            User.find({email: req.body.email}).limit(1).exec(user => {
                if (user) {
                    req.flash('error-message', 'Email already exists, try to login.');
                    res.redirect('/login');
                } else {
                    const newUser = new User(req.body);

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            newUser.password = hash;

                            newUser.save().then(user => {
                                req.flash('success-message', 'You are now registered');
                                res.redirect('/login');
                            });
                        });
                    });
                }
            });
        }
    }
};