import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { weddingConfig } from '../config/weddingConfig'
import { themeConfig } from '../config/themeConfig'

gsap.registerPlugin(ScrollTrigger)

const SectionBeforeGift = () => {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)

  const imagePath = weddingConfig.photos?.sectionBeforeGift

  useEffect(() => {
    if (!imageRef.current || !sectionRef.current) return
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      animation: gsap.fromTo(
        imageRef.current,
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
      className={`relative w-full overflow-hidden py-12 sm:py-16 ${themeConfig.backgrounds.secondary}`}
      aria-label="Section before gift"
    >
      <div
        ref={imageRef}
        className="relative mx-auto h-[313px] w-full overflow-hidden rounded-none shadow-lg sm:h-[40vh] sm:rounded-lg"
      >
        <img
          src={imagePath}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  )
}

export default SectionBeforeGift
