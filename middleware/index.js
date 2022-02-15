const Post = require("../models/post");
const Comment = require("../models/comment");

//all the middleware goes here
var middlewareObject = {};

middlewareObject.checkPostOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Post.findById(req.params.id, (err, foundPost) => {
            if(err){
                res.redirect("back");
            }else{
                //does user own the post checking
                if(foundPost.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });
    }else{
        res.redirect("back");
    }
};

middlewareObject.checkCommentOwenership = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err){
                res.redirect("back");
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });
    }else{
        res.redirect("back");
    }
};

middlewareObject.isLoggedIn = function (req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = middlewareObject;