import React, { useState } from 'react';
import { styled } from 'styled-components';
import { FaPlus } from "react-icons/fa";
import { IoMdClose, IoMdCheckmark } from "react-icons/io";
import { LuPencilLine } from "react-icons/lu";
import PlanItem from './PlanItem';


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

  .planTextBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    width: 100%;
    text-align: start;
    
    .checkPlanBox {
      display: flex;
      align-items: center;
    }
    .planBox {
      margin-left: 10px;
      
      span + span {
        margin-left: 5px;
      }
    }
    .changeBox {

      svg {color: #fff;}
    }
  }
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
    text-align: center;
    border: none;
    font-size: 20px;
    
    
    background-color: #3d3d3d;
    border-bottom: 1px solid #fff;
  }
  .titleInput {
    width: 20rem;
  }

  .checkBtn {
    margin-top: 10px;
    border: 1px solid #fff;
    padding: 6px;
  }
  .closeBtn {
    color: #fff;
    margin-top: 10px;
    border: 1px solid #fff;
    border-radius: 50%;
    padding: 6px;
  }
`;

function PlanBox({ day, handlePlusDetail, id, index, detail, removeBtn, updateBtn }) {
  const [insertModal, setInsertModal] = useState(false);
  const [changeModal, setChangeModal] = useState(false);
  const [changeTitle, setChangeTitle] = useState('');
  const [changeStartDate, setChangeStartDate] = useState('')


  const [inputTime, setInputTime] = useState('');
  const [inputTitle, setInputTitle] = useState('');

  const handleInputTime = (e) => setInputTime(e.target.value);
  const handleInputTitle = (e) => setInputTitle(e.target.value);

  const handleInsertModal = () => setInsertModal(!insertModal);
  const handleChangeModal = () => setChangeModal(!changeModal);

  const handleInput = (e) => setChangeTitle(e.target.value);
  const startDateChange = (e) => setChangeStartDate(e.target.value)

  return (
    <PlanBoxLayout>
      <p>Day {day}</p>
      {/* {changeModal
        ?
          <ChangeContainer>
            <div className='changeBox'>
              <div>
                <input type='text' value={changeTitle} onChange={handleInput} />
              </div>
              <div>
                <span className='dateName'>출발일</span>
                <input value={changeStartDate} onChange={startDateChange} type='time' />
              </div>

            </div>
            <div className='btnBox'>
              <IoMdCheckmark className='check' onClick={() => {updateBtn(id, changeTitle, changeStartDate, ); setChangeModal(false)}} />
              <IoMdClose onClick={() => handleChangeModal()}/>
            </div>
          </ChangeContainer>
        :
          <>
            {detail?.map((text, inx) => {
              return (
                <>
                  <div className='planTextBox' key={inx}>
                    <div className='checkPlanBox'>
                      <input type='checkBox' />
                      <div className='planBox'>
                        <span>{text.inputTime}</span>
                        <span>{text.inputTitle}</span>
                      </div>
                    </div>
                    <div className='changeBox'>
                      <button onClick={() => handleChangeModal()}><LuPencilLine /></button>
                      <button onClick={() => removeBtn(text.inputTitle, text.inputTime, id)}><IoMdClose /></button>
                    </div>
                  </div>
                </>
              )
            })}
          </>
      } */}
          
      {detail?.map((text, inx) => {
        return (
          <PlanItem 
            key={inx}
            inx={inx}
            index={index}
            id={id}
            inputTime={text.inputTime}
            inputTitle={text.inputTitle}
            removeBtn={removeBtn}
            updateBtn={updateBtn}
          />


          //   <div className='planTextBox' key={inx}>
          //     <div className='checkPlanBox'>
          //       <input type='checkBox' />
          //       <div className='planBox'>
          //         <span>{text.inputTime}</span>
          //         <span>{text.inputTitle}</span>
          //       </div>
          //     </div>
          //     <div className='changeBox'>
          //       <button onClick={() => handleChangeModal()}><LuPencilLine /></button>
          //       <button onClick={() => removeBtn(text.inputTitle, text.inputTime, id)}><IoMdClose /></button>
          //     </div>
          //   </div>
          // </PlanItem>
        )
      })}
          
      {insertModal 
        ?
          <InsertModalBg>
            <InsertModal>
              <div>
                <span>일정</span>
                <input className='titleInput' type='text' value={inputTitle} onChange={handleInputTitle} />
              </div>
              <div>
                <span>시간</span>
                <input type='time' value={inputTime} onChange={handleInputTime} />
              </div>
              <button onClick={() => {handlePlusDetail(inputTitle, inputTime, id); handleInsertModal();}}><IoMdCheckmark className='checkBtn mainBtn' /></button>
              <button onClick={() => handleInsertModal()}><IoMdClose className='closeBtn' /></button>
                
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