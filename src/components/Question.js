function Question({ question, dispatch, answer }) {
    console.log(question);
    const hasAnswer = answer !== null;
    return (
        <div className="options">
            <h4>{question.question}</h4>
            {question.options.map((op, index) =>
                <button key={index} className={`btn btn-option ${index === answer ? "answer" : ""} ${hasAnswer ? index === question.correctOption ? "correct" : "wrong" : ""}`}
                    onClick={() => dispatch({ type: "New answer", payload: index })} disabled={hasAnswer}>{op}
                </button>)}
        </div>
    )
}

export default Question
