const db = require('../commons/db');
const query = require('../queries/comment.query');

exports.addComment = async (content, idx, regdate, user_id) => {
    await db(query.insertCommentSql, content, idx, regdate, user_id);
}

exports.commentSelect = async (idx) => {
    const result = await db(query.commentSelectSql, idx);
    return result;
}

exports.delete = async (cno) => {
    const result = await db(query.deleteSql, cno);
    return result;
}