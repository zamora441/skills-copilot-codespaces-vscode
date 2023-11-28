//Create web server
const express = require('express');
const app = express();
const db = require('./db');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Get all comments
app.get('/api/comments', async (req, res) => {
    const comments = await db.getComments();
    res.send(comments);
});

//Get comment by id
app.get('/api/comments/:id', async (req, res) => {
    const comment = await db.getCommentById(req.params.id);
    if (comment) {
        res.send(comment);
    } else {
        res.status(404).send({ error: 'Comment not found' });
    }
});

//Create comment
app.post('/api/comments', async (req, res) => {
    const comment = await db.createComment(req.body);
    res.send(comment);
});

//Update comment
app.put('/api/comments/:id', async (req, res) => {
    const comment = await db.updateComment(req.params.id, req.body);
    res.send(comment);
});

//Delete comment
app.delete('/api/comments/:id', async (req, res) => {
    await db.deleteComment(req.params.id);
    res.send({ message: 'Comment deleted' });
});

//Get all comments for a post
app.get('/api/posts/:id/comments', async (req, res) => {
    const comments = await db.getCommentsByPostId(req.params.id);
    res.send(comments);
});

//Get all comments by a user
app.get('/api/users/:id/comments', async (req, res) => {
    const comments = await db.getCommentsByUserId(req.params.id);
    res.send(comments);
});

//Get all comments for a comment
app.get('/api/comments/:id/comments', async (req, res) => {
    const comments = await db.getCommentsByCommentId(req.params.id);
    res.send(comments);
});

app.listen(3002, () => console.log('Listening on port 3002...'));