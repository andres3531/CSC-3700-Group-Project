const express = require('express')
const router = express.Router()

const pool = require('../util/database')
const { getCoursesWithPrereqs, replaceCompletions } = require('../util/courseData')

// M3: replaced by the logged-in user's id
const USER_ID = 1

router.get('/completions', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT course_id FROM completions WHERE user_id = ? ORDER BY course_id', [USER_ID])
        const completed = rows.map(row => row.course_id)
        res.json(completed)

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Failed to load completions" })
    }
})


router.put('/completions', async (req, res) => {
    try {
        const courseIds = req.body

        if (!Array.isArray(courseIds) || !courseIds.every(Number.isInteger) || new Set(courseIds).size !== courseIds.length) {
            return res.status(400).json({error: "Completions must be an array of unique course IDs"})
        }

        const courses = await getCoursesWithPrereqs(pool)

        const completedSet = new Set(courseIds)

        for (const id of courseIds) {
            const course = courses.find(course => course.id === id)

            if (!course) {
                return res.status(400).json({error: `Course ${id} does not exist`})}

            const valid = course.prerequisites.every(prereqId => completedSet.has(prereqId))

            if (!valid) {
                return res.status(400).json({error: `Prerequisites not satisfied for ${course.number}`})
            }
        }

        await replaceCompletions(pool, USER_ID, courseIds)

        res.status(200).json(courseIds)

    } catch (err) {
        res.status(500).json({ error: "Failed to save completions" })
    }
})
module.exports = router
