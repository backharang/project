/* eslint-disable */

import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ReactHtmlParser from 'html-react-parser';
import { useLocation } from 'react-router';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function BoardDetail(){
  const [cookies, removeCookie] = useCookies(['id']);
  const [viewContant, setViewContant] = useState({
    title: '',
    user_id: '',
    imgsrc: '',
    content: '',
  });
  const [loding, setLoding] = useState(true);

  const index = useLocation().state!=null?useLocation().state.idx:null;

  useEffect(() => {
    if(index!=null){
      axios.get('http://192.168.0.34:8000/getDetail',{params: {idx: index}})
      .then((response)=>{
        setViewContant({
          idx: response.data[0].idx,
          title: response.data[0].title,
          user_id: response.data[0].user_id,
          imgsrc: response.data[0].imgsrc,
          content: response.data[0].content,
        });
      }).then(() =>
      setLoding(false)
      );
    }else{
      setLoding(false);
    }
  },[]);

  const logOut = () => {
    removeCookie('id'); // 쿠키 삭제
  };

  const onDelete = () => {
    if(cookies.id != viewContant.user_id){
      alert('본인의 게시글만 삭제 할 수 있습니다.');
    }else{
      if(confirm('삭제하시겠습니까?')){
        axios.post('http://192.168.0.34:8000/deleteBoard', {
          idx: viewContant.idx,
          imgsrc: viewContant.imgsrc
        }).then((response)=>{
          alert(response.data);
          history.back();
        })
      }
    }
  }
  
  return (
    <div className="App">
      <h1 style={{display: 'inline-block'}}>Board</h1>
      <div style={{display: 'inline-block', marginLeft: '10px'}}>
        <div>ID : {cookies.id}</div>  
        <button type='button' onClick={() => history.back()}>게시판</button>
        <button onClick={logOut}>로그아웃</button>
      </div>
      <div className='container'>
        {loding == true
        ? (<h4>로딩중..</h4>)
        :index != null? 
        <div>
          <hr/>
          <h2 style={{display: 'inline-block'}}>{viewContant.title}</h2>
          <div style={{display: 'inline-block', margin: '30px 0 0 15px'}}>{viewContant.user_id}</div><br />
          {viewContant.imgsrc == null? null : <img src={'http://192.168.0.34:8000/static/image/'+viewContant.imgsrc} height='auto' style={{maxWidth: '50%', textAlign: 'center'}}></img>}
            <div>
              {ReactHtmlParser(viewContant.content)}
            </div>
          {
            cookies.id != viewContant.user_id
            ?<button type='button'
              onClick={()=>alert('본인의 게시글만 수정 할 수 있습니다.')}
            >수정</button>
            :
              <Link 
                to={'/update'}
                state= {{idx:index}}
              style={{textDecoration: 'none'}}><button type='button'>수정</button></Link>
            
          }
          
          <button type='button' 
            onClick={() => onDelete()}
          >삭제</button>
        </div>
        :
        <div>
          <h2>글 정보가 존재하지 않습니다.</h2>
        </div>
        }
      </div>
  
    </div>
  );
}

export default BoardDetail;