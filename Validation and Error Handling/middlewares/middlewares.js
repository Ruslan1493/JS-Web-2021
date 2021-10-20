function isAuthenticated(req, res, next) {
    if (!req.isUser) {
        res.redirect('/');
    }else{
        next();
    }
};

module.exports = {
    isAuthenticated
};