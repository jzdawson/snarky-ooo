const SNARK_LABELS = [
  { position: 0, label: 'Professional' },
  { position: 25, label: 'Cheeky' },
  { position: 50, label: 'Snarky' },
  { position: 75, label: 'Unhinged' },
  { position: 100, label: 'Scorched Earth' },
]

function getSnarkColor(value) {
  if (value <= 20) return '#3b82f6'
  if (value <= 40) return '#8b5cf6'
  if (value <= 60) return '#f59e0b'
  if (value <= 80) return '#ef4444'
  return '#dc2626'
}

function getSnarkEmoji(value) {
  if (value <= 20) return '😊'
  if (value <= 40) return '😏'
  if (value <= 60) return '😒'
  if (value <= 80) return '🤬'
  return '💀'
}

export default function SnarkMeter({ value, onChange }) {
  const color = getSnarkColor(value)
  const emoji = getSnarkEmoji(value)

  return (
    <div className="snark-meter">
      <div className="snark-header">
        <span className="snark-emoji">{emoji}</span>
        <span className="snark-value" style={{ color }}>
          {SNARK_LABELS.reduce((closest, label) =>
            Math.abs(label.position - value) < Math.abs(closest.position - value) ? label : closest
          ).label}
        </span>
      </div>

      <div className="snark-slider-container">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="snark-slider"
          style={{
            '--snark-color': color,
            '--snark-percent': `${value}%`,
          }}
        />
        <div className="snark-labels">
          {SNARK_LABELS.map((item) => (
            <span
              key={item.position}
              className={`snark-label ${Math.abs(item.position - value) < 13 ? 'active' : ''}`}
              style={{ left: `${item.position}%` }}
            >
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
