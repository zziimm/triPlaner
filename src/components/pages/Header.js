import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoginUser } from '../../features/userinfo/userInfoSlice';
import { IoIosArrowBack } from "react-icons/io";

const HeaderLayout = styled.div`

  max-width: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  box-sizing: border-box;


  .app-title {
    width: 100%;
    position: relative;
    border: none;
    display: inline-block;
    padding: 15px 0;
    border-radius: 25px 25px 0 0;
    font-family: "paybooc-Light", sans-serif;
    text-decoration: none;
    font-weight: 600;
    transition: 0.25s;
    text-align: center;

    background: linear-gradient(-45deg, #33ccff 0%, #ff99cc 100%);
    color: white;

    background-size: 400% 400%;
    animation: gradient1 5s ease infinite;

  }
  .app-footer {
    border-radius: 0 0 25px 25px;
    background-color: #ff99cc;
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


  .content {
    background: #3d3d3d;
    color: #fff;

  }

  .backBtn {
    width: 25px;
    height: 25px;
    border: 1px solid #fff;
    border-radius: 50%;
  }

`;

const MainTitle = styled.p`

`;

const LoginNav = styled.div`
  padding: 30px;
  text-align: center;
  button {
    margin-top: 20px;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 15px;
    padding: 5px 7px;
  }
`;

function Header(props) {
  const isLogin = useSelector(selectLoginUser)
  const [nowPage, setNowPage] = useState('일정 관리')

  const handleTitle = (nowPage) => {
    switch (nowPage) {
      case 'signup':
        setNowPage('회원 가입')
        break;

      case 'login':
        setNowPage('로그인')
        break;
    
      default:
        break;
    }

  }

  // useEffect(() => {
  //     if (window.location.href.split('/').pop() === 'login') {
  //       setNowPage('로그인')
  //     } else if (window.location.href.split('/').pop() === 'signUp') {
  //       setNowPage('회원가입')
  //     } else if (window.location.href.split('/').pop() === '') {
  //       setNowPage('비행기가 이륙중입니다!')
  //     } else {
  //       setNowPage('일정 관리')
  //     }
  //   }, [])
    
    console.log(isLogin);
    const navigate = useNavigate();
    const onCancel = () => {
      navigate(-1);
    };

  return (
      <HeaderLayout>
        <div className='headerBox'>
          <IoIosArrowBack className='backBtn' onClick={onCancel} />
          <MainTitle className='app-title'>{nowPage}</MainTitle>
          <div className='content'>
            <Outlet />

          </div>
          {/* {isLogin.email
            ?
              <Outlet />
            :
              <LoginNav>
                <p>로그인이 필요합니다!</p>
                <button onClick={() => navigate('/login')} >로그인 하러가기</button>
              </LoginNav>
          } */}
          <p className='app-title app-footer'>IMJ</p>
        </div>
      </HeaderLayout>
  );
}

export default Header;