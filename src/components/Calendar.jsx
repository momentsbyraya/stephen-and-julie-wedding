import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig, TEXT_ON_PRIMARY_BG } from '../config/themeConfig'
import { weddingConfig } from '../config/weddingConfig'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Calendar = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const descriptionRef = useRef(null)
  const calendarGridRef = useRef(null)

  // Parse wedding date from config
  const weddingDate = new Date(weddingConfig.wedding.date)
  const weddingYear = weddingDate.getFullYear()
  const weddingMonth = weddingDate.getMonth()
  const weddingDay = weddingDate.getDate()
  
  // Always show wedding month
  const displayYear = weddingYear
  const displayMonth = weddingMonth
  
  // Get month name
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  
  // Get day names
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  
  // Get first day of month and number of days for wedding month
  const firstDay = new Date(displayYear, displayMonth, 1)
  const lastDay = new Date(displayYear, displayMonth + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = (firstDay.getDay() + 6) % 7 // Convert Sunday=0 to Monday=0
  
  // Generate calendar days
  const calendarDays = []
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

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

    // Animate header sliding in
    tl.fromTo(headerRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
    // Animate description sliding in
    .fromTo(descriptionRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
    // Animate calendar dates one by one
    .fromTo(calendarGridRef.current?.children || [],
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.4, 
        ease: "back.out(1.2)",
        stagger: 0.03
      },
      "-=0.2"
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  return (
    <div ref={sectionRef} className={`relative w-full min-w-full ${themeConfig.calendar.background}`} style={{ paddingTop: '5rem', paddingBottom: '5rem', boxSizing: 'border-box' }}>
      <div className="w-full max-w-md sm:max-w-xl lg:max-w-3xl xl:max-w-6xl mx-auto px-4">
      {/* Invitation Text */}
      <div className="text-center mb-8 sm:my-12">
        <h1 ref={headerRef} className="text-3xl sm:text-5xl font-serif font-light mb-4" style={{ opacity: 0, color: TEXT_ON_PRIMARY_BG }}>
          The Day
        </h1>
        <p ref={descriptionRef} className="text-lg md:text-xl leading-relaxed max-w-sm sm:max-w-md mx-auto font-poppins" style={{ opacity: 0, color: TEXT_ON_PRIMARY_BG }}>
          A memorable day awaits us this year, and we want to celebrate it surrounded by loved ones and friends.
        </p>
      </div>

      {/* Calendar Section */}
      <div className="xl:scale-90 origin-center max-w-[660px] mx-auto overflow-visible">
        <div className="p-8">
          {/* Month Header */}
          <div className={`text-center mb-4 ${themeConfig.calendar.headerColor}`}>
            <h3 className="text-2xl sm:text-4xl font-serif font-light mt-2">
              {monthNames[displayMonth]} {displayYear}
            </h3>
          </div>
          
          {/* Day Names Header */}
          <div className="grid grid-cols-7 gap-1 mb-2 lg:mt-8">
            {dayNames.map((day) => (
              <div key={day} className={`text-center text-sm sm:text-lg lg:text-2xl font-medium ${themeConfig.calendar.dayNamesColor}`}>
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Grid */}
          <div ref={calendarGridRef} className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              const isWeddingDay = day === weddingDay
              
              return (
                <div
                  key={index}
                  className={`
                    aspect-square flex items-center justify-center text-sm sm:text-lg lg:text-2xl font-medium
                    ${day ? themeConfig.calendar.textColor : 'text-transparent'}
                    ${isWeddingDay ? 'relative' : ''}
                  `}
                  style={{ opacity: 0 }}
                >
                  {day && (
                    <>
                      <span className={isWeddingDay ? 'relative z-10' : ''}>
                        {day}
                      </span>
                      {isWeddingDay && (
                        <div className={`absolute inset-0 rounded-full ${themeConfig.calendar.highlightColor} opacity-20`}></div>
                      )}
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Calendar
