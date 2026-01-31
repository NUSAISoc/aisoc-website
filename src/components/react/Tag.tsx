import * as React from "react"
import { cn } from "@/lib/classnames"

interface TagProps {
  tag: string
  className?: string
}

export function Tag({ tag, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block text-xs font-mono uppercase tracking-widest text-primary",
        className
      )}
    >
      #{tag}
    </span>
  )
}
