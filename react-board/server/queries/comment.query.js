exports.insertCommentSql = "INSERT INTO reply (content, idx, regdate, user_id) VALUES (?,?,?,?)";

exports.commentSelectSql = "SELECT * FROM reply where idx=? ORDER BY cno DESC";

exports.deleteSql = "delete from reply where cno=?";