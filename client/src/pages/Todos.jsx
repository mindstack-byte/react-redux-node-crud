import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  fetchTodos
} from '../store/reducers/todosSlice.js'
import { useTodos } from '../hooks/useTodos.js';

// Main Todos component for managing todo items
function Todos() {
  // Redux hooks
  const dispatch = useDispatch()  // To dispatch actions

  // Fetch todos on component mount
  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  const { text,
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
    startEdit
  } = useTodos()  // Custom hook for managing todos logic


  // Render the component
  return (
    // Main container for the todos section
    <section className="todos-section">
      <div className="todos-card">
        {/* Header with title */}
        <header className="todos-header">
          <h1 className="todos-title">Todo list</h1>
        </header>

        {/* Form to add new todos */}
        <form className="todos-form" onSubmit={handleSubmit}>
          <input
            className="todos-input"
            type="text"
            placeholder="Add a new task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="todos-add-btn">
            Add task
          </button>
        </form>

        {/* Loading and error messages */}
        {loading && <p>Loading todos...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {/* Toolbar showing active todo count */}
        {todos.length > 0 && (
          <div className="todos-toolbar">
            <span className="todos-count">
              {activeCount} task{activeCount === 1 ? '' : 's'} left
            </span>
          </div>
        )}

        {/* List of todos */}
        <ul className="todos-list">
          {todos.map((todo) => (
            // Individual todo item
            <li key={todo.id} className="todos-item">
              <label className="todos-main">
                {/* Checkbox to toggle completion */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id, todo.completed)}
                />
                {/* Conditional rendering: edit form or display text */}
                {editingId === todo.id ? (
                  // Edit form when editing
                  <form className="todos-edit-form" onSubmit={handleUpdate}>
                    <input
                      className="todos-edit-input"
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      autoFocus
                    />
                  </form>
                ) : (
                  // Display text when not editing
                  <span
                    className={`todos-text ${todo.completed ? 'todos-text-completed' : ''
                      }`}
                  >
                    {todo.title}
                  </span>
                )}
              </label>

              {/* Action buttons for each todo */}
              <div className="todos-actions">
                {editingId === todo.id ? (
                  // Save button when editing
                  <button
                    type="button"
                    className="todos-btn"
                    onClick={handleUpdate}
                  >
                    Save
                  </button>
                ) : (
                  // Edit button when not editing
                  <button
                    type="button"
                    className="todos-btn"
                    onClick={() => startEdit(todo)}
                  >
                    Edit
                  </button>
                )}

                {/* Delete button */}
                {/* Delete button */}
                <button
                  type="button"
                  className="todos-btn todos-btn-danger"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Todos

