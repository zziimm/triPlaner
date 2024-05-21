import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { css, styled } from 'styled-components';
import { IoAirplaneOutline } from "react-icons/io5";

const LoadingLayout = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  /* margin: 0 auto;
  margin-top: 3rem; */
  /* margin: 0 2rem; */
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
`;

const Plane = styled.div`
  svg {
    position: absolute;
    z-index: 10;
    color: #fff;
    width: 100px;
    height: 100px;
    top: 15px;
    left: 0;
    animation: move 1.7s ease-in;
    animation-fill-mode: forwards;
    @keyframes move {
      to {
        transform: translateX(100vw);
      }
    }
  }
`; 

function Loading(props) {

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/login')
    }, 2200);
  }, [])

  return (
    <>
      <Plane>
        <IoAirplaneOutline />
      </Plane>
    </>
  );
}

export default Loading;