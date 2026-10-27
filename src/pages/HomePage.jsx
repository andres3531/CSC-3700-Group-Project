import useFetch from "../hooks/useFetch.js";
import { useState } from 'react'
import ProgressSummary from "../components/ProgressSummary.jsx";
import CourseList from "../components/CourseList.jsx";

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
                <ProgressSummary courses={courses} completed={completed} />

                {isPending && <p>Loading....</p>}
                {error && <p className="text-danger">{String(error)}</p>}

                {courses.length > 0 && (
                    <CourseList
                        courses={courses}
                        completed={completed}
                        toggleCourse={toggleCourse}
                        isAvailable={isAvailable}
                    />
                )}
            </div>
        </>
    )
}

export default HomePage;