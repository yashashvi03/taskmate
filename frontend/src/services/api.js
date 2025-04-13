const API_BASE_URL = "http://localhost:5000/api"

// Fetch all tasks
export const fetchTasks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`)
    if (!response.ok) {
      throw new Error("Failed to fetch tasks")
    }
    return await response.json()
  } catch (error) {
    console.error("Error in fetchTasks:", error)
    throw error
  }
}

// Create a new task
export const createTask = async (taskData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    })

    if (!response.ok) {
      throw new Error("Failed to create task")
    }

    return await response.json()
  } catch (error) {
    console.error("Error in createTask:", error)
    throw error
  }
}

// Update an existing task
export const updateTask = async (id, taskData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    })

    if (!response.ok) {
      throw new Error("Failed to update task")
    }

    return await response.json()
  } catch (error) {
    console.error("Error in updateTask:", error)
    throw error
  }
}

// Delete a task
export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Failed to delete task")
    }

    return await response.json()
  } catch (error) {
    console.error("Error in deleteTask:", error)
    throw error
  }
}
