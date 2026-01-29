import * as React from "react"
import { Calendar, User, Clock, ArrowRight } from "lucide-react"
import { format } from "date-fns"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tag } from "@/components/react/Tag"
import { calculateReadingTime } from "@/lib/utils"

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
      <Card className="h-full flex flex-col overflow-hidden border-border bg-card hover:bg-muted/10 transition-all hover:border-primary/50 group">
        {coverImage && (
          <div className="aspect-video w-full overflow-hidden border-b border-border bg-muted relative">
            <img 
              src={coverImage} 
              alt={title} 
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors" />
          </div>
        )}
        
        <CardHeader className="space-y-3">
          <div className="flex flex-wrap gap-2 mb-1">
            {tags.slice(0, 3).map(tag => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
          <CardTitle className="font-display text-xl leading-tight group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
            <span className="flex items-center">
              <User className="mr-1 h-3 w-3" /> {author}
            </span>
            <span className="flex items-center">
              <Calendar className="mr-1 h-3 w-3" /> {format(dateObj, "MMM dd, yyyy")}
            </span>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1">
          <p className="text-sm text-muted-foreground font-mono leading-relaxed line-clamp-3">
            {excerpt}
          </p>
        </CardContent>
        
        <CardFooter className="border-t border-border pt-4 mt-auto flex justify-between items-center">
          <span className="text-xs font-mono text-muted-foreground flex items-center">
            <Clock className="mr-1 h-3 w-3" /> {readingTime}
          </span>
          <span className="text-xs font-mono text-primary flex items-center group-hover:translate-x-1 transition-transform">
            READ_ENTRY <ArrowRight className="ml-1 h-3 w-3" />
          </span>
        </CardFooter>
      </Card>
    </a>
  )
}
