const express = require('express');
const Posts = require('../models/posts');
const router = express.Router();

//save posts
router.post('/post/save', (req, res) => {
    let newPost = new Posts(req.body);
    newPost.save()
        .then(() => {
            return res.status(200).json({
                success: "Post saved successfully"
            })
        })
        .catch(err => {
            return res.status(400).json({
                error: err
            });
        })
});

//get posts
router.get('/posts', (req, res) => {
    Posts.find().exec()
        .then((response) => {
            return res.status(200).json({
                success: true,
                existingPosts: response
            });
        })
        .catch(err => {
            return res.status(400).json({
                error: err
            });
        });
});

//update post
router.put('/post/update/:id', (req, res) => {
    Posts.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        }
    ).then(() => {
        return res.status(200).json({
            success: "Updated successfully",
        });
    })
        .catch(err => {
            return res.status(400).json({
                error: err
            });
        });
});

//delete post
router.delete('/post/delete/:id', (req, res) => {
    Posts.findByIdAndRemove(req.params.id).exec()
        .then((response) => {
            return res.status(200).json({
                success: "Deleted successfully",
                response
            });
        })
        .catch(err => {
            return res.status(400).json({
                message: "Delete unsuccessful",
                error: err
            })
        });
})

//get a specific post
router.get('/post/:id', (req, res) => {
    let postId = req.params.id;
    Posts.findById(postId)
        .then((post) => {
            return res.status(200).json({
                success: true,
                post
            });
        })
        .catch((error) => {
            return res.status(400).json({
                success: false,
                error
            })
        });
})

module.exports = router;