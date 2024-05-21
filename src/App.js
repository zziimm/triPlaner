import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useRef, useState } from "react";
import Header from "./components/pages/Header";
import PlanList from "./components/pages/PlanList";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import PlanInsert from "./components/pages/PlanInsert";
import PlanDetail from "./components/pages/PlanDetail";
import { useDispatch, useSelector } from "react-redux";
import { getLoginUser, selectLoginUser } from "./features/userinfo/userInfoSlice";
import Loading from "./components/pages/Loading";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth();


const GlobalStyle = createGlobalStyle`

  ${reset}
  html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        /* font-size: 10px; */
        vertical-align: baseline;
  }

  ol, ul {
        list-style: none;
  }
  a {
        text-decoration: none;
        color: inherit;
  }

  button {
    font-family: "Gothic A1", sans-serif;
    font-weight: 400;
    font-style: normal;
    border: 0;
    background: transparent;
    cursor: pointer;
  }
  input {
    font-family: "Gothic A1", sans-serif;
    font-weight: 400;
    font-style: normal;
    border: none;
    color: #fff;

  }
  input:focus {
      outline: none;
  }

  /* 글로벌(공통) 스타일 */
  body {
    background: #3d3d3d;
    color: #fff;
    font-family: "Gothic A1", sans-serif;
    font-weight: 400;
    font-style: normal;
    .engFont {
      font-family: "Michroma", sans-serif;
      font-weight: 400;
      font-style: normal;
    }

    .mainBtn {
    cursor: pointer;
    /* width: 30px;
    height: 30px; */
    padding: 15px;
    border-radius: 50%;
    transition: 0.25s;
    background: linear-gradient(-45deg, #33ccff 0%, #ff99cc 100%);
    color: white;

    background-size: 400% 400%;
    animation: gradient1 5s ease infinite;

  }
  @keyframes gradient1 {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
  }
  }
`;


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector(selectLoginUser);


  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(getLoginUser(null));
        navigate('/');
        // window.location.reload();
      })
      .catch(error => {
        alert('아이디 또는 비밀번호를 확인해주세요!');
        console.log(error);
      });
  };

  return (
    <>
      <GlobalStyle />

      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Loading />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/myPage" element={<PlanList />} />
          <Route path="/planInsert" element={<PlanInsert />} />
          <Route path="/planDetail/:planId" element={<PlanDetail />} />
        </Route>
      </Routes>
      {isLogin?.email
        ? <button onClick={() => handleLogout()}>로그아웃</button>
        : ''
      }
    </>
  );
}

export default App;

// HTML 웹 스토리지란?
// 브라우저에서 제공하는 데이터 저장소
// 사용자의 브라우저 내에 로컬로 데이터를 저장할 수 있음
// key-value 형태로 저장
// 최대 5MB까지 문자만 저장가능
// 콘솔 창에서 연습해보기

// 웹 스토리지는 origin(도메인 및 프로토콜)당입니다. 
// 같은 출처의 모든 페이지는 동일한 데이터를 저장하고 액세스할 수 있습니다.

// HTML 웹 스토리지 객체
// HTML 웹 스토리지는 클라이언트에 데이터를 저장하기 위한 두 가지 객체를 제공합니다.
// window.localStorage - 만료 날짜 없이 데이터를 저장
// window.sessionStorage - 한 세션에 대한 데이터 저장(브라우저 탭을 닫으면 데이터가 손실됨)