"use client"

import { useState } from 'react'
import { getPropertyTypeIcon } from '@/lib/data'
import { Building } from 'lucide-react'

export default function PropertyGallery({ images = [], title = 'Property' }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // Use placeholder images if none provided
  const displayImages = images.length > 0
    ? images
    : [
      `https://picsum.photos/seed/${title}/1200/800.jpg`,
      `https://picsum.photos/seed/${title}2/1200/800.jpg`,
      `https://picsum.photos/seed/${title}3/1200/800.jpg`,
      `https://picsum.photos/seed/${title}4/1200/800.jpg`,
      `https://picsum.photos/seed/${title}5/1200/800.jpg`
    ]

  const openLightbox = (index) => {
    setSelectedImage(index)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  const goToNext = () => {
    setSelectedImage((prev) => (prev + 1) % displayImages.length)
  }

  const goToPrev = () => {
    setSelectedImage((prev) => (prev - 1 + displayImages.length) % displayImages.length)
  }

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Main Image */}
        <div className="mb-6">
          <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
            {displayImages[selectedImage] ? (
              <img
                src={displayImages[selectedImage]}
                alt={`${title} view ${selectedImage + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                <Building className="w-32 h-32 opacity-30" />
              </div>
            )}
            <button
              onClick={() => openLightbox(selectedImage)}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-30 transition-all"
              aria-label="View full size image"
            >
              <svg className="w-16 h-16 text-white opacity-0 hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            {/* Image Badge */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
              📷 {selectedImage + 1} / {displayImages.length}
            </div>
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square rounded overflow-hidden transition-all ${
                index === selectedImage
                  ? 'ring-2 ring-primary-blue ring-offset-2 scale-105'
                  : 'opacity-70 hover:opacity-100 hover:scale-105'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              {image ? (
                <img
                  src={image}
                  alt={`${title} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-2xl opacity-30">📷</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 p-2"
            aria-label="Previous image"
          >
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 p-2"
            aria-label="Next image"
          >
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Lightbox Image */}
          <div className="relative max-w-6xl max-h-[90vh]">
            {displayImages[selectedImage] ? (
              <img
                src={displayImages[selectedImage]}
                alt={`${title} view ${selectedImage + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="w-[600px] h-[400px] flex items-center justify-center bg-gray-800">
                <Building className="w-32 h-32 opacity-30" />
              </div>
            )}
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-full">
            {selectedImage + 1} of {displayImages.length}
          </div>

          {/* Keyboard Navigation Hint */}
          <div className="absolute bottom-4 right-4 text-white text-xs opacity-50">
            Use arrow keys to navigate
          </div>
        </div>
      )}
    </section>
  )
}
