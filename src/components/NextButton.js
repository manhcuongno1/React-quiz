function NextButton({ dispatch, answer, index, numQuestions }) {
    if (answer === null) return null;
    if (index < numQuestions - 1) return (
        <button className="btn btn-ui" onClick={() => dispatch({ type: "NextQuestion" })}>
            Next
        </button>
    )
    else return (
        <button className="btn btn-ui" onClick={() => dispatch({ type: "Finish" })}>
            Finish
        </button>
    )

}

export default NextButton
