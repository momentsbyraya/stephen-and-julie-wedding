import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { weddingConfig } from '../config/weddingConfig'
import { TEXT_ON_PRIMARY_BG } from '../config/themeConfig'
import { audio } from '../data'

// Overlay color: match theme primary (#F8C8DC)
const HERO_OVERLAY_COLOR = '248, 200, 220'
// Calendar section background – keep aligned with hero primary gradient endpoint
const CALENDAR_SECTION_COLOR = '248, 200, 220'

/** Dark red hero copy + soft cream halo so type stays legible on busy photos */
const heroTextStyle = {
  color: TEXT_ON_PRIMARY_BG,
  letterSpacing: '-0.01em',
  wordSpacing: '-1px',
  textShadow: '0 0 14px rgba(255, 249, 245, 0.95), 0 1px 2px rgba(255, 249, 245, 0.9)',
}

const Hero = () => {
  const audioRef = useRef(null)

  const groomFirstNameRef = useRef(null)
  const groomLastNameRef = useRef(null)
  const andRef = useRef(null)
  const brideFirstNameRef = useRef(null)
  const brideLastNameRef = useRef(null)
  const dateRef = useRef(null)
  const venueRef = useRef(null)

  const { couple, wedding, venue } = weddingConfig
  const ceremony = venue.ceremony
  const venueName = ceremony.name
  const heroImage = weddingConfig.photos?.hero || '/assets/images/graphics/Prenup4.png'

  const formatDate = () => {
    const monthUpper = (wedding.month || '').toUpperCase()
    const dayFormatted = String(wedding.day || '').padStart(2, '0')
    return `${monthUpper}.${dayFormatted}.${wedding.year}`
  }

  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    el.volume = audio.volume
    return () => el.pause()
  }, [])

  useEffect(() => {
    const refs = [
      groomFirstNameRef,
      groomLastNameRef,
      andRef,
      brideFirstNameRef,
      brideLastNameRef,
      dateRef,
      venueRef
    ]
    refs.forEach((r) => {
      if (r.current) {
        if (r === andRef) gsap.set(r.current, { opacity: 0, y: 20 })
        else gsap.set(r.current, { opacity: 0, y: 30 })
      }
    })

    const tl = gsap.timeline({ delay: 0.3 })
    if (groomFirstNameRef.current && groomLastNameRef.current) {
      tl.to(groomFirstNameRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
        .to(groomLastNameRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
    }
    if (andRef.current) tl.to(andRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
    if (brideFirstNameRef.current && brideLastNameRef.current) {
      tl.to(brideFirstNameRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
        .to(brideLastNameRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
    }
    if (dateRef.current) tl.to(dateRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
    if (venueRef.current) tl.to(venueRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
  }, [])

  const scrollToRSVP = () => {
    const target =
      document.querySelector('section[data-rsvp="true"]') ||
      document.getElementById('rsvp-section-wrapper') ||
      document.getElementById('rsvp-section')
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="relative w-full" style={{ height: '100vh' }}>
      <audio ref={audioRef} src={audio.background} loop />

      {/* Hero image: anchor left-ish so framing favors the left; on 992px+ slightly higher for faces */}
      <img
        src={heroImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-[28%_35%] sm:object-[26%_35%] min-[992px]:object-[26%_28%]"
      />

      {/* Top gradient overlay */}
      <svg
        className="absolute top-0 left-0 w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] z-10 pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 1200 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="heroBlurTop">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
          <linearGradient id="heroTopGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={`rgba(${HERO_OVERLAY_COLOR}, 0.95)`} />
            <stop offset="40%" stopColor={`rgba(${HERO_OVERLAY_COLOR}, 0.7)`} />
            <stop offset="70%" stopColor={`rgba(${HERO_OVERLAY_COLOR}, 0.3)`} />
            <stop offset="100%" stopColor={`rgba(${HERO_OVERLAY_COLOR}, 0)`} />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#heroTopGradient)" filter="url(#heroBlurTop)" />
      </svg>

      {/* Names at top – first names: bold serif (Playfair), last names: script (Carattere), AND: sans (Poppins) */}
      <div className="absolute top-0 left-0 right-0 px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 z-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col items-center justify-center p-[5px]">
            <div>
              <p
                ref={groomFirstNameRef}
                className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-tight"
                style={heroTextStyle}
              >
                {couple.groom.firstName}
              </p>
              <p
                ref={groomLastNameRef}
                className="font-carattere text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight -mt-2 sm:-mt-3 pl-4 sm:pl-6"
                style={heroTextStyle}
              >
                {couple.groom.lastName}
              </p>
            </div>
            <p
              ref={andRef}
              className="font-poppins text-sm sm:text-base md:text-lg uppercase my-0.5 sm:my-1 font-medium"
              style={heroTextStyle}
            >
              AND
            </p>
            <div>
              <p
                ref={brideFirstNameRef}
                className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-tight"
                style={heroTextStyle}
              >
                {couple.bride.firstName}
              </p>
              <p
                ref={brideLastNameRef}
                className="font-carattere text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight -mt-2 sm:-mt-3 pl-4 sm:pl-6"
                style={heroTextStyle}
              >
                {couple.bride.lastName}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <svg
        className="absolute bottom-0 left-0 w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] z-10 pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 1200 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="heroBlurBottom">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
          <linearGradient id="heroBottomGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={`rgba(${HERO_OVERLAY_COLOR}, 0)`} />
            <stop offset="30%" stopColor={`rgba(${HERO_OVERLAY_COLOR}, 0.3)`} />
            <stop offset="60%" stopColor={`rgba(${HERO_OVERLAY_COLOR}, 0.7)`} />
            <stop offset="95%" stopColor={`rgba(${HERO_OVERLAY_COLOR}, 0.95)`} />
            <stop offset="100%" stopColor={`rgba(${CALENDAR_SECTION_COLOR}, 1)`} />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#heroBottomGradient)" filter="url(#heroBlurBottom)" />
      </svg>

      {/* Date, venue and RSVP at bottom – date: bold serif, address: sans */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 px-4 sm:px-6 md:px-8 z-20">
        <div className="max-w-4xl mx-auto text-center">
          <p
            ref={dateRef}
            className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase"
            style={heroTextStyle}
          >
            {formatDate()}
          </p>
          {venueName && (
            <p
              ref={venueRef}
              className="font-poppins text-[11px] sm:text-sm md:text-base mt-2 sm:mt-3 text-center max-w-md mx-auto"
              style={heroTextStyle}
            >
              {venueName}
            </p>
          )}
          <button
            type="button"
            onClick={scrollToRSVP}
            className="font-poppins text-sm sm:text-base mt-0.5 underline hover:opacity-90 transition-opacity cursor-pointer tracking-wider pb-[5px]"
            style={heroTextStyle}
          >
            RSVP
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
