
//아이디 비밀번호 확인
exports.checkAcount = (id, pw) => {
    if (id[0].res < 1) {
        return '존재하지 않는 아이디입니다.';
    }else if(pw[0]==undefined){
        return '비밀번호가 일치하지 않습니다.';
    }else{
        return pw[0].USER_ID;
    }

};


//데이터 변화 확인
exports.checkChanged = (obj) => {
    if (obj.affectedRows  == 1) {
        return '완료.';
    } else {
        return '실패.';
    }
};
