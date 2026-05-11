import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig, TEXT_ON_PRIMARY_BG } from '../config/themeConfig'
import { schedule as scheduleData } from '../data'
import { ScheduleEventIcon } from './schedule/ScheduleIcons'

const TEXT_ON_PRIMARY_MUTED = 'rgba(127, 29, 29, 0.88)'
const LINE_PRIMARY = 'rgba(127, 29, 29, 0.35)'

/** Same pattern as `Calendar.jsx`: public file under `assets/` → `/assets/...` (Vite `publicDir: 'assets'`) */
const SCHEDULE_FLORAL = `/assets/images/graphics/${encodeURIComponent('Template 1 (1).png')}`

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
    <section
      className={`relative overflow-hidden py-12 sm:py-20 w-full ${themeConfig.calendar.background}`}
    >
      {/* Decorative vine: screen blend drops black mat on pastel bg; translate-x nudges toward right edge */}
      <img
        src={SCHEDULE_FLORAL}
        alt=""
        aria-hidden
        className="pointer-events-none select-none absolute inset-y-0 right-0 z-[1] w-[min(108vw,92rem)] max-w-none h-full origin-right scale-[1.02] sm:scale-[1.04] lg:scale-[1.08] translate-x-[min(40vw,6.75rem)] sm:translate-x-[min(50vw,9.5rem)] lg:translate-x-[min(62vw,13.5rem)] object-contain object-right mix-blend-screen opacity-[0.92] max-md:opacity-[0.82]"
        decoding="async"
      />

      <div className="relative z-[2] mx-auto w-full max-w-[1300px] px-4 sm:px-6 md:px-10 lg:px-20 lg:pr-[min(44vw,28rem)] xl:pr-[min(40vw,32rem)]">
        <div ref={scheduleTitleRef} className="mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-script text-center" style={{ color: TEXT_ON_PRIMARY_BG }}>
            Schedule
          </h2>
          <p className="text-sm sm:text-base md:text-lg font-poppins text-center mt-4 mx-auto px-4 max-w-lg" style={{ color: TEXT_ON_PRIMARY_MUTED }}>
            Join us as we celebrate this special day together
          </p>
        </div>

        <div ref={timelineRef} className="relative max-w-md sm:max-w-xl lg:max-w-2xl w-full mx-auto px-0 sm:px-2">
          <div ref={lineRef} className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 opacity-70 z-0" style={{ backgroundColor: LINE_PRIMARY }} />

          <div ref={eventsRef} className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
            {scheduleData.events.map((event, index) => {
              const isLeft = index % 2 === 0
              const iconClass =
                'w-[3.25rem] h-[3.25rem] sm:w-16 sm:h-16 md:w-[4.25rem] md:h-[4.25rem] shrink-0 text-[#A67078]'
              const iconCol = (
                <div className="flex w-full items-center justify-center min-h-[4rem] sm:min-h-[4.5rem]">
                  <ScheduleEventIcon eventId={event.id} className={iconClass} />
                </div>
              )
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
                      <div className="w-1/2 pl-4 sm:pl-6">{iconCol}</div>
                    </>
                  ) : (
                    <>
                      <div className="w-1/2 pr-4 sm:pr-6">{iconCol}</div>
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
      </div>
    </section>
  )
}

export default Schedule
