// 리덕스!!! 는 슬라이스로 구성됨

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 서버요청인 extraReducers의 3가지를 여기서 만들어줘야됨
// axios깔아서 만듬
export const asyncUpFetch = createAsyncThunk(
  "countSlice/asyncUpFetch",
  async () => {
    const response = await axios.get("http://localhost:3010/count");

    return response.data.count;
  }
);
// 1썽크 3케이스라서 이렇게만 해두면 밑의 3케이스에대한 답이 입력된것

export const countSlice = createSlice({
  name: "countSlice",
  initialState: {
    count: 0,
    isLoading: false,
    // 연산을 백엔드에서 해서 보내주니까 로딩중
  },

  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
      // action안의 payload에 들어가 있음 값이
    },
    decrementByAmount: (state, action) => {
      state.count -= action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncUpFetch.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(asyncUpFetch.fulfilled, (state,action) => {
      state.count = action.payload;
      state.isLoading = false;
    });
    builder.addCase(asyncUpFetch.rejected, (state) => {
      state.isLoading = false;
    });
  },
  // reducer는 동기적인 요청이다.
  // 하나의 요청을 만들때 3개를 요청함
  // 왜 3개인가? 서버로 부터 요청해서 받는 비동기 요청은 거절(rejected)/로딩중(pending)/이행(fulfilled) 3가지로 나뉨
  // 서버가 먼곳에 있거나 꺼져있는경우도 많기 때문
});

export const { increment, decrement, incrementByAmount, decrementByAmount } =
  countSlice.actions;
// 여기다 꺼내놓으면 쓰기도 쉽고 유지보수도 쉬움

// 리덕스는 이처럼 js형태임
export default countSlice;
