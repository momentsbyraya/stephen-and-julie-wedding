import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig, TEXT_ON_PRIMARY_BG } from '../config/themeConfig'
import { weddingConfig } from '../config/weddingConfig'

gsap.registerPlugin(ScrollTrigger)

const Counter = ({ countdown }) => {
  const sectionRef = useRef(null)
  const countdownRef = useRef(null)
  const saveTheDateBackgroundImage = weddingConfig.photos?.saveTheDate || weddingConfig.photos?.hero || '/assets/images/graphics/Prenup4.png'
  const saveTheDateImage = weddingConfig.photos?.saveTheDate || weddingConfig.photos?.hero || '/assets/images/graphics/Prenup4.png'

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    tl.fromTo(countdownRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out' },
      '-=0.3'
    )

    tl.fromTo('.countdown-number',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2
      },
      '-=0.5'
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="details"
      className="relative min-h-screen md:min-h-0 md:h-fit lg:pt-40 lg:pb-24 overflow-hidden flex items-center justify-center text-center py-20"
    >
      {/* Theme Background */}
      <div className={`absolute inset-0 ${themeConfig.backgrounds.theme}`} />

      {/* Blurry photo background */}
      <div
        className="absolute inset-0 z-[5]"
        style={{
          backgroundImage: `url(${saveTheDateBackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(14px)',
          transform: 'scale(1.06)',
          opacity: 0.22
        }}
      />

      {/* Crumpled Paper Background on top */}
      <div
        className="absolute inset-0 opacity-30 z-10"
        style={{
          backgroundImage: 'url(/assets/images/crumpled-paper.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Main Content Container */}
      <div className={`relative z-20 ${themeConfig.container.maxWidth} ${themeConfig.container.center} ${themeConfig.container.padding} w-full`}>
        <div
          ref={countdownRef}
          className="mb-12 max-w-md sm:max-w-xl lg:max-w-3xl mx-auto px-8 sm:px-12"
        >
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            {/* Left Column - Countdown Timer */}
            <div className="lg:order-1">
              <h3 className={`text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-serif mb-4 scale-75 sm:scale-90 md:scale-75 lg:scale-100 origin-center`} style={{ color: TEXT_ON_PRIMARY_BG }}>
                Save the Date
              </h3>

              <div className="flex justify-center lg:justify-start items-center space-x-3 mb-6 px-4">
                <div className="text-center">
                  <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-albert font-thin mb-1 countdown-number`} style={{ color: TEXT_ON_PRIMARY_BG }}>
                    {countdown.days}
                  </div>
                  <div className="text-xs sm:text-sm font-medium" style={{ color: '#A9758A' }}>Days</div>
                </div>

                <div className="text-2xl sm:text-3xl md:text-4xl font-albert font-thin" style={{ color: TEXT_ON_PRIMARY_BG }}>:</div>

                <div className="text-center">
                  <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-albert font-thin mb-1 countdown-number`} style={{ color: TEXT_ON_PRIMARY_BG }}>
                    {countdown.hours}
                  </div>
                  <div className="text-xs sm:text-sm font-medium" style={{ color: '#A9758A' }}>Hours</div>
                </div>

                <div className="text-2xl sm:text-3xl md:text-4xl font-albert font-thin" style={{ color: TEXT_ON_PRIMARY_BG }}>:</div>

                <div className="text-center">
                  <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-albert font-thin mb-1 countdown-number`} style={{ color: TEXT_ON_PRIMARY_BG }}>
                    {countdown.minutes}
                  </div>
                  <div className="text-xs sm:text-sm font-medium" style={{ color: '#A9758A' }}>Minutes</div>
                </div>

                <div className="text-2xl sm:text-3xl md:text-4xl font-albert font-thin" style={{ color: TEXT_ON_PRIMARY_BG }}>:</div>

                <div className="text-center">
                  <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-albert font-thin mb-1 countdown-number`} style={{ color: TEXT_ON_PRIMARY_BG }}>
                    {countdown.seconds}
                  </div>
                  <div className="text-xs sm:text-sm font-medium" style={{ color: '#A9758A' }}>Seconds</div>
                </div>
              </div>
            </div>

            {/* Right Column - Polaroid Photo */}
            <div className="lg:order-2">
              <div className="flex flex-col items-center lg:items-end px-8 sm:px-12 lg:px-0 mt-12 sm:mt-24 lg:mt-0">
                <div className="relative bg-white p-3 pb-10 shadow-xl transform rotate-1 counter-polaroid">
                  <div
                    className="w-56 h-72 sm:w-72 sm:h-96 lg:w-64 lg:h-80 bg-cover bg-center bg-no-repeat rounded-sm"
                    style={{ backgroundImage: `url(${saveTheDateImage})` }}
                  />
                  <div className="absolute bottom-3 left-0 right-0 text-center">
                    <p className="text-right pe-4 text-sm sm:text-lg md:text-xl font-handwritten mb-1 leading-none" style={{ color: TEXT_ON_PRIMARY_BG }}>
                      We await your presence
                    </p>
                  </div>
                </div>
                <div className="mt-6 max-w-sm sm:max-w-md">
                  <p className="text-xs sm:text-sm font-poppins font-semibold uppercase tracking-wider mb-2 text-center lg:text-right" style={{ color: '#A9758A' }}>
                    Our Love Story
                  </p>
                  <p className="text-center lg:text-right text-sm sm:text-base font-poppins leading-relaxed italic" style={{ color: '#6A6075' }}>
                    We started working together, dated, fell in love, and were separated for a decade, only to meet again over time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Counter
