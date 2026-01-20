export default function PropertyDetails({ property }) {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Property Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <p className="text-gray-700 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Property Specifications */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Property Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Built-up Area', value: property.builtUpArea },
              { label: 'Floor Number', value: property.floorNumber },
              { label: 'Total Floors', value: property.totalFloors },
              { label: 'Facing', value: property.facing },
              { label: 'Possession Date', value: property.possessionDate },
              { label: 'Ownership', value: property.ownership },
              { label: 'Maintenance', value: property.maintenance },
              { label: 'Builder', value: property.builder },
              { label: 'Year of Construction', value: property.yearOfConstruction },
            ].map((spec, index) => (
              <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">{spec.label}</span>
                <span className="font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {property.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <svg className="w-5 h-5 text-primary-blue" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-gray-700">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Special Features</h2>
          <div className="flex flex-wrap gap-3">
            {property.features.map((feature, index) => (
              <span key={index} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Property Location */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Location</h2>
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <p className="text-gray-600 mb-4">Map will be displayed here</p>
            <button className="btn-primary text-white px-6 py-2 rounded-lg">
              View on Map
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}