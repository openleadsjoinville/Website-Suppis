import { NextResponse } from 'next/server'

const PLACE_ID = 'ChIJ2xSpMNCx3pQRdAQAoWcx3H0'
const API_KEY = process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyDbe50XeyJCl5IkzBdYXTqbpZsBk8rpz1g'

// Revalidate every hour (ISR)
export const revalidate = 3600

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
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,user_ratings_total,reviews&reviews_sort=newest&language=pt-BR&key=${API_KEY}`

  const res = await fetch(url, { next: { revalidate: 3600 } })
  const json = await res.json()

  if (json.status !== 'OK' || !json.result) {
    throw new Error(`Google API error: ${json.status}`)
  }

  const result = json.result
  return {
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
