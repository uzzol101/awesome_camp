var express = require('express'),
    User = require('../models/users'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    passport = require('passport'),
    router = express.Router();

// passport jwt 
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = 'secret';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    // console.log(jwt_payload);

    User.findById({ _id: jwt_payload._doc._id }, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);


        } else {
            done(null, false);
            // or you could create a new account 
        }
    });
}));



// new user registration
router.post('/register', (req, res) => {
    let newUser = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    User.create(newUser, (err, userCreaeted) => {
        if (err) {
            let str = err.errmsg;
            // match only $email or $username from text $email_1 or $username_1;
            let reg = str.match(/(\$\w.[^_]*)/)[1];
            // replce the leading $ sign with empty space
            // output something like email or username
            var holderText =
                reg.replace(/^(\$)/, "");
            // if error  send this information to client side so they can know the cause of it
            res.json({
                success: false,
                msg: `this ${holderText} is already taken try another`
            });
        } else {

            bcrypt.hash(userCreaeted.password, 10, function(err, hash) {
                userCreaeted.password = hash;
                userCreaeted.save();
                //  send this information to client side
                res.json({
                    success: true,
                    msg: "user registration successful",
                    user: userCreaeted
                });

            });

        }
    });

});

// user login 
router.post('/login', (req, res) => {
    let oldUser = {
        username: req.body.username,
        password: req.body.password
    };

    // find if the requested user exist in db
    User.findOne({ username: oldUser.username }, (err, foundUser) => {
        if (err) {
            console.log(err);

        } else {
            // if user existed verify the password
            if (foundUser) {
                bcrypt.compare(oldUser.password, foundUser.password, function(err, matched) {
                    if (matched) {
                        var token = jwt.sign(foundUser, opts.secretOrKey);
                        res.json({
                            success: true,
                            msg: "You are now logged in",
                            token: "JWT " + token,
                            user: {
                                _id: foundUser._id,
                                name: foundUser.name,
                                username: foundUser.username,
                                email: foundUser.email
                            }
                        });
                        // res.redirect('/welcome');
                    } else {
                        res.json({
                            success: false,
                            msg: "Wrong password"
                        });
                    }

                });
            } else {
                //you are here because username not found
                res.json({
                    sucess: true,
                    msg: "User name not found",

                });
            }



        }
    });
});

// update user password
router.put('/user/update_password/:id', (req, res) => {
    var changePass = req.body.password;
    // if user does not enter new password

    if (!changePass.trim()) { // trim() remove empty space if there are any
        // user does not changed the password
        console.log("password not modified");
    } else {
        // user changed the password so hash it and save to db
        bcrypt.hash(changePass, 10, function(err, hash) {
            changePass = hash;


            User.findByIdAndUpdate(req.params.id, { "$set": { "password": changePass } }, (err, user) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json({
                        success: true,
                        msg: "password changed"
                    });

                }
            });
        });
    }

});

// update users info
router.put('/user/update/:id', (req, res) => {
    var update = {
        name: req.body.name

    };



    User.findById(req.params.id, (err, updated) => {
        if (err) {
            console.log(err);
        } else {
            updated.name = update.name
            updated.save();

            res.json(updated);
        }
    });
});

module.exports = router;

// User.find({}, (err, user) => {
//     console.log(user);
// });