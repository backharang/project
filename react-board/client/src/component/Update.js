/* eslint-disable */

import { useState, useEffect, useRef  } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useLocation } from 'react-router';

function Update(){
const [cookies, removeCookie] = useCookies(['id']);
const [imageUrl, setImageUrl] = useState(null);
const [original, setOriginal] = useState(null);
const [content, setContent] = useState({
    title: '',
    content: ''
});

const index = useLocation().state!=null?useLocation().state.idx:null;
const imgRef = useRef();

useEffect(() => {
    if(index!=null){
    axios.get('http://192.168.50.83:8000/getDetail',{params: {idx: index}})
    .then((response)=>{
        setContent({
        title: response.data[0].title,
        content: response.data[0].content
        })
        setImageUrl(response.data[0].imgsrc);
        setOriginal(response.data[0].imgsrc);
    })
    }
},[]);
    
    const onChangeImage = () => {
    const reader = new FileReader();
    const file = imgRef.current.files[0];

    reader.readAsDataURL(file);
    reader.onloadend = () => {
        setImageUrl(reader.result);
    };
    };

    const deleteFile = () => {
    imgRef.current.value=null;
    setImageUrl(null);
    };

    const onClickFileBtn = (e) => {
    imgRef.current.click();
    };

const formData = new FormData();
const updateContent = ()=>{
    formData.append('img',imgRef.current.files[0]);
    if(original!=null && original!=imageUrl){
        axios.post('http://192.168.50.83:8000/deleteImg', {
            original: original
        });
    }
    if(imageUrl == null){
        axios.post('http://192.168.50.83:8000/onUpdate', {
            title: content.title,
            content: content.content,
            idx: index,
            imgsrc: null
        }).then(response=>{
            alert(response.data);
        }).then(() => {
            history.back();
        });
    }else{
    axios.post('http://192.168.50.83:8000/upload', formData, {headers: {
        'Content-Type': 'multipart/form-data',
    }}).then((response)=>{
            axios.post('http://192.168.50.83:8000/onUpdate', {
            title: content.title,
            content: content.content,
            idx: index,
            imgsrc: response.data
        }).then(response=>{
            alert(response.data);
        }).then(() => {
            history.back();
        })
    });
    }
};

const getValue = e => {
    const { value } = e.target;
    setContent({
    ...content,
    title: value
    })
};

const logOut = () => {
    removeCookie('id'); // 쿠키 삭제
    history.back();
  };

return (
    <div className="App"  style={{zoom: '1.3'}}>
    <h1 style={{display: 'inline-block'}}>Update</h1>
    <div style={{display: 'inline-block', marginLeft: '10px'}}>
        <div>ID : {cookies.id}</div>   
        <button type='button' onClick={() => history.back()}>게시판</button>
        <button onClick={logOut}>로그아웃</button>
    </div>
    {index != null? 
        <div>
        <div>
            <input
            type='text'
            placeholder='제목'
            maxLength='50'
            onChange={getValue} 
            name='title'
            value={content.title}
            /><br />
            {imageUrl == null? 
            <img src={imageUrl} height='auto' style={{display: 'none', maxWidth: '50%'}}></img>
            :
            <img src={imageUrl.charAt(0) != 'd' ? 'http://192.168.50.83:8000/static/image/' + imageUrl : imageUrl} height='auto' style={{maxWidth: '50%'}}></img>
            }
            <input
            type="file"
            accept="image/*"
            ref={imgRef}
            onChange={onChangeImage}
            style={{ display: "none" }}
            ></input><br />
            <button
            onClick={() => {
                onClickFileBtn();
            }}
            >
            이미지 업로드
            </button>
            <br />
            <button
            onClick={() => {
                deleteFile();
            }}
            >
            이미지 제거
            </button>
            <CKEditor
            id='ck'
            editor={ClassicEditor}
            config={
                {
                placeholder: "내용을 입력해주세요",
                toolbar: [
                'heading',
                '|',
                'bold',
                'italic',
                'bulletedList',
                'numberedList',
                '|',
                // 'uploadImage',
                'blockQuote',
                'insertTable',
                'undo',
                'redo'
                ]
            }}
            data={content.content}
            onChange={(event, editor) => {
                const data = editor.getData();
                setContent((content) => {
                return {
                    ...content,
                    content: data
                }
                })
            }}
            
            />
        </div>
        <div>
            <button type='button' onClick={() => history.back()}>취소</button>
            <button type='button'
            onClick={updateContent}
            >수정</button>
        </div>
        </div>
        :
        <div>
        <h2>글 정보가 존재하지 않습니다.</h2>
        </div>
        }
    </div>
);
}

export default Update;