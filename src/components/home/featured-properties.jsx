"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { fetchProperties, formatPrice, getPropertyTypeIcon, getPropertyStatus } from '../../lib/data'

export default function FeaturedProperties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true)
        const response = await fetchProperties({
          limit: 6,
          isFeatured: true,
          approvalStatus: 'approved',
          status: 'Active'
        })
        setProperties(response.properties || [])
      } catch (error) {
        setError('Failed to load properties')
        console.error('Error loading properties:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProperties()
  }, [])

  if (loading) {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="text-gold">Commercial Properties</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium commercial properties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-gold">Commercial Properties</span>
          </h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 btn-primary text-white"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary-blue rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-gold rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-in-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Featured <span className="text-gold bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent">
              Commercial Properties
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our curated selection of premium commercial properties in prime locations
          </p>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Featured Properties Yet</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Check back soon for our latest premium commercial properties listings.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <Link
                key={property.id}
                href={`/property/${property.id}`}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-3xl transform transition-all duration-500 hover:-translate-y-4 border border-gray-100 animate-slide-in-up block"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Property Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={property.images?.[0] || `https://picsum.photos/seed/${property.id}/600/400.jpg`}
                    alt={property.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Badges */}
                  <div className="absolute top-4 right-4 flex gap-2 z-10">
                    <span className="bg-gold text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg backdrop-blur-sm">
                      Featured
                    </span>
                    <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg backdrop-blur-sm">
                      Verified
                    </span>
                  </div>

                  {/* Quick action buttons */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <button className="bg-white/90 text-primary-blue px-6 py-3 rounded-full font-semibold shadow-lg backdrop-blur-sm flex items-center gap-2 hover:bg-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </button>
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-8 relative z-10">
                  {/* Property type icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">
                        {getPropertyTypeIcon(property.propertyType)}
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-blue transition-colors">
                          {property.title}
                        </h3>
                        <p className="text-sm text-gold font-semibold">
                          {property.propertyType}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="property-price text-2xl font-bold text-gray-900">
                        {formatPrice(property.price)}
                      </span>
                      <p className="text-sm text-gray-500">
                        {property.area} {property.areaUnit}
                      </p>
                    </div>
                  </div>

                  {/* Property info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <svg className="w-5 h-5 text-primary-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>
                        {property.location?.city}, {property.location?.state}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <svg className="w-5 h-5 text-primary-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" />
                      </svg>
                      <span>
                        ₹{Math.floor(property.price / property.area)}/sqft
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <svg className="w-5 h-5 text-primary-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>Posted 2 days ago</span>
                    </div>
                  </div>

                  {/* Quick amenities */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                      Furnished
                    </span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                      Parking
                    </span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                      24/7 Security
                    </span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                      Power Backup
                    </span>
                  </div>

                  {/* View Details Button */}
                  <div className="w-full bg-gradient-to-r from-primary-blue to-blue-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2">
                    View Details
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-primary-blue to-transparent rounded-bl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-gold to-transparent rounded-tr-2xl"></div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-16 animate-slide-in-up animate-delay-600">
          <Link
            href="/properties"
            className="inline-flex items-center bg-gradient-to-r from-primary-blue to-blue-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:translate-y-1"
          >
            View All Properties
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}