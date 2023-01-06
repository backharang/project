exports.boardSelectSql = "SELECT * FROM simpleboard order by idx desc";

exports.updateSelectSql = "SELECT * FROM simpleboard where idx=?";

exports.updateSql = "UPDATE simpleboard set title=?, content=?, imgsrc=? where idx=?";

exports.deleteSql = "delete from simpleboard where idx=?";

exports.insertSql = "INSERT INTO simpleboard (title, content, user_id, imgsrc) VALUES (?,?,?,?)";
