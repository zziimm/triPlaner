import React, { useState, useEffect } from 'react';
import { css, styled } from 'styled-components';
import { RiArrowDropRightLine, RiArrowDropDownLine } from "react-icons/ri";
import { IoMdClose, IoMdCheckmark } from "react-icons/io";
import { LuPencilLine } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';







const PlanListItemLayout = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;

  /* & + & {
    border-top: 1px solid #dee2e6;
  } */
  svg.pen {
    width: 19px;
    height: 19px;
    padding: 0 5px;
  }
  svg {
    width: 25px;
    height: 25px;
    color: gray;
  }
  .check {
    color: #fff;
  }
`;

const DropdownBtn = styled.div`
  display: flex;
  svg {
    color: #fff;
    width: 25px;
    height: 25px;
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
  }

`;

const Text = styled.div`
  margin-left: 0.1rem;
  word-break: break-all;
  
  
  &.title{
    flex: 1;
    font-weight: 500;
  }
  &.date {
    margin-left: 0.3rem;
    font-size: 11px;
  }
  &.dday {
    padding: 2px ;
    border-radius: 50px;
    font-family: "paybooc-Light", sans-serif;
    font-weight: 600;
    transition: 0.25s;
    text-align: center;

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

  &.start::after {
    padding-left: 3px;
    content: "~";
  }

  ${props => props.checked &&
    css`
      color: #adb5bd;
      text-decoration: line-through;
    `
  }
`;


function PlanListItem({title, endDate, startDate, id, removeBtn, updateBtn}) {
  const navigate = useNavigate();
  const [changeTitle, setChangeTitle] = useState(title);
  const [inputModal, setInputModal] = useState(false);
  const [changeStartDate, setChangeStartDate] = useState(startDate)
  const [changeEndDate, setChangeEndDate] = useState(endDate)

  const [dday, setDday] = useState('')
  
  useEffect(() => {
    find_day();
  }, []);
  
  const handleInputModal = () => {
    setInputModal(!inputModal)
  };
  const handleInput = (e) => setChangeTitle(e.target.value);
  const startDateChange = (e) => setChangeStartDate(e.target.value)
  const endDateChange = (e) => setChangeEndDate(e.target.value)



  function find_day(){
    const christmas = new Date(startDate);  //디데이 설정
    const today = new Date();  //밀리세컨드 단위의 시간 표시 1초=1000
    
    const day_gap = christmas - today;  //크리스마스까지 남은 밀리세컨드 초 값
    
    const day = Math.floor(day_gap / (1000*60*60*24));
    const hour = Math.floor(day_gap / (1000*60*60) % 24);
    const min = Math.floor(day_gap / (1000*60) % 60);
    const sec = Math.floor(day_gap / 1000%60);
    setDday(day);

  }
  // setInterval(find_day, 1000);  //초마다 디데이 기능 실행


  return (
    <PlanListItemLayout>
      <DropdownBtn><RiArrowDropRightLine /></DropdownBtn>
      { inputModal 
        ?
        <>
          <ChangeContainer>
            <div className='changeBox'>
              <div>
                <input type='text' value={changeTitle} onChange={handleInput} />
              </div>
              <div>
                <span className='dateName'>출발일</span>
                <input value={changeStartDate} onChange={startDateChange} type='date' placeholder='날짜'/>
              </div>
              <div>
                <span className='dateName'>도착일</span>
                <input value={changeEndDate === '' || changeEndDate < changeStartDate ? changeStartDate : changeEndDate} onChange={endDateChange} type='date' placeholder='날짜'/>
              </div>
            </div>
            <div className='btnBox'>
              <IoMdCheckmark className='check' onClick={() => {updateBtn(id, changeTitle, changeStartDate, changeEndDate); setInputModal(false)}} />
              <IoMdClose onClick={() => handleInputModal()}/>
            </div>
          </ChangeContainer>
        </>
        :
        <>
          <Text className='title' onClick={() => navigate(`/planDetail/${id}`)}>{title}</Text>
          <Text className='date dday'>D-{dday}</Text>
          <Text className='date start'>{startDate}</Text>
          <Text className='date'>{endDate}</Text>
          <LuPencilLine className='pen' onClick={() => handleInputModal()} />
          <IoMdClose onClick={() => removeBtn(id)}/>
        </>
      }
    </PlanListItemLayout>
  );
}

export default PlanListItem;