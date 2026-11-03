import CourseCard from './CourseCard.jsx'

function CourseList({courses, completed, toggleCourse, isAvailable, allCourses}) {
    return (
        <div className="row g-3">
            {courses.map(course => (
                <CourseCard
                    key={course.id}
                    course={course}
                    allCourses={allCourses}
                    completed={completed}
                    toggleCourse={toggleCourse}
                    isAvailable={isAvailable}
                />
            ))}
        </div>
    )
}

export default CourseList
