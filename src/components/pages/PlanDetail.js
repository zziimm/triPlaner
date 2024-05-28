import { FieldValue, addDoc, arrayUnion, collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
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
  overflow: overlay;

  &::-webkit-scrollbar {

    width: 5px;

  }

  &::-webkit-scrollbar-thumb {

    background-color: hsla(0, 0%, 42%, 0.49);
    border-radius: 100px;

  }

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
  const [count, setCount] = useState('')


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
        const listingRef = query(collection(db, `DetailPlan`), where("planId", "==", `${planId}`))
        const docSnap = await getDocs(listingRef)
        const listings = []    
        docSnap.forEach((doc) => {
          listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        let planDetailSort = listings.sort((a,b) => {
          if(a.data.day > b.data.day) return 1;
          if(a.data.day < b.data.day) return -1;
          return 0;
        });
        setPlanDetail(planDetailSort);
      } catch (error) {
        alert('불러오기에 실패하였습니다.');
        console.log(error);
      }
    }
    
    // Planer 안에 데이터 불러오기 05/26까지 사용
    // const fetchDetailPlan = async () => {
    //   try {
    //     const listingRef = query(collection(db, 'Planer', planId, `DetailPlan`))
    //     const docSnap = await getDocs(listingRef)
    //     const listings = []    
    //     docSnap.forEach((doc) => {
    //       listings.push({
    //         id: doc.id,
    //         data: doc.data()
    //       })
    //     })
    //     console.log(listings);
    //     setPlanDetail(listings);
    //   } catch (error) {
    //     alert('불러오기에 실패하였습니다.');
    //     console.log(error);
    //   }
    // }
    fetchListings()
    fetchDetailPlan()
    
    if (!isLogin.email) {
      navigate('/');
    }

  }, [plusDate, count])
  

  // 박 구하기
  // const getDateDiff = (d1, d2) => {
  //   const date1 = new Date(d1);
  //   const date2 = new Date(d2);
      
  //   const diffDate = date1.getTime() - date2.getTime();
      
  //   return Math.abs(diffDate / (1000 * 60 * 60 * 24));
  // }
  // const resdays = getDateDiff(startDate, endDate);


  // Planer 안에 Date 생성 05/26까지 사용
  // const handlePlusDate = async () => {
  //   try {
  //     console.log(planDetail);
  //     const docRef = doc(collection(db, planId, `DetailPlan`));
  //     await setDoc(docRef, {
  //       day: planDetail.length + 1,
  //       detail: []
  //     });

  //     alert('일정 등록 완료!')
  //     setPlusDate(planDetail.length + 1)
  //   } catch (error) {
  //     console.log(error);
  //     alert('실패');
  //   }
  // }
  
  const handlePlusDate = async () => {
    try {

      console.log(planDetail);
      const docRef = doc(collection(db, `DetailPlan`));
      await setDoc(docRef, {
        planId,
        day: planDetail.length + 1,
        detail: []
      });

      // alert('일정 등록 완료!')
      setPlusDate(planDetail.length + 1)
    } catch (error) {
      console.log(error);
      alert('실패');
    }
  }

  // Planer 안에  detailPlan생성 05/26까지 사용
  // const handlePlusDetail = async (inputTitle, inputTime, id) => {
  //   console.log(planId);
  //   console.log(id);
  //   try {
  //     // const docRef = doc(collection(db, 'Planer', planId, `DetailPlan`, id, "text"));
  //     await addDoc(collection(db, 'Planer', planId, `DetailPlan`, id, "text"), {
  //       text: {inputTitle, inputTime}
  //     });
  //     alert('일정 등록 완료!')
  //   } catch (error) {
  //     console.log(error);
  //     alert('실패');
  //   }
  // }
  
  const handlePlusDetail = async (inputTitle, inputTime, id) => {
    console.log(planId);
    console.log(id);
    try {
      await updateDoc(doc(db, "DetailPlan", `${id}`), {
        detail: arrayUnion({inputTitle, inputTime})
      });
      setCount(2);
      alert('일정 등록 완료!')
    } catch (error) {
      console.log(error);
      alert('실패');
    }
  }


  
  // let planDetailSort = planDetail.sort((a,b) => {
  //   if(a.data.day > b.data.day) return 1;
  //   if(a.data.day < b.data.day) return -1;
  //   return 0;
  // });
  
  const removeBtn = async (inputTitle, inputTime, id) => {
    try {
      await deleteDoc(doc(db, "DetailPlan", `${id}`), {
        detail: delete(inputTitle, inputTime)
      });
      setCount(2);
      alert('삭제 완료!');
    } catch (error) {
      console.log(error);
      alert("실패");
    }
  };
  
  
  if (!planDetail) {
    return
  }
  
  return (
    <>
      <PlanDetailLayout>
        <h1>{planTitle?.data?.title}</h1>
        {planDetail?.map((plan) => {
          return <PlanBox 
            key={plan.id}
            id={plan.id}
            day={plan.data.day}
            detail={plan.data.detail}
            handlePlusDetail={handlePlusDetail}
            removeBtn={removeBtn}
          />
        })}
        <button className='plusDate' onClick={() => handlePlusDate()}><FaPlus /></button>
      </PlanDetailLayout>
    </>
  );
}

export default PlanDetail;