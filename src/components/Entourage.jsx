import React, { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X } from 'lucide-react'
import entourageData from '../data/entourage.json'
import { TEXT_ON_PRIMARY_BG } from '../config/themeConfig'

gsap.registerPlugin(ScrollTrigger)

const MUTED = 'rgba(127, 29, 29, 0.82)'
const ENTOURAGE_BG = '/assets/images/graphics/BGEntourage.png'
const ENTOURAGE_PAGES = [
  {
    src: '/assets/images/Entourage/principal.png',
    alt: 'Principal entourage sponsors'
  },
  {
    src: '/assets/images/Entourage/secondary.png',
    alt: 'Secondary entourage sponsors'
  }
]

const Entourage = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const summaryRef = useRef(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [expandedImage, setExpandedImage] = useState(null)

  const list = entourageData.entourageList ?? []
  const totalRoles = list.length
  const totalNames = list.reduce((n, g) => {
    if (Array.isArray(g.pairs) && g.pairs.length > 0) return n + g.pairs.length * 2
    return n + (g.names?.length ?? 0)
  }, 0)
  const summaryText = entourageData.summary ?? ''

  const closeModal = useCallback(() => {
    setExpandedImage(null)
    setModalOpen(false)
  }, [])
  const closeExpandedImage = useCallback(() => setExpandedImage(null), [])

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 50%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    tl.fromTo(headerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )

    if (summaryRef.current) {
      ScrollTrigger.create({
        trigger: summaryRef.current,
        start: 'top 85%',
        animation: gsap.fromTo(summaryRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' }
        ),
        toggleActions: 'play none none reverse'
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  useEffect(() => {
    if (!modalOpen) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (expandedImage) closeExpandedImage()
      else closeModal()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [modalOpen, expandedImage, closeModal, closeExpandedImage])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ENTOURAGE_BG})` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[#FFF9F5]/35"
        aria-hidden
      />

      <button
        type="button"
        onClick={() => setModalOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={modalOpen}
        className="relative z-20 flex w-full cursor-pointer items-center justify-center border-0 bg-transparent text-center outline-none focus-visible:ring-2 focus-visible:ring-rose-900/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        style={{
          paddingLeft: '1rem',
          paddingRight: '1rem',
          paddingTop: '4rem',
          paddingBottom: '4rem'
        }}
      >
        <div className="pointer-events-none mx-auto w-full max-w-xs rounded-2xl bg-[#FFF9F5]/72 px-3 py-10 shadow-sm backdrop-blur-[2px] sm:max-w-md sm:px-4 sm:py-12 lg:max-w-2xl lg:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <h2 ref={headerRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2">
              <span className="imperial-script-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl inline-block leading-none" style={{ lineHeight: '0.8', color: TEXT_ON_PRIMARY_BG }}>Entourage</span>
            </h2>
          </div>

          <div ref={summaryRef} className="space-y-4 mb-8 text-center">
            <p className="text-sm sm:text-base md:text-lg font-poppins leading-relaxed px-1" style={{ color: MUTED }}>
              {summaryText}
            </p>
            <p className="text-xs sm:text-sm font-poppins" style={{ color: MUTED }}>
              {totalRoles} roles · {totalNames} people
            </p>
            <p className="text-xs font-poppins underline decoration-rose-900/30 underline-offset-4" style={{ color: TEXT_ON_PRIMARY_BG }}>
              Tap anywhere to see the full list
            </p>
          </div>

          <div className="mb-2 flex flex-row gap-4 sm:gap-6 justify-center items-center opacity-95">
            <div className="min-w-0 flex-1">
              <p className="text-[16px] sm:text-lg md:text-xl imperial-script-regular mb-1 text-right" style={{ color: TEXT_ON_PRIMARY_BG }}>Groom</p>
              <p className="text-[10px] sm:text-sm md:text-base font-poppins uppercase truncate text-right" style={{ color: TEXT_ON_PRIMARY_BG }}>{entourageData.couple.groom.name}</p>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[16px] sm:text-lg md:text-xl imperial-script-regular mb-1 text-left" style={{ color: TEXT_ON_PRIMARY_BG }}>Bride</p>
              <p className="text-[10px] sm:text-sm md:text-base font-poppins uppercase truncate text-left" style={{ color: TEXT_ON_PRIMARY_BG }}>{entourageData.couple.bride.name}</p>
            </div>
          </div>
        </div>
      </button>

      {modalOpen && createPortal(
        <>
          <div id="entourage-dialog" className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="entourage-modal-title">
            <button
              type="button"
              className="absolute inset-0 z-0 bg-black/55 backdrop-blur-[2px]"
              aria-label="Close entourage list"
              onClick={closeModal}
            />
            <div
              className="relative z-10 flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-2xl shadow-2xl sm:max-w-xl md:max-w-2xl"
              style={{ backgroundColor: '#FFF9F5' }}
            >
              <div className="flex shrink-0 items-center justify-between gap-4 border-b border-rose-900/10 px-5 py-3 sm:px-6 sm:py-4">
                <h3 id="entourage-modal-title" className="imperial-script-regular text-2xl sm:text-3xl md:text-4xl" style={{ color: TEXT_ON_PRIMARY_BG }}>
                  Entourage
                </h3>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full p-2 text-rose-900/70 hover:bg-rose-900/10 hover:text-rose-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-900/30"
                  aria-label="Close"
                >
                  <X className="h-6 w-6" strokeWidth={2} />
                </button>
              </div>
              <div className="overflow-y-auto overscroll-contain bg-[#FFF9F5]">
                {ENTOURAGE_PAGES.map((page, index) => (
                  <button
                    key={page.src}
                    type="button"
                    onClick={() => setExpandedImage(page)}
                    className="block w-full cursor-zoom-in border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-rose-900/40"
                    aria-label={`Expand entourage page ${index + 1}`}
                  >
                    <img
                      src={page.src}
                      alt={page.alt}
                      className="block h-auto w-full"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {expandedImage && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 p-2 sm:p-6" role="dialog" aria-modal="true" aria-label="Expanded entourage image">
              <button
                type="button"
                className="absolute inset-0 z-0 cursor-zoom-out"
                aria-label="Close expanded entourage image"
                onClick={closeExpandedImage}
              />
              <img
                src={expandedImage.src}
                alt={expandedImage.alt}
                className="relative z-10 max-h-[94vh] max-w-[96vw] object-contain shadow-2xl"
              />
              <button
                type="button"
                onClick={closeExpandedImage}
                className="absolute right-3 top-3 z-20 rounded-full bg-[#FFF9F5]/95 p-2 text-rose-900 shadow-lg hover:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:right-5 sm:top-5"
                aria-label="Close expanded image"
              >
                <X className="h-6 w-6" strokeWidth={2} />
              </button>
            </div>
          )}
        </>,
        document.body
      )}
    </section>
  )
}

export default Entourage
