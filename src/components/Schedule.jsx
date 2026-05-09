import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig, TEXT_ON_PRIMARY_BG } from '../config/themeConfig'

const TEXT_ON_PRIMARY_MUTED = 'rgba(127, 29, 29, 0.88)'
const LINE_PRIMARY = 'rgba(127, 29, 29, 0.35)'
import { schedule as scheduleData } from '../data'

gsap.registerPlugin(ScrollTrigger)

const Schedule = () => {
  const scheduleTitleRef = useRef(null)
  const timelineRef = useRef(null)
  const lineRef = useRef(null)
  const eventsRef = useRef(null)

  useEffect(() => {
    if (scheduleTitleRef.current) {
      ScrollTrigger.create({
        trigger: scheduleTitleRef.current,
        start: 'top 80%',
        animation: gsap.fromTo(scheduleTitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        ),
        toggleActions: 'play none none reverse'
      })
    }

    if (lineRef.current && timelineRef.current) {
      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: 'top 70%',
        animation: gsap.fromTo(lineRef.current,
          { scaleY: 0, transformOrigin: 'top' },
          { scaleY: 1, duration: 1.5, ease: 'power2.out' }
        ),
        toggleActions: 'play none none reverse'
      })
    }

    if (eventsRef.current) {
      const eventItems = eventsRef.current.querySelectorAll('.schedule-event-row')
      if (eventItems.length > 0) {
        gsap.set(eventItems, { opacity: 0, y: 30 })
        ScrollTrigger.create({
          trigger: eventsRef.current,
          start: 'top 70%',
          onEnter: () => {
            gsap.to(eventItems, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              stagger: 0.2
            })
          }
        })
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        const vars = trigger.vars
        if (vars && vars.trigger && (
          vars.trigger === scheduleTitleRef.current ||
          vars.trigger === timelineRef.current ||
          vars.trigger === eventsRef.current
        )) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section className={`relative py-12 sm:py-20 w-full overflow-visible ${themeConfig.calendar.background}`}>
      {/* Program Title */}
      <div ref={scheduleTitleRef} className={`${themeConfig.container.maxWidth} ${themeConfig.container.center} ${themeConfig.container.padding} relative z-10 mb-12 sm:mb-16`}>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-script text-center" style={{ color: TEXT_ON_PRIMARY_BG }}>
          Schedule
        </h2>
        <p className="text-sm sm:text-base md:text-lg font-poppins text-center mt-4 mx-auto px-4 max-w-lg" style={{ color: TEXT_ON_PRIMARY_MUTED }}>
          Join us as we celebrate this special day together
        </p>
      </div>

      {/* Vertical Timeline */}
      <div ref={timelineRef} className={`relative max-w-md sm:max-w-xl lg:max-w-2xl w-full mx-auto z-10 ${themeConfig.container.padding}`}>
        <div ref={lineRef} className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 opacity-70 z-0" style={{ backgroundColor: LINE_PRIMARY }} />

        <div ref={eventsRef} className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
          {scheduleData.events.map((event, index) => {
            const isLeft = index % 2 === 0
            return (
              <div key={event.id} className="schedule-event-row flex items-center relative min-h-[60px]">
                {isLeft ? (
                  <>
                    <div className="w-1/2 pr-6 text-right flex flex-col justify-center">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold mb-1" style={{ color: TEXT_ON_PRIMARY_BG }}>
                        {event.time}
                      </div>
                      <div className="border-b border-dashed mb-1 opacity-60" style={{ borderColor: LINE_PRIMARY }} />
                      <div className="text-sm sm:text-base md:text-lg font-poppins" style={{ color: TEXT_ON_PRIMARY_BG }}>
                        {event.title}
                      </div>
                      {event.description && (
                        <div className="text-xs sm:text-sm font-poppins mt-0.5" style={{ color: TEXT_ON_PRIMARY_MUTED }}>
                          {event.description}
                        </div>
                      )}
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10" style={{ backgroundColor: TEXT_ON_PRIMARY_BG, border: '2px solid rgba(255, 249, 245, 0.95)' }} />
                    <div className="w-1/2 pl-6" />
                  </>
                ) : (
                  <>
                    <div className="w-1/2 pr-6" />
                    <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10" style={{ backgroundColor: TEXT_ON_PRIMARY_BG, border: '2px solid rgba(255, 249, 245, 0.95)' }} />
                    <div className="w-1/2 pl-6 text-left flex flex-col justify-center">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-serif font-semibold mb-1" style={{ color: TEXT_ON_PRIMARY_BG }}>
                        {event.time}
                      </div>
                      <div className="border-b border-dashed mb-1 opacity-60" style={{ borderColor: LINE_PRIMARY }} />
                      <div className="text-sm sm:text-base md:text-lg font-poppins" style={{ color: TEXT_ON_PRIMARY_BG }}>
                        {event.title}
                      </div>
                      {event.description && (
                        <div className="text-xs sm:text-sm font-poppins mt-0.5" style={{ color: TEXT_ON_PRIMARY_MUTED }}>
                          {event.description}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Schedule
