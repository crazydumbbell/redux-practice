import { useDispatch, useSelector } from "react-redux";
import {
  asyncUpFetch,
  decrement,
  decrementByAmount,
  increment,
  incrementByAmount,
} from "./countSlice";
import { useState } from "react";

const App = () => {
  const { count } = useSelector((state) => state.countReducer);
  const dispatch = useDispatch();

  const [num, setNum] = useState(0);

  return (
    <div className="bg-red-100 min min-h-screen flex flex-col justify-center items-center">
      <div className="text-6xl">{count}</div>
      <input
        type="number"
        value={num}
        onChange={(e) => setNum(e.target.value)}
      />
      <div className="mt-8 text-2xl flex gap-8">
        <button onClick={() => dispatch(increment())}>increment</button>
        <button onClick={() => dispatch(decrement())}>decrement</button>
        <button onClick={() => dispatch(incrementByAmount(+num))}>
          incrementByAmount
        </button>
        <button onClick={() => dispatch(decrementByAmount(+num))}>
          decrementByAmnount
        </button>
        <button onClick={() => dispatch(asyncUpFetch())}>asyncUpFetch</button>
      </div>
    </div>
  );
};

export default App;
