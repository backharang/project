const express = require('express');
const server = express();
const cors = require('cors');
const path = require('path');
const PORT = 8000;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/static', express.static('public'));
server.use(express.static(path.join(__dirname, '../client/build')));
    
require("./routes/account.route.js")(server);
require("./routes/board.route.js")(server);
require("./routes/comment.route.js")(server);

server.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`);
});

server.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

// const express = require('express');
// const app = express();
// // const mysql = require('mysql');
// const cors = require('cors');
// // const bodyParser = require('body-parser');
// // const {urlencoded} = require('body-parser');
// const PORT = process.env.port || 8000;

// const controller = require('./controllers/controller.js');

// // const db = mysql.createPool({
// //     host: "localhost",
// //     user: "root",
// //     password: "1234",
// //     database: "sakila"
// // });

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: ture }));

// // app.get("/board/get", (req, res)=>{
// //     const sqlQuery = "SELECT * FROM simpleboard order by idx desc";
// //     db.query(sqlQuery, (err, result)=>{
// //         res.send(result);
// //     });
// // });

// app.get("/board/get", 
//   controller.boardSelect,
//   (req, res) => {
//     res.send(res.data);
// });

// // app.get("/update/get", (req, res)=>{
// //     const idx = req.query.idx;
// //     const sqlQuery = "SELECT * FROM simpleboard where idx=?";
// //     db.query(sqlQuery, [idx], (err, result)=>{
// //         res.send(result);
// //     });
// // });

// app.get('/update/get',
//   (req, res, next) => {
//     const idx = req.query.idx;
//     next();
//   },
//   controller.updateSelect,
//   (req, res) => {
//     res.send(res.data);
// });

// // app.post('/onUpdate', (req, res) => {
// //     const title = req.body.title;
// //     const content = req.body.content;
// //     const idx = req.body.idx;
// //     const sqlQuery = "UPDATE simpleboard set title=?, content=? where idx=?";
// //     db.query(sqlQuery, [title, content, idx], (err, result) => {
// //         if (err) {
// //             console.log(err);
// //         } else {
// //             if(result.affectedRows==1){
// //                 res.send({msg : '수정 완료.'});
// //             }else{
// //                 res.send({msg : '수정 실패.'});
// //             }
            
// //         }
// //     });
// // });

// app.post('/onUpdate',
//   (req, res, next) => {
//     const title = req.body.title;
//     const content = req.body.content;
//     const idx = req.body.idx;
//     next();
//   },
//   controller.update,
//   (req, res) => {
//     res.send(res.msg);
// });

// // app.post('/delete', (req, res) => {
// //     const user_id = req.body.user_id;
// //     const idx = req.body.idx;
// //     const sqlQuery = "delete from simpleboard where user_id=? && idx=?";
// //     db.query(sqlQuery, [user_id, idx], (err, result) => {
// //         if (err) {
// //             console.log(err);
// //         } else {
// //             if(result.affectedRows==1){
// //                 res.send({msg : '삭제 완료.'});
// //             }else{
// //                 res.send({msg : '삭제 실패.'});
// //             }
            
// //         }
// //     });
// // });

// app.post('/delete',
//   (req, res, next) => {
//     const idx = req.body.idx;
//     next();
//   },
//   controller.delete,
//   (req, res) => {
//     res.send(res.msg);
// });


// // app.post("/insert", (req, res) => {
// //     const title = req.body.title;
// //     const content = req.body.content;
// //     const user_id = req.body.user_id;
// //     const sqlQuery = "INSERT INTO simpleboard (title, content, user_id) VALUES (?,?,?)";
// //     db.query(sqlQuery, [title, content, user_id], (err, result) =>  {
// //         if (err) {
// //             console.log(err);
// //         } else {
// //             res.send({msg : '등록 완료.'});
// //         }
// //     });
// // });

// app.post('/insert',
//   (req, res, next) => {
//     const title = req.body.title;
//     const content = req.body.content;
//     const user_id = req.body.user_id;
//     next();
//   },
//   controller.insert,
//   (req, res) => {
//     res.send(res.msg);
// });

// // app.get("/signUp/get", (req, res)=>{
// //     const user_id = req.query.user_id;
// //     const sqlQuery = "SELECT * FROM user_inform where user_id=?"; 
// //     db.query(sqlQuery, [user_id], (err, result)=>{
// //         res.send(result);
// //     });
// // });

// app.get('/signUp/get',
//   (req, res, next) => {
//     const user_id = req.query.user_id;
//     next();
//   },
//   controller.signUpSelect,
//   (req, res) => {
//     res.send(res.data);
// });

// // app.post('/onSignUp', (req, res) => {
// //     const user_id = req.body.user_id;
// //     const user_pw = req.body.user_pw;
// //     const sqlQuery = "INSERT INTO user_inform (user_id, user_pw) VALUES (?,?)";
// //     db.query(sqlQuery,[user_id, user_pw], (err, result) => {
// //         if (err) {
// //             console.log(err);
// //         } else {
// //             res.send({msg : '가입 완료.'});
// //         }
// //     });
// // });

// app.post('/onSignUp',
//   (req, res, next) => {
//     const user_id = req.body.user_id;
//     const user_pw = req.body.user_pw;
//     next();
//   },
//   controller.signUp,
//   (req, res) => {
//     res.send(res.msg);
// });

// // app.post("/onLogin", (req, res) => {
// //     const user_id = req.body.user_id;
// //     const user_pw = req.body.user_pw;
// //     const sql1 = 'SELECT COUNT(*) AS res FROM user_inform WHERE user_id = ?';
// //     db.query(sql1, [user_id], (err, result) => {
// //         if(!err) {
// //             if(result[0].res < 1) {
// //                 res.send({ msg: '존재하지 않는 아이디입니다.'})
// //             } else {
// //                 const sql2 = `SELECT USER_ID FROM USER_INFORM WHERE user_id = ? AND user_pw = ?`;
// //                 const params = [user_id, user_pw]
// //                 db.query(sql2, params, (err, result) => {
// //                     if(result=='') {
// //                         res.send({ msg: '비밀번호가 일치하지 않습니다.'})
// //                     } else if(!err){
// //                         res.send(result[0].USER_ID)
// //                     } else {
// //                         res.send(err)
// //                     }
// //                 })
// //             }
// //         } else {
// //             res.send(err)
// //         }
// //     })
// // });

// app.post('/onLogin',
//   (req, res, next) => {
//     const user_id = req.body.user_id;
//     const user_pw = req.body.user_pw;
//     next();
//   },
//   controller.login,
//   (req, res) => {
//     res.send(res.data);
// });


// app.listen(PORT, ()=>{
//     console.log(`running on port ${PORT}`);
// });