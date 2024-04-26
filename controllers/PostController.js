import PostModel from '../models/Post.js';

// function for get all posts
export const getAll = async (req, res) => {
  try {
    // exec query to db 
    const posts = await PostModel.find().populate('user').exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Filed to get posts",
    })
  }
};

// function for get one post by id 
export const getOne = async (req, res) => {
  try {
    // get post id and document by it id. 
    // inc viewsCount, return document after increment
    const postId = req.params.id;
    const doc = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      }, 
      {
        $inc: {'viewsCount': 1},
      },
      {
        new: true,
      },
    );
    // check document
    if (!doc) {
      return res.status(404).json({
        message: "Can't fine post",
      });
    }

    res.json(doc);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
       message: "Cannot open post",
    });
  }
};

// function for delete post by id
export const removePost = async (req, res) => {
  try {
    const postId = req.params.id
    const doc = await PostModel.findOneAndDelete({
      _id: postId,
    });
    if (!doc) {
      return res.status(404).json({
        message: "Cannot find file",
      });
    }

    res.json({
      message: "post removed",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Filed to remove post",
    });
  }
};

// function for create post 
export const createPost = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "filed to create post",
    });
  }
};

// function for update post 
export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      },
    );

    res.json({
      message: "post updated",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Cannot update post",
    });
  }
};
