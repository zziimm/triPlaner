import React from 'react';
import { styled } from 'styled-components';
import { FaPlus } from "react-icons/fa";

const InsertBtnLayout = styled.div`
  position: absolute;
  right: 40px;
  bottom: 80px;
  
  .mainBtn {
    cursor: pointer;
    width: 30px;
    height: 30px;
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
`;

function InsertBtn({ navigate }) {
  return (
    <InsertBtnLayout>
      <FaPlus onClick={() => navigate()} className='mainBtn' />
    </InsertBtnLayout>
  );
}

export default InsertBtn;