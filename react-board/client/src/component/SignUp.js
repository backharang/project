/* eslint-disable */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
 
function SignUp() {
    const navigate = useNavigate();
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');
    const [check, setCheck] = useState(Boolean);

    const handleInputId = (e) => {
        setInputId(e.target.value);
    };
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    };
    


    useEffect(() => {
        axios.get('http://192.168.0.34:8000/getSignUp', {params: {user_id: inputId}})
        .then((response)=>{
            if(response.data.length==1){
                setCheck(true);
            }else{
                setCheck(false);
            }
        });
    },[inputId]);
    

    const onClickSignUp = () => {
        if(inputId.length<6 || inputId.length>12){
            alert('아이디는 6~12자로 입력해주세요.');
        }else if(inputPw.length<8 || inputPw.length>20){
            alert('패스워드는 8~20자로 입력해주세요.');
        }else if(check){
            alert('이미 사용중인 아이디입니다.');
        }else{
            axios.post('http://192.168.0.34:8000/onSignUp', {
                user_id: inputId,
                user_pw: inputPw
            }).then((response)=>{
                alert(response.data);
                location = '/';
            })
        }
    }

    return(
        <div style={{textAlign: 'center', zoom: '1.5'}}>
            <h2>Sign Up</h2>
            <div>
                <div>
                    <input type='text' placeholder="아이디" value={inputId} onChange={handleInputId} />
                    {check==true?<div style={{fontSize: '11px'}}>이미 사용중인 아이디 입니다.</div> : <div style={{height: '15px'}}></div>}
                    <input type='password' placeholder="비밀번호" value={inputPw} onChange={handleInputPw} />
                </div><br />
                <button type='button' onClick={onClickSignUp} style={{width: '180px', height: '30px', display: 'inline-block'}}>회원가입</button>
            </div>
            <br />
            <div>
                <Link to='/' style={{textDecoration: 'none'}}>로그인</Link>
            </div>
        </div>
    )
}
export default SignUp;