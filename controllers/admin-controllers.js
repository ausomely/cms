module.exports = {
    index: (req, res) => {
        res.render('admin/index');
    },

    getPosts: (req, res) => {
        res.send('All Posts');
    },

    submitPost: (req, res) => {
        res.send('Post Submitted');
    },

    createPost: (req, res) => {
        res.render('admin/posts/create');
    }
};