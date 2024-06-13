import React, { useState } from 'react';
import { css, styled } from 'styled-components';
import { IoMdClose, IoMdCheckmark } from "react-icons/io";
import { LuPencilLine } from "react-icons/lu";

const PlanItemLayout = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding-top: 0.3rem;
  /* border-bottom: 1px solid gray; */
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

const PlanTextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  width: 100%;
  text-align: start;
  
span + span {
  margin-left: 5px;
}
.checkPlanBox {
  display: flex;
  align-items: center;
  
}
.planBox {
    margin-left: 10px;
    
  }
  .changeBox {

    svg {color: #fff;}
  }
  
  ${props => props.isCheckedBox && 
    css`
      background-color: red;

  `
  }
`;



const ChangeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;


  .changeBox {

    input {
      background-color: #3d3d3d;
      border-bottom: 1px solid #fff;
    }

    div + div {
      margin-top: 10px;
    }
    div span {
      margin-right: 10px;
    }
  }

  .btnBox {
    display: flex;
    align-items: center;
    svg + svg {
      margin-left: 15px;
    }
  }
`;


function PlanItem({ inputTime, inputTitle, id, inx, index, removeBtn, updateBtn }) {
  const [changeTitle, setChangeTitle] = useState(inputTitle);
  const [changeTime, setChangeTime] = useState(inputTime)
  const [changeModal, setChangeModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);


  const handleChangeModal = () => setChangeModal(!changeModal);
  const handleIsChecked = () => setIsChecked(!isChecked);

  const handleChangeTitle = (e) => setChangeTitle(e.target.value);
  const startDateChange = (e) => setChangeTime(e.target.value);

  return (
    <PlanItemLayout>
      {changeModal
        ?
          <ChangeContainer>
            <div className='changeBox'>
              <div>
                <input type='text' value={changeTitle} onChange={handleChangeTitle} />
              </div>
              <div>
                <span className='dateName'>시간</span>
                <input value={changeTime} onChange={startDateChange} type='time' />
              </div>
            </div>
            <div className='btnBox'>
              <IoMdCheckmark className='check' onClick={() => {updateBtn(inx, index, id, inputTitle, inputTime, changeTitle, changeTime, ); setChangeModal(false)}} />
              <IoMdClose onClick={() => handleChangeModal()}/>
            </div>
          </ChangeContainer>  
        :
          <PlanTextBox $isCheckedBox={isChecked}>
            <div className='checkPlanBox'>
              <div className='planBox'>
                <input type='checkbox' onClick={()=> handleIsChecked()} />
                <span>{inputTime}</span>
                <span>{inputTitle}</span>
              </div>
            </div>
            <div className='changeBox'>
              <button onClick={() => handleChangeModal()}><LuPencilLine /></button>
              <button onClick={() => removeBtn(inputTitle, inputTime, id)}><IoMdClose /></button>
            </div>
          </PlanTextBox>
      }
    </PlanItemLayout>
  );
}

export default PlanItem;