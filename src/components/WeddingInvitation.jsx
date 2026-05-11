import React, { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { IoHeart } from 'react-icons/io5'
import { getTimeUntilWedding } from '../utils/countdown'
import { weddingConfig } from '../config/weddingConfig'
import { TEXT_ON_PRIMARY_BG } from '../config/themeConfig'
import Hero from './Hero'
import Calendar from './Calendar'
import Counter from './Counter'
import Schedule from './Schedule'
import Entourage from './Entourage'
import ImageSection from './ImageSection'
import Gallery from './Gallery'
import DressCode from './DressCode'
import MapDirections from './Venue'
import CTASection from './CTASection'
import SectionBeforeGift from './SectionBeforeGift'
import GiftGuideAndSnapShare from './GiftGuideAndSnapShare'
import EnhancedLazySection from './EnhancedLazySection'

const WeddingInvitation = () => {
  const [countdown, setCountdown] = useState(getTimeUntilWedding())

  useEffect(() => {
    // Initial page load animation
    gsap.fromTo(".main-container", 
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" }
    )
    
    const timer = setInterval(() => {
      setCountdown(getTimeUntilWedding())
    }, 1000) // Update every second

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <main className="main-container h-full section-container">
        {/* Hero Section - tiny negative margin so gradient just covers the seam */}
        <section className="h-full -mt-1.5 -mb-1.5"><Hero /></section>
        
        {/* Calendar Section - full-width background, pulled up by Hero overlap */}
        <EnhancedLazySection animationClass="fade-slide-up" sectionName="calendar" overflowVisible>
          <Calendar />
        </EnhancedLazySection>

        {/* Map & Directions Section */}
        <EnhancedLazySection animationClass="fade-slide-up" sectionName="map-directions" threshold={0.1} rootMargin="0px 0px 50px 0px">
          <MapDirections />
        </EnhancedLazySection>

        {/* Schedule Section */}
        <EnhancedLazySection
          animationClass="fade-scale"
          sectionName="invitation"
          threshold={0.1}
          rootMargin="0px 0px 50px 0px"
          overflowVisible
        >
          <Schedule />
        </EnhancedLazySection>

        {/* Entourage Section */}
        <EnhancedLazySection animationClass="fade-scale" sectionName="entourage">
          <Entourage />
        </EnhancedLazySection>

        {/* Image Section (after Entourage) - only render if image path is set */}
        {weddingConfig.photos?.sectionAfterEntourage && (
          <EnhancedLazySection animationClass="fade-scale" sectionName="image-after-entourage">
            <ImageSection />
          </EnhancedLazySection>
        )}

        {/* Gallery Section */}
        <EnhancedLazySection animationClass="fade-scale" sectionName="gallery">
          <Gallery />
        </EnhancedLazySection>

        {/* Dress Code Section */}
        <EnhancedLazySection animationClass="fade-slide-right" sectionName="dress-code">
          <DressCode />
        </EnhancedLazySection>

        {/* Gift Registry Section */}
        {/* <EnhancedLazySection animationClass="fade-slide-right" sectionName="gift-registry">
          <GiftRegistry />
        </EnhancedLazySection> */}

        {/* Love Story Section */}
        {/* <EnhancedLazySection animationClass="fade-slide-left" sectionName="love-story">
          <LoveStory />
        </EnhancedLazySection> */}

        {/* CTA Section - Full Width */}
        <EnhancedLazySection id="rsvp-section-wrapper" animationClass="fade-scale" sectionName="cta">
          <CTASection />
        </EnhancedLazySection>

        {/* Image Section (before Gift Guide) - only render if image path is set */}
        {weddingConfig.photos?.sectionBeforeGift && (
          <EnhancedLazySection animationClass="fade-scale" sectionName="image-before-gift">
            <SectionBeforeGift />
          </EnhancedLazySection>
        )}

        {/* Gift Guide & Snap & Share Section */}
        <EnhancedLazySection animationClass="fade-scale" sectionName="gift-guide-snap-share">
          <GiftGuideAndSnapShare />
        </EnhancedLazySection>

        {/* Wedding Details */}
        <EnhancedLazySection animationClass="fade-slide-up" sectionName="counter">
          <Counter countdown={countdown} />
        </EnhancedLazySection>

        
        {/* Couple Image Section */}
        {/* <EnhancedLazySection animationClass="fade-scale" sectionName="couple-image">
          <PhotoSection 
            imagePath={images.couple.couple3}
            title=""
            subtitle=""
          />
        </EnhancedLazySection> */}

        {/* FAQ Section */}
        {/* <EnhancedLazySection animationClass="fade-slide-right" sectionName="faq">
          <FAQ />
        </EnhancedLazySection> */}
        
        {/* Footer */}
        <footer className="py-4 text-center">
          <a 
            href="https://www.facebook.com/profile.php?id=61571540978411"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer hover:opacity-80 transition-all duration-200 font-poppins footer-link"
            style={{ color: TEXT_ON_PRIMARY_BG }}
          >
            <span>Made with</span>
            <IoHeart className="w-4 h-4 sm:w-5 sm:h-5 footer-heart" style={{ color: TEXT_ON_PRIMARY_BG }} />
            <span>|</span>
            <span>Moments by Raya</span>
          </a>
        </footer>
        
      </main>
    </div>
  )
}

export default WeddingInvitation 