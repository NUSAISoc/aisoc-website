import * as React from "react"
import { format } from "date-fns"
import { IconCalendar, IconMapPin, IconClock, IconArrowRight } from "@tabler/icons-react"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface EventCardProps {
  slug: string
  event: {
    data: {
      title: string
      date: Date | string
      time: string
      location: string
      status: "upcoming" | "past"
      image?: string
      description?: string
    }
  }
}

export function EventCard({ slug, event }: EventCardProps) {
  const { title, date, time, location, status, image, description } = event.data
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  const isUpcoming = status === 'upcoming'

  return (
    <a href={`/events/${slug}`} className="block h-full no-underline">
      <Card className={`group cursor-pointer transition-all hover:border-primary/50 hover:bg-muted/10 h-full flex flex-col pt-0 gap-0 overflow-hidden ${isUpcoming ? 'border-primary/20' : 'border-border opacity-80 hover:opacity-100'}`}>
        {image ? (
          <div className="relative aspect-[2.5/1] w-full overflow-hidden border-b border-border bg-muted">
            <img 
              src={image} 
              alt={title} 
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 opacity-50 grayscale group-hover:opacity-70 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
            
            {isUpcoming && (
              <div className="absolute top-2 right-2">
                <Badge variant="default" className="bg-primary text-primary-foreground font-mono text-xs animate-pulse">
                  UPCOMING
                </Badge>
              </div>
            )}
          </div>
        ) : (
          <div className="relative aspect-[2.5/1] w-full overflow-hidden border-b border-border bg-muted/30">
            {/* Circuit grid pattern background */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="circuit-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary"/>
                    <circle cx="0" cy="0" r="2" fill="currentColor" className="text-primary/50"/>
                    <circle cx="32" cy="32" r="1.5" fill="currentColor" className="text-secondary"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#circuit-grid)" />
              </svg>
            </div>
            
            {/* Diagonal accent lines */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-b border-primary/30 rotate-45 translate-x-8 translate-y-4"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border-t border-secondary/30 rotate-45"></div>
            </div>
            
            {/* Large date display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-display font-bold text-primary/80 tracking-tighter">
                {format(dateObj, "dd")}
              </span>
              <span className="text-lg font-mono uppercase text-muted-foreground tracking-widest">
                {format(dateObj, "MMM yyyy")}
              </span>
            </div>
            
            {/* Corner brackets */}
            <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-primary/40"></div>
            <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-primary/40"></div>
            <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-secondary/40"></div>
            <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-secondary/40"></div>
            
            {isUpcoming && (
              <div className="absolute top-2 right-2">
                <Badge variant="default" className="bg-primary text-primary-foreground font-mono text-xs animate-pulse">
                  UPCOMING
                </Badge>
              </div>
            )}
          </div>
        )}
        
        <CardHeader className="pt-4 space-y-2">
          <CardTitle className="font-display text-xl uppercase tracking-tight group-hover:text-primary transition-colors leading-tight">
            {title}
          </CardTitle>
          <div className="space-y-1 text-xs text-muted-foreground font-mono">
            <div className="flex items-center gap-4">
              <span className="flex items-center">
                <IconCalendar className="mr-1 h-3 w-3" />
                {format(dateObj, "dd MMM yyyy")}
              </span>
              <span className="flex items-center">
                <IconClock className="mr-1 h-3 w-3" />
                {time}
              </span>
            </div>
            <div className="flex items-center">
              <IconMapPin className="mr-1 h-3 w-3" />
              {location}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 mt-2 pb-4">
          {description && (
            <p className="text-sm text-muted-foreground font-mono leading-relaxed line-clamp-2">
              {description}
            </p>
          )}
        </CardContent>
        
        <CardFooter className="border-t border-border pt-4 mt-auto">
          <span className="text-xs font-mono text-primary group-hover:translate-x-1 transition-transform inline-flex items-center">
            [ ACCESS_DETAILS ] <IconArrowRight className="ml-1 h-3 w-3" />
          </span>
        </CardFooter>
      </Card>
    </a>
  )
}
