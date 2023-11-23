import { configureStore } from "@reduxjs/toolkit";
import { countSlice } from "./countSlice";

const store = configureStore({
  reducer: {
    countReducer: countSlice.reducer,
  },
});

export default store;

// 스토어는 슬라이스에 리듀서를 부착해줌
