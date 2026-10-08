'use client'

import { useState, useEffect } from 'react'

const FILTERS = ['All', 'Active', 'Done']

export default function Home() {
  const [tasks, setTasks] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('All')

  // Load saved tasks once, after the page appears in the browser
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('tasks'))
      if (saved) setTasks(saved)
    } catch {}
    setLoaded(true)
  }, [])

  // Save whenever tasks change (but only after the first load finished)
  useEffect(() => {
    if (loaded) localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks, loaded])

  function addTask(e) {
    e.preventDefault()
    const title = text.trim()
    if (!title) return
    setTasks([{ id: Date.now(), title, done: false }, ...tasks])
    setText('')
  }

  const toggle = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  const remove = (id) => setTasks(tasks.filter((t) => t.id !== id))
  const clearDone = () => setTasks(tasks.filter((t) => !t.done))

  const visible = tasks.filter(
    (t) => filter === 'All' || (filter === 'Done' ? t.done : !t.done)
  )
  const left = tasks.filter((t) => !t.done).length

  return (
    <main className="app">
      <h1>Today's tasks</h1>
      <p className="sub">{left} left to do</p>

      <form onSubmit={addTask} className="add">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs doing?"
          aria-label="New task"
        />
        <button type="submit">Add task</button>
      </form>

      <div className="filters" role="group" aria-label="Filter tasks">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={f === filter ? 'on' : ''}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="empty">Nothing here yet. Add a task above to get started.</p>
      ) : (
        <ul>
          {visible.map((t) => (
            <li key={t.id} className={t.done ? 'done' : ''}>
              <label>
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggle(t.id)}
                />
                <span>{t.title}</span>
              </label>
              <button
                className="del"
                onClick={() => remove(t.id)}
                aria-label={'Delete ' + t.title}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {tasks.some((t) => t.done) && (
        <button className="clear" onClick={clearDone}>
          Clear finished tasks
        </button>
      )}
    </main>
  )
}
