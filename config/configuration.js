module.exports = {
    mongoDBUrl: 'mongodb://localhost:27017/cms',
    PORT: process.env.PORT || 3000,
    globalVars: (req, res, next) => {
        res.locals.success_message = req.flash('success-message');
        res.locals.error_message = req.flash('error-message');
        next();
    }
}