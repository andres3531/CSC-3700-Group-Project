function CourseCard({course, completed, toggleCourse, isAvailable}) {
    let status = "🔒Locked"
    let badgeColor = "bg-secondary"
    //im assuming it is locked first, then we are checking if its complete or available. Remember this is in a map so every single time this runs its unique
    if (completed.includes(Number(course.id))) {
        status = "Completed"
        badgeColor = "bg-success"
    } else if (isAvailable(course)) {
        status = "Available"
        badgeColor = "bg-primary"
    }

    return (
        <div className="col-md-4 mt-4">
            <div className="card h-100">
                <div className="card-body">
                    <h5 className="card-title">{course.number}</h5>
                    <span className={"badge " + badgeColor}>{status}</span>
                    <p className="card-text">{course.title}</p>
                    <p className="card-text">{course.credits} credits</p>
                    <p className="card-text">{course.description}</p>

                    <p className="card-text">Prerequisites: {course.prerequisites.length === 0 ? "None" : course.prerequisites}</p>

                    <div className="form-check mt-3 border-top border-2">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={course.id}
                            checked={completed.includes(Number(course.id))}
                            onChange={() => toggleCourse(Number(course.id))}
                            disabled={!isAvailable(course)}
                            //the reason we have Number() in line 18,19,20 is because originally when I wrote this I didnt have Number()
                            //so when it tried to use .includes() it was comparing string vs an int. so when we use Number() it compares properly
                        />

                        <label className="form-check-label" htmlFor={course.id}>{status === "🔒Locked" ? "Complete prerequisites first" : "Completed"}</label>
                        {/*
                         htmlFor is what allows us to be able to also click on the word completed
                         and it still checks or unchecks it, we dont need this but I think it makes it better
                         */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard