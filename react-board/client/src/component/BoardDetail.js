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
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(false);
  const [comment, setComment] = useState('');
  const [viewComment, setViewComment] = useState([]);

  const changeComment  = (e) => {
    setComment(e.target.value);
  }

  const index = useLocation().state!=null?useLocation().state.idx:null;

  useEffect(() => {
    if(index!=null){
      axios.get('http://192.168.50.83:8000/getDetail',{params: {idx: index}})
      .then((response)=>{
        setViewContant({
          idx: response.data[0].idx,
          title: response.data[0].title,
          user_id: response.data[0].user_id,
          imgsrc: response.data[0].imgsrc,
          content: response.data[0].content,
        });
      }).then(() => {
        axios.get('http://192.168.50.83:8000/getComment',{params: {idx: index}})
        .then((response)=>{
          setViewComment(response.data);
        })
        setLoading(false)
        setLoad(false)
        } 
      );
    }else{
      setLoading(false);
    }
  },[load]);

  const logOut = () => {
    removeCookie('id'); // 쿠키 삭제
    history.back();
  };

  const onDelete = () => {
    if(cookies.id != viewContant.user_id){
      alert('본인의 게시글만 삭제 할 수 있습니다.');
    }else{
      if(confirm('삭제하시겠습니까?')){
        axios.post('http://192.168.50.83:8000/deleteBoard', {
          idx: viewContant.idx,
          imgsrc: viewContant.imgsrc
        }).then((response)=>{
          alert(response.data);
          history.back();
        })
      }
    }
  }

  const commentDelete = (e) => {
    if(cookies.id != e.user_id){
      alert('본인의 댓글만 삭제 할 수 있습니다.');
    }else{
      if(confirm('삭제하시겠습니까?')){
        axios.post('http://192.168.50.83:8000/deleteComment', {
          cno: e.cno
        }).then((response)=>{
          alert(response.data);
          setLoad(true);
        })
      }
    }
  }
  
  const addComment = () => {
    if(comment.replace(/ +/g, "") == ""){
      alert('내용을 입력해주세요.');
    }else{
      axios.post('http://192.168.50.83:8000/addComment', {
        content: comment,
        idx: viewContant.idx,
        user_id: cookies.id,
      });
      setComment('');
      setLoad(true);
    }
  }

  return (
    <div className="App" style={{zoom: '1.3'}}>
      <h1 style={{display: 'inline-block'}}>Board</h1>
      <div style={{display: 'inline-block', marginLeft: '10px'}}>
        <div>ID : {cookies.id}</div>  
        <button type='button' onClick={() => history.back()}>게시판</button>
        <button onClick={logOut}>로그아웃</button>
      </div>
      <div className='container'>
        {loading == true
        ? (<h4>로딩중..</h4>)
        :index != null? 
        <div>
          <hr/>
          <h2 style={{display: 'inline-block', maxWidth: '85%', overflowWrap: 'break-word'}}>{viewContant.title}</h2>
          <div style={{display: 'inline-block', margin: '25px 20px', float: 'right'}}>{viewContant.user_id}</div><br />
          {viewContant.imgsrc == null? null : <img src={'http://192.168.50.83:8000/static/image/'+viewContant.imgsrc} height='auto' style={{maxWidth: '50%', textAlign: 'center'}}></img>}
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
          <hr />
          <h3 style={{margin: '10px'}}>댓글</h3>
          <textarea rows="4" placeholder="내용을 입력하세요" required="" style={{width: '100%', resize: 'none'}} value={comment} onChange={changeComment} maxLength= '500'></textarea><br />
          <button type='button' onClick={addComment} style={{float: 'right'}}>등록</button>
          <br />
          {viewComment && viewComment.map(element => 
            <div key={element.cno}>
              <hr style={{opacity: '0.3'}} />
              <b>{element.user_id+' '}</b>
              <span style={{fontSize: '0.8em'}}>{element.regdate}</span>
              <pre style={{overflow: 'auto', whiteSpace: 'pre-wrap', width: '100%'}}>{element.content}</pre>
              <button type='button' 
                onClick={() => commentDelete(element)}
              >삭제</button>
            </div>
          )}
          <hr style={{opacity: '0.3'}} />
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