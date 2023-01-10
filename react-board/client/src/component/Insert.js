/* eslint-disable */

import { useState, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router';
import axios from 'axios';

function Insert(){
const [cookies, removeCookie] = useCookies(['id']);
const [content, setContent] = useState({
    title: '',
    content: ''
});
const [imageUrl, setImageUrl] = useState(null);
const imgRef = useRef();

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

const submitContent = ()=>{
    if(content.title == ''){
        alert('제목을 입력해주세요.');
    }else if(content.content == ''){
        alert('내용을 입력해주세요.');
    }else{
        
    formData.append('img',imgRef.current.files[0]);
    if(imageUrl == null){
        axios.post('http://192.168.0.34:8000/insert', {
        title: content.title,
        content: content.content,
        user_id: cookies.id,
        imgsrc: null,
        }).then((response)=>{
        setContent({title:'',content:''});
        alert(response.data);
        history.back();
        });
    }else{
        axios.post('http://192.168.0.34:8000/upload', formData, {headers: {
        'Content-Type': 'multipart/form-data',
        }}).then((response)=>{console.log(formData)
        axios.post('http://192.168.0.34:8000/insert', {
        title: content.title,
        content: content.content,
        user_id: cookies.id,
        imgsrc: response.data
        }).then((response1)=>{
        setContent({title:'',content:''});
        alert(response1.data);
        history.back();
        })});
    }
    }   
};

const getValue = e => {
    const { value } = e.target;
    setContent({
    ...content,
    title: value
    });
    // console.log(content);
};

const logOut = () => {
    removeCookie('id').then(() => {
    history.back();
    }) // 쿠키 삭제
};

return (
    <div className="App">
    <h1 style={{display: 'inline-block'}}>Insert</h1>
    <div style={{display: 'inline-block', marginLeft: '10px'}}>
        <div>ID : {cookies.id}</div>  
        <button type='button' onClick={() => history.back()}>게시판</button>
        <button onClick={logOut}>로그아웃</button>
    </div>
    <div>
    <input
        type='text'
        placeholder='제목'
        onChange={getValue}
        name='title'
        value={content.title}
    /><br />
    {imageUrl == null? 
    <img src={imageUrl} height='auto' style={{display: 'none', maxWidth: '50%'}}></img>
    :
    <img src={imageUrl} height='auto' style={{maxWidth: '50%'}}></img>
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
        // onReady={editor => {
        //   console.log('Editor is ready to use!', editor);
        // }}
        onChange={(event, editor) => {
        const data = editor.getData();
        // console.log({ event, editor, data });
        setContent({
            ...content,
            content: data
        })
        // console.log(content);
        }}
        // onBlur={(event, editor) => {
        //   console.log('Blur.', editor);
        // }}
        // onFocus={(event, editor) => {
        //   console.log('Focus.', editor);
        // }}
    />
    </div>
    <button type='button' onClick={() => history.back()}>취소</button>
    <button type='button'
        onClick={submitContent}
    >입력</button>
    </div>
);
}

export default Insert;

