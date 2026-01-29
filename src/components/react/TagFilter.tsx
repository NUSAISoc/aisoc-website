import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface TagFilterProps {
  tags: string[]
  activeTag: string | null
  onTagSelect: (tag: string | null) => void
}

export function TagFilter({ tags, activeTag, onTagSelect }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 py-4">
      <Button
        variant={activeTag === null ? "default" : "outline"}
        size="sm"
        onClick={() => onTagSelect(null)}
        className={`font-mono text-xs ${activeTag === null ? "bg-primary text-primary-foreground hover:bg-primary/90" : "hover:border-primary/50"}`}
      >
        ALL
      </Button>
      
      {tags.map(tag => (
        <Button
          key={tag}
          variant={activeTag === tag ? "default" : "outline"}
          size="sm"
          onClick={() => onTagSelect(tag === activeTag ? null : tag)}
          className={`font-mono text-xs ${
            activeTag === tag 
              ? "bg-primary text-primary-foreground hover:bg-primary/90" 
              : "hover:border-primary/50 text-muted-foreground"
          }`}
        >
          #{tag}
        </Button>
      ))}
    </div>
  )
}
