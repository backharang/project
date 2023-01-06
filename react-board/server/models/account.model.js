const db = require('../commons/db');
const query = require('../queries/account.query');

exports.signUpSelect = async (user_id) => {
    const result = await db(query.signUpSelectSql, user_id);
    return result;
}

exports.signUp = async (user_id, user_pw) => {
    const result = await db(query.signUpInsertSql, user_id, user_pw);
    return result;
}

exports.idCheck = async (user_id) => {
    const result = await db(query.idCheck, user_id);
    return result;
}

exports.pwCheck = async (user_id, user_pw) => {
    const result = await db(query.pwCheck, user_id, user_pw);
    return result;
}
