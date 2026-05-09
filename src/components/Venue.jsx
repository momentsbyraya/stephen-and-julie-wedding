import React, { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { themeConfig, TEXT_ON_PRIMARY_BG } from '../config/themeConfig'
import { weddingConfig } from '../config/weddingConfig'
import { venues as venuesData, images } from '../data'

const VENUE_MAUVE_FRAME = '#e8cdd6'

const VENUE_CTA_FILL = '#A9758A'

function shadeHex(hex, amount = -18) {
  const h = hex.replace('#', '')
  if (h.length !== 6) return hex
  const num = parseInt(h, 16)
  let r = (num >> 16) + amount
  let g = ((num >> 8) & 0xff) + amount
  let b = (num & 0xff) + amount
  const clamp = (v) => Math.max(0, Math.min(255, v))
  r = clamp(r); g = clamp(g); b = clamp(b)
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

const CTA_HEX = {
  'rose-300': '#c77b87',
  'rose-400': '#b06878',
  'rose-500': '#9f5f6e',
  'wedding-600': '#C790A7',
  'wedding-700': '#C790A7',
  'wedding-800': '#A9758A',
}

gsap.registerPlugin(ScrollTrigger)

function formatVenueAddress(v) {
  const line = `${v.address || ''}, ${v.city || ''}, ${v.state || ''}`
    .replace(/^,\s*|,\s*$/g, '')
    .replace(/,\s*,/g, ',')
    .trim()
  return [line, v.zip?.trim()].filter(Boolean).join(' ')
}

function mapsDirFallback(v) {
  const addr = `${v.address || ''}, ${v.city || ''}, ${v.state || ''} ${v.zip || ''}`.trim()
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addr)}`
}

function VenueFloralDivider({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 44"
      fill="none"
      className={`mx-auto mb-1 block max-w-[min(17rem,90vw)] w-full h-auto ${className ?? ''}`}
      aria-hidden
      style={{ color: TEXT_ON_PRIMARY_BG }}
    >
      <path
        stroke="currentColor"
        strokeOpacity="0.42"
        strokeWidth="1.1"
        strokeLinecap="round"
        d="M12 37h216"
      />
      <path
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinecap="round"
        opacity="0.88"
        d="M30 39Q88 14 118 36"
      />
      <path
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinecap="round"
        opacity="0.88"
        d="M210 39Q152 14 122 36"
      />
      <path stroke="currentColor" strokeWidth="1.05" strokeLinecap="round" opacity="0.82" d="M120 42V26" />
      <circle cx="120" cy="37" r="3" fill="currentColor" fillOpacity="0.36" />
    </svg>
  )
}

function VenueSparkle({ className }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        fill="white"
        fillOpacity="0.55"
        d="m24 2 2.9 13.06L41 21l-14.1 5.94L24 40l-2.9-13.06L7 21l14.1-5.94L24 2Z"
      />
      <circle cx="24" cy="21" r="2.8" fill="white" fillOpacity="0.5" />
    </svg>
  )
}

const MapDirections = () => {
  const sectionRef = useRef(null)
  const receptionDetailsRef = useRef(null)
  const receptionPhotoRef = useRef(null)
  const receptionButtonRef = useRef(null)

  const [activeIndex, setActiveIndex] = useState(0)

  const venueRoot = venuesData.venue || venuesData.ceremony || venuesData.reception
  const wc = weddingConfig.venue

  const slides = useMemo(() => {
    const fallbackImg = venueRoot.image || images.venues?.reception
    const receptionImg = venueRoot.receptionImage || venueRoot.image || fallbackImg
    const ceremonyImg = venueRoot.ceremonyImage || '/assets/images/venue/daraga-church-our-lady.jpg'

    return [
      {
        id: 'ceremony',
        tag: 'Ceremony place',
        title: wc.ceremony.name,
        addressLine: formatVenueAddress(wc.ceremony),
        image: ceremonyImg,
        captionLeft: venueRoot.ceremonyCaptionLeft || 'Ceremony place',
        captionRight: wc.ceremony.name,
        directionsUrl:
          venueRoot.directionsUrl ||
          venueRoot.googleMapsUrl ||
          mapsDirFallback(wc.ceremony),
      },
      {
        id: 'reception',
        tag: 'The venue',
        title: wc.reception.name,
        addressLine: formatVenueAddress(wc.reception),
        image: receptionImg,
        captionLeft: venueRoot.photoCaptionLeft || 'Our celebration venue',
        captionRight: wc.reception.name,
        directionsUrl:
          venueRoot.reception?.directionsUrl ||
          venueRoot.directionsUrl ||
          mapsDirFallback(wc.reception),
      },
    ]
  }, [venueRoot, wc])

  const slideCount = slides.length
  const current = slides[activeIndex]

  const goPrev = () => setActiveIndex((i) => (i - 1 + slideCount) % slideCount)
  const goNext = () => setActiveIndex((i) => (i + 1) % slideCount)

  useEffect(() => {
    const section = sectionRef.current
    const details = receptionDetailsRef.current
    const photo = receptionPhotoRef.current
    const button = receptionButtonRef.current
    if (!section || !details || !photo || !button) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.fromTo(details, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' })
      .fromTo(photo, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.65, ease: 'power2.out' }, '-=0.35')
      .fromTo(button, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.35')

    ScrollTrigger.refresh()
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const secondaryKey = weddingConfig.theme?.secondaryColor || 'rose-400'
  const ctaFill =
    CTA_HEX[secondaryKey] || CTA_HEX[weddingConfig.theme?.primaryColor] || VENUE_CTA_FILL
  const ctaHover = shadeHex(ctaFill, -22)

  return (
    <section
      id="map"
      ref={sectionRef}
      className="relative py-14 sm:py-20 lg:py-24 w-full overflow-hidden"
      style={{
        background: `linear-gradient(172deg, #FFF9F5 0%, #FFF6F9 42%, #FDF0F5 78%, #FAF8FC 100%)`,
      }}
      aria-roledescription="carousel"
      aria-label="Where to go: ceremony and reception"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background: `radial-gradient(ellipse 80% 55% at 50% -10%, rgba(248,200,220,0.45) 0%, transparent 55%)`,
        }}
        aria-hidden
      />

      <VenueSparkle className="pointer-events-none absolute bottom-10 right-6 sm:right-12 h-11 w-11 sm:h-14 sm:w-14 z-10" />

      <div className={`${themeConfig.container.maxWidth} ${themeConfig.container.center} ${themeConfig.container.padding} relative z-20`}>
        <div className="max-w-md sm:max-w-lg lg:max-w-xl mx-auto">
          <div ref={receptionDetailsRef} className="text-center px-2 sm:px-0 mb-6 sm:mb-8">
            <VenueFloralDivider />

            <h2 className="font-serif text-4xl sm:text-5xl md:text-[2.85rem] font-normal tracking-[0.02em] mb-5 sm:mb-6" style={{ color: TEXT_ON_PRIMARY_BG }}>
              Venue
            </h2>

            {/* Slide tabs */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6" role="tablist" aria-label="Choose ceremony or reception">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  id={`venue-tab-${s.id}`}
                  aria-selected={activeIndex === i}
                  aria-controls={`venue-panel-${s.id}`}
                  onClick={() => setActiveIndex(i)}
                  className="rounded-full border px-4 py-2 text-xs sm:text-sm font-serif transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f1d1d]"
                  style={{
                    borderColor: activeIndex === i ? ctaFill : `${TEXT_ON_PRIMARY_BG}55`,
                    backgroundColor: activeIndex === i ? `${ctaFill}22` : 'transparent',
                    color: TEXT_ON_PRIMARY_BG,
                  }}
                >
                  {s.tag}
                </button>
              ))}
            </div>

            {/* Active slide heading + address */}
            <div
              id={`venue-panel-${current.id}`}
              role="tabpanel"
              aria-labelledby={`venue-tab-${current.id}`}
              className="min-h-[7rem] sm:min-h-[7.5rem]"
            >
              <h3
                className="font-serif text-lg sm:text-xl md:text-2xl leading-snug font-medium mb-2 sm:mb-3 px-1 transition-opacity duration-300"
                style={{ color: TEXT_ON_PRIMARY_BG }}
              >
                {current.title}
              </h3>
              <p className="font-serif text-sm sm:text-base md:text-lg leading-relaxed font-normal px-2 transition-opacity duration-300" style={{ color: '#7f1d1dcc' }}>
                {current.addressLine}
              </p>
            </div>
          </div>

          <div ref={receptionPhotoRef} className="relative mb-6 sm:mb-8 flex justify-center px-1">
            <div
              className="w-full rounded-lg p-3 sm:p-4 shadow-[0_24px_50px_-20px_rgba(75,68,83,0.18)] bg-white/50 backdrop-blur-[2px]"
              style={{ borderWidth: '1.5px', borderStyle: 'solid', borderColor: VENUE_MAUVE_FRAME }}
            >
              <div
                className="overflow-hidden rounded-md bg-white relative"
                style={{ borderWidth: '1.5px', borderStyle: 'solid', borderColor: TEXT_ON_PRIMARY_BG }}
              >
                <div className="relative aspect-[16/10] w-full bg-stone-100">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7f1d1d]"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: TEXT_ON_PRIMARY_BG }} aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-md transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7f1d1d]"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: TEXT_ON_PRIMARY_BG }} aria-hidden />
                  </button>

                  {slides.map((s, i) => (
                    <img
                      key={s.id}
                      src={s.image}
                      alt=""
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
                        i === activeIndex ? 'z-[1] opacity-100' : 'z-0 opacity-0'
                      }`}
                    />
                  ))}
                </div>

                <div
                  className="flex flex-row items-start sm:items-center justify-between gap-3 px-4 sm:px-5 py-3 sm:py-3.5 border-t bg-white"
                  style={{ borderColor: '#7f1d1d22' }}
                >
                  <p className="font-serif text-xs sm:text-sm text-left leading-snug transition-opacity duration-300" style={{ color: TEXT_ON_PRIMARY_BG }}>
                    {current.captionLeft}
                  </p>
                  <p className="font-serif text-xs sm:text-sm text-right italic leading-snug max-w-[55%] transition-opacity duration-300" style={{ color: '#7f1d1ddd' }}>
                    {current.captionRight}
                  </p>
                </div>

                <div className="flex justify-center gap-2 pb-4 pt-1" role="group" aria-label="Slide indicators">
                  {slides.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      aria-label={`Show ${s.tag}`}
                      aria-current={i === activeIndex}
                      onClick={() => setActiveIndex(i)}
                      className="h-2.5 rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#7f1d1d]"
                      style={{
                        width: i === activeIndex ? '1.5rem' : '0.5rem',
                        backgroundColor: i === activeIndex ? ctaFill : `${TEXT_ON_PRIMARY_BG}44`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div ref={receptionButtonRef} className="flex justify-center px-1">
            <a
              key={current.directionsUrl}
              href={current.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center rounded-lg px-8 py-4 sm:py-5 text-base sm:text-lg font-serif font-medium text-white tracking-wide shadow-[0_12px_32px_-12px_rgba(55,42,52,0.45)] transition-[background-color,transform] duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f1d1d] motion-reduce:hover:translate-y-0"
              style={{ backgroundColor: ctaFill }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = ctaHover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = ctaFill
              }}
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapDirections
