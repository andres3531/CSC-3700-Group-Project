import CourseCard from './CourseCard.jsx'

function CourseList({ courses, completed, toggleCourse, isAvailable }) {
    return (
        <div className="row g-3">
            {courses.map(course => (
                <CourseCard
                    key={course.id}
                    course={course}
                    completed={completed}
                    toggleCourse={toggleCourse}
                    isAvailable={isAvailable}
                />
            ))}
        </div>
    )
}

export default CourseList
