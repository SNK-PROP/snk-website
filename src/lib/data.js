import { apiService } from './api'

export const fetchProperties = async (filters = {}) => {
  try {
    const params = {
      page: filters.page || 1,
      limit: filters.limit || 10,
      ...filters
    }

    // Remove empty filters
    Object.keys(params).forEach(key => {
      if (params[key] === '' || params[key] === undefined || params[key] === null) {
        delete params[key]
      }
    })

    const response = await apiService.getProperties(params)
    return response
  } catch (error) {
    console.error('Error fetching properties:', error)
    return {
      properties: [],
      pagination: {
        current: 1,
        pages: 1,
        total: 0,
        hasNext: false,
        hasPrev: false
      }
    }
  }
}

export const fetchPropertyById = async (id) => {
  try {
    const response = await apiService.getPropertyById(id)
    return response
  } catch (error) {
    console.error('Error fetching property:', error)
    return null
  }
}

export const propertyFilters = {
  // Property Type filters
  types: [
    { value: 'commercial', label: 'Commercial' },
    { value: 'office', label: 'Office Space' },
    { value: 'retail', label: 'Retail Shop' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'land', label: 'Land/Plot' },
    { value: 'co-working', label: 'Co-working Space' }
  ],

  // Transaction Type filters
  transactionTypes: [
    { value: 'sale', label: 'For Sale' },
    { value: 'rent', label: 'For Rent' },
    { value: 'lease', label: 'For Lease' }
  ],

  // Furnishing options
  furnishingOptions: [
    { value: 'unfurnished', label: 'Unfurnished' },
    { value: 'semi-furnished', label: 'Semi-Furnished' },
    { value: 'furnished', label: 'Furnished' }
  ],

  // Area units
  areaUnits: [
    { value: 'sqft', label: 'sqft' },
    { value: 'sqm', label: 'sqm' },
    { value: 'acre', label: 'Acre' },
    { value: 'hectare', label: 'Hectare' }
  ],

  // Popular cities
  popularCities: [
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Bangalore', label: 'Bangalore' },
    { value: 'Chennai', label: 'Chennai' },
    { value: 'Hyderabad', label: 'Hyderabad' },
    { value: 'Pune', label: 'Pune' },
    { value: 'Kolkata', label: 'Kolkata' },
    { value: 'Ahmedabad', label: 'Ahmedabad' }
  ]
}

export const formatPrice = (price) => {
  if (!price || price === 0) return '₹0'

  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} Lakh`
  } else {
    return `₹${price.toLocaleString()}`
  }
}

export const formatDate = (dateString) => {
  if (!dateString) return 'Date not specified'

  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

export const getPropertyStatus = (property) => {
  const status = property.status || property.approvalStatus || 'pending'

  switch (status.toLowerCase()) {
    case 'approved':
    case 'active':
      return { color: 'green', text: 'Active' }
    case 'pending':
      return { color: 'yellow', text: 'Pending' }
    case 'rejected':
      return { color: 'red', text: 'Rejected' }
    case 'sold':
      return { color: 'gray', text: 'Sold' }
    case 'rented':
      return { color: 'gray', text: 'Rented' }
    default:
      return { color: 'gray', text: 'Unknown' }
  }
}

export const getPropertyTypeIcon = (type) => {
  switch (type.toLowerCase()) {
    case 'office':
    case 'office space':
      return '🏢'
    case 'retail':
    case 'retail shop':
      return '🛍️'
    case 'commercial':
      return '🏬'
    case 'industrial':
    case 'warehouse':
      return '🏭'
    case 'land':
    case 'plot':
      return '🏗️'
    case 'co-working':
      return '💼'
    default:
      return '🏠'
  }
}

// ============ NEW: Contact & Inquiry Methods ============

export const submitContactInquiry = async (inquiryData) => {
  try {
    const response = await apiService.submitContactInquiry(inquiryData)
    return { success: true, data: response }
  } catch (error) {
    console.error('Error submitting contact inquiry:', error)
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to submit inquiry'
    }
  }
}

export const submitPropertyInquiry = async (propertyId, inquiryData) => {
  try {
    const response = await apiService.submitPropertyInquiry(propertyId, inquiryData)
    return { success: true, data: response }
  } catch (error) {
    console.error('Error submitting property inquiry:', error)
    return {
      success: false,
      error: error.response?.data?.message || error.message || 'Failed to submit inquiry'
    }
  }
}

// ============ NEW: Similar Properties ============

export const fetchSimilarProperties = async (propertyId) => {
  try {
    const response = await apiService.getSimilarProperties(propertyId)
    return response
  } catch (error) {
    console.error('Error fetching similar properties:', error)
    return { properties: [] }
  }
}

// ============ NEW: Public Statistics ============

export const fetchPublicStatistics = async () => {
  try {
    const response = await apiService.getPublicStatistics()
    return response
  } catch (error) {
    console.error('Error fetching public statistics:', error)
    // Return fallback stats if API fails
    return {
      totalProperties: 5000,
      featuredProperties: 120,
      totalBrokers: 150,
      totalCities: 25,
      propertiesByType: [],
      cities: []
    }
  }
}

// ============ NEW: Search Methods ============

export const searchProperties = async (filters = {}) => {
  return await fetchProperties(filters)
}

// ============ NEW: Broker Methods ============

export const fetchPublicBrokers = async (filters = {}) => {
  try {
    const response = await apiService.getPublicBrokers(filters)
    return response
  } catch (error) {
    console.error('Error fetching public brokers:', error)
    return { brokers: [], pagination: { current: 1, pages: 1, total: 0 } }
  }
}