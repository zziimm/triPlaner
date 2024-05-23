import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import { selectLoginUser } from '../../features/userinfo/userInfoSlice';


import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useNavigate } from 'react-router-dom';

const PlanInsertLayout = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid gray;
  
  input {
    margin-top: 15px;
    color: #FFF;
    background-color: #3d3d3d;
    font-size: 22px;
    border: none;
    border-bottom: 1px solid #FFF;
  }
  .titleInput {
    width: 20rem;
  }
  .dateBox {
    margin-top: 10px;
  }
  .mainBtn {
    margin-top: 20px;
    font-size: 15px;
    font-weight: 700;
    line-height: 17px;
    width: 70px;
    border-radius: 10px;
    padding: 5px 15px;
  }
  .dateName {
    color: #FFF; 
    margin-right: 15px;
  }
`;

function PlanInsert() {
  const isLogin = useSelector(selectLoginUser);
  const email = isLogin?.email
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  useEffect(() => {
    if (!email) {
      navigate('/');
    }
  }, []);


  const titleChange = (e) => setTitle(e.target.value)
  const startDateChange = (e) => setStartDate(e.target.value)
  const endDateChange = (e) => setEndDate(e.target.value)

  const insert = { title, startDate, endDate, email }

  const writeData = async () => {
    try {
      console.log(email);
      await addDoc(collection(db, 'Planer'), insert)
      alert('일정 등록 완료!')
      navigate('/myPage')
      
    } catch (error) {
      console.log(error);
      alert('실패');
    }
  };

  return (
    <PlanInsertLayout>
      {/* <div className='title'> </div> */}
      <input className='titleInput' value={title} onChange={titleChange} type='text' placeholder='여행지 또는 제목'/>
      <div className='dateBox'>
        <span className='dateName'>출발일</span>
        <input value={startDate} onChange={startDateChange} type='date' placeholder='날짜'/>
      </div>
      <div>
        <span className='dateName'>도착일</span>
        <input value={endDate === '' || endDate < startDate ? startDate : endDate} onChange={endDateChange} type='date' placeholder='날짜'/>
        {/* <input value={isLogin.email} onChange={writerChange} type='hidden'/> */}
      </div>
      <button className='mainBtn' onClick={writeData}>등록!</button>
    </PlanInsertLayout>
  );
}

export default PlanInsert;