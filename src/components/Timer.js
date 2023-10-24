import { useEffect } from "react"

function Timer({ Time, dispatch }) {
    const minus = Math.round(Time / 60);
    const second = Math.round(Time % 60);
    useEffect(function () {
        const id = setInterval(function () {
            dispatch({ type: "tick" });
        }, 1000);
        return () => clearInterval(id);
    }, [dispatch]);
    return (
        <p className="timer">
            {minus < 10 && "0"}{minus} : {second < 10 ? "0" : ""}{second}
        </p>
    )
}

export default Timer
