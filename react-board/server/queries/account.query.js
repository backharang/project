exports.signUpSelectSql = "SELECT * FROM user_inform where user_id=?";

exports.signUpInsertSql = "INSERT INTO user_inform (user_id, user_pw) VALUES (?,?)";

exports.idCheck = "SELECT COUNT(*) AS res FROM user_inform WHERE user_id = ?";

exports.pwCheck = "SELECT USER_ID FROM USER_INFORM WHERE user_id = ? AND user_pw = ?";
