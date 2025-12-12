import { Post } from "../models/post.model.js";
// Note: In a real app, you would use Cloudinary here to upload the file and get a URL.
// For now, we assume the file URL is passed or handled locally.

// Replaces: createPost
const createPost = async (req, res) => {
    const { title, slug, content, status } = req.body;
    
    // If using Multer, file is available at req.file
    // For this example, let's assume we uploaded it and got a path
    const featuredImage = req.file ? req.file.path : ""; 

    const post = await Post.create({
        title,
        slug,
        content,
        featuredImage,
        status,
        userId: req.user._id // Taken from verifyJWT middleware
    });

    return res.status(201).json(post);
};

// Replaces: updatePost
const updatePost = async (req, res) => {
    const { slug } = req.params;
    const { title, content, status } = req.body;
    
    // Find post by slug and update
    const post = await Post.findOneAndUpdate(
        { slug }, 
        { 
            $set: { title, content, status }
            // Note: Handle image update logic if req.file exists
        },
        { new: true } // Returns the updated document
    );

    return res.status(200).json(post);
};

// Replaces: deletePost
const deletePost = async (req, res) => {
    const { slug } = req.params;
    await Post.findOneAndDelete({ slug });
    return res.status(200).json({ message: "Post deleted successfully" });
};

// Replaces: getPost
const getPost = async (req, res) => {
    const { slug } = req.params;
    const post = await Post.findOne({ slug });
    if (!post) return res.status(404).json({ message: "Post not found" });
    return res.status(200).json(post);
};

// Replaces: getPosts
const getPosts = async (req, res) => {
    // Default to active posts
    const posts = await Post.find({ status: "active" });
    return res.status(200).json(posts);
};

export { createPost, updatePost, deletePost, getPost, getPosts };
