const express = require("express")
const router = express.Router()
const Task = require("../models/Task")

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 })
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get a specific task
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }
    res.json(task)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Create a task
router.post("/", async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    category: req.body.category,
    completed: req.body.completed || false,
  })

  try {
    const newTask = await task.save()
    res.status(201).json(newTask)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update a task
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    // Update fields that are present in the request
    if (req.body.title !== undefined) task.title = req.body.title
    if (req.body.description !== undefined) task.description = req.body.description
    if (req.body.dueDate !== undefined) task.dueDate = req.body.dueDate
    if (req.body.category !== undefined) task.category = req.body.category
    if (req.body.completed !== undefined) task.completed = req.body.completed

    const updatedTask = await task.save()
    res.json(updatedTask)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    await task.remove()
    res.json({ message: "Task deleted" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
