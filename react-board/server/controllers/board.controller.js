const model = require('../models/board.model');
const util = require("../commons/util");
const multer = require("multer");

exports.boardSelect = async (req, res, next) => {
    const result = await model.boardSelect();
    res.data = result;
    next();
}

exports.viewCount = async (req, res, next) => {
    const idx = req.body.idx
    model.viewCount([idx]);
}

exports.detailSelect = async (req, res, next) => {
    const idx = req.query.idx;
    const result = await model.detailSelect([idx]);
    res.data = result;
    next();
}

exports.update = async (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const imgsrc = req.body.imgsrc;
    const idx = req.body.idx;
    const data = await model.update([title, content, imgsrc, idx]);
    const result = await util.checkChanged(data);
    res.data = '수정 ' + result;
    next();
}

exports.delete = async (req, res, next) => {
    const idx = req.body.idx;
    const data = await model.delete([idx]);
    const result = await util.checkChanged(data);
    res.data = '삭제 ' + result;
    next();
}

exports.insert = async (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const user_id = req.body.user_id;
    const imgsrc = req.body.imgsrc;
    const cdate =  new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
    const viewcount = 0;
    const data = await model.insert([title, content, user_id, imgsrc, cdate, viewcount]);
    const result = await util.checkChanged(data);
    res.data = '등록 ' + result;
    next();
}