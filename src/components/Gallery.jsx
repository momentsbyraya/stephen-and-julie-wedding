import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { weddingConfig } from '../config/weddingConfig'
import { themeConfig, TEXT_ON_PRIMARY_BG } from '../config/themeConfig'

gsap.registerPlugin(ScrollTrigger)

const Gallery = () => {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  const galleryImages = (weddingConfig.photos?.gallery || []).filter(Boolean)

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current || galleryImages.length === 0) return

    const cards = gridRef.current.querySelectorAll('[data-gallery-card]')
    const tween = gsap.fromTo(
      cards,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [galleryImages.length])

  if (galleryImages.length === 0) return null

  return (
    <section ref={sectionRef} className={`relative py-12 sm:py-16 w-full overflow-hidden ${themeConfig.backgrounds.primary}`}>
      <div className={`${themeConfig.container.maxWidth} ${themeConfig.container.center} ${themeConfig.container.padding}`}>
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-4xl md:text-5xl font-script mb-3" style={{ color: TEXT_ON_PRIMARY_BG }}>
            Gallery
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {galleryImages.map((imagePath, index) => (
            <div
              key={`${imagePath}-${index}`}
              data-gallery-card
              className="relative bg-white p-1.5 sm:p-2 shadow-md"
            >
              <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                  src={imagePath}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
