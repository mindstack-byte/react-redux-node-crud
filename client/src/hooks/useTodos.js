import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchTodos,
  addTodoAsync,
  updateTodoAsync,
  deleteTodoAsync,
} from '../store/reducers/todosSlice.js'

/**
 * Custom hook for managing todo operations
 * Handles all todo CRUD operations, state management, and UI logic
 * @returns {Object} Object containing todos data, loading/error states, and handler functions
 */
export const useTodos = () => {
  // Local state for input fields
  const [text, setText] = useState('')                   // Text for new todo input
  const [editingId, setEditingId] = useState(null)       // ID of todo being edited
  const [editingText, setEditingText] = useState('')     // Text for editing todo

  // Redux hooks
  const dispatch = useDispatch()  // To dispatch actions
  const { items: todos, loading, error } = useSelector((state) => state.todos)  // Select todos state

  // Handle form submission to add a new todo
  const handleSubmit = async (event) => {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    try {
      await dispatch(addTodoAsync({
        title: trimmed,
        completed: false
      })).unwrap()
      setText('')
    } catch (err) {
      console.error('Failed to add todo:', err)
    }
  }

  // Start editing a todo by setting its ID and text
  const startEdit = (todo) => {
    setEditingId(todo.id)
    setEditingText(todo.title)
  }

  // Handle update form submission
  const handleUpdate = async (event) => {
    event.preventDefault()
    const trimmed = editingText.trim()
    if (!trimmed || !editingId) return
    try {
      await dispatch(updateTodoAsync({ id: editingId, title: trimmed })).unwrap()
      setEditingId(null)
      setEditingText('')
    } catch (err) {
      console.error('Failed to update todo:', err)
    }
  }

  // Toggle todo completion status
  const handleToggle = async (id, completed) => {
    try {
      await dispatch(updateTodoAsync({ id, completed: !completed })).unwrap()
    } catch (err) {
      console.error('Failed to toggle todo:', err)
    }
  }

  // Delete a todo
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTodoAsync(id)).unwrap()
    } catch (err) {
      console.error('Failed to delete todo:', err)
    }
  }

  // Calculate the number of active (incomplete) todos
  const activeCount = todos.filter((todo) => !todo.completed).length

  // Return all state and handlers
  return {
    // State variables
    text,
    setText,
    editingId,
    setEditingId,
    editingText,
    setEditingText,
    todos,
    loading,
    error,
    // Computed values
    activeCount,
    // Handler functions
    handleSubmit,
    handleUpdate,
    handleToggle,
    handleDelete,
    startEdit,
  }
}
