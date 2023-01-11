module.exports = function(server){
    const express = require('express');
    const route = express.Router();
    
    const controller = require('../controllers/comment.controller');
    
    server.post("/addComment", 
        controller.addComment
    );
    
    server.get('/getComment',
        controller.commentSelect,
        (req, res) => {
            res.send(res.data); 
        }
    );

    server.post('/deleteComment',
        controller.delete,
        (req, res) => {
            res.send(res.data);
        }
    );

    return route;
}