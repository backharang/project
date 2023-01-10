/* eslint-disable */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useCookies } from 'react-cookie'
 
function Login() {
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');
    const [cookies, setCookie] = useCookies(['id']);

    const handleInputId = (e) => {
        setInputId(e.target.value);
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }
    
    const onClickLogin = () => {
        axios.post('http://192.168.0.34:8000/onLogin', {
            user_id: inputId,
            user_pw: inputPw
        })
        .then(response => {
            if(response.data=='존재하지 않는 아이디입니다.'||response.data=='비밀번호가 일치하지 않습니다.'){
                alert(response.data)
            }else{
                setCookie('id', response.data);
            }
         })
        .catch();
    }
 
    return(
        <div style={{textAlign: 'center', zoom: '1.5'}}>
            <h2>Login</h2>
            <div>
                <div>
                    <input type='text' placeholder="아이디" value={inputId} onChange={handleInputId} onKeyDown={(e) => {
                        if(e.key === "Enter") {
                            onClickLogin();
                        }
                    }}/>
                    <div style={{height: '15px'}}></div>
                    <input type='password' placeholder="비밀번호" name='input_pw' value={inputPw} onChange={handleInputPw} onKeyDown={(e) => {
                        if(e.key === "Enter") {
                            onClickLogin();
                        }
                    }}/>
                </div><br />
                <button type='button' onClick={onClickLogin} style={{width: '180px', height: '30px', display: 'inline-block'}}>로그인</button>
            </div>
            <br />
            <div>
                <Link to='/signup' style={{textDecoration: 'none'}}>회원가입</Link>
            </div>
        </div>
    )
}
export default Login;