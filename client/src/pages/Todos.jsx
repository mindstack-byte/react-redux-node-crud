import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import {
  addTodo,
  toggleTodo,
  updateTodo,
  removeTodo,
  clearCompleted,
} from '../store/actions/todoActions.js'

function Todos() {
  const [text, setText] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  const todos = useSelector((state) => state.todos.items)
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    dispatch(addTodo({
      id: nanoid(),
      text: trimmed,
      completed: false
    }))
    setText('')
  }

  const startEdit = (todo) => {
    setEditingId(todo.id)
    setEditingText(todo.text)
  }

  const handleUpdate = (event) => {
    event.preventDefault()
    const trimmed = editingText.trim()
    if (!trimmed || !editingId) return
    dispatch(updateTodo({ id: editingId, text: trimmed }))
    setEditingId(null)
    setEditingText('')
  }

  const activeCount = todos.filter((todo) => !todo.completed).length

  return (
    <section className="todos-section">
      <div className="todos-card">
        <header className="todos-header">
          <h1 className="todos-title">Todo list</h1>
        </header>

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

        {todos.length > 0 && (
          <div className="todos-toolbar">
            <span className="todos-count">
              {activeCount} task{activeCount === 1 ? '' : 's'} left
            </span>
            <button
              type="button"
              className="todos-clear-btn"
              onClick={() => dispatch(clearCompleted())}
            >
              Clear completed
            </button>
          </div>
        )}

        <ul className="todos-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todos-item">
              <label className="todos-main">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleTodo(todo.id))}
                />
                {editingId === todo.id ? (
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
                  <span
                    className={`todos-text ${
                      todo.completed ? 'todos-text-completed' : ''
                    }`}
                  >
                    {todo.text}
                  </span>
                )}
              </label>

              <div className="todos-actions">
                {editingId === todo.id ? (
                  <button
                    type="button"
                    className="todos-btn"
                    onClick={handleUpdate}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    type="button"
                    className="todos-btn"
                    onClick={() => startEdit(todo)}
                  >
                    Edit
                  </button>
                )}

                <button
                  type="button"
                  className="todos-btn todos-btn-danger"
                  onClick={() => dispatch(removeTodo(todo.id))}
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

