"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { fetchProperties, propertyFilters, formatPrice, getPropertyTypeIcon } from '@/lib/data'
import Link from 'next/link'

export default function PropertiesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
    hasNext: false,
    hasPrev: false
  })

  // Filter states
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    transactionType: '',
    minPrice: '',
    maxPrice: '',
    minArea: '',
    maxArea: '',
    city: '',
    furnishing: '',
    page: 1,
    limit: 12,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  })

  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Initialize filters from URL params
  useEffect(() => {
    const newFilters = { ...filters }

    if (searchParams.has('location')) newFilters.location = searchParams.get('location')
    if (searchParams.has('propertyType')) newFilters.propertyType = searchParams.get('propertyType')
    if (searchParams.has('transactionType')) newFilters.transactionType = searchParams.get('transactionType')
    if (searchParams.has('minPrice')) newFilters.minPrice = searchParams.get('minPrice')
    if (searchParams.has('maxPrice')) newFilters.maxPrice = searchParams.get('maxPrice')
    if (searchParams.has('minArea')) newFilters.minArea = searchParams.get('minArea')
    if (searchParams.has('maxArea')) newFilters.maxArea = searchParams.get('maxArea')
    if (searchParams.has('city')) newFilters.city = searchParams.get('city')
    if (searchParams.has('furnishing')) newFilters.furnishing = searchParams.get('furnishing')
    if (searchParams.has('page')) newFilters.page = parseInt(searchParams.get('page')) || 1
    if (searchParams.has('sortBy')) newFilters.sortBy = searchParams.get('sortBy')
    if (searchParams.has('sortOrder')) newFilters.sortOrder = searchParams.get('sortOrder')

    setFilters(newFilters)
  }, [searchParams])

  // Fetch properties when filters change
  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true)
      setError(null)

      try {
        const params = { ...filters }

        // Only include non-empty filters
        Object.keys(params).forEach(key => {
          if (params[key] === '' || params[key] === null || params[key] === undefined) {
            delete params[key]
          }
        })

        const response = await fetchProperties(params)

        setProperties(response.properties || [])
        setPagination(response.pagination || {
          current: 1,
          pages: 1,
          total: 0,
          hasNext: false,
          hasPrev: false
        })
      } catch (err) {
        console.error('Error loading properties:', err)
        setError('Failed to load properties. Please try again.')
        setProperties([])
      } finally {
        setLoading(false)
      }
    }

    loadProperties()
  }, [filters])

  // Update URL when filters change
  const updateFilters = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters, page: 1 } // Reset to page 1 when filters change
    setFilters(updatedFilters)

    const params = new URLSearchParams()
    Object.keys(updatedFilters).forEach(key => {
      if (updatedFilters[key] && updatedFilters[key] !== '') {
        params.append(key, updatedFilters[key])
      }
    })

    router.push(`/properties?${params.toString()}`)
  }

  const handleSort = (sortBy) => {
    const newSortOrder = filters.sortBy === sortBy && filters.sortOrder === 'desc' ? 'asc' : 'desc'
    updateFilters({ sortBy, sortOrder: newSortOrder })
  }

  const handlePageChange = (page) => {
    updateFilters({ page })
  }

  const clearFilters = () => {
    const clearedFilters = {
      location: '',
      propertyType: '',
      transactionType: '',
      minPrice: '',
      maxPrice: '',
      minArea: '',
      maxArea: '',
      city: '',
      furnishing: '',
      page: 1,
      limit: 12,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    }
    setFilters(clearedFilters)
    router.push('/properties')
  }

  const hasActiveFilters = () => {
    return filters.location || filters.propertyType || filters.transactionType ||
           filters.minPrice || filters.maxPrice || filters.minArea || filters.maxArea ||
           filters.city || filters.furnishing
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-blue to-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm mb-4">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gold">Properties</span>
          </nav>
          <h1 className="text-4xl font-bold mb-2">Find Your Perfect Property</h1>
          <p className="text-blue-100">Explore our extensive collection of commercial properties across India</p>

          {/* Stats Bar */}
          <div className="flex flex-wrap gap-8 mt-8">
            <div>
              <div className="text-2xl font-bold text-gold">{pagination.total}+</div>
              <div className="text-sm text-blue-100">Properties Found</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gold">{propertyFilters.popularCities.length}</div>
              <div className="text-sm text-blue-100">Cities Covered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gold">{propertyFilters.types.length}</div>
              <div className="text-sm text-blue-100">Property Types</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-1/4 ${showMobileFilters ? 'fixed inset-0 bg-white z-50 overflow-y-auto p-6' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                {hasActiveFilters() && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-500 hover:text-red-700 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* Search by Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search Location</label>
                  <input
                    type="text"
                    placeholder="City, area, or landmark"
                    value={filters.location}
                    onChange={(e) => updateFilters({ location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  />
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <select
                    value={filters.propertyType}
                    onChange={(e) => updateFilters({ propertyType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    {propertyFilters.types.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                {/* Transaction Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
                  <select
                    value={filters.transactionType}
                    onChange={(e) => updateFilters({ transactionType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    {propertyFilters.transactionTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (₹)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => updateFilters({ minPrice: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => updateFilters({ maxPrice: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Area Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Area Range (sqft)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minArea}
                      onChange={(e) => updateFilters({ minArea: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxArea}
                      onChange={(e) => updateFilters({ maxArea: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                    />
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <select
                    value={filters.city}
                    onChange={(e) => updateFilters({ city: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  >
                    <option value="">All Cities</option>
                    {propertyFilters.popularCities.map(city => (
                      <option key={city.value} value={city.value}>{city.label}</option>
                    ))}
                  </select>
                </div>

                {/* Furnishing */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing</label>
                  <select
                    value={filters.furnishing}
                    onChange={(e) => updateFilters({ furnishing: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  >
                    <option value="">Any</option>
                    {propertyFilters.furnishingOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mobile Close Button */}
              {showMobileFilters && (
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="lg:hidden mt-6 w-full bg-primary-blue text-white py-3 rounded-lg font-semibold"
                >
                  Apply Filters
                </button>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            {/* Sort and Filter Controls */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters
                  {hasActiveFilters() && (
                    <span className="w-2 h-2 bg-gold rounded-full"></span>
                  )}
                </button>

                {/* Results Count */}
                <div className="text-sm text-gray-600">
                  {loading ? (
                    <span>Loading...</span>
                  ) : (
                    <span>Showing <strong>{properties.length}</strong> of <strong>{pagination.total}</strong> properties</span>
                  )}
                </div>

                {/* Sort Options */}
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleSort('createdAt')}
                      className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                        filters.sortBy === 'createdAt'
                          ? 'bg-primary-blue text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Newest {filters.sortBy === 'createdAt' && (filters.sortOrder === 'asc' ? '↑' : '↓')}
                    </button>
                    <button
                      onClick={() => handleSort('price')}
                      className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                        filters.sortBy === 'price'
                          ? 'bg-primary-blue text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Price {filters.sortBy === 'price' && (filters.sortOrder === 'asc' ? '↑' : '↓')}
                    </button>
                    <button
                      onClick={() => handleSort('area')}
                      className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                        filters.sortBy === 'area'
                          ? 'bg-primary-blue text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Area {filters.sortBy === 'area' && (filters.sortOrder === 'asc' ? '↑' : '↓')}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Properties Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-300"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-6 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl text-center">
                {error}
              </div>
            ) : properties.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
                <button
                  onClick={clearFilters}
                  className="btn-primary px-6 py-2 rounded-lg"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <Link
                      key={property.id}
                      href={`/property/${property.id}`}
                      className="bg-white rounded-xl shadow-md overflow-hidden card-hover group"
                    >
                      {/* Property Image */}
                      <div className="relative h-48 overflow-hidden">
                        {property.images && property.images.length > 0 ? (
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                            <span className="text-4xl">{getPropertyTypeIcon(property.propertyType)}</span>
                          </div>
                        )}
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {property.isFeatured && (
                            <span className="bg-gold text-white text-xs font-semibold px-2 py-1 rounded-full">
                              Featured
                            </span>
                          )}
                          <span className="bg-primary-blue text-white text-xs font-semibold px-2 py-1 rounded-full capitalize">
                            {property.transactionType || 'Sale'}
                          </span>
                        </div>
                        {/* Quick View */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform">
                            View Details
                          </span>
                        </div>
                      </div>

                      {/* Property Info */}
                      <div className="p-4">
                        <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                          <span className="text-lg">{getPropertyTypeIcon(property.propertyType)}</span>
                          <span className="capitalize">{property.propertyType || 'Commercial'}</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{property.title}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-1">
                          {property.location?.address || `${property.location?.city || 'City'}, ${property.location?.state || 'State'}`}
                        </p>

                        {/* Property Details */}
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          {property.area && (
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                              </svg>
                              <span>{property.area} {property.areaUnit || 'sqft'}</span>
                            </div>
                          )}
                          {property.brokerName && (
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span className="truncate">{property.brokerName}</span>
                            </div>
                          )}
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-bold text-primary-blue">
                            {formatPrice(property.price)}
                          </div>
                          {property.transactionType === 'rent' || property.transactionType === 'lease' ? (
                            <span className="text-xs text-gray-500">/{property.transactionType === 'rent' ? 'month' : 'year'}</span>
                          ) : null}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <button
                      onClick={() => handlePageChange(pagination.current - 1)}
                      disabled={!pagination.hasPrev}
                      className={`px-4 py-2 rounded-lg ${
                        pagination.hasPrev
                          ? 'bg-primary-blue text-white hover:bg-blue-800'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Previous
                    </button>

                    {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                      let pageNum
                      if (pagination.pages <= 5) {
                        pageNum = i + 1
                      } else if (pagination.current <= 3) {
                        pageNum = i + 1
                      } else if (pagination.current >= pagination.pages - 2) {
                        pageNum = pagination.pages - 4 + i
                      } else {
                        pageNum = pagination.current - 2 + i
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-4 py-2 rounded-lg ${
                            pagination.current === pageNum
                              ? 'bg-gold text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    })}

                    <button
                      onClick={() => handlePageChange(pagination.current + 1)}
                      disabled={!pagination.hasNext}
                      className={`px-4 py-2 rounded-lg ${
                        pagination.hasNext
                          ? 'bg-primary-blue text-white hover:bg-blue-800'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
