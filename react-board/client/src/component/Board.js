/* eslint-disable */

import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ReactHtmlParser from 'html-react-parser';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function Board(){
  const [cookies, removeCookie] = useCookies(['id']);
  const [viewContant, setViewContant] = useState([]);
  const [loding, setLoding] = useState(true);

  useEffect(() => {
    axios.get('http://192.168.0.34:8000/getBoard').then((response)=>{
      setViewContant(response.data);
      setLoding(false);
    });
  },[viewContant]);

  const logOut = () => {
    removeCookie('id'); // 쿠키 삭제
  };

  const onDelete = (e) => {
    if(cookies.id != e.user_id){
      alert('본인의 게시글만 삭제 할 수 있습니다.');
    }else{
      if(confirm('삭제하시겠습니까?')){
        axios.post('http://192.168.0.34:8000/delete', {
          idx: e.idx,
          imgsrc: e.imgsrc
        }).then((response)=>{
          alert(response.data);
        })
      }
    }
  }
  
  return (
    <div className="App" style={{zoom: '1.5'}}>
      <h1 style={{display: 'inline-block'}}>Board</h1>
      <div style={{display: 'inline-block', marginLeft: '10px'}}>
        <div>ID : {cookies.id}</div>  
        <Link to='/insert' style={{textDecoration: 'none'}}><button type='button'>글쓰기</button></Link>
        <button onClick={logOut}>로그아웃</button>
      </div>
      <div className='container'>
        {loding == true
        ? (<h4>로딩중..</h4>)
        :viewContant == '' 
        ? <div>게시물 없음</div>
        : <div>
            {viewContant && viewContant.map(element => 
              <div key={element.idx} id={element.user_id}>
                <hr/>
                <h2 style={{display: 'inline-block'}}>{element.title}</h2>
                <div style={{display: 'inline-block', margin: '30px 0 0 15px'}}>{element.user_id}</div><br />
                {element.imgsrc == null? null : <img src={'http://192.168.0.34:8000/static/image/'+element.imgsrc} height='auto' style={{maxWidth: '50%'}}></img>}
                <div>
                  {ReactHtmlParser(element.content)}
                </div>
                {
                  cookies.id != element.user_id
                  ?<button type='button'
                    onClick={()=>alert('본인의 게시글만 수정 할 수 있습니다.')}
                  >수정</button>
                  :
                    <Link 
                      to={'/update'}
                      state= {{idx:element.idx}}
                    style={{textDecoration: 'none'}}><button type='button'>수정</button></Link>
                  
                }
                
                <button type='button' 
                  onClick={() => onDelete(element)}
                >삭제</button>
              </div>
            )}
          </div>
        }
      </div>
  
    </div>
  );
}

export default Board;

// /* eslint-disable */

// import { useState, useEffect } from 'react';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import { Link } from "react-router-dom";
// import ReactHtmlParser from 'html-react-parser'
// import { useCookies } from 'react-cookie'
// import axios from 'axios';

// function Board(){
//   const [cookies, removeCookie] = useCookies(['id']);
//   const [viewContant, setViewContant] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8000/getBoard').then((response)=>setViewContant(response.data));
//   },[viewContant]);

//   const logOut = () => {
//     removeCookie('id'); // 쿠키 삭제
//     window.location = '/';
//   };

//   const onDelete = (e) => {
//     if(cookies.id != e.user_id){
//       alert('본인의 게시글만 삭제 할 수 있습니다.');
//     }else{
//       if(confirm('삭제하시겠습니까?')){
//         axios.post('http://localhost:8000/delete', {
//           idx: e.idx
//         }).then((response)=>{
//           alert(response.data);
//         })
//       }
//     }
      
//   }

//   const onUpdate = (e) => {
//     if(cookies.id != e.user_id){
//       alert('본인의 게시글만 수정 할 수 있습니다.');
//     }else{
//       if(confirm('수정하시겠습니까?')){
//         location = `/update/${e.idx}`;
//       }
//     }
//   }

//   return (
//     <div className="App">
//       <h1 style={{display: 'inline-block'}}>Board</h1>
//       <div style={{display: 'inline-block', marginLeft: '10px'}}>
//         <div>ID : {cookies.id}</div>  
//         <Link to='/insert' style={{textDecoration: 'none'}}><button type='button'>글쓰기</button></Link>
//         <button onClick={logOut}>로그아웃</button>
//       </div>
//       <div className='container'>
//         {viewContant == '' 
//         ? <div>게시물 없음</div>
//         : <div>
//             {viewContant && viewContant.map(element => 
//               <div key={element.idx} id={element.user_id}>
//                 <h2 style={{display: 'inline-block'}}>{element.title}</h2>
//                 <div style={{display: 'inline-block', margin: '30px 0 0 15px'}}>{element.user_id}</div>
//                 <div>
//                   {ReactHtmlParser(element.content)}
//                 </div>
//                 <button type='button'
//                   onClick={() => onUpdate(element)}
//                 >수정</button>
//                 <button type='button' 
//                   onClick={() => onDelete(element)}
//                 >삭제</button>
//                 <hr></hr>
//               </div>
//             )}
//           </div>
//         }
//       </div>
  
//     </div>
//   );
// }

// export default Board;