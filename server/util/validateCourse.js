//just checking if everything is valid input
function validateCourse(course) {
    if (!course.number || !course.title || course.credits === undefined || course.credits === null) {
        return "Number, title, and credits are required"
    }

    if (course.prerequisites !== undefined && !Array.isArray(course.prerequisites)) {
        return "Prerequisites must be an array"
    }

    return null
}

module.exports = validateCourse
