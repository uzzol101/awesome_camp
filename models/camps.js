var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var postSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
    // referrence modeling
    user: {
        id: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    // referrence modeling
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
});


var Post = mongoose.model("Post", postSchema);

module.exports = Post;