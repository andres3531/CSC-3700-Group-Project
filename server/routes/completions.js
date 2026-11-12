const express = require('express')
const router = express.Router()

const pool = require('../util/database')
const { getCoursesWithPrereqs, replaceCompletions } = require('../util/courseData')

const USER_ID = 1

router.get('/completions', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT course_id FROM completions WHERE user_id = ? ORDER BY course_id', [USER_ID])
        //this is saying get all the courses completed by user 1
        const completed = rows.map(row => row.course_id)
        //then this gets the array of objects we just got and makes it into a nice normal int array
        res.json(completed)

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Failed to load completions" })
    }
})


router.put('/completions', async (req, res) => {
    try {
        const courseIds = req.body

        // Making sure the request contains an array of integers
        if (!Array.isArray(courseIds) || !courseIds.every(Number.isInteger) || new Set(courseIds).size !== courseIds.length) {
            return res.status(400).json({error: "Completions must be an array of unique course IDs"})
        }

        // Get all courses and their prerequisites from MySQL
        const courses = await getCoursesWithPrereqs(pool)

        // Set makes it easy to check which courses are completed, because it removes duplicates
        const completedSet = new Set(courseIds)

        for (const id of courseIds) {
            const course = courses.find(course => course.id === id)

            // Reject course IDs if it dosnt exist
            if (!course) {
                return res.status(400).json({error: `Course ${id} does not exist`})}

            // Every prerequisite must also be completed
            const valid = course.prerequisites.every(prereqId => completedSet.has(prereqId))

            if (!valid) {
                return res.status(400).json({error: `Prerequisites not satisfied for ${course.number}`})
            }
        }

        // Only save after every course passes validation
        await replaceCompletions(pool, USER_ID, courseIds)

        res.status(200).json(courseIds)

    } catch (err) {
        res.status(500).json({ error: "Failed to save completions" })
    }
})
module.exports = router