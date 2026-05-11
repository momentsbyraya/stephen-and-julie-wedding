import React, { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TEXT_ON_PRIMARY_BG } from '../config/themeConfig'
import { dresscode } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const DressCode = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const paletteRef = useRef(null)
  const sectionContentRefs = useRef([])

  // Random background position, rotation, and flip - Base layer (old-book-2)
  const bgStyleBase = useMemo(() => {
    const posX = Math.random() * 100 // 0% to 100%
    const posY = Math.random() * 100 // 0% to 100%
    const rotation = (Math.random() * 360) - 180 // -180 to 180 degrees
    const flipX = Math.random() > 0.5 ? -1 : 1 // Random horizontal flip
    const flipY = Math.random() > 0.5 ? -1 : 1 // Random vertical flips
    return {
      backgroundImage: 'url(/assets/images/graphics/old-book-2.png)',
      backgroundSize: 'cover',
      backgroundPosition: `${posX}% ${posY}%`,
      transform: `rotate(${rotation}deg) scaleX(${flipX}) scaleY(${flipY})`,
      opacity: 0.75
    }
  }, [])

  // Random background position, rotation, and flip - Top layer (old-book-bg)
  const bgStyle = useMemo(() => {
    const posX = Math.random() * 100 // 0% to 100%
    const posY = Math.random() * 100 // 0% to 100%
    const rotation = (Math.random() * 360) - 180 // -180 to 180 degrees
    const flipX = Math.random() > 0.5 ? -1 : 1 // Random horizontal flip
    const flipY = Math.random() > 0.5 ? -1 : 1 // Random vertical flip
    return {
      backgroundImage: 'url(/assets/images/graphics/old-book-bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: `${posX}% ${posY}%`,
      transform: `rotate(${rotation}deg) scaleX(${flipX}) scaleY(${flipY})`,
      opacity: 0.5
    }
  }, [])

  useEffect(() => {
    // Scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // Animate elements sequentially
    tl.fromTo(headerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )

    // Fade + slight vertical motion only (horizontal x slide clipped this section under overflow-hidden)
    sectionContentRefs.current.forEach((ref) => {
      if (!ref) return
      ScrollTrigger.create({
        trigger: ref,
        start: 'top 80%',
        animation: gsap.fromTo(
          ref,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        ),
        toggleActions: 'play none none reverse'
      })
    })

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [dresscode.sections])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
    >
      {/* Background Image - Base layer (old-book-2) */}
      <div 
        className="absolute bg-no-repeat"
        style={{
          ...bgStyleBase,
          width: '200%',
          height: '200%',
          left: '-50%',
          top: '-50%'
        }}
      />
      {/* Background Image - Top layer (old-book-bg) */}
      <div 
        className="absolute bg-no-repeat"
        style={{
          ...bgStyle,
          width: '200%',
          height: '200%',
          left: '-50%',
          top: '-50%'
        }}
      />
      
      {/* Soft white gradient overlays for transitions */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/60 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/60 to-transparent pointer-events-none z-10" />
      
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center py-12">
        <div className="max-w-md sm:max-w-xl lg:max-w-3xl w-full mx-auto px-8 sm:px-12 lg:px-16">
            {/* Header Section */}
          <div ref={headerRef} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-script mb-6" style={{ color: TEXT_ON_PRIMARY_BG }}>
                Dress Code
              </h2>
          </div>

          {/* Dress Code Sections */}
          <div ref={paletteRef} className="space-y-8 mb-8">
            {dresscode.sections && dresscode.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="text-center">
                {section.title?.trim() ? (
                  <h3
                    className="text-lg sm:text-xl md:text-2xl font-albert font-bold mb-4 tracking-wider"
                    style={{ color: TEXT_ON_PRIMARY_BG }}
                    dangerouslySetInnerHTML={{ __html: section.title }}
                  />
                ) : null}

                {section.description && (
                  <p className="text-sm sm:text-base md:text-[0.95rem] font-albert mb-6 max-w-3xl mx-auto leading-relaxed" style={{ color: TEXT_ON_PRIMARY_BG }} dangerouslySetInnerHTML={{ __html: section.description }} />
                )}
                
                {/* Section Content */}
                {section.type === "image" && section.image ? (
                <div 
                    ref={el => sectionContentRefs.current[sectionIndex] = el}
                    className="flex w-full flex-col items-center gap-4"
                  >
                    <div className="flex w-full justify-center overflow-hidden">
                      <img
                        src={section.image}
                        alt=""
                        className="h-auto max-h-[min(72vh,560px)] w-full max-w-2xl rounded-md object-contain object-center"
                      />
                    </div>
                    {/* All color swatches side by side */}
                    {section.colors && section.colors.length > 0 && (
                      <div className="flex flex-row flex-wrap gap-2 w-full items-center justify-center">
                        {section.colors.map((color, colorIndex) => (
                          <div
                            key={colorIndex}
                            className="group relative cursor-pointer"
                            title={color.name}
                          >
                            <div 
                              className="w-8 h-8 rounded-full shrink-0 ring-2 ring-transparent group-hover:ring-[#7f1d1d]/25 transition-shadow"
                              style={{ backgroundColor: color.hex }}
                            />
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 text-xs font-medium text-white bg-[#7f1d1d] rounded whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-10">
                              {color.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
                ) : section.type === "colors" && section.colors ? (
                  <div 
                    ref={el => sectionContentRefs.current[sectionIndex] = el}
                    className="flex items-center justify-center gap-4"
                  >
                    {section.colors.map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="group relative cursor-pointer w-[calc((100%-2*1rem)/3)] max-w-[120px]"
                        title={color.name}
                      >
                        <div 
                          className="h-8 rounded-sm"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 text-xs font-medium text-white bg-[#7f1d1d] rounded whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-10">
                          {color.name}
                        </span>
                      </div>
                    ))}
              </div>
                ) : null}
              </div>
            ))}
            </div>
        </div>
      </div>
    </section>
  )
}

export default DressCode 
