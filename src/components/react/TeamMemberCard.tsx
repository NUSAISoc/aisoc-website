import * as React from "react"
import type { CollectionEntry } from "astro:content"
import {
  IconBrandBluesky,
  IconBrandDiscord,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandReddit,
  IconBrandTelegram,
  IconBrandThreads,
  IconBrandTiktok,
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandMedium,
  IconMail,
  IconRobot,
  IconWorld,
} from "@tabler/icons-react"

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

type TeamMember = CollectionEntry<"team">
type TeamMemberSocial = NonNullable<TeamMember["data"]["social"]>
type SocialPlatformKey = Exclude<keyof TeamMemberSocial, "links">
type SocialIcon = React.ComponentType<{ className?: string }>

interface SocialLink {
  label: string
  href: string
  icon: SocialIcon
  external: boolean
}

interface SocialPlatformDefinition {
  key: SocialPlatformKey
  label: string
  icon: SocialIcon
  external?: boolean
  formatHref?: (value: string) => string
}

const SOCIAL_PLATFORMS = [
  { key: "github", label: "GitHub", icon: IconBrandGithub },
  { key: "linkedin", label: "LinkedIn", icon: IconBrandLinkedin },
  { key: "twitter", label: "Twitter", icon: IconBrandTwitter },
  { key: "instagram", label: "Instagram", icon: IconBrandInstagram },
  { key: "telegram", label: "Telegram", icon: IconBrandTelegram },
  { key: "discord", label: "Discord", icon: IconBrandDiscord },
  { key: "youtube", label: "YouTube", icon: IconBrandYoutube },
  { key: "bluesky", label: "Bluesky", icon: IconBrandBluesky },
  { key: "tiktok", label: "TikTok", icon: IconBrandTiktok },
  { key: "threads", label: "Threads", icon: IconBrandThreads },
  { key: "medium", label: "Medium", icon: IconBrandMedium },
  { key: "reddit", label: "Reddit", icon: IconBrandReddit },
  { key: "facebook", label: "Facebook", icon: IconBrandFacebook },
  { key: "huggingFace", label: "Hugging Face", icon: IconRobot },
  { key: "website", label: "Website", icon: IconWorld },
  {
    key: "email",
    label: "Email",
    icon: IconMail,
    external: false,
    formatHref: (value) => `mailto:${value}`,
  },
] satisfies readonly SocialPlatformDefinition[]

function getSocialLinks(social?: TeamMemberSocial): SocialLink[] {
  if (!social) {
    return []
  }

  const platformLinks = SOCIAL_PLATFORMS.flatMap((platform) => {
    const value = social[platform.key]

    if (typeof value !== "string" || value.length === 0) {
      return []
    }

    return [{
      label: platform.label,
      href: platform.formatHref?.(value) ?? value,
      icon: platform.icon,
      external: platform.external ?? true,
    }]
  })

  const customLinks = (social.links ?? []).map((link) => ({
    label: link.label,
    href: link.href,
    icon: IconWorld,
    external: true,
  }))

  return [...platformLinks, ...customLinks]
}

interface TeamMemberCardProps {
  member: TeamMember
}

interface SocialLinkButtonProps {
  link: SocialLink
  inDialog?: boolean
}

function SocialLinkButton({ link, inDialog = false }: SocialLinkButtonProps) {
  const Icon = link.icon

  return (
    <Button
      asChild
      variant="ghost"
      size={inDialog ? "sm" : "icon"}
      className={inDialog
        ? "w-full min-w-9 hover:text-primary hover:bg-primary/10 rounded-none border-r border-border/50 last:border-0 p-0 h-9"
        : "h-8 w-8 hover:text-primary hover:bg-transparent"}
    >
      <a
        href={link.href}
        target={link.external ? "_blank" : undefined}
        rel={link.external ? "noopener noreferrer" : undefined}
        aria-label={link.label}
        title={link.label}
        onClick={(event) => event.stopPropagation()}
        className="flex items-center justify-center"
      >
        <Icon className="h-4 w-4" />
        <span className="sr-only">{link.label}</span>
      </a>
    </Button>
  )
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const { name, role, tagline, image, social } = member.data
  const socialLinks = getSocialLinks(social)

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
            
            <div className="pt-4 flex flex-wrap justify-center gap-2">
              {socialLinks.map((link) => (
                <SocialLinkButton key={`${link.label}-${link.href}`} link={link} />
              ))}
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
            {socialLinks.map((link) => (
              <SocialLinkButton key={`${link.label}-${link.href}`} link={link} inDialog />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
