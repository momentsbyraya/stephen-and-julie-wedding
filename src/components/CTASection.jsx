import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail } from 'lucide-react'
import RSVPModal from './RSVPModal'
import { themeConfig, TEXT_ON_PRIMARY_BG } from '../config/themeConfig'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const CTASection = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Check if refs are available before animating
    if (!sectionRef.current || !contentRef.current) return

    // Scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // Main content animation
    if (contentRef.current) {
      tl.fromTo(contentRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      )
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const openRSVPModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <section
        id="rsvp-section"
        data-rsvp="true"
        ref={sectionRef}
        className="relative py-20 w-full overflow-hidden"
        style={{ backgroundColor: '#FFD6C2' }}
      >
        {/* Content */}
        <div className="relative z-20 flex items-center justify-center">
          <div ref={contentRef} className="max-w-md sm:max-w-xl lg:max-w-3xl w-full mx-auto px-8">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-script mb-6" style={{ color: TEXT_ON_PRIMARY_BG }}>
                We Await Your Presence
              </h2>
              <p className="text-base md:text-lg max-w-3xl mx-auto font-poppins" style={{ color: TEXT_ON_PRIMARY_BG }}>
                Your presence would make our special day even more meaningful.<br />
                Please let us know if you'll be joining us for our celebration.
              </p>
            </div>

            {/* RSVP Button */}
            <div className="text-center">
              <button
                onClick={openRSVPModal}
                className="w-full inline-flex items-center justify-center space-x-3 px-8 py-3 sm:py-5 lg:py-2 rounded-sm transition-colors duration-200 text-sm sm:text-2xl lg:text-base font-medium hover:opacity-90"
                style={{ backgroundColor: '#F8C8DC', color: TEXT_ON_PRIMARY_BG }}
              >
                <span>RSVP</span>
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Modal */}
      <RSVPModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}

export default CTASection 