import * as React from "react"
import { IconCalendar, IconUser, IconClock, IconArrowRight } from "@tabler/icons-react"
import { format } from "date-fns"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tag } from "@/components/react/Tag"
import { calculateReadingTime } from "@/lib/formatting"

interface BlogCardProps {
  post: {
    slug: string
    data: {
      title: string
      author: string
      date: Date | string
      excerpt: string
      tags: string[]
      coverImage?: string
    }
    body?: string
  }
}

export function BlogCard({ post }: BlogCardProps) {
  const { title, author, date, excerpt, tags, coverImage } = post.data
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  // Calculate reading time from body if available, or estimate from excerpt
  const readingTime = post.body 
    ? calculateReadingTime(post.body) 
    : "3 min read" // fallback

  return (
    <a href={`/blog/${post.slug}`} className="block h-full no-underline">
      <Card className="h-full flex flex-col overflow-hidden border-border bg-card hover:bg-muted/10 transition-all hover:border-primary/50 group pt-0 gap-0">
        {coverImage ? (
          <div className="aspect-[2.5/1] w-full overflow-hidden border-b border-border bg-muted relative">
            <img 
              src={coverImage} 
              alt={title} 
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 opacity-50 grayscale group-hover:opacity-70 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
          </div>
        ) : (
          <div className="aspect-[2.5/1] w-full overflow-hidden border-b border-border bg-gradient-to-br from-muted/50 via-background to-muted/30 relative">
            {/* Scan lines overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 3px)',
              }}></div>
            </div>
            
            {/* Decorative code brackets */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-mono text-primary/30 font-bold">{"{"}</span>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-display uppercase tracking-widest text-primary/60 group-hover:text-primary/80 transition-colors">
                    {tags[0] || "BLOG"}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground mt-1">
                    {"///"} {format(dateObj, "yyyy.MM.dd")}
                  </span>
                </div>
                <span className="text-4xl font-mono text-primary/30 font-bold">{"}"}</span>
              </div>
            </div>
            
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-primary/30"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-primary/30"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l border-b border-secondary/30"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-secondary/30"></div>
            
            {/* Dot matrix decoration */}
            <div className="absolute top-3 left-3 flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-primary/25"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-primary/15"></div>
            </div>
          </div>
        )}
        
        <CardHeader className="space-y-2 pt-4">
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map(tag => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
          <CardTitle className="font-display text-xl leading-tight group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
            <span className="flex items-center">
              <IconUser className="mr-1 h-3 w-3" /> {author}
            </span>
            <span className="flex items-center">
              <IconCalendar className="mr-1 h-3 w-3" /> {format(dateObj, "MMM dd, yyyy")}
            </span>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 pt-2 pb-4">
          <p className="text-sm text-muted-foreground font-mono leading-relaxed line-clamp-2">
            {excerpt}
          </p>
        </CardContent>
        
        <CardFooter className="border-t border-border pt-4 mt-auto flex justify-between items-center">
          <span className="text-xs font-mono text-muted-foreground flex items-center">
            <IconClock className="mr-1 h-3 w-3" /> {readingTime}
          </span>
          <span className="text-xs font-mono text-primary flex items-center group-hover:translate-x-1 transition-transform">
            READ_ENTRY <IconArrowRight className="ml-1 h-3 w-3" />
          </span>
        </CardFooter>
      </Card>
    </a>
  )
}
