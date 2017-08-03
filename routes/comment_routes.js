var express = require('express'),
    Camp = require('../models/camps'),
    Comment = require('../models/comments'),
    passport = require('passport'),
    router = express.Router();


// add comment to camp
// 
router.post('/camp/:id/comment/new', passport.authenticate('jwt', { session: false }), (req, res) => {


    let newComment = {
        text: req.body.text
    };
    // console.log("user is ", req.body);
    Camp.findById(req.params.id, (err, camp) => {
        if (err) {
            console.log(err);
        } else {

            Comment.create(newComment, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    // avail user name to corresponding comment 
                    comment.user.id = req.body.user._id;
                    comment.user.username = req.body.user.username;
                    // save the comment to db
                    comment.save();
                    // now push the newly created comment to Camps comments array
                    camp.comments.push(comment);
                    // save the camp to db
                    camp.save();
                    res.json({
                        sucess: true,
                        msg: "comment created",
                        camp: camp

                    });

                }
            });
        }
    });
});

//update a comment

router.put('/camp/:id/update_comment/:comment_id', (req, res) => {
    let updateComment = {
        text: req.body.text
    };
    console.log(req.body);
    Comment.findByIdAndUpdate(req.body.commentId, updateComment, (err, comment) => {
        if (err) {
            console.log(err);
            res.json({
                err: err
            });
        } else {
            res.json({
                sucess: true,
                msg: "comment updated",
                comment: comment

            });
        }
    });
});

//delete comment
router.delete("/camp/:id/delete_comment/:comment_id", (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err, comment) => {
        if (err) {
            res.json({
                sucess: false,
                msg: "something is wrong can't delete"


            });
        } else {
            res.json({
                sucess: true,
                msg: "comment deleted"

            });
        }
    });
});







module.exports = router;