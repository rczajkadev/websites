import { type NextRequest, NextResponse } from 'next/server';

import type { Post } from '@/domain/posts/models';
import { getPosts } from '@/domain/posts/queries';

export const runtime = 'nodejs';

type PostsResponse = {
  items: Post[];
  total: number;
  top: number | null;
};

function parseTop(value: string | null) {
  if (!value) return null;

  const parsed = Number.parseInt(value, 10);

  if (!Number.isInteger(parsed) || parsed <= 0) return null;

  return parsed;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const top = parseTop(searchParams.get('top'));

  const items = await getPosts();

  const response: PostsResponse = {
    total: items.length,
    top,
    items: top === null ? items : items.slice(0, top)
  };

  return NextResponse.json(response);
}
