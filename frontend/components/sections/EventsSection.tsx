'use client'

import { useEffect, useState } from 'react'

interface Event {
  id: number
  documentId: string
  title: string
  description: string
  eventDate: string
  location: string
  country: string
  countryFlag: string
  eventUrl: string
  imagePath: string
  publishedAt: string
}

export default function EventsSection() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [pastEvents, setPastEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('https://cms.arkiv.network/api/events?populate=image&sort=eventDate:desc')
        const data = await response.json()

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const upcoming: Event[] = []
        const past: Event[] = []

        data.data?.forEach((item: any) => {
          const event: Event = {
            id: item.id,
            documentId: item.documentId,
            title: item.title,
            description: item.description,
            eventDate: item.eventDate,
            location: item.location,
            country: item.country,
            countryFlag: item.countryFlag || 'sg-rounded.svg',
            eventUrl: item.eventUrl,
            imagePath: item.image?.url
              ? `https://cms.arkiv.network${item.image.url}`
              : '/images/placeholder.webp',
            publishedAt: item.publishedAt
          }

          const eventDate = new Date(event.eventDate)
          eventDate.setHours(0, 0, 0, 0)

          if (eventDate >= today) {
            upcoming.push(event)
          } else {
            past.push(event)
          }
        })

        setUpcomingEvents(upcoming)
        setPastEvents(past)
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) {
    return (
      <section id="upcoming-events" className="relative z-10 px-4 md:px-[60px] py-[32px] bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col gap-[32px]">
            <h2 className="font-brutal text-lg md:text-xl font-medium uppercase text-black leading-6">
              [ <span className="font-brutal font-medium">Upcoming</span> Events ]
            </h2>
            <div className="animate-pulse bg-gray-200 h-48 rounded-2xl"></div>
          </div>
        </div>
      </section>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const EventCard = ({ event }: { event: Event }) => (
    <a
      href={event.eventUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gray-200 p-5 rounded-2xl shadow-figma-card flex flex-row items-stretch gap-6 relative min-h-[160px] flex-1 hover:bg-[#FE7445] transition-colors cursor-pointer group"
    >
      <div className="absolute inset-0 pointer-events-none shadow-inner rounded-2xl" />

      {/* Left Side - Content */}
      <div className="flex-1 flex flex-col gap-3">
        <h3 className="font-mono text-xl text-[#1f1f1f] leading-7 group-hover:text-white transition-colors min-h-[3.5rem] flex items-center">
          {event.title}
        </h3>
        <div className="flex gap-2 items-center">
          <img
            className="w-6 h-6"
            src={`/images/flags/${event.countryFlag}`}
            alt={`${event.country} flag`}
            loading="lazy"
          />
          <span className="font-mono text-sm text-[#1f1f1f] leading-5 group-hover:text-white transition-colors">
            {event.location}
          </span>
        </div>
        <p className="font-mono text-base text-[#1f1f1f] leading-[22px] group-hover:text-white transition-colors">
          {event.description}
        </p>
      </div>

      {/* Right Side - Image */}
      <div className="w-[200px] flex-shrink-0 self-stretch relative rounded-2xl overflow-hidden bg-[#d9d9d9]">
        <img
          alt={event.title}
          className="w-full h-full object-cover"
          src={event.imagePath}
          loading="lazy"
        />
        <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-mono">
          {formatDate(event.eventDate)}
        </div>
      </div>
    </a>
  )

  return (
    <>
      {/* Upcoming Events Section */}
      {upcomingEvents.length > 0 && (
        <section id="upcoming-events" className="relative z-10 px-4 md:px-[60px] py-[32px] bg-white">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col gap-[32px]">
              <h2 className="font-brutal text-lg md:text-xl font-medium uppercase text-black leading-6">
                [ <span className="font-brutal font-medium">Upcoming</span> Events ]
              </h2>

              <div className="flex flex-col md:flex-row gap-6 w-full">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.documentId} event={event} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Past Events Section */}
      {pastEvents.length > 0 && (
        <section id="events" className="relative z-10 px-4 md:px-[60px] py-[32px] bg-white">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex flex-col gap-[32px]">
              <h2 className="font-brutal text-lg md:text-xl font-medium uppercase text-black leading-6">
                [ <span className="font-brutal font-medium">Past</span> Events ]
              </h2>

              <div className="flex flex-col md:flex-row gap-6 w-full">
                {pastEvents.map((event) => (
                  <EventCard key={event.documentId} event={event} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
