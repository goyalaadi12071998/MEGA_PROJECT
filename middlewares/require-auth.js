module.exports = function(req, res, next) {
    if(!req.session || !req.session){
        return res.status(403).send({message: 'Authentication Required'});
    }
    console.log(req.session);
    next();
}