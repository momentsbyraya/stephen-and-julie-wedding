import React from 'react'

const BASE = '/assets/images/graphics/Schedule'

/** PNG artwork for schedule rows (matches `schedule.json` event order) */
const SCHEDULE_ICON_ASSETS = {
  1: { src: `${BASE}/coffee.png`, alt: 'Coffee — guest gathering' },
  2: { src: `${BASE}/wedding.png`, alt: 'Wedding arch — ceremony' },
  3: { src: `${BASE}/drinks.png`, alt: 'Champagne — reception' },
  4: { src: `${BASE}/goinghome.png`, alt: 'Car and volcano — farewell' },
}

export function ScheduleEventIcon({ eventId, className }) {
  const asset = SCHEDULE_ICON_ASSETS[eventId] ?? SCHEDULE_ICON_ASSETS[1]
  const img = (
    <img
      src={asset.src}
      alt={asset.alt}
      className={`object-contain ${className ?? ''}`}
      loading="lazy"
      decoding="async"
    />
  )
  if (eventId === 4) {
    return (
      <span className="inline-flex origin-center scale-[1.18]">
        {img}
      </span>
    )
  }
  return img
}
