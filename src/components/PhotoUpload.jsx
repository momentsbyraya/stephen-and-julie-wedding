import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { weddingConfig } from '../config/weddingConfig'
import { themeConfig, TEXT_ON_PRIMARY_BG } from '../config/themeConfig'

gsap.registerPlugin(ScrollTrigger)

const PhotoUpload = () => {
  const photoUploadRef = useRef(null)

  useEffect(() => {
    if (photoUploadRef.current) {
      ScrollTrigger.create({
        trigger: photoUploadRef.current,
        start: 'top 80%',
        animation: gsap.fromTo(
          photoUploadRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        ),
        toggleActions: 'play none none reverse'
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars && trigger.vars.trigger === photoUploadRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  const hashtag1 = weddingConfig.details?.hashtag
  const hashtag2 = weddingConfig.details?.hashtag2
  const uploadLink = weddingConfig.details?.uploadLink

  const showHashtag2 = hashtag2 && hashtag2 !== 'To be added'
  const hasUploadLink = uploadLink && uploadLink !== 'To be added'

  return (
    <section
      id="oh-snap"
      data-section="oh-snap"
      className={`relative pt-0 pb-20 w-full overflow-hidden ${themeConfig.backgrounds.secondary}`}
      aria-label="Oh snap photo upload"
    >
      <div className="relative z-20 flex items-center justify-center">
        <div
          ref={photoUploadRef}
          className="max-w-md sm:max-w-xl lg:max-w-3xl w-full mx-auto px-8 transition-opacity duration-500 ease-in-out"
        >
          {/* Same treatment as Calendar/Schedule/RSVP */}
          <div className="mb-16">
            <div className="text-center mb-6">
              <h2 className="text-4xl md:text-5xl font-script mb-6" style={{ color: TEXT_ON_PRIMARY_BG }}>
                OH SNAP!
              </h2>
            </div>

            <div className="mx-auto upload-stack flex flex-col items-center justify-center gap-6">
              <div className="upload-qr-container w-full">
                <div className="bg-white p-8 sm:p-10 rounded-lg shadow-md w-full min-h-[200px] sm:min-h-[220px] flex items-center justify-center">
                  <p className="text-center font-serif text-lg sm:text-xl tracking-wide" style={{ color: TEXT_ON_PRIMARY_BG }} aria-live="polite">
                    TO BE ADDED
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base font-poppins text-center max-w-sm" style={{ color: TEXT_ON_PRIMARY_BG }}>
                Share your photos and videos from our special day.
              </p>

              {(hashtag1 || showHashtag2) && (
                <div className="text-center">
                  {hashtag1 && (
                    <p className="text-sm sm:text-base font-poppins font-semibold whitespace-nowrap" style={{ color: TEXT_ON_PRIMARY_BG }}>
                      {hashtag1}
                    </p>
                  )}
                  {showHashtag2 && (
                    <p className="text-sm sm:text-base font-poppins font-semibold whitespace-nowrap" style={{ color: TEXT_ON_PRIMARY_BG }}>
                      {hashtag2}
                    </p>
                  )}
                </div>
              )}

              {hasUploadLink ? (
                <a
                  href={uploadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-xs inline-flex items-center justify-center gap-2 px-8 py-3 sm:py-5 lg:py-2 rounded-sm text-sm sm:text-2xl lg:text-base font-medium transition-colors duration-200 hover:opacity-90"
                  style={{ backgroundColor: '#F8C8DC', color: TEXT_ON_PRIMARY_BG }}
                >
                  Upload Photos
                  <ArrowRight className="w-4 h-4" style={{ color: TEXT_ON_PRIMARY_BG }} />
                </a>
              ) : (
                <span className="w-full max-w-xs inline-flex items-center justify-center gap-2 px-8 py-3 sm:py-5 lg:py-2 rounded-sm text-sm sm:text-2xl lg:text-base font-medium opacity-60 cursor-not-allowed" style={{ backgroundColor: '#F8C8DC', color: TEXT_ON_PRIMARY_BG }}>
                  Upload Photos
                  <ArrowRight className="w-4 h-4" style={{ color: TEXT_ON_PRIMARY_BG }} />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PhotoUpload
