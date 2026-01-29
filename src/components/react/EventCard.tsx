import * as React from "react"
import { format } from "date-fns"
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react"

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
    }
  }
}

export function EventCard({ slug, event }: EventCardProps) {
  const { title, date, time, location, status, image } = event.data
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  const isUpcoming = status === 'upcoming'

  return (
    <a href={`/events/${slug}`} className="block h-full no-underline">
      <Card className={`group cursor-pointer transition-all hover:border-primary/50 hover:bg-muted/10 h-full flex flex-col ${isUpcoming ? 'border-primary/20' : 'border-border opacity-80 hover:opacity-100'}`}>
        {image && (
          <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-muted">
            <img 
              src={image} 
              alt={title} 
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60" />
            
            {isUpcoming && (
              <div className="absolute top-2 right-2">
                <Badge variant="default" className="bg-primary text-primary-foreground font-mono text-xs animate-pulse">
                  UPCOMING
                </Badge>
              </div>
            )}
          </div>
        )}
        
        <CardHeader>
          <div className="space-y-1">
            <CardTitle className="font-display text-xl uppercase tracking-tight group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <div className="flex items-center text-sm text-muted-foreground font-mono">
              <Calendar className="mr-2 h-3 w-3" />
              {format(dateObj, "dd MMM yyyy")}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 space-y-2 text-sm text-muted-foreground font-mono">
          <div className="flex items-center">
            <Clock className="mr-2 h-3 w-3 text-secondary-foreground" />
            {time}
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-3 w-3 text-secondary-foreground" />
            {location}
          </div>
        </CardContent>
        
        <CardFooter className="border-t border-border pt-4 mt-auto">
          <span className="text-xs font-mono text-primary group-hover:translate-x-1 transition-transform inline-flex items-center">
            [ ACCESS_DETAILS ] <ArrowRight className="ml-1 h-3 w-3" />
          </span>
        </CardFooter>
      </Card>
    </a>
  )
}
