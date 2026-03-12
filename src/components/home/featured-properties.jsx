"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { fetchProperties, formatPrice, getPropertyTypeIcon, getPropertyStatus } from '../../lib/data'
import { Button } from '@/components/ui/button'
import { brand } from '@/design/colors'

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
              Featured <span className="text-amber-600">Commercial Properties</span>
            </h2>
            <p className="text-lg text-blue-900 max-w-2xl mx-auto">
              Discover our handpicked selection of premium commercial properties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg shimmer-loading animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                {/* Image skeleton */}
                <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300">
                  <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                  {/* Image placeholder */}
                  <div className="absolute top-4 right-4">
                    <div className="w-24 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Content skeleton */}
                <div className="p-8 space-y-6">
                  {/* Property title skeleton */}
                  <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>

                  {/* Property type skeleton */}
                  <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>

                  {/* Price skeleton */}
                  <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse"></div>

                  {/* Location skeleton */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-48 animate-pulse"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
                    </div>
                  </div>

                  {/* Amenities skeleton */}
                  <div className="flex flex-wrap gap-2">
                    {[...Array(4)].map((_, amenityIndex) => (
                      <div key={amenityIndex} className="h-6 bg-gray-200 rounded-full w-20 animate-pulse" style={{ animationDelay: `${amenityIndex * 100}ms` }}></div>
                    ))}
                  </div>

                  {/* Button skeleton */}
                  <div className="h-12 bg-gradient-to-r from-brand-primary to-blue-700 rounded-xl animate-pulse"></div>
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
            Featured <span className="brand.secondary">Commercial Properties</span>
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
        <div className="absolute top-10 left-10 w-64 h-64 brand.primary rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 brand.secondary rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-in-up">
          <h2 className="heading-2 mb-6">
            Featured <span className="text-amber-600 bg-gradient-to-r from-amber-600 to-yellow-400 bg-clip-text text-transparent">
              Commercial Properties
            </span>
          </h2>
          <p className="body-1 text-blue-900 max-w-3xl mx-auto">
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
            <h3 className="heading-3 text-blue-900 mb-3">No Featured Properties Yet</h3>
            <p className="text-blue-800 max-w-md mx-auto">
              Check back soon for our latest premium commercial properties listings.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <Link
                key={property.id}
                href={`/property/${property.id}`}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-3xl transform transition-all duration-500 hover:-translate-y-1 border border-gray-200 hover:brand.primary animate-slide-in-up block card-enhanced"
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
                    <span className="brand.secondary text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg backdrop-blur-sm pulse-subtle hover:brand.secondary-light transition-colors duration-300">
                      Featured
                    </span>
                    <span className="brand.gold[500] text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg backdrop-blur-sm hover:bg-brand-gold[600] transition-colors duration-300">
                      Verified
                    </span>
                  </div>

                  {/* Quick action buttons */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Button variant="default" className="bg-white text-primary-blue hover:bg-white/90 transform hover:scale-105 px-6 py-3 shadow-lg backdrop-blur-sm flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </Button>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Quick action buttons */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Button variant="default" className="bg-white text-primary-blue hover:bg-white/90 px-6 py-3 shadow-lg backdrop-blur-sm flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </Button>
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-8 relative z-10">
                  {/* Property type icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {getPropertyTypeIcon(property.propertyType)}
                      </span>
                      <div>
                        <h3 className="text-title text-gray-900 group-hover:text-primary-blue transition-colors duration-300">
                          {property.title}
                        </h3>
                        <p className="text-sm brand.secondary font-semibold group-hover:brand.secondary-light transition-colors duration-300">
                          {property.propertyType}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="price-2 text-gray-900 group-hover:text-primary-blue transition-colors duration-300">
                        {formatPrice(property.price)}
                      </span>
                      <p className="text-sm text-gray-500">
                        {property.area} {property.areaUnit}
                      </p>
                    </div>
                  </div>

                  {/* Property info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-600 group-hover:text-primary-blue transition-colors duration-300">
                      <svg className="w-5 h-5 text-primary-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>
                        {property.location?.city}, {property.location?.state}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 group-hover:text-primary-blue transition-colors duration-300">
                      <svg className="w-5 h-5 text-primary-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" />
                      </svg>
                      <span>
                        ₹{Math.floor(property.price / property.area)}/sqft
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 group-hover:text-primary-blue transition-colors duration-300">
                      <svg className="w-5 h-5 text-primary-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>Posted 2 days ago</span>
                    </div>
                  </div>

                  {/* Quick amenities */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-md">
                      Furnished
                    </span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-md">
                      Parking
                    </span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-md">
                      24/7 Security
                    </span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-md">
                      Power Backup
                    </span>
                  </div>

                  {/* View Details Button */}
                  <div className="w-full bg-gradient-to-r from-brand-primary to-blue-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transform hover:scale-105 transition-transform duration-300 hover:shadow-lg">
                    View Details
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-primary-blue to-transparent rounded-bl-2xl opacity-70"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-gold to-transparent rounded-tr-2xl opacity-70"></div>

                {/* Hover accent border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-16 animate-slide-in-up animate-delay-600">
          <Link
            href="/properties"
            className="inline-flex items-center bg-gradient-to-r from-brand-primary to-blue-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 hover:translate-y-1"
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