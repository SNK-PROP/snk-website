"use client"

import { useState } from 'react'
import Link from 'next/link'
import { getPropertyTypeIcon } from '@/lib/data'
import { Briefcase } from 'lucide-react'

export default function PropertyHeader({ property }) {
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  const toggleSave = () => {
    setSaved(!saved)
    // In real app: Save/unsave property in backend
  }

  const copyLink = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = url
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section className="bg-white border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          {/* Property Info */}
          <div className="flex-1">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified
              </span>
              <span className="bg-primary-blue/10 text-primary-blue px-3 py-1 rounded-full text-sm font-semibold capitalize flex items-center gap-1">
                <span className="text-lg">{getPropertyTypeIcon(property.propertyType || property.type)}</span>
                {property.propertyType || property.type || 'Commercial'}
              </span>
              <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-sm font-semibold capitalize flex items-center gap-1">
                <Briefcase className="h-4 w-4" /> {property.transactionType || 'Sale'}
              </span>
              {property.furnished && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Furnished
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {property.title || 'Property for Sale/Rent'}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  {property.location?.city || 'City'}{property.location?.state && `, ${property.location?.state}`}
                </span>
              </div>
              {property.area && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" />
                  </svg>
                  <span>{property.area} {property.areaUnit || 'sqft'}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Posted {property.postedDate || 'recently'}</span>
              </div>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex flex-col items-end gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">
                {property.transactionType === 'rent' ? 'Monthly Rent' : property.transactionType === 'lease' ? 'Annual Lease' : 'Total Price'}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary-blue">
                {property.price || 'Contact for Price'}
              </div>
              {property.pricePerSqft && (
                <div className="text-sm text-gray-600 font-medium">
                  {property.pricePerSqft}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSave}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  saved
                    ? 'bg-gold text-white border-gold'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gold hover:text-gold'
                }`}
              >
                <svg className="w-5 h-5" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {saved ? 'Saved' : 'Save'}
              </button>
              <button
                onClick={copyLink}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-gray-700 border border-gray-300 hover:border-primary-blue hover:text-primary-blue transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {copied ? 'Copied!' : 'Share'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
