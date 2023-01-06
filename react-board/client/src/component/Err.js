import { Link } from "react-router-dom";

function Err() {
    return (
      <div style={{textAlign:'center'}}>
        <h1>404</h1>
        <h3>찾는 페이지가 없습니다.</h3>
        <br />
        <h3>아래 링크를 클릭해주세요</h3>
        <Link to='/' style={{textDecoration: 'none'}}>메인페이지로 이동</Link>
      </div>
    );
  }
  export default Err;
  