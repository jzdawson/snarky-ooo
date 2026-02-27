import { useState } from 'react'
import SnarkMeter from './SnarkMeter'

const REASON_OPTIONS = [
  { value: '', label: 'Select a reason (optional)' },
  { value: 'vacation', label: 'Vacation' },
  { value: 'sick', label: 'Sick / Under the Weather' },
  { value: 'mental_health', label: 'Mental Health Day' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'funeral', label: 'Funeral' },
  { value: 'parental', label: 'Parental Leave' },
  { value: 'conference', label: 'Conference / Work Travel' },
  { value: 'none_of_your_business', label: 'None of Your Business' },
  { value: 'custom', label: 'Custom...' },
]

export default function OOOForm({ onGenerate, isLoading }) {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    reason: '',
    customReason: '',
    destination: '',
    emergencyContact: '',
    emergencyEmail: '',
    specialInstructions: '',
    snarkLevel: 50,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSnarkChange = (value) => {
    setFormData((prev) => ({ ...prev, snarkLevel: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const reason = formData.reason === 'custom' ? formData.customReason : formData.reason
    onGenerate({ ...formData, reason })
  }

  return (
    <form className="ooo-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h2>The Basics</h2>

        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Janet from Accounting"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Out From</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">Back On</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="reason">Why Are You Leaving Us?</label>
          <select
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
          >
            {REASON_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {formData.reason === 'custom' && (
          <div className="form-group">
            <label htmlFor="customReason">Your Custom Reason</label>
            <input
              type="text"
              id="customReason"
              name="customReason"
              value={formData.customReason}
              onChange={handleChange}
              placeholder="e.g. Witness protection program"
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="destination">Where Are You Going?</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="e.g. Bali, the couch, anywhere but here (optional)"
          />
        </div>
      </div>

      <div className="form-section">
        <h2>Emergency Contact <span className="subtitle">(if you must)</span></h2>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="emergencyContact">Contact Name</label>
            <input
              type="text"
              id="emergencyContact"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              placeholder="Someone who still cares (optional)"
            />
          </div>
          <div className="form-group">
            <label htmlFor="emergencyEmail">Contact Email</label>
            <input
              type="email"
              id="emergencyEmail"
              name="emergencyEmail"
              value={formData.emergencyEmail}
              onChange={handleChange}
              placeholder="their@email.com (optional)"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2>Anything Else?</h2>
        <div className="form-group">
          <label htmlFor="specialInstructions">Special Instructions</label>
          <textarea
            id="specialInstructions"
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleChange}
            placeholder="e.g. Don't contact me about the Jenkins build. I don't care. (optional)"
            rows={3}
          />
        </div>
      </div>

      <div className="form-section">
        <h2>Set the Vibe</h2>
        <SnarkMeter value={formData.snarkLevel} onChange={handleSnarkChange} />
      </div>

      <button type="submit" className="generate-btn" disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate My OOO'}
      </button>
    </form>
  )
}
