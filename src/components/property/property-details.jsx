"use client"

export default function PropertyDetails({ property }) {
  if (!property) {
    return <div className="p-8 text-center text-gray-500">No property details available</div>
  }

  const specifications = [
    { label: 'Property Type', value: property.propertyType || property.type || 'Commercial' },
    { label: 'Built-up Area', value: property.builtUpArea || `${property.area || 'N/A'} ${property.areaUnit || 'sqft'}` },
    { label: 'Floor Number', value: property.floorNumber || 'Ground Floor' },
    { label: 'Total Floors', value: property.totalFloors || 'N/A' },
    { label: 'Facing', value: property.facing || 'N/A' },
    { label: 'Possession', value: property.possessionDate || 'Ready to Move' },
    { label: 'Ownership', value: property.ownership || property.ownershipType || 'Freehold' },
    { label: 'Maintenance', value: property.maintenance || 'N/A' },
    { label: 'Builder/Developer', value: property.builder || property.builderName || property.developerName || 'N/A' },
    { label: 'Year Built', value: property.yearOfConstruction || property.yearBuilt || 'N/A' },
    { label: 'Transaction Type', value: property.transactionType?.capitalize() || 'Sale' },
    { label: 'Furnishing', value: property.furnishing || 'Semi-Furnished' }
  ]

  const amenities = property.amenities || [
    'Parking', 'Security', 'Power Backup', 'Water Supply',
    'Lift', 'Fire Safety', 'Intercom', 'CCTV'
  ]

  const features = property.features || [
    'Prime Location', 'Spacious', 'Well Maintained'
  ]

  const getAmenityIcon = (amenity) => {
    const icons = {
      'Parking': '🚗',
      'Security': '🛡️',
      'Power Backup': '⚡',
      'Water Supply': '💧',
      'Lift': '🛗',
      'Fire Safety': '🔥',
      'Intercom': '📞',
      'CCTV': '📹',
      'Gym': '🏋️',
      'Swimming Pool': '🏊',
      'Club House': '🏠',
      'Garden': '🌳',
      'Wi-Fi': '📶',
      'AC': '❄️',
      'Conference Room': '👥'
    }
    return icons[amenity] || '✓'
  }

  return (
    <section className="bg-white rounded-xl shadow-lg p-8">
      {/* Property Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Description
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {property.description || 'No description available for this property. Please contact the agent for more details.'}
        </p>
      </div>

      {/* Property Highlights */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-gold/10 rounded-xl border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Highlights</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl mb-1">📐</div>
            <div className="text-sm text-gray-600">Area</div>
            <div className="font-bold text-primary-blue">{property.area || 'N/A'} {property.areaUnit || 'sqft'}</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl mb-1">🏢</div>
            <div className="text-sm text-gray-600">Type</div>
            <div className="font-bold text-primary-blue capitalize">{property.propertyType || property.type || 'Commercial'}</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl mb-1">📍</div>
            <div className="text-sm text-gray-600">Location</div>
            <div className="font-bold text-primary-blue text-sm">{property.location?.city || 'N/A'}</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl mb-1">💰</div>
            <div className="text-sm text-gray-600">Price/Sqft</div>
            <div className="font-bold text-primary-blue">{property.pricePerSqft || 'N/A'}</div>
          </div>
        </div>
      </div>

      {/* Property Specifications */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Property Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {specifications.map((spec, index) => (
            <div key={index} className="flex justify-between py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span className="text-gray-600 font-medium">{spec.label}</span>
              <span className="font-semibold text-gray-900">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          Amenities
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
              <span className="text-2xl">{getAmenityIcon(amenity)}</span>
              <span className="text-sm font-medium text-gray-700">{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Special Features */}
      {features.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Special Features
          </h2>
          <div className="flex flex-wrap gap-3">
            {features.map((feature, index) => (
              <span key={index} className="px-4 py-2 bg-gradient-to-r from-gold/20 to-yellow-100 text-gold rounded-full text-sm font-semibold border border-gold/30">
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Property Location */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Location
        </h2>
        <div className="bg-gradient-to-br from-blue-50 to-gray-100 rounded-xl p-8 text-center">
          <div className="mb-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg">
              <svg className="w-10 h-10 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {property.location?.address || property.location || 'Contact for address'}
          </h3>
          <p className="text-gray-600 mb-4">
            {property.location?.city && `${property.location.city}, `}
            {property.location?.state && property.location.state}
            {property.location?.pincode && ` - ${property.location.pincode}`}
          </p>
          <button className="btn-primary text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
            Get Directions
          </button>
        </div>
      </div>

      {/* Additional Info */}
      {property?.nearbyPlaces && property.nearbyPlaces.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Nearby Places
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {property.nearbyPlaces.map((place, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="text-2xl">{place.icon || '📍'}</span>
                <div>
                  <div className="font-semibold text-gray-900">{place.name}</div>
                  <div className="text-sm text-gray-600">{place.distance || 'Nearby'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
