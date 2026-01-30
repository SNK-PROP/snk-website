"use client"

import { useState } from 'react'
import { submitPropertyInquiry } from '@/lib/data'

export default function ContactForm({ property, agent }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    budget: '',
    preferredTime: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Submit property inquiry via API
      const result = await submitPropertyInquiry(property?.id, formData)

      if (result.success) {
        setSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          budget: '',
          preferredTime: ''
        })

        // Reset form after 5 seconds
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        setError(result.error || 'Failed to submit inquiry. Please try again.')
      }
    } catch (err) {
      console.error('Error submitting form:', err)
      setError('An error occurred. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const agentCard = (
    <div className="bg-blue-50 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-3">Your Agent</h3>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-xl font-bold text-gray-600">{agent?.name?.charAt(0) || '?'}</span>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{agent?.name || property?.brokerName || 'Our Agent'}</h4>
          <p className="text-sm text-gray-600 mb-2">Professional Agent • {agent?.experience || property?.brokerExperience || 'Experienced'}</p>
          <p className="text-sm text-gray-600">{agent?.company || property?.brokerCompany || 'SNK RealEstate'}</p>
        </div>
        <div className="text-right">
          <a
            href={`tel:${agent?.phone || property?.brokerContact || '+919876543210'}`}
            className="block btn-primary text-white text-sm mb-2"
          >
            Call {agent?.name?.split(' ')[0] || 'Agent'}
          </a>
          <a
            href={`mailto:${agent?.email || 'info@snkrealestate.com'}`}
            className="block btn-secondary text-white text-sm"
          >
            Email
          </a>
        </div>
      </div>
    </div>
  )

  if (submitted) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-4">
            We have received your inquiry for "{property?.title || 'this property'}".
            Our team will contact you shortly.
          </p>
          <p className="text-sm text-gray-500">
            Alternatively, you can call us directly at {agent?.phone || property?.brokerContact || '+91 98765 43210'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Inquire About This Property</h2>
        <p className="text-gray-600">Fill out the form below and our agent will get in touch with you.</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Agent Card */}
      {agentCard}

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="search-input w-full"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="search-input w-full"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="search-input w-full"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Budget
            </label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="search-input w-full"
              placeholder="Enter your budget"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Preferred Time to Call
          </label>
          <select
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            className="search-input w-full"
          >
            <option value="">Any time</option>
            <option value="morning">Morning (9 AM - 12 PM)</option>
            <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
            <option value="evening">Evening (5 PM - 9 PM)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="search-input w-full"
            placeholder="Tell us about your requirements..."
          ></textarea>
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-2">
            By submitting this form, you agree to our{' '}
            <a href="/privacy" className="text-primary-blue hover:underline">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="/terms" className="text-primary-blue hover:underline">
              Terms of Service
            </a>
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn-secondary w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Submitting...' : 'Send Inquiry'}
        </button>
      </form>
    </div>
  )
}
