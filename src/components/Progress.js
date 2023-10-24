function Progress({ index, numQuestions, points, MaxPoint, answer }) {
    return (
        <>
            <progress max={numQuestions} value={index + Number(answer != null)}></progress>
            <header className="progress">
                <p>Question <strong>{index + Number(answer != null)}</strong> / {numQuestions}</p>
                <p>{points} / {MaxPoint}</p>
            </header>
        </>
    )
}

export default Progress
