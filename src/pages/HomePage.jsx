import useFetch from "../hooks/useFetch.js";
import {useState} from 'react'
import ProgressSummary from "../components/ProgressSummary.jsx";
import CourseList from "../components/CourseList.jsx";

function HomePage() {
    const URL = import.meta.env.VITE_API_BASE_URL;

    const {data, isPending, error} = useFetch(`${URL}/courses`);

    const courses = Array.isArray(data) ? data : []

    const [completed, setCompleted] = useState(() => {
        const saved = localStorage.getItem("completedCourses")
        return saved ? JSON.parse(saved) : []
    })

    const [filter, setFilter] = useState("All")

    const [isSaved, setIsSaved] = useState(false)

    function toggleCourse(id) {
        setIsSaved(false)

        setCompleted(previous => {

            if (!previous.includes(id)) {
                return [...previous, id]
            }

            let updated = previous.filter(courseId => courseId !== id)

            let changed = true

            while (changed) {
                const oldLength = updated.length

                updated = updated.filter(courseId => {
                    const course = courses.find(course => Number(course.id) === courseId)

                    return course && course.prerequisites.every(prereqId =>
                        updated.includes(Number(prereqId))
                    )
                })

                changed = updated.length !== oldLength
            }

            return updated
        })
    }

    function isAvailable(course) {
        return course.prerequisites.every(id =>
            completed.includes(Number(id))
        )
    }

    function saveProgress() {
        localStorage.setItem("completedCourses", JSON.stringify(completed))
        setIsSaved(true)
    }

    const availableCount = courses.filter(course =>
        !completed.includes(Number(course.id)) && isAvailable(course)
    ).length

    const lockedCount = courses.filter(course =>
        !completed.includes(Number(course.id)) && !isAvailable(course)
    ).length

    const filteredCourses = courses.filter(course => {
        if (filter === "Completed") {
            return completed.includes(Number(course.id))
        }

        if (filter === "Remaining") {
            return !completed.includes(Number(course.id))
        }

        return true
    })

    return (
        <>
            <div className="container mt-4">
                <h1>CS Developer Track</h1>

                <ProgressSummary
                    courses={courses}
                    completed={completed}
                    availableCount={availableCount}
                    lockedCount={lockedCount}
                />

                <div className="d-flex justify-content-between align-items-center mt-3 mb-3">

                    <div className="btn-group">
                        <button
                            className={filter === "All" ? "btn btn-primary" : "btn btn-outline-primary"}
                            onClick={() => setFilter("All")}
                        >
                            All Courses
                        </button>

                        <button
                            className={filter === "Completed" ? "btn btn-primary" : "btn btn-outline-primary"}
                            onClick={() => setFilter("Completed")}
                        >
                            Completed Only
                        </button>

                        <button
                            className={filter === "Remaining" ? "btn btn-primary" : "btn btn-outline-primary"}
                            onClick={() => setFilter("Remaining")}
                        >
                            Remaining
                        </button>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        {isSaved && (
                            <span className="text-success small">
                                Progress saved.
                            </span>
                        )}

                        <button className="btn btn-success" onClick={saveProgress}>
                            Save
                        </button>
                    </div>

                </div>

                {isPending && <p>Loading.....</p>}

                {error && <p className="text-danger">{String(error)}</p>}

                {courses.length > 0 && (
                    <CourseList
                        courses={filteredCourses}
                        allCourses={courses}
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
