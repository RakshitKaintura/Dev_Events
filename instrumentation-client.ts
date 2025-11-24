import posthog from 'posthog-js'

const PH_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const PH_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST

if (!PH_KEY || !PH_HOST) {
  throw new Error("Missing PostHog environment variables")
}

posthog.init(PH_KEY, {
  api_host: PH_HOST,
  defaults: '2025-05-24'
})
