/* eslint-disable */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Insert from "./Insert";
import Board from "./Board";
import Update from "./Update";
import Err from "./Err";
import Test from "./Test";
import { useCookies } from 'react-cookie';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['id']);
  return (
    <Router>
      <Routes>
        {cookies.id===undefined || cookies.id==='undefined' ?
        <>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </>
        :
        <>
          <Route path="/" element={<Board />} />
          <Route path="/insert" element={<Insert />} />
          <Route path="/update" element={<Update />} />
          {/* <Route path="/update/:idx" element={<Update />} /> */}
        </>}
          <Route path="/*" element={<Err />} />
          <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}
export default App;
