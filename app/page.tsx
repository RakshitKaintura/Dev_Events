// app/page.tsx
import ExploreBtn from '@/components/ExploreBtn'
import EventCard from '@/components/EventCard'
import { IEvent } from '@/database'
import { cache } from 'react'


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// optional: if BASE_URL might be undefined in dev, you can fallback to a relative path
const EVENTS_URL = BASE_URL ? `${BASE_URL}/api/events` : `/api/events`

const getEvents = cache(async (): Promise<IEvent[]> => {
  const res = await fetch(EVENTS_URL, {
    // Make Next treat this fetch as cacheable (static prerender friendly)
    next: { revalidate: 60 }, // cache for 60s (adjust as needed)
  })
  if (!res.ok) throw new Error('Failed to fetch events')
  const { events } = await res.json()
  return events ?? []
})

const Page = async () => {
  const events = await getEvents()

  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Can't Miss
      </h1>

      <p className="text-center mt-5">
        Hackathons, Meetups and Conferences, All in One Place
      </p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {events && events.length > 0 ? (
            events.map((event: IEvent) => (
              <li key={(event as any).id ?? event.title}>
                <EventCard {...event} />
              </li>
            ))
          ) : (
            <li>No events found.</li>
          )}
        </ul>
      </div>
    </section>
  )
}

export default Page
