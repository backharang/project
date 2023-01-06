module.exports = function(server){
    const express = require('express');
    const route = express.Router();

    const controller = require('../controllers/account.controller');

    server.get('/getSignUp',
        controller.signUpSelect,
        (req, res) => {
            res.send(res.data);
        }
    );

    server.post('/onSignUp',
        controller.signUp,
        (req, res) => {
            res.send(res.data);
        }
    );

    server.post('/onLogin',
        controller.login,
        (req, res) => {
            res.send(res.data);
        }
    );
    return route;
}