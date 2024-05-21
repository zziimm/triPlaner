import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { db } from '../../firebase.config';
import { FaPlus } from "react-icons/fa";


const PlanDetailLayout = styled.div`
  min-height: 500px;
  max-height: 550px;
  overflow-y: auto;

  padding: 1rem 1.2rem;
  border-bottom: 1px solid gray;


  h1 {
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
  }
  button {
    width: 100%;
    padding: 15px 0;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
  }
  
`;

function PlanDetail(props) {
  const { planId } = useParams();
  const [planDetail, setPlanDetail] = useState('');

  useEffect(() => {
    fetchListings()
  }, [])

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
      setPlanDetail(filterplan[0]);
    } catch (error) {
      alert('불러오기에 실패하였습니다.');
      console.log(error);
    }
  }

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
      console.log(planDetail.id);
      await addDoc(collection(db, 'Planer'),)
      alert('일정 등록 완료!')
      
    } catch (error) {
      console.log(error);
      alert('실패');
    }

  }
  return (
    <PlanDetailLayout>
      <h1>{planDetail?.data?.title}</h1>
      <button><FaPlus /></button>
      
    </PlanDetailLayout>
  );
}

export default PlanDetail;