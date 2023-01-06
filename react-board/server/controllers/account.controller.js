const model = require('../models/account.model');
const util = require("../commons/util");


exports.signUpSelect = async (req, res, next) => {
    const user_id = req.query.user_id;
    const result = await model.signUpSelect([user_id]);
    res.data = result;
    next();
}

exports.signUp = async (req, res, next) => {
    const user_id = req.body.user_id;
    const user_pw = req.body.user_pw;
    const data = await model.signUp([user_id, user_pw]);
    const result = await util.checkChanged(data);
    res.data = '가입 ' + result;
    next();
}

exports.login = async (req, res, next) => {
    const user_id = req.body.user_id;
    const user_pw = req.body.user_pw;
    const data1 = await model.idCheck([user_id]);
    const data2 = await model.pwCheck([user_id, user_pw]);
    const result = await util.checkAcount(data1, data2);
    res.data = result;
    // if(result1[0].res < 1) {
    //     res.data = '존재하지 않는 아이디입니다.';
    // } else {
    //     if(result2=='') {
    //         res.data = '비밀번호가 일치하지 않습니다.';
    //     } else{
    //         res.data = result2[0].USER_ID;
    //     }
    // }
    next();
}
