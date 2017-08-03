var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),

    session = require('express-session'),
    cors = require('cors'),
    User = require('./models/users'),

    Comment = require('./models/comments'),
    userAuth = require('./routes/auth'),
    camp_route = require("./routes/camp_routes"),
    comment_route = require("./routes/comment_routes"),
    app = express();

// port 
const port = process.env.PORT || 3000;

// database config
mongoose.connect('mongodb://127.0.0.1/mean_camp');
var db = mongoose.connection;
db.once('open', () => {
    console.log("Database is online");
});

// express config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "content-Type,Authorization");
    next();
});

// passport config
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {

    done(null, user.id);

});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);

    });
});

//paspport jwt

app.get('/', (req, res) => {
    // res.send("App Started");
    res.json({
        user: "user"
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});
// app.get('/welcome', (req, res) => {
//     res.render('welcome');
// });

// =================== ROUTES ==================
// user authentication
app.use(userAuth);
app.use(camp_route);
app.use(comment_route);


app.listen(port, () => {
    console.log("server listening at port", port);
});



// test the schema

// User.create({
//     name: "sathi",
//     username: "uzzol101",
//     email: 'uzzol101@gmail.com',
//     password: '123'

// }, (err, user) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("user created", user);
//     }
// });
// Post.create({
//     name: 'post tow',
//     image: 'nice image here fine',
//     description: 'I love posting too'
// }, (err, post) => {
//     if (err) {
//         console.log(err);
//     } else {
//         Comment.create({
//             text: 'second comment'
//         }, (err, comment) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 post.comments.push(comment);
//                 post.save();

//                 console.log("post created with 2nd comments", post);
//             }
//         });

//     }
// });


// Comment.find({}, (err, found) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(found);
//     }
// });
// User.find({}, (err, found) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('user found', found);
//     }
// });
// Comment.remove({}, (err, success) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("database cleared");
//     }
// });