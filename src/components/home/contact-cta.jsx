"use client"

import { useState } from "react"

export default function ContactCTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // In real app: Send form data to backend
    alert('Thank you for your inquiry! We will contact you soon.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactMethods = [
    {
      icon: '📞',
      title: 'Call Us',
      value: '+91 98765 43210',
      link: 'tel:+919876543210'
    },
    {
      icon: '📧',
      title: 'Email Us',
      value: 'contact@snkrealestate.com',
      link: 'mailto:contact@snkrealestate.com'
    },
    {
      icon: '📍',
      title: 'Visit Us',
      value: '123 Business District, Mumbai, Maharashtra',
      link: '#'
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-primary-blue text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Find Your <span className="text-gold">Perfect Property</span>?
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Whether you're looking to buy, rent, or invest in commercial real estate,
              our team of experts is here to help you find the perfect property for your needs.
            </p>

            <div className="space-y-4 mb-12">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.link}
                  className="flex items-center gap-4 text-blue-100 hover:text-white transition-colors"
                >
                  <span className="text-2xl">{method.icon}</span>
                  <div>
                    <div className="font-semibold">{method.title}</div>
                    <div>{method.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="bg-blue-800 bg-opacity-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
              <div className="space-y-2 text-blue-100">
                <div>Monday - Friday: 9:00 AM - 7:00 PM</div>
                <div>Saturday: 10:00 AM - 5:00 PM</div>
                <div>Sunday: Closed</div>
              </div>
            </div>
          </div>

          {/* Right Content - Contact Form */}
          <div>
            <div className="bg-white rounded-lg shadow-xl p-8 text-gray-900">
              <h3 className="text-2xl font-bold mb-6 text-primary-blue">Get in Touch</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="Enter your full name"
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
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="search-input w-full"
                    placeholder="Tell us about your property requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-secondary w-full"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}