function ProgressSummary({courses, completed, availableCount, lockedCount}) {

    const theProgress = courses.length > 0 ? (completed.length / courses.length) * 100 : 0

    return (
        <>
            <div className="card card-body">
                <div className="d-flex gap-3 mb-2">
                    <span className="text-success fs-5">{completed.length} of {courses.length} completed</span>
                    <span className="text-primary fs-5">{availableCount} Available</span>
                    <span className="text-secondary fs-5">{lockedCount} Locked</span>
                </div>

                <div className="progress mb-2">
                    <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: theProgress + "%"}}>
                        {theProgress}%
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProgressSummary