import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, // Store the User's ID
        ref: "User", // Reference the 'User' model
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
})

const Post = mongoose.model('Post', PostSchema);

export default Post;