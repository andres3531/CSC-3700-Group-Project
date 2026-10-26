import useFetch from "../hooks/useFetch.js";
import { useState } from 'react'
function HomePage() {
    const URL = import.meta.env.VITE_API_BASE_URL;

    const { data , isPending, error } = useFetch(`${URL}/courses`);

    const courses = Array.isArray(data) ? data : []

    const [completed, setCompleted] = useState([])

    function toggleCourse(id) {
        setCompleted(previous => previous.includes(id) ? previous.filter(courseId => courseId !== id) : [...previous, id])
    }

    function isAvailable(course) {
        return course.prerequisites.every(id => completed.includes(id))
    }

    return (
        <>
            <div className="container mt-4">
                <h1>CS Developer Track</h1>
                <p>{completed.length} of {courses.length} courses completed</p>
                {isPending && <p>Loading....</p>}
                {error && <p className="text-danger">{String(error)}</p>}

                {courses.length > 0 && (
                    <div className="row g-3">
                        {courses.map(course => (
                            <div className="col-md-4" key={course.id}>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">{course.number}</h5>
                                        <p className="card-text">{course.title}</p>
                                        <p className="card-text">{course.credits} credits</p>
                                        <p className="card-text">{course.description}</p>
                                        <p className="card-text">Prerequisites: {course.prerequisites.length === 0 ? "None" : course.prerequisites}</p>
                                        {/*CHECKBOX STARTS HERE*/}
                                        <div className="form-check mt-3 border-top border-2">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={course.id}
                                                checked={completed.includes(Number(course.id))}
                                                onChange={() => toggleCourse(Number(course.id))}
                                                disabled={!isAvailable(course) && !completed.includes(Number(course.id))}
                                                //checkbox will be disabled only if BOTH ARE TRUE, starting off !isAvailable(course) is true because
                                                //there is nothing in completed yet so every() returns true, !completed.includes(Number(course.id))
                                                //returns false because there is nothing in completed.
                                            />
                                            <label className="form-check-label" htmlFor={course.id}>
                                                Completed
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </>
    )
}

export default HomePage;