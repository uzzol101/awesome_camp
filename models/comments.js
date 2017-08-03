var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
commnetSchema = new Schema({
    text: { type: String, required: true },
    // referrence modeling
    user: {
        id: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

var Comment = mongoose.model("Comment", commnetSchema);
module.exports = Comment;