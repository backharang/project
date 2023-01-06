module.exports = function(server){
    const express = require('express');
    const route = express.Router();
    const multer = require("multer");
    const fs = require('fs');
    
    const controller = require('../controllers/board.controller');

    server.get("/getBoard", 
        controller.boardSelect,
        (req, res) => {
            res.send(res.data);
        }
    );

    server.get('/getUpdate',
        controller.updateSelect,
        (req, res) => {
            res.send(res.data);
        }
    );

    server.post('/onUpdate',
        controller.update,
        (req, res) => {
            res.send(res.data);
        }
    );

    server.post('/delete',(req, res, next) => {
        if(req.body.imgsrc != null){
            fs.unlink('D:/express/react-board/server/public/image/'+req.body.imgsrc, err => {
                if (err) throw err;
            })
        }
        next();
    },
        controller.delete,
        (req, res) => {
            res.send(res.data);
        }
    );

    server.post('/insert',
        controller.insert,
        (req, res) => {
            res.send(res.data);
        }
    );

    let fn;

    let storage = new multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "D:/express/react-board/server/public/image/");
        },
        filename: function (req, file, cb) {
            fn = Date.now().toString().slice(0,24)+'.png';
            cb(null, fn);
        },
    });

    let upload = multer({ storage: storage});

    server.post('/upload', 
        upload.single("img"),
        (req, res) => {
            res.send(fn);
        }
    );

    server.post('/deleteImg', (req, res) => {
        fs.unlink('D:/express/react-board/server/public/image/'+req.body.original, err => {
            if (err) throw err;
        })
    })
    return route;
}