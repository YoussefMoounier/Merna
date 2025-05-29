'use client'

import { motion } from 'framer-motion'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { useEffect, useRef } from 'react'

interface Location {
  id: number
  name: string
  description: string
  date?: string;
  coordinates: [number, number]
  image?: string
}

interface LoveMapProps {
  locations: Location[]
}

export default function LoveMap({ locations }: LoveMapProps) {
  const mapRef = useRef(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio('/map.mp3') // Replace with your audio file path
    audioRef.current.loop = true

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Play audio when the section is visible
          audioRef.current?.play().catch(error => console.error("Audio playback failed:", error));
        } else {
          // Pause audio when the section is not visible
          audioRef.current?.pause()
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    )

    if (mapRef.current) {
      observer.observe(mapRef.current)
    }

    return () => {
      if (mapRef.current) {
        observer.unobserve(mapRef.current)
      }
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Assuming the first location in the array is the primary meeting spot
  const firstMeetingLocation = locations.length > 0 ? locations[0] : null;

  return (
    <div
      ref={mapRef} // Attach ref to the main container for IntersectionObserver
      className="w-full max-w-4xl mx-auto"
    >
      <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg bg-gray-100 p-4 mb-8 relative">
        {/* Google Maps iframe */}
        {/* Replace the src with the embed URL for your specific meeting location */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.4699813682835!2d31.370235!3d31.046428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDAyJzQ3LjAiTiAzMcKwMjInMTIuOEU!5e0!3m2!1sen!2seg!4v1620000000000!5m2!1sen!2seg"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Meeting Place Map"
        ></iframe>

        {/* Marker for the first meeting place, overlaid on the map */}
        {/* Positioning might need adjustment based on the exact coordinates and iframe size */}
        {firstMeetingLocation && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center"
            >
              <FaMapMarkerAlt className="text-pink-500 text-4xl animate-bounce" />
              <div className="bg-white px-4 py-2 rounded-full shadow-lg mt-2">
                <p className="text-pink-600 font-bold">{firstMeetingLocation.name}</p>
              </div>
            </motion.div>
          </div>
        )}

        {/* You can add logic here to display other markers if locations array has more items */}
        {/* This would be more complex and likely require a proper map library */} 

      </div>
       {/* Optional: Add descriptive text below the map if needed */}
       {firstMeetingLocation && (
          <div className="text-center text-gray-600 mt-4">
            <p className="text-xl font-semibold text-pink-600">{firstMeetingLocation.name}</p>
            <p className="mt-2 text-gray-600">{firstMeetingLocation.description}</p>
            {firstMeetingLocation.date && (
               <p className="text-sm text-gray-500 mt-1">{firstMeetingLocation.date}</p>
            )}
          </div>
       )}
    </div>
  )
} 