import { useState } from 'react'

function App() {
  let [name, setName] = useState('')
  let [message, setMessage] = useState('')

  async function handleStartTracking() {
    if (!name.trim()) {
      setMessage('Please enter a book name.')
      return
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name.trim() }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        const errorText = errorData?.detail || 'Failed to send book name.'
        setMessage(errorText)
        return
      }

      setMessage('Book sent to backend successfully.')
      setName('')
    } catch (error) {
      setMessage('Unable to reach backend. Is FastAPI running?')
      console.error(error)
    }
  }

  return (
    <div>
      <div className="container">
        <div className="left">
          <h1>Welcome to Cognitivity</h1>
          <p>Unlock your cognitive potential with our cutting-edge platform. Experience personalized brain training, insightful analytics, and a supportive community to help you achieve your mental best.</p>
        </div>
        <div className="right">
          <input
            type="text"
            placeholder="Book name"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="search-button" onClick={handleStartTracking}>Start Tracking</button>
          {message && <p className="status-message">{message}</p>}
        </div>
      </div>
    </div>
  )
}

export default App
