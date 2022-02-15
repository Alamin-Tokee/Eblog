const router = require("express").Router({mergeParams: true});
const Post = require("../models/post");
const Comment = require("../models/comment");
const middleware = require("../middleware");
const comment = require("../models/comment");


router.get("/new", middleware.isLoggedIn, (req, res)=>{
    //Find post by id
    Post.findById(req.params.id, (err, post) => {
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", { post: post});
        }
    });
});


router.post("/", middleware.isLoggedIn, (req, res)=>{
    //lookup for post using id
    Post.findById(req.params.id, (err, post)=>{
        if(err){
            console.log(err);
            res.redirect("/posts");
        }else{
            Comment.create(req.body.comment, (err, comment) => {
                if(err){
                    console.log(err);
                }else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment 
                    comment.save();
                    post.comments.push(comment);
                    post.save();
                    res.redirect("/posts/" + post._id);
                }
            });
        }
    });
});

//Edit Comment 
router.get("/:comment_id/edit", middleware.checkCommentOwenership, (req, res)=>{
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit", {post_id: req.params.id, comment: foundComment});
        }
    });
});

//Comment update
router.put("/:comment_id", middleware.checkCommentOwenership, (req, res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if(err){
            console.log("here");
            res.redirect("back");
        }else{
            res.redirect("/posts/" + req.params.id);
        }
    });
});

//Comment Destroy route
router.delete("/:comment_id", middleware.checkCommentOwenership, (req, res)=>{
    Comment.findByIdAndDelete(req.params.comment_id, (err) => {
        if(err){
            res.redirect("/posts/" + req.params.id);
        }else{
            res.redirect("/posts/" + req.params.id);
        }
    });
});


module.exports = router;