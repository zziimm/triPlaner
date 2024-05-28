import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import PlanListItem from './PlanListItem';
import InsertBtn from '../InsertBtn';

import { collection, getDocs, where, query, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase.config'
import { useSelector } from 'react-redux';
import { selectLoginUser } from '../../features/userinfo/userInfoSlice';
import { useNavigate } from 'react-router-dom';



const PlanListLayout = styled.div`
  min-height: 400px;
  max-height: 550px;
  overflow-y: auto;
  overflow: overlay;

  &::-webkit-scrollbar {

    width: 5px;

  }

  &::-webkit-scrollbar-thumb {

    background-color: hsla(0, 0%, 42%, 0.49);
    border-radius: 100px;

  }

`;


function PlanList(props) {
  const navigate = useNavigate();

  const [planList, setPlanList] = useState(null);
  const isLogin = useSelector(selectLoginUser);
  const email = isLogin.email

  useEffect(() => {
    fetchListings();
    if (!email) {
      navigate('/');
    }
  }, [])
  

  const fetchListings = async () => {
    try {
      const listingRef = query(collection(db, 'Planer'), where("email", "==", `${email}`))
      const docSnap = await getDocs(listingRef)
      const listings = []    
      docSnap.forEach((doc) => {      
        listings.push({
          id: doc.id,
          data: doc.data()
        })
      })
      console.log(listings);
      setPlanList(listings)
    } catch (error) {
      console.log(error);
    }
  }

  const removeBtn = async (id) => {
    await deleteDoc(doc(db, "Planer", `${id}`));
    fetchListings();
  };

  const updateBtn = async (id, changeTitle, changeStartDate, changeEndDate) => {
    const washingtonRef = doc(db, "Planer", `${id}`);
    await updateDoc(washingtonRef, {
      title: `${changeTitle}`,
      startDate: `${changeStartDate}`,
      endDate: `${changeEndDate}`,
    });
    fetchListings();
  };


  return (
    <PlanListLayout>
      {planList?.map((plan) => {
        return <PlanListItem 
          key={plan.id}
          id={plan.id}
          title={plan.data.title}
          endDate={plan.data.endDate}
          startDate={plan.data.startDate}
          removeBtn={removeBtn}
          updateBtn={updateBtn}
        />
      })}
      <InsertBtn navigate={() => navigate('/planInsert')}/>
    </PlanListLayout>
  );
}

export default PlanList;