import { useState, useRef } from 'react'
import OOOForm from './components/OOOForm'
import MessageDisplay from './components/MessageDisplay'

export default function App() {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const lastFormData = useRef(null)

  const handleGenerate = async (formData) => {
    lastFormData.current = formData
    setIsLoading(true)
    setError('')
    setMessage('')

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setMessage(data.message)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegenerate = () => {
    if (lastFormData.current) {
      handleGenerate(lastFormData.current)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>
          Snarky<span className="highlight">OOO</span>
        </h1>
        <p className="tagline">
          Because "I'm out of office" is never enough.
        </p>
      </header>

      <main className="app-main">
        <div className="form-panel">
          <OOOForm onGenerate={handleGenerate} isLoading={isLoading} />
        </div>

        <div className="output-panel">
          {error && (
            <div className="error-banner">
              <strong>Oops.</strong> {error}
            </div>
          )}
          <MessageDisplay
            message={message}
            isLoading={isLoading}
            onRegenerate={handleRegenerate}
          />
        </div>
      </main>

      <footer className="app-footer">
        <p>Powered by spite and Claude AI</p>
      </footer>
    </div>
  )
}
