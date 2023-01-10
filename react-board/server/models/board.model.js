const db = require('../commons/db');
const query = require('../queries/board.query');

exports.boardSelect = async () => {
    const result = await db(query.boardSelectSql);
    return result;
}

exports.viewCount = async (idx) => {
    await db(query.viewCountSql, idx);
}

exports.detailSelect = async (idx) => {
    const result = await db(query.detailSelectSql, idx);
    return result;
}

exports.update = async (title, content, imgsrc, idx) => {
    const result = await db(query.updateSql, title, content, imgsrc, idx);
    return result;
}

exports.delete = async (idx) => {
    const result = await db(query.deleteSql, idx);
    return result;
}

exports.insert = (title, content, user_id, imgsrc, cdate, viewcount) => {
    const result = db(query.insertSql, title, content, user_id, imgsrc, cdate, viewcount);
    return result;
}