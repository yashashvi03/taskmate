"use client"

import { format } from "date-fns"
import { useState } from "react"

function TaskList({ tasks, onDelete, onToggleComplete, onEdit, isLoading }) {
  const [expandedTask, setExpandedTask] = useState(null)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-md">
        <div className="text-7xl mb-4">📝</div>
        <h3 className="text-xl font-medium text-gray-700 mb-2">No tasks found</h3>
        <p className="text-gray-500">Add a new task or adjust your filters.</p>
      </div>
    )
  }

  const getCategoryColor = (category) => {
    const colors = {
      Work: "bg-blue-100 text-blue-800 border-blue-200",
      Personal: "bg-purple-100 text-purple-800 border-purple-200",
      Health: "bg-green-100 text-green-800 border-green-200",
      Education: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Shopping: "bg-pink-100 text-pink-800 border-pink-200",
      Finance: "bg-emerald-100 text-emerald-800 border-emerald-200",
      Other: "bg-gray-100 text-gray-800 border-gray-200",
    }

    return colors[category] || colors["Other"]
  }

  const getCategoryIcon = (category) => {
    const icons = {
      Work: "💼",
      Personal: "👤",
      Health: "🏥",
      Education: "🎓",
      Shopping: "🛒",
      Finance: "💰",
      Other: "📌",
    }

    return icons[category] || icons["Other"]
  }

  const toggleExpand = (taskId) => {
    if (expandedTask === taskId) {
      setExpandedTask(null)
    } else {
      setExpandedTask(taskId)
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`overflow-hidden border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${
            task.completed ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200"
          }`}
        >
          <div className="p-5 pb-3">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleComplete(task._id, !task.completed)}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer transition-colors"
                  />
                </div>
                <div>
                  <h3
                    className={`text-lg font-medium ${
                      task.completed ? "line-through text-gray-500" : "text-gray-900"
                    } transition-all duration-300`}
                  >
                    {task.title}
                  </h3>

                  {task.dueDate && (
                    <div
                      className={`mt-1 text-sm ${
                        new Date(task.dueDate) < new Date() && !task.completed
                          ? "text-red-500 font-medium"
                          : "text-gray-500"
                      }`}
                    >
                      Due: {format(new Date(task.dueDate), "MMM d, yyyy")}
                    </div>
                  )}
                </div>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColor(
                  task.category,
                )}`}
              >
                {getCategoryIcon(task.category)} {task.category}
              </span>
            </div>

            {task.description && (
              <div className="mt-3">
                <button
                  onClick={() => toggleExpand(task._id)}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {expandedTask === task._id ? "Hide details" : "Show details"}
                </button>

                {expandedTask === task._id && (
                  <p className={`mt-2 text-sm ${task.completed ? "text-gray-500" : "text-gray-700"} animate-fadeIn`}>
                    {task.description}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="px-5 py-3 bg-gray-50 flex justify-end gap-2">
            <button
              onClick={() => onEdit(task)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Edit
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskList
