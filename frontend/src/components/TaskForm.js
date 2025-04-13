"use client"

import { useState, useEffect } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const categories = ["Work", "Personal", "Health", "Education", "Shopping", "Finance", "Other"]

function TaskForm({ onSubmit, isEditing = false, editTask = null, onUpdate, onCancel }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState(null)
  const [category, setCategory] = useState("Work")

  // Set form values when editing a task
  useEffect(() => {
    if (isEditing && editTask) {
      setTitle(editTask.title)
      setDescription(editTask.description)
      setDueDate(editTask.dueDate ? new Date(editTask.dueDate) : null)
      setCategory(editTask.category)
    }
  }, [isEditing, editTask])

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setDueDate(null)
    setCategory("Work")
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const taskData = {
      title,
      description,
      dueDate,
      category,
      completed: isEditing && editTask ? editTask.completed : false,
    }

    if (isEditing && onUpdate) {
      onUpdate(taskData)
    } else {
      onSubmit(taskData)
    }

    if (!isEditing) {
      resetForm()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 p-6 rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
        <span className="bg-blue-100 text-blue-600 p-2 rounded-full mr-2">{isEditing ? "✏️" : "➕"}</span>
        {isEditing ? "Edit Task" : "Add New Task"}
      </h2>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add details about your task..."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <DatePicker
            id="dueDate"
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            dateFormat="MMMM d, yyyy"
            placeholderText="Select a date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-5 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          {isEditing ? "Update Task" : "Add Task"}
        </button>
      </div>
    </form>
  )
}

export default TaskForm
