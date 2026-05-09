import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { weddingConfig } from '../config/weddingConfig'
import { TEXT_ON_PRIMARY_BG } from '../config/themeConfig'

gsap.registerPlugin(ScrollTrigger)

const BIBLE_VERSE = {
  reference: 'Jeremiah 29:11',
  text: '"For I know the plans I have for you, plans to prosper you and not to harm you, plans to give you hope and a future"'
}

const ImageSection = () => {
  const sectionRef = useRef(null)
  const polaroidRef = useRef(null)

  const imagePath = weddingConfig.photos?.sectionAfterEntourage

  useEffect(() => {
    if (!polaroidRef.current || !sectionRef.current) return
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      animation: gsap.fromTo(
        polaroidRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      ),
      toggleActions: 'play none none reverse'
    })
    return () => st.kill()
  }, [])

  if (!imagePath) return null

  return (
    <section
      ref={sectionRef}
      className="relative py-4 sm:py-6 w-full overflow-hidden min-h-[500px] sm:min-h-[580px] flex flex-col"
      aria-label="Photo and verse section"
    >
      <div className="flex-1 flex flex-col items-stretch justify-center px-3 sm:px-4 min-h-0">
        {/* Polaroid fills the section: image flexes, verse fixed at bottom */}
        <div
          ref={polaroidRef}
          className="relative bg-white p-2 sm:p-3 shadow-xl transform rotate-[-0.5deg] w-full h-full min-h-[460px] sm:min-h-[540px] flex flex-col flex-1 max-h-[85vh]"
        >
          {/* Image area – takes all remaining space */}
          <div className="flex-1 min-h-0 overflow-hidden rounded-sm bg-gray-100">
            <img
              src={imagePath}
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Bible verse – fixed strip at bottom of polaroid */}
          <div className="flex-shrink-0 px-3 sm:px-4 py-3 sm:py-4 text-center flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-serif font-semibold mb-1 sm:mb-1.5" style={{ color: '#A9758A' }}>
              {BIBLE_VERSE.reference}
            </p>
            <p className="text-[11px] sm:text-xs font-poppins leading-snug italic" style={{ color: TEXT_ON_PRIMARY_BG }}>
              {BIBLE_VERSE.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImageSection
