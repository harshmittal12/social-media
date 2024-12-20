import Post from "../models/Post.js"
import User from "../models/User.js";

// CREATE
export const createPost = async (req, res) => {
    try {
        const {userId, description, picturePath} = req.body;
        const user = await User.findById(userId);
        
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            picturePath,
            userPicturePath: user.picturePath,
            likes: {},
            comments: []
        });
        await newPost.save();
        
        const allPosts = await Post.find();
        res.status(201).json(allPosts);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

// READ
export const getFeedPosts = async (req, res) => {
    try{
        const allPosts = await Post.find();
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const {userId} = req.params;
        const userPosts = await Post.find({userId});
        res.status(200).json(userPosts);
    } catch (error) {
        res.status(404).json({message: error.message});
    }   
}

// UPDATE
export const likePost = async (req, res) => {
    try {
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        if(post.likes.has(userId)) post.likes.delete(userId);
        else post.likes.set(userId, true);
        const updatedPost = await Post.findByIdAndUpdate(
            id, 
            {likes: post.likes}, 
            {new: true}
        )
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}