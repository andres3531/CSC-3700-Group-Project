function CourseCard({ course, completed, toggleCourse, isAvailable }) {
    return (
        <div className="col-md-4">
            <div className="card h-100">
                <div className="card-body">
                    <h5 className="card-title">{course.number}</h5>
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
                            disabled={!isAvailable(course) && !completed.includes(Number(course.id))}
                        />

                        <label className="form-check-label" htmlFor={course.id}>Completed</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard
