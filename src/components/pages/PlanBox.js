import React, { useState } from 'react';
import { styled } from 'styled-components';
import { FaPlus } from "react-icons/fa";
import { IoMdClose, IoMdCheckmark } from "react-icons/io";


const PlanBoxLayout = styled.div`

  /* position: relative; */
  box-sizing: border-box;
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid gray;
  text-align: center;
  
  p {
    text-align: start;
  }


  button.plusPlan svg {
    margin-top: 10px;
    width: 15px;
    height: 15px;
    padding: 5px 5px;
    border-radius: 50%;
    border: 1px solid #fff;
    color: #fff;
  }
`;
const PlanTextBox = styled.div`
  width: 100%;
  /* height: 300px; */

`;

const InsertModalBg = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
  /* display :flex; 
  justify-content:center;
  align-items :center; */
`;
const InsertModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem;
  background-color: #3d3d3d;
  input {
    border: none;
    font-size: 20px;

    background-color: #3d3d3d;
    border-bottom: 1px solid #fff;

  }
`;

function PlanBox({ day }) {
  const [insertModal, setInsertModal] = useState(false);

  const handleInsertModal = () => {
    setInsertModal(!insertModal)
  };

  return (
    <PlanBoxLayout>
      <p>Day {day}</p>
      <PlanTextBox>

      </PlanTextBox>
      {insertModal 
        ?
          <InsertModalBg>
            <InsertModal>
              <div>
                <span>일정</span>
                <input type='text'/>
              </div>
              <div>
                <span>시간</span>
                <input type='time'/>
              </div>
              <button button className='plusPlan' onClick={() => handleInsertModal()}><IoMdClose /></button>
                
            </InsertModal>
          </InsertModalBg>
        : 
          ''
      }
      <button className='plusPlan' onClick={() => handleInsertModal()}><FaPlus /></button>
    </PlanBoxLayout>
  );
}

export default PlanBox;