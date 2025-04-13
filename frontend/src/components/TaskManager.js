"use client"

import { useState, useEffect } from "react"
import TaskForm from "./TaskForm"
import TaskList from "./TaskList"
import SearchBar from "./SearchBar"
import CategoryFilter from "./CategoryFilter"
import { fetchTasks, createTask, updateTask, deleteTask } from "../services/api"

function TaskManager() {
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(null)
  const [editTask, setEditTask] = useState(null)
  const [notification, setNotification] = useState(null)

  // Fetch tasks on component mount
  useEffect(() => {
    loadTasks()
  }, [])

  // Apply filters whenever tasks, search query, or category filter changes
  useEffect(() => {
    applyFilters()
  }, [tasks, searchQuery, categoryFilter])

  const loadTasks = async () => {
    setIsLoading(true)
    try {
      const data = await fetchTasks()
      setTasks(data)
    } catch (error) {
      console.error("Error fetching tasks:", error)
      showNotification("Failed to load tasks", "error")
    } finally {
      setIsLoading(false)
    }
  }

  const applyFilters = () => {
    let result = [...tasks]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (task) => task.title.toLowerCase().includes(query) || task.description.toLowerCase().includes(query),
      )
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter((task) => task.category === categoryFilter)
    }

    setFilteredTasks(result)
  }

  const showNotification = (message, type = "success") => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const addTask = async (task) => {
    try {
      const newTask = await createTask(task)
      setTasks([...tasks, newTask])
      showNotification("Task added successfully!")
    } catch (error) {
      console.error("Error adding task:", error)
      showNotification("Failed to add task", "error")
    }
  }

  const handleUpdateTask = async (id, updatedTask) => {
    try {
      await updateTask(id, updatedTask)
      setTasks(tasks.map((task) => (task._id === id ? { ...task, ...updatedTask } : task)))
      setIsEditing(null)
      setEditTask(null)
      showNotification("Task updated successfully!")
    } catch (error) {
      console.error("Error updating task:", error)
      showNotification("Failed to update task", "error")
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id)
      setTasks(tasks.filter((task) => task._id !== id))
      showNotification("Task deleted successfully!")
    } catch (error) {
      console.error("Error deleting task:", error)
      showNotification("Failed to delete task", "error")
    }
  }

  const toggleComplete = async (id, completed) => {
    try {
      await updateTask(id, { completed })
      setTasks(tasks.map((task) => (task._id === id ? { ...task, completed } : task)))
      showNotification(completed ? "Task marked as completed!" : "Task marked as incomplete!")
    } catch (error) {
      console.error("Error updating task:", error)
      showNotification("Failed to update task status", "error")
    }
  }

  const handleEdit = (task) => {
    setIsEditing(task._id)
    setEditTask(task)
  }

  const cancelEdit = () => {
    setIsEditing(null)
    setEditTask(null)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 relative">
      {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 animate-fadeIn ${
            notification.type === "error"
              ? "bg-red-100 text-red-800 border border-red-200"
              : "bg-green-100 text-green-800 border border-green-200"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <CategoryFilter categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} />
      </div>

      <TaskForm
        onSubmit={addTask}
        isEditing={!!isEditing}
        editTask={editTask}
        onUpdate={(updatedTask) => handleUpdateTask(isEditing, updatedTask)}
        onCancel={cancelEdit}
      />

      <TaskList
        tasks={filteredTasks}
        onDelete={handleDeleteTask}
        onToggleComplete={toggleComplete}
        onEdit={handleEdit}
        isLoading={isLoading}
      />
    </div>
  )
}

export default TaskManager
