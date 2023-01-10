exports.boardSelectSql = "SELECT idx, title, user_id, imgsrc, cdate, viewcount FROM simpleboard order by idx desc";

exports.viewCountSql = "update simpleboard set viewcount=viewcount+1 where idx=?";

exports.detailSelectSql = "SELECT * FROM simpleboard where idx=?";

exports.updateSql = "UPDATE simpleboard set title=?, content=?, imgsrc=? where idx=?";

exports.deleteSql = "delete from simpleboard where idx=?";

exports.insertSql = "INSERT INTO simpleboard (title, content, user_id, imgsrc, cdate, viewcount) VALUES (?,?,?,?,?,?)";
