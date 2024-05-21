import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: [],
}

const userInfoSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    // 회원가입
    getUserInfo: (state, { payload: inputInfo }) => {
      const targetInfo = state.userInfo.find(info => info.id === inputInfo.id)
      if (targetInfo) {
        alert('이미 가입된 아이디 입니다.')
        return;
      } else {
        state.userInfo.push(inputInfo)
      }
    },
    pushUserInfo: (state, action) => {
      state.userInfo.push(action.payload)
    },

    // 현재 로그인 ID
    getLoginUserInfo: (state, action) => {
      console.log(action.payload);
      state.loginUserInfo = action?.payload;
    },
    
    getLoginUser: (state, action) => {
      console.log(action.payload);
      state.userInfo = action.payload;
    },

  }
});

export const { getLoginUser } = userInfoSlice.actions;

export const selectLoginUser = state => state.userInfo.userInfo;

export default userInfoSlice.reducer;
