/* eslint-disable */

import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from 'axios';

function BoardList(){
const [cookies, removeCookie] = useCookies(['id']);
const [viewContant, setViewContant] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    axios.get('http://192.168.0.34:8000/getBoard').then((response)=>{
    setViewContant(response.data);
    setLoading(false);
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
        axios.post('http://192.168.0.34:8000/deleteBoard', {
        idx: e.idx,
        imgsrc: e.imgsrc
        }).then((response)=>{
        alert(response.data);
        })
    }
    }
}

const viewCount = (e) => {
    if(cookies.id != e.user_id){
    axios.post('http://192.168.0.34:8000/viewCount', {
        idx: e.idx,
    })
    }
}

return (
    <div className="App" style={{zoom: '1.3'}}>
    <h1 style={{display: 'inline-block'}}>Board</h1>
    <div style={{display: 'inline-block', marginLeft: '10px'}}>
        <div>ID : {cookies.id}</div>  
        <Link to='/insert' style={{textDecoration: 'none'}}><button type='button'>글쓰기</button></Link>
        <button onClick={logOut}>로그아웃</button>
    </div>
    <div className='container'>
        {loading == true
        ? (<h4>로딩중..</h4>)
        :viewContant[0] == null 
        ? <div>게시물 없음</div>
        : <div>
            <div>
            <b style={{display:'inline-block', width: '15%', textAlign: 'center'}}>작성자</b>
            <b style={{display:'inline-block', width: '45%', textAlign: 'center'}}>제목</b>
            <b style={{display:'inline-block', width: '20%', textAlign: 'center'}}>작성일</b>
            <b style={{display:'inline-block', width: '8%', textAlign: 'center'}}>조회수</b>
            </div>
        {viewContant && viewContant.map(element => 
            <div key={element.idx} id={element.user_id} style={{marginBottom: '40px'}}>
            <hr />
                <span style={{display:'inline-block', width: '15%', textAlign: 'center', float: 'left'}}>{element.user_id}</span>
                <span style={{display:'inline-block', width: '45%', float: 'left'}}>
                <span onClick={() => viewCount(element)}>
                <Link 
                    to={'/detail'} 
                    state= {{idx:element.idx}} 
                    style={{display:'inline-block', textDecorationLine: 'none', maxWidth: '92%', color: 'black', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                    {element.title}
                </Link>
                </span>
                {element.imgsrc == null? 
                <div style={{display: 'none', width: '2.5%'}}></div>
                :
                <img src={'http://192.168.0.34:8000/static/image/image.jpg'} width='2.5%' style={{margin:'5px'}}></img>
                }
                </span> 
                <span style={{display:'inline-block', width: '20%', textAlign: 'center', float: 'left'}}>{element.cdate}</span>
                <span style={{display:'inline-block', width: '8%', textAlign: 'center', float: 'left'}}>{element.viewcount}</span>
                <span style={{display:'inline-block', width: '12%', textAlign: 'center', float: 'left'}}>
                {
                    cookies.id != element.user_id
                    ?<button type='button'
                    onClick={()=>{alert('본인의 게시글만 수정 할 수 있습니다.')
                    {console.log(element.user_id)}}}
                    >수정</button>
                    :
                    <Link 
                    to={'/update'}
                    state= {{idx:element.idx}}
                    style={{textDecoration: 'none'}}><button type='button'>수정</button></Link>
                }
                
                <button type='button' style={{marginLeft: '5px'}}
                    onClick={() => onDelete(element)}
                >삭제</button>
                </span>
            </div>
        )}
        </div>  
        }
    </div>

    </div>
);
}

export default BoardList;

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