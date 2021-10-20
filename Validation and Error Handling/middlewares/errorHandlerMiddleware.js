
exports.defaultError = function(error, req, res, next) {
    if (error) {
        console.log(error);
        res.redirect('404');
    } 
};