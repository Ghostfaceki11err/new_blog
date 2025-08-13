import { NextRequest, NextResponse } from 'next/server'
import { deletePost, getPostById, updatePost } from '@/lib/posts'

// GET single post
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await getPostById(parseInt(id))
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

// PUT update post
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await updatePost(parseInt(id), {
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      status: body.published ? 'published' : 'draft'
    })
    if (!updated) return NextResponse.json({ error: 'Update failed' }, { status: 400 })
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

// DELETE post
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ok = await deletePost(parseInt(id))
    if (!ok) return NextResponse.json({ error: 'Delete failed' }, { status: 400 })
    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}