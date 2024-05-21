import React, { useEffect, useState } from 'react';
import { styled } from "styled-components";
import { useNavigate } from 'react-router-dom';

import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase.config";
import { useDispatch, useSelector } from 'react-redux';
import { getLoginUser, selectLoginUser } from '../../features/userinfo/userInfoSlice';

initializeApp(firebaseConfig)
const auth = getAuth();



const LoginLayout = styled.div`
  .signBox {
    background: #3d3d3d;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 0;

    button + button {
      margin-top: 5px;
    }
    button:hover {
      transition: 1s;
      background-color: #878787;
    }
    button {
      transition: 1s;
      color: #fff;
      border: 1px solid #878787;
      border-radius: 15px;
      padding: 3px 8px;
    }
  }
  .LoginBox {
    padding: 10px 0;
    input {
      width: 100px;
      font-size: 16px;
      display: flex;
      background-color: #3d3d3d;
      border: none;
      border-bottom: 1px solid #FFF;
      border-radius: 5px;
      color: #FFF;
      text-align: center;
    }
    input:focus {
      outline: none;
      border-bottom: 1px solid #FFF;
      border-radius: 5px;
    }
    

  }

`;

function Login() {
  const [inputUserId, setInputUserId] = useState('');
  const [inputUserPass, setInputUserPass] = useState('');
  const isLogin = useSelector(selectLoginUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin?.email) {
      navigate('/myPage')
    }
  }, [])

  const handleLoginFirebase = (inputUserId, inputUserPass) => {
    const email = inputUserId;
    const password = inputUserPass

    if (inputUserId === '') {
      alert('아이디를 입력해주세요!')
      return
    } else if (inputUserPass === '') {
      alert('비밀번호를 입력해주세요!')
      return
    }
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          dispatch(getLoginUser(user.reloadUserInfo))
          alert(`환영합니다! ${user.email} 님!`);
          navigate('/mypage');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
      })
      .catch(error => {
        console.log(error);
      })
  };

  
  const handleInputUserId = (e) => setInputUserId(e.target.value);
  const handleInputUserPass = (e) => setInputUserPass(e.target.value);

  return (
      <LoginLayout>
        <div className='signBox'>
          <div className='LoginBox'>
            <input className='idInput' type='text' value={inputUserId} onChange={handleInputUserId} placeholder='아이디'/>
            <input className='pwInput' type='password' value={inputUserPass} onChange={handleInputUserPass} placeholder='비밀번호'/>
          </div>
          <button onClick={() => handleLoginFirebase(inputUserId, inputUserPass)}>로그인</button>
          <button onClick={() => navigate('/signUp')}>회원가입</button>
        </div>
      </LoginLayout>
  );
}

export default Login;