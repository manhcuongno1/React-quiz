function FinishScreen({ points, MaxPoint, highscore, dispatch }) {
    const percent = Math.round((points / MaxPoint) * 100);
    let emoji;
    if (percent === 100) emoji = "😎";
    if (percent >= 80 && percent < 100) emoji = "😋";
    if (percent >= 50 && percent < 80) emoji = "😪";
    if (percent < 50 && percent > 0) emoji = "😂";

    if (percent === 0) emoji = "😩";
    return (
        <>
            <p className="result">
                <span>{emoji}</span>You scored {points} out of {MaxPoint} ({percent}%)
            </p>
            <p className="highscore">(HighScore: {highscore} points)</p>
            <button className="btn btn-ui" onClick={() => dispatch({ type: "restart" })}>
                Restart quiz
            </button>
        </>

    )
}

export default FinishScreen
