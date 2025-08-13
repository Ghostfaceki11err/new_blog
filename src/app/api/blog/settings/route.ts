
import { NextRequest, NextResponse } from 'next/server'

// GET settings
export async function GET() {
  try {
    // No DB – return default settings
    const data = null
    if (!data) {
      const defaultSettings = {
        title: "Ethiopian Games Association Blog",
        subtitle: "Sharing stories, insights, and updates about games, gamification, and the community.",
        mission: "Games and play are a language that the world can speak; through games you can create, connect and cultivate economy, culture, and values.",
        quote: "Games teach resilience, discipline, and continuous growth — elevating us to become better humans through determination and excellence.",
        hero_image: "https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
      return NextResponse.json(defaultSettings)
    }

    return NextResponse.json({
      title: "Ethiopian Games Association Blog",
      subtitle: "Sharing stories, insights, and updates about games, gamification, and the community.",
      mission: "Games and play are a language that the world can speak; through games you can create, connect and cultivate economy, culture, and values.",
      quote: "Games teach resilience, discipline, and continuous growth — elevating us to become better humans through determination and excellence.",
      heroImage: "https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg?auto=compress&cs=tinysrgb&w=1600"
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST/PUT settings (upsert)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // Echo back as if saved
    const responseData = {
      title: body.title,
      subtitle: body.subtitle,
      mission: body.mission,
      quote: body.quote,
      heroImage: body.heroImage
    }
    return NextResponse.json(responseData)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
