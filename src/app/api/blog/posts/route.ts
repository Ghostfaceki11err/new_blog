
import { NextRequest, NextResponse } from 'next/server'
import { getAllPosts, createPost } from '@/lib/posts'

// GET all posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const publishedOnly = searchParams.get('published') === 'true'
    const search = searchParams.get('search') || ''

    const all = await getAllPosts()
    const filtered = all
      .filter(p => (publishedOnly ? p.status === 'published' : true))
      .filter(p => (search ? p.title.toLowerCase().includes(search.toLowerCase()) : true))
    return NextResponse.json(filtered)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const created = await createPost({
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      status: body.published ? 'published' : 'draft'
    })
    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
