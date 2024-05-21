import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../../firebase.config";

import { initializeApp } from "firebase/app";
const app = initializeApp(firebaseConfig);
const auth = getAuth();


const LoginLayout = styled.div`
  .signBox {
    background: #3d3d3d;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    text-align: center;

    button {
      margin-top: 10px;
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
    input + input {
      margin-top: 10px;
    }
    
    

  }

`;

function SignUp() {
  const [inputUserId, setInputUserId] = useState('');
  const [inputUserPass, setInputUserPass] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (inputUserId, inputUserPass) => {
    
    const email = inputUserId;
    const password = inputUserPass;
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert('가입이 완료되었습니다!');
      navigate('/')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/invalid-email") {
        alert(`
          가입에 실패했습니다.\n
          아이디는 이메일 형식 (ex@ample.com), \n
          비밀번호는 6자리 이상 입력해주세요.
        `);
      } else if (errorCode === "auth/email-already-in-use") {
        alert('이미 사용중인 이메일입니다.');
      } else if (errorCode === "auth/weak-password") {
        alert('비밀번호는 최소 4자리 이상 입니다.');
      }
      console.log(errorCode);
      console.log(errorMessage);
    });
  }

  
  const handleInputUserId = (e) => setInputUserId(e.target.value);
  const handleInputUserPass = (e) => setInputUserPass(e.target.value);
  return (
      <LoginLayout>
        <div className='signBox'>
          <div className='LoginBox'>
            <input className='idInput' type='text' value={inputUserId} onChange={handleInputUserId} placeholder='아이디'/>
            <input className='pwInput' type='password' value={inputUserPass} onChange={handleInputUserPass} placeholder='비밀번호'/>
            <button onClick={() => handleSignUp(inputUserId, inputUserPass)}>가입하기</button>
          </div>
        </div>
      </LoginLayout>
  );
}

export default SignUp;