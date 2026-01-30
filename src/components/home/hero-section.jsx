"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HeroSection() {
  const router = useRouter()
  const [searchData, setSearchData] = useState({
    location: '',
    propertyType: '',
    transactionType: '',
    minPrice: '',
    maxPrice: ''
  })

  const handleSearch = (e) => {
    e.preventDefault()

    // Build query parameters
    const params = new URLSearchParams()
    if (searchData.location) params.append('location', searchData.location)
    if (searchData.propertyType) params.append('propertyType', searchData.propertyType)
    if (searchData.transactionType) params.append('transactionType', searchData.transactionType)
    if (searchData.minPrice) params.append('minPrice', searchData.minPrice)
    if (searchData.maxPrice) params.append('maxPrice', searchData.maxPrice)

    // Navigate to properties page
    router.push(`/properties?${params.toString()}`)
  }

  const handleQuickSearch = (location) => {
    router.push(`/properties?location=${encodeURIComponent(location)}`)
  }

  const propertyTypes = [
    { value: 'commercial', label: 'Commercial' },
    { value: 'office', label: 'Office Space' },
    { value: 'retail', label: 'Retail Shop' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'land', label: 'Land/Plot' }
  ]

  return (
    <section className="relative min-h-screen bg-gradient-primary text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold opacity-10 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 opacity-10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500 opacity-10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Decorative building silhouettes */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gray-900 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M0,200 L0,100 L100,80 L200,120 L300,90 L400,110 L500,70 L600,100 L700,60 L800,90 L900,50 L1000,80 L1100,40 L1200,70 L1200,200 Z" fill="currentColor" />
        </svg>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white opacity-30 rounded-full animate-pulse-slow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative container mx-auto px-4 pt-20 md:pt-0">
        <div className="flex flex-col lg:flex-row items-center min-h-screen">
          {/* Left Content - Animated */}
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-12 animate-slide-in-left">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-3 h-3 bg-gold rounded-full animate-pulse"></div>
                <span className="text-gold font-semibold">India's Leading Commercial Real Estate Platform</span>
              </div>
              <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Find Your Perfect<br />
                <span className="text-gold bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent">
                  Commercial Property
                </span>
              </h1>
              <p className="hero-subtitle text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl leading-relaxed">
                Discover premium office spaces, retail shops, and industrial properties across India's most business-friendly cities
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => router.push('/properties')}
                  className="btn-secondary group flex items-center gap-2 transform transition-all hover:scale-105"
                >
                  <span>Explore Properties</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/contact')}
                  className="border-2 border-gold text-gold hover:bg-gold hover:text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  Free Property Valuation
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-8 glass-effect rounded-xl p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-1">5000+</div>
                <div className="text-sm text-blue-100">Properties</div>
              </div>
              <div className="text-center border-x border-white border-opacity-20">
                <div className="text-3xl font-bold text-gold mb-1">1200+</div>
                <div className="text-sm text-blue-100">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-1">25+</div>
                <div className="text-sm text-blue-100">Cities</div>
              </div>
            </div>
          </div>

          {/* Right Content - Search Box */}
          <div className="lg:w-1/2 animate-slide-in-right">
            <div className="relative">
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-gold text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg z-10">
                Instant Results
              </div>

              {/* Search Box */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform transition-all hover:shadow-3xl">
                <form onSubmit={handleSearch} className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-5 h-5 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <h3 className="text-lg font-semibold text-gray-900">Search Properties</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Enter city, area, or landmark"
                            value={searchData.location}
                            onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                            className="search-input w-full text-gray-900 pl-10"
                            required
                          />
                          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            Transaction Type
                          </label>
                          <select
                            value={searchData.transactionType}
                            onChange={(e) => setSearchData({...searchData, transactionType: e.target.value})}
                            className="search-input w-full text-gray-900"
                          >
                            <option value="">All Types</option>
                            <option value="sale">For Sale</option>
                            <option value="rent">For Rent</option>
                            <option value="lease">For Lease</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Min. Price (₹)
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                            <input
                              type="number"
                              placeholder="0"
                              value={searchData.minPrice}
                              onChange={(e) => setSearchData({...searchData, minPrice: e.target.value})}
                              className="search-input w-full text-gray-900 pl-8"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Max. Price (₹)
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                            <input
                              type="number"
                              placeholder="No limit"
                              value={searchData.maxPrice}
                              onChange={(e) => setSearchData({...searchData, maxPrice: e.target.value})}
                              className="search-input w-full text-gray-900 pl-8"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center gap-2 transform transition-all hover:scale-105 py-4"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search Properties
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleQuickSearch('Mumbai')}
                      className="text-sm text-gray-600 hover:text-primary-blue transition-colors px-3 py-1 rounded-full hover:bg-gray-100"
                    >
                      Mumbai
                    </button>
                    <button
                      onClick={() => handleQuickSearch('Delhi')}
                      className="text-sm text-gray-600 hover:text-primary-blue transition-colors px-3 py-1 rounded-full hover:bg-gray-100"
                    >
                      Delhi
                    </button>
                    <button
                      onClick={() => handleQuickSearch('Bangalore')}
                      className="text-sm text-gray-600 hover:text-primary-blue transition-colors px-3 py-1 rounded-full hover:bg-gray-100"
                    >
                      Bangalore
                    </button>
                    <button
                      onClick={() => handleQuickSearch('Hyderabad')}
                      className="text-sm text-gray-600 hover:text-primary-blue transition-colors px-3 py-1 rounded-full hover:bg-gray-100"
                    >
                      Hyderabad
                    </button>
                    <button
                      onClick={() => handleQuickSearch('Chennai')}
                      className="text-sm text-gray-600 hover:text-primary-blue transition-colors px-3 py-1 rounded-full hover:bg-gray-100"
                    >
                      Chennai
                    </button>
                    <button
                      onClick={() => router.push('/properties')}
                      className="text-sm text-primary-blue font-medium hover:underline"
                    >
                      View All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}