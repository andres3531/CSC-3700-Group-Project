import useFetch from "../hooks/useFetch.js";
import {useState, useEffect} from 'react'
import ProgressSummary from "../components/ProgressSummary.jsx";
import CourseList from "../components/CourseList.jsx";

function HomePage() {
    const URL = import.meta.env.VITE_API_BASE_URL;

    const {data, isPending, error} = useFetch(`${URL}/api/courses`); //we had to add /api here

    const courses = Array.isArray(data) ? data : []

    const [completed, setCompleted] = useState([])

    const [completedLoaded, setCompletedLoaded] = useState(false)

    const [saveError, setSaveError] = useState("")

    const [isSaving, setIsSaving] = useState(false)

    //this is for which courses user 1 has done
    useEffect(() => {
        async function loadCompletions() {
            try {
                const response = await fetch(`${URL}/api/completions`) //notice how this is different

                if (!response.ok) {
                    throw new Error("Failed to load completions")
                }

                const savedCourses = await response.json()

                setCompleted(savedCourses)

                setCompletedLoaded(true)

            } catch (err) {
                console.error("Error loading completions:", err)
                setSaveError("Could not load saved progress.")
            }
        }

        loadCompletions()
    }, [URL]) //this is called after homepage renders it requests the completed courses from express
    //express then gets the saved courses id from mysql, then response.json() turns it into js array


    const [filter, setFilter] = useState("All")

    const [isSaved, setIsSaved] = useState(false)

    function toggleCourse(id) {
        setIsSaved(false)
        setSaveError("")

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


    async function saveProgress() {
        // Don't save if we haven't loaded the existing progress yet
        if (!completedLoaded) return

        // Reset the previous save message and error
        setIsSaved(false)
        setSaveError("")
        setIsSaving(true)

        try {
            // Send a PUT request to our Express backend
            const response = await fetch(`${URL}/api/completions`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                // Convert the array into JSON [1, 3, 5] becomes the JSON text "[1,3,5]"
                body: JSON.stringify(completed)
            })

            if (!response.ok) {
                const result = await response.json().catch(() => ({}))
                throw new Error(result.error || "Failed to save progress")
            }
            setIsSaved(true)
        } catch (err) {
            setSaveError(err.message)

        } finally {
            setIsSaving(false)
        }
    }

    const availableCount = courses.filter(course => !completed.includes(Number(course.id)) && isAvailable(course)).length

    const lockedCount = courses.filter(course => !completed.includes(Number(course.id)) && !isAvailable(course)).length

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
                        <button className={filter === "All" ? "btn btn-primary" : "btn btn-outline-primary"} onClick={() => setFilter("All")}>
                            All Courses
                        </button>

                        <button className={filter === "Completed" ? "btn btn-primary" : "btn btn-outline-primary"} onClick={() => setFilter("Completed")}>
                            Completed Only
                        </button>

                        <button className={filter === "Remaining" ? "btn btn-primary" : "btn btn-outline-primary"} onClick={() => setFilter("Remaining")}>
                            Remaining
                        </button>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        {isSaved && (<span className="text-success small">Progress saved.</span>)}

                        {saveError && (<span className="text-danger small">{saveError}</span>)}

                        <button className="btn btn-success" onClick={saveProgress} disabled={!completedLoaded || isSaving}>
                            {isSaved ? "Saved!" : "Save"}
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