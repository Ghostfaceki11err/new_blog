// src/app/news/[slug]/page.tsx
import React from 'react';
import Image from 'next/image';
import { mockNewsItems, NewsItemType } from '@/app/page';
import { notFound } from 'next/navigation';
import { CalendarDays, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NewsArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Function to get a single news item by slug (replace with actual data fetching)
const getNewsItem = (slug: string): NewsItemType | undefined => {
  return mockNewsItems.find((item) => item.slug === slug);
};

const NewsArticlePage = async ({ params }: NewsArticlePageProps) => {
  const { slug } = await params;
  const newsItem = getNewsItem(slug);

  if (!newsItem) {
    notFound();
  }

  return (
    <main className="flex-grow">
      <article className="container mx-auto px-6 py-12 md:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              {newsItem.title}
            </h1>
            <div className="flex flex-wrap items-center text-sm text-muted-foreground space-x-4">
              <div className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-1.5" />
                {new Date(newsItem.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              {newsItem.category && (
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-1.5" />
                  <Badge variant="outline" className="text-xs border-primary/50 text-primary">
                    {newsItem.category}
                  </Badge>
                </div>
              )}
            </div>
          </header>

          {newsItem.imageUrl && (
            <div className="relative aspect-video w-full bg-muted rounded-lg overflow-hidden mb-8 shadow-lg">
              <Image
                src={newsItem.imageUrl}
                alt={newsItem.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}

          <div
            className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: newsItem.content }}
          />

          {/* You can add social share buttons or related articles here */}
        </div>
      </article>
    </main>
  );
};

export default NewsArticlePage;

// Optional: Generate static paths if you know all slugs at build time
export async function generateStaticParams() {
  return mockNewsItems.map((item) => ({
    slug: item.slug,
  }));
}
