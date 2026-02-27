import { useState } from 'react'

const LOADING_MESSAGES = [
  'Channeling passive aggression...',
  'Consulting the snark gods...',
  'Drafting your plausible deniability...',
  'Calibrating rudeness levels...',
  'Loading corporate hostility...',
  'Brewing contempt for your inbox...',
  'Weaponizing your vacation...',
  'Composing your digital "do not disturb"...',
]

export default function MessageDisplay({ message, isLoading, onRegenerate }) {
  const [copied, setCopied] = useState(false)
  const [loadingMsg] = useState(
    () => LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]
  )

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = message
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (isLoading) {
    return (
      <div className="message-display loading">
        <div className="loading-spinner" />
        <p className="loading-text">{loadingMsg}</p>
      </div>
    )
  }

  if (!message) {
    return (
      <div className="message-display empty">
        <div className="empty-icon">✉️</div>
        <p>Fill out the form and hit generate to craft your perfect out-of-office message.</p>
        <p className="empty-subtitle">Your inbox can wait. You can't.</p>
      </div>
    )
  }

  return (
    <div className="message-display has-message">
      <div className="message-card">
        <div className="message-label">Your OOO Message</div>
        <div className="message-text">{message}</div>
      </div>
      <div className="message-actions">
        <button className="copy-btn" onClick={handleCopy}>
          {copied ? '✓ Copied!' : 'Copy to Clipboard'}
        </button>
        <button className="regenerate-btn" onClick={onRegenerate}>
          ↻ Regenerate
        </button>
      </div>
    </div>
  )
}
