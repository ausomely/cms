const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin-controllers');
const { isUserAuthenticated } = require('../config/customFunctions');

router.all('/*', isUserAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
}); 

router.route('/').get(adminController.index);

router.route('/posts')
    .get(adminController.getPosts);
    

router.route('/posts/create')
    .get(adminController.createPostsGet)
    .post(adminController.submitPost);
    

router.route('/posts/edit/:id')
    .get(adminController.editPost)
    .put(adminController.editPostSubmit);

router.route('/posts/delete/:id')
    .delete(adminController.deletePost);


/* Admin Category Routes */
router.route('/category')
    .get(adminController.getCategories);

router.route('/category/create')
    .post(adminController.createCategories);

router.route('/category/edit/:id')
    .get(adminController.editCategoriesGetRoute)
    .post(adminController.editCategoriesPostRoute);

module.exports = router;