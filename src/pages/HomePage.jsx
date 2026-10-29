import useFetch from "../hooks/useFetch.js";
import {useState} from 'react'
import ProgressSummary from "../components/ProgressSummary.jsx";
import CourseList from "../components/CourseList.jsx";

function HomePage() {
    const URL = import.meta.env.VITE_API_BASE_URL;

    const {data, isPending, error} = useFetch(`${URL}/courses`);

    const courses = Array.isArray(data) ? data : []

    const [completed, setCompleted] = useState([])

    const [filter, setFilter] = useState("All")

    function toggleCourse(id) {
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

                    return course && course.prerequisites.every(prereqId => updated.includes(Number(prereqId)))
                    //this return will go back to filter so change updated so it would not add that number in the new array
                })

                changed = updated.length !== oldLength
            }

            return updated
        })
    }

    function isAvailable(course) {
        return course.prerequisites.every(id => completed.includes(id))
    }

    function saveProgress() {
        localStorage.setItem("completedCourses", JSON.stringify(completed))
        //JSON.stringify turns a JS object or array into plain text string,
        //setItem has a key and value setItem(key,value)
    }

    const availableCount = courses.filter(course => !completed.includes(Number(course.id)) && isAvailable(course)).length
    //make an array of courses NOT complete but are available

    const lockedCount = courses.filter(course => !completed.includes(Number(course.id)) && !isAvailable(course)).length
    //make an array of courses NOT complete AND NOT available


    const filteredCourses = courses.filter(course => {
        if (filter === "Completed") return completed.includes(Number(course.id))


        if (filter === "Remaining") return !completed.includes(Number(course.id))

        return true
        //this return true is for the first go around because its going to be "All" and since its true
        //the filter would keep and show all the courses
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

                <div className="btn-group mt-3 mb-3">
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

                <div className="mt-2 mb-3">
                    <button className="btn btn-success" onClick={saveProgress}>
                        {//we wrote it like saveProgress instead of saveProgress() because
                            // we actually want the function to run when its clicked thats all, if we wrote saveProgress() it would
                            //immediately execute during render and assign its return value to onClick
                        }
                        Save Progress
                    </button>
                </div>

                {isPending && <p>Loading....</p>}
                {error && <p className="text-danger">{String(error)}</p>}

                {courses.length > 0 && (
                    <CourseList
                        courses={filteredCourses}
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