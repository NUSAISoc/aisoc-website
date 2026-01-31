import * as React from "react"
import { Github, Linkedin, Globe, Mail, Twitter } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface TeamMemberCardProps {
  member: {
    data: {
      name: string
      role: string
      tagline: string
      image: string
      social?: {
        github?: string
        linkedin?: string
        twitter?: string
        website?: string
        email?: string
      }
    }
    body?: string
  }
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const { name, role, tagline, image, social } = member.data

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="group cursor-pointer border-border bg-card/50 hover:bg-muted/10 transition-all hover:border-primary/50 overflow-hidden text-center h-full flex flex-col items-center py-6 px-4 gap-0">
          <Avatar className="h-28 w-28 border-2 border-border group-hover:border-primary transition-colors mb-4">
            <AvatarImage src={image} alt={name} className="object-cover" />
            <AvatarFallback className="bg-muted text-muted-foreground text-2xl font-display">
              {name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          
          <CardHeader className="pb-2 pt-0 space-y-1 px-0 flex flex-col items-center justify-center w-full">
            <CardTitle className="font-display text-base tracking-tight uppercase group-hover:text-primary transition-colors whitespace-nowrap text-center">
              {name}
            </CardTitle>
            <div className="text-[10px] font-mono text-primary uppercase tracking-[0.2em] font-bold text-center">
              {role}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4 px-2 pb-0 w-full flex-1 flex flex-col justify-between">
            <p className="text-sm text-muted-foreground font-mono leading-relaxed italic">
              "{tagline}"
            </p>
            
            <div className="pt-4 flex justify-center gap-2" onClick={(e) => e.stopPropagation()}>
              {social?.github && (
                <a href={social.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary hover:bg-transparent">
                    <Github className="h-4 w-4" />
                  </Button>
                </a>
              )}
              {social?.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary hover:bg-transparent">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </a>
              )}
              {social?.twitter && (
                <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary hover:bg-transparent">
                    <Twitter className="h-4 w-4" />
                  </Button>
                </a>
              )}
              {social?.website && (
                <a href={social.website} target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary hover:bg-transparent">
                    <Globe className="h-4 w-4" />
                  </Button>
                </a>
              )}
              {social?.email && (
                <a href={`mailto:${social.email}`}>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary hover:bg-transparent">
                    <Mail className="h-4 w-4" />
                  </Button>
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      
      <DialogContent className="max-w-md bg-card border-primary/20 p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 border-2 border-primary mb-4">
              <AvatarImage src={image} alt={name} className="object-cover" />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
            <DialogTitle className="font-display text-2xl uppercase tracking-tight text-primary">
              {name}
            </DialogTitle>
            <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest mt-1">
              {role}
            </p>
          </div>
        </DialogHeader>
        
        <div className="px-6 py-4 space-y-6">
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase text-muted-foreground tracking-widest border-b border-border/50 pb-1">BioData</h4>
            <p className="text-sm font-mono text-foreground/80 leading-relaxed">
               {member.body || tagline}
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-border/50">
            {social?.github && (
               <Button asChild variant="ghost" size="sm" className="w-full hover:text-primary hover:bg-primary/10 rounded-none border-r border-border/50 last:border-0 p-0 h-9">
                 <a href={social.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                   <Github className="h-4 w-4" />
                 </a>
               </Button>
            )}
            {social?.linkedin && (
               <Button asChild variant="ghost" size="sm" className="w-full hover:text-primary hover:bg-primary/10 rounded-none border-r border-border/50 last:border-0 p-0 h-9">
                 <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                   <Linkedin className="h-4 w-4" />
                 </a>
               </Button>
            )}
            {social?.twitter && (
               <Button asChild variant="ghost" size="sm" className="w-full hover:text-primary hover:bg-primary/10 rounded-none border-r border-border/50 last:border-0 p-0 h-9">
                 <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                   <Twitter className="h-4 w-4" />
                 </a>
               </Button>
            )}
            {social?.website && (
               <Button asChild variant="ghost" size="sm" className="w-full hover:text-primary hover:bg-primary/10 rounded-none border-r border-border/50 last:border-0 p-0 h-9">
                 <a href={social.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                   <Globe className="h-4 w-4" />
                 </a>
               </Button>
            )}
            {social?.email && (
               <Button asChild variant="ghost" size="sm" className="w-full hover:text-primary hover:bg-primary/10 rounded-none border-r border-border/50 last:border-0 p-0 h-9">
                 <a href={`mailto:${social.email}`} className="flex items-center justify-center">
                   <Mail className="h-4 w-4" />
                 </a>
               </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
