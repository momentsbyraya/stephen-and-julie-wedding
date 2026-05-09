import React, { useRef } from 'react'
import { weddingConfig } from '../config/weddingConfig'
import { TEXT_ON_PRIMARY_BG } from '../config/themeConfig'

function OpeningScreen({ onEnvelopeOpen, onStampClick }) {
  const envelopeRef = useRef(null)
  const openingSectionRef = useRef(null)

  const handleEnvelopeClick = () => {
    // Start music immediately when stamp is clicked
    if (onStampClick) onStampClick()

    const envelope = envelopeRef.current
    const openingSection = openingSectionRef.current
    
    if (envelope) {
      envelope.classList.add('active')
      // Letter translation: 0.3s delay + 0.8s duration = 1.1s total
      // Wait 1 second after letter finishes translating
      setTimeout(() => {
        if (openingSection) {
          openingSection.classList.add('zooming-out')
          // After zoom and fadeout animation completes, reveal invitation
          setTimeout(() => {
            if (onEnvelopeOpen) {
              onEnvelopeOpen()
            }
          }, 1500) // Animation duration
        }
      }, 2100) // 1.1s (letter animation) + 1000ms (1 second wait)
    }
  }

  const groomFirstName =
    (weddingConfig.couple.groom.firstName || '').trim().split(/\s+/)[0] || ''
  const brideFirstName =
    (weddingConfig.couple.bride.firstName || '').trim().split(/\s+/)[0] || ''

  return (
    <div 
      ref={openingSectionRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center opening-section"
    >
      {/* Background image with pulsing animation */}
      <div 
        className="absolute inset-0 opening-bg-pulse"
        style={{
          backgroundImage: 'url(/assets/images/graphics/openine-bg-6.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <section className="cssletter flex flex-col items-center justify-center relative z-10 w-full flex-1" style={{ minHeight: 'auto', height: 'auto' }}>
        {/* Click me! – at the top of the envelope */}
        <h1 
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-antsvalley leading-tight text-center mb-6 sm:mb-8 md:mb-10 click-me-container"
          style={{ color: TEXT_ON_PRIMARY_BG, fontSize: 'clamp(3rem, 8vw, 96px)' }}
        >
          Click me!
        </h1>
        <div className="envelope" ref={envelopeRef}>
          <button 
            className="heart stamp-button" 
            id="openEnvelope" 
            aria-label="Open Envelope"
            onClick={handleEnvelopeClick}
          >
            <img 
              src="/assets/images/graphics/stamp.png" 
              alt="Stamp" 
              className="stamp-image"
            />
          </button>
          <div className="envelope-flap"></div>
          <div className="envelope-folds">
            <div className="envelope-left"></div>
            <div className="envelope-right"></div>
            <div className="envelope-bottom"></div>
          </div>
          {/* Letter that slides up when envelope opens */}
          <div className="envelope-letter">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold">You are invited!</p>
            <img 
              src="/assets/images/graphics/cutlery-sketch.png" 
              alt="Cutlery sketch" 
              className="mt-4 w-20 sm:w-24 md:w-28 h-auto mx-auto"
            />
          </div>
        </div>
        {/* Couple name and date below envelope */}
        <div className="mt-12 sm:mt-16 md:mt-20 text-center couple-name-container">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-script leading-tight flex flex-row flex-wrap items-baseline justify-center gap-x-2 sm:gap-x-3 gap-y-1"
            style={{ color: TEXT_ON_PRIMARY_BG, fontSize: 'clamp(1.5rem, 4vw, 48px)' }}
          >
            <span className="whitespace-nowrap">{groomFirstName}</span>
            <span className="opacity-90">&</span>
            <span className="whitespace-nowrap">{brideFirstName}</span>
          </h2>
          <p 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-script mt-1"
            style={{ color: TEXT_ON_PRIMARY_BG, fontSize: 'clamp(1rem, 2.5vw, 30px)' }}
          >
            {new Date(weddingConfig.wedding.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.')}
          </p>
        </div>
      </section>
    </div>
  )
}

export default OpeningScreen

