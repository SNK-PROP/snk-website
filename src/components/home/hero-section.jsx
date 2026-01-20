"use client"
import { useState } from 'react'

export default function HeroSection() {
  const [searchData, setSearchData] = useState({
    location: '',
    propertyType: '',
    minPrice: '',
    maxPrice: ''
  })

  const handleSearch = (e) => {
    e.preventDefault()
    // This would typically call an API endpoint
    console.log('Searching with:', searchData)
  }

  const propertyTypes = [
    { value: 'commercial', label: 'Commercial' },
    { value: 'office', label: 'Office Space' },
    { value: 'retail', label: 'Retail Shop' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'land', label: 'Land/Plot' }
  ]

  return (
    <section className="relative bg-gradient-primary text-white py-20 md:py-32">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div> */}
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="hero-title text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect<br />
            <span className="text-gold">Commercial Property</span>
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl mb-10 text-blue-100">
            Discover premium office spaces, retail shops, and industrial properties
            across prime locations
          </p>

          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter city or area"
                    value={searchData.location}
                    onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                    className="search-input w-full text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select
                    value={searchData.propertyType}
                    onChange={(e) => setSearchData({...searchData, propertyType: e.target.value})}
                    className="search-input w-full text-gray-900"
                  >
                    <option value="">All Types</option>
                    {propertyTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min. Price (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="Min price"
                    value={searchData.minPrice}
                    onChange={(e) => setSearchData({...searchData, minPrice: e.target.value})}
                    className="search-input w-full text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max. Price (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="Max price"
                    value={searchData.maxPrice}
                    onChange={(e) => setSearchData({...searchData, maxPrice: e.target.value})}
                    className="search-input w-full text-gray-900"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="btn-primary flex-1 text-white"
                >
                  Search Properties
                </button>
                <button
                  type="button"
                  className="btn-secondary flex-1 text-white"
                >
                  Post Your Property
                </button>
              </div>
            </form>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Verified Properties</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Best Agents</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Secure Transactions</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}