import { NextResponse } from 'next/server'

const PLACE_ID = 'ChIJ2xSpMNCx3pQRdAQAoWcx3H0'
const API_KEY = process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyDbe50XeyJCl5IkzBdYXTqbpZsBk8rpz1g'

// Cache reviews for 1 hour to avoid excessive API calls
let cachedData: { data: GoogleReviewsResponse | null; timestamp: number } = {
  data: null,
  timestamp: 0,
}
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour

interface GoogleReview {
  author_name: string
  author_url: string
  profile_photo_url: string
  rating: number
  relative_time_description: string
  text: string
  time: number
}

interface GoogleReviewsResponse {
  rating: number
  totalReviews: number
  reviews: {
    author: string
    authorUrl: string
    avatar: string
    rating: number
    relativeTime: string
    text: string
    time: number
  }[]
}

async function fetchReviews(): Promise<GoogleReviewsResponse> {
  const now = Date.now()
  if (cachedData.data && now - cachedData.timestamp < CACHE_DURATION) {
    return cachedData.data
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,user_ratings_total,reviews&reviews_sort=newest&language=pt-BR&key=${API_KEY}`

  const res = await fetch(url)
  const json = await res.json()

  if (json.status !== 'OK' || !json.result) {
    throw new Error(`Google API error: ${json.status}`)
  }

  const result = json.result
  const data: GoogleReviewsResponse = {
    rating: result.rating,
    totalReviews: result.user_ratings_total,
    reviews: (result.reviews || []).map((r: GoogleReview) => ({
      author: r.author_name,
      authorUrl: r.author_url,
      avatar: r.profile_photo_url,
      rating: r.rating,
      relativeTime: r.relative_time_description,
      text: r.text,
      time: r.time,
    })),
  }

  cachedData = { data, timestamp: now }
  return data
}

export async function GET() {
  try {
    const data = await fetchReviews()
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}
