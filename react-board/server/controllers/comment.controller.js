const model = require('../models/comment.model');
const util = require("../commons/util");

exports.addComment = async (req, res, next) => {
    const content = req.body.content;
    const idx = req.body.idx;
    const regdate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
    const user_id = req.body.user_id;
    model.addComment([content, idx, regdate, user_id]);
}

exports.commentSelect = async (req, res, next) => {
    const idx = req.query.idx;
    const result = await model.commentSelect([idx]);
    res.data = result;
    next();
}

exports.delete = async (req, res, next) => {
    const cno = req.body.cno;
    const data = await model.delete([cno]);
    const result = await util.checkChanged(data);
    res.data = '삭제 ' + result;
    next();
}