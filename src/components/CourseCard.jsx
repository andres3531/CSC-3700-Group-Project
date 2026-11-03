function CourseCard({course, completed, toggleCourse, isAvailable, allCourses}) {
    let status = "🔒Locked"
    let badgeColor = "bg-secondary"

    if (completed.includes(Number(course.id))) {
        status = "Completed"
        badgeColor = "bg-success"
    } else if (isAvailable(course)) {
        status = "Available"
        badgeColor = "bg-primary"
    }

    let cardColor = "border-secondary bg-body-secondary"

    if (status === "Completed") {
        cardColor = "border-success bg-success-subtle"
    } else if (status === "Available") {
        cardColor = "border-primary"
    }

    return (
        <div className="col-md-4 mt-4">
            <div className={"card h-100 border-2 " + cardColor}>

                <div className="card-header d-flex justify-content-between align-items-center">
                    <span className="fw-bold">{course.number}</span>
                    <span className={"badge " + badgeColor}>{status}</span>
                </div>

                <div className="card-body">
                    <h5 className="card-title">{course.title}</h5>

                    <p className="card-text">{course.credits} credits</p>

                    <p className="card-text">{course.description}</p>

                    <p className="card-text">
                        Prerequisites: {course.prerequisites.length === 0
                        ? "None"
                        : course.prerequisites.map(id => {
                            const prerequisite = allCourses.find(c =>
                                Number(c.id) === Number(id)
                            )

                            return prerequisite ? prerequisite.number : "Unknown"
                        }).join(" & ")
                    }
                    </p>

                    <div className="form-check mt-3 border-top border-2">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={course.id}
                            checked={completed.includes(Number(course.id))}
                            onChange={() => toggleCourse(Number(course.id))}
                            disabled={!isAvailable(course)}
                        />

                        <label className="form-check-label" htmlFor={course.id}>
                            {status === "🔒Locked"
                                ? "Complete prerequisites first"
                                : "Completed"
                            }
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard
