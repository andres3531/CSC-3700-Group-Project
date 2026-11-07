const express = require('express')
const router = express.Router()

const pool = require('../util/database')
const { getCoursesWithPrereqs } = require('../util/courseData')
const validateCourse = require('../util/validateCourse')

//saying when someone sends a GET request to /courses/:id run this function
router.get('/courses/:id', async (req, res) => {
    try {
        const course = await getCoursesWithPrereqs(pool, req.params.id)

        if (!course) {
            return res.status(404).json({ error: "Course not found" })
        }

        res.json(course)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

//saying when someone sends a GET request to /courses run this function
router.get('/courses', async (req, res) => {
    try {
        const courses = await getCoursesWithPrereqs(pool) //retrieves the courses and their prerequisite arrays from MySQL.
        res.json(courses) //sends the resulting array back to whoever made the request.
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


router.post('/courses', async (req, res) => {
    try {
        const error = validateCourse(req.body || {})
        //just validating information here
        if (error) {
            return res.status(400).json({ error: error })
        }

        const { number, title, credits, description, prerequisites = [] } = req.body

        const [result] = await pool.query(
            'INSERT INTO courses (number, title, credits, description) VALUES (?, ?, ?, ?)', //? is a SQL placeholder for our variables
            [number, title, credits, description ?? null]
        )

        const newId = result.insertId

        for (const prereqId of prerequisites) {
            await pool.query(
                'INSERT INTO prerequisites (course_id, prereq_id) VALUES (?, ?)',
                [newId, prereqId]
            )
        }

        const newCourse = await getCoursesWithPrereqs(pool, newId)

        res.status(201).json(newCourse)

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


router.put('/courses/:id', async (req, res) => {
    try {
        const error = validateCourse(req.body || {})

        if (error) {
            return res.status(400).json({ error: error })
        }

        const { number, title, credits, description, prerequisites = [] } = req.body

        const [result] = await pool.query(
            'UPDATE courses SET number = ?, title = ?, credits = ?, description = ? WHERE id = ?', //? is saying only the course whose ID matches the URL
            [number, title, credits, description ?? null, req.params.id]
        )

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Course not found" })
        }

        await pool.query(
            'DELETE FROM prerequisites WHERE course_id = ?',
            [req.params.id]
        )

        for (const prereqId of prerequisites) {
            await pool.query(
                'INSERT INTO prerequisites (course_id, prereq_id) VALUES (?, ?)',
                [req.params.id, prereqId]
            )
        }

        const updatedCourse = await getCoursesWithPrereqs(pool, req.params.id)

        res.status(200).json(updatedCourse)

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.delete('/courses/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const course = await getCoursesWithPrereqs(pool, id)

        if (!course) {
            return res.status(404).json({ error: "Course not found" })
        }

        await pool.query('DELETE FROM courses WHERE id = ?', [id])

        res.status(200).json(course)

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router
