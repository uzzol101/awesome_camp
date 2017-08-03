var express = require('express'),
    Camp = require('../models/camps'),
    Comment = require('../models/comments'),
    passport = require('passport'),
    router = express.Router();

// passport.authenticate('jwt', { session: false }),
// create new  camp
router.post('/camp/new', passport.authenticate('jwt', { session: false }), (req, res) => {
    let newCamp = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,

    };



    // to see req.user you have to first protect the route using passport
    Camp.create(newCamp, (err, camp) => {
        if (err) {
            res.json({
                success: false,
                msg: "can't create new camp something went wrong"
            });
        } else {
            // set username for the postowner
            camp.user.id = req.user._id;
            camp.user.username = req.user.username;

            // save the camp to db
            camp.save()
            res.json({
                success: true,
                msg: "New camp created",
                camp: camp
            });
        }
    });

});

// get all camp 
router.get("/camp/all", (req, res) => {
    Camp.find({}, (err, allCamp) => {
        if (err) {
            res.json({
                success: true,
                msg: err
            });
        } else {
            res.json(allCamp);
        }
    });
});

// view cmap detials
router.get('/camp/details/:id', (req, res) => {
    // populate Camps comments array and pull out all comments for this post
    Camp.findById(req.params.id).populate("comments").exec((err, detailCamp) => {
        if (err) {
            console.log(err);
        } else {
            res.json(detailCamp);
        }
    });
});

//update camp data
router.put('/camp/update/:id', (req, res) => {
    let update = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    };
    Camp.findByIdAndUpdate(req.params.id, update, (err, camp) => {
        if (err) {
            res.json({
                success: true,
                msg: err
            });
        } else {
            res.json({
                success: true,
                msg: "Camp updated successfuly",
            });
        }
    });
});

// delete specific camp
router.delete('/camp/delete/:id', (req, res) => {
    Camp.findByIdAndRemove(req.params.id, (err, removed) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                success: true,
                mgs: "camp deleted"
            });
            // res.redirect('/camp/all');
        }
    });
});

module.exports = router;

// Camp.remove({}, (err, success) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("database cleared");
//     }
// });