import { useReducer, useState } from "react";

function DateCounter() {
  function reducer(state, action) {
    switch (action.type) {
      case "dec":
        return { ...state, count: state.count - state.step }
      case "inc":
        return { ...state, count: state.count + state.step }
      case "define":
        return { ...state, count: action.payload }
      case "setstep":
        return { ...state, step: action.payload }
      case "reset":
        return initialState;

    }



  }
  const initialState = { count: 0, step: 1 };
  const [state, setState] = useReducer(reducer, initialState);

  const { count, step } = state;
  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setState((count) => count - 1);
    setState({ type: "dec" });
  };

  const inc = function () {
    // setState((count) => count + 1);
    setState({ type: "inc" });
  };

  const defineCount = function (e) {
    setState({ type: "define", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    setState({ type: "setstep", payload: Number(e.target.value) });
  };

  const reset = function () {
    setState({ type: "reset" });

  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
