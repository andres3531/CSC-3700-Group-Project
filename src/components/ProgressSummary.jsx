function ProgressSummary({ courses, completed }) {

    const theProgress = courses.length > 0 ? (completed.length / courses.length) * 100 : 0
    //the reason I added a ternary operator here is because we don't want to try to divide by 0 before data gets here

    return (
        <>
            <p>{completed.length} of {courses.length} courses completed</p>
            <div className="progress mb-2">
                <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: theProgress + "%" }}>
                    {theProgress}%
                </div>
            </div>
        </>
    )
}

export default ProgressSummary
