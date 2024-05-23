import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { db } from '../../firebase.config';
import { FaPlus } from "react-icons/fa";
import PlanBox from './PlanBox.js';
import { useSelector } from 'react-redux';
import { selectLoginUser } from '../../features/userinfo/userInfoSlice';


const PlanDetailLayout = styled.div`
  min-height: 400px;
  max-height: 550px;
  overflow-y: auto;
  position: relative;
  padding: 1rem 0rem;


  h1 {
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
  }
  button.plusDate {
    width: 100%;
    padding: 15px 0;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    color: #fff;
  }
  
`;





function PlanDetail(props) {
  const { planId } = useParams();
  const isLogin = useSelector(selectLoginUser);

  const navigate = useNavigate();

  const [planTitle, setPlanTitle] = useState('');
  const [planDetail, setPlanDetail] = useState('');
  const [plusDate, setPlusDate] = useState('')



  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingRef = query(collection(db, 'Planer'))
        const docSnap = await getDocs(listingRef)
        const listings = []    
        docSnap.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        const filterplan = listings.filter((plan) => plan.id === planId)
        setPlanTitle(filterplan[0]);
      } catch (error) {
        alert('불러오기에 실패하였습니다.');
        console.log(error);
      }
    }
    const fetchDetailPlan = async () => {
      try {
        const listingRef = query(collection(db, 'Planer', planId, `DetailPlan`))
        const docSnap = await getDocs(listingRef)
        const listings = []    
        docSnap.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        console.log(listings);
        setPlanDetail(listings);
      } catch (error) {
        alert('불러오기에 실패하였습니다.');
        console.log(error);
      }
    }
    fetchListings()
    fetchDetailPlan()
    
    if (!isLogin.email) {
      navigate('/');
    }

  }, [plusDate])
  
  

  // 박 구하기
  // const getDateDiff = (d1, d2) => {
  //   const date1 = new Date(d1);
  //   const date2 = new Date(d2);
      
  //   const diffDate = date1.getTime() - date2.getTime();
      
  //   return Math.abs(diffDate / (1000 * 60 * 60 * 24));
  // }

  // const resdays = getDateDiff(startDate, endDate);

  const handlePlusDate = async () => {
    try {
      console.log(planDetail);
      const docRef = doc(collection(db, 'Planer', planId, `DetailPlan`));
      await setDoc(docRef, {
        day: planDetail.length + 1,
        detail: {}
      });

      alert('일정 등록 완료!')
      setPlusDate(planDetail.length + 1)
    } catch (error) {
      console.log(error);
      alert('실패');
    }
  }


  if (!planDetail) {
    return
  }

  let planDetailSort = planDetail.sort((a,b) => {
    if(a.data.day > b.data.day) return 1;
    if(a.data.day < b.data.day) return -1;
    return 0;
  });


  
  return (
    <>
      <PlanDetailLayout>
        <h1>{planTitle?.data?.title}</h1>
        {planDetailSort?.map((plan) => {
          return <PlanBox 
            key={plan.id}
            day={plan.data.day}
          />
          //   <>
          //     <PlanDateBox key={plan.id}>
          //       <p>Day {plan.data.day}</p>
          //       <PlanTextBox>

          //       </PlanTextBox>
          //       <button onClick={() => handleInsertModal()}><FaPlus /></button>
          //     </PlanDateBox>
          //   </>
          // )
        })}
        <button className='plusDate' onClick={() => handlePlusDate()}><FaPlus /></button>
      </PlanDetailLayout>
    </>
  );
}

export default PlanDetail;