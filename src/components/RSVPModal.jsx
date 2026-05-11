import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { X } from 'lucide-react'
import { weddingConfig } from '../config/weddingConfig'

const RSVPModal = ({ isOpen, onClose }) => {
  const embedUrl = (weddingConfig.rsvp?.formEmbedUrl || '').trim()
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
      
      // Modal entrance animation
      gsap.set([overlayRef.current, contentRef.current], { opacity: 0 })
      gsap.set(contentRef.current, { scale: 0.8, y: 50 })
      
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" })
      gsap.to(contentRef.current, { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        duration: 0.4, 
        ease: "back.out(1.7)" 
      })
    } else {
      // Re-enable body scroll when modal is closed
      document.body.style.overflow = 'unset'
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    // Modal exit animation
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: "power2.out" })
    gsap.to(contentRef.current, { 
      opacity: 0, 
      scale: 0.8, 
      y: 50, 
      duration: 0.3, 
      ease: "power2.out" 
    }).then(() => {
      onClose()
    })
  }

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose()
    }
  }

  if (!isOpen) return null

  return createPortal(
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleOverlayClick}
      />
      
      {/* Modal Content */}
      <div
        ref={contentRef}
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-wedding-200">
          <h2 className="text-2xl font-serif text-wedding-800">RSVP</h2>
          <button
            onClick={handleClose}
            className="p-2 text-wedding-600 hover:text-wedding-800 hover:bg-wedding-100 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[70vh] min-h-[240px] sm:min-h-[280px]">
          {embedUrl ? (
            <iframe
              title="RSVP form"
              src={embedUrl}
              className="h-[min(72vh,640px)] w-full rounded-lg border border-wedding-200 bg-wedding-50"
            />
          ) : (
            <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 px-2 text-center">
              <p className="font-serif text-lg text-wedding-800 sm:text-xl" aria-live="polite">
                {weddingConfig.rsvp?.message || 'Please RSVP'}
              </p>
              {weddingConfig.rsvp?.website ? (
                <a
                  href={weddingConfig.rsvp.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-wedding-300 bg-wedding-50 px-6 py-2 font-poppins text-sm font-medium text-wedding-800 transition-colors hover:bg-wedding-100"
                >
                  Open RSVP form
                </a>
              ) : (
                <p className="max-w-md font-poppins text-sm text-wedding-600">
                  Online RSVP will appear here once the form is connected.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default RSVPModal 