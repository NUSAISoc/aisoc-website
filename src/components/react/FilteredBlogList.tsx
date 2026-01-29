import * as React from "react"
import { useState } from "react"
import { BlogCard } from "./BlogCard"
import { TagFilter } from "./TagFilter"

interface FilteredBlogListProps {
  posts: any[] // Using any just for simplicity with Astro collection types passed as JSON props
  allTags: string[]
}

export function FilteredBlogList({ posts, allTags }: FilteredBlogListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filteredPosts = activeTag
    ? posts.filter(post => post.data.tags.includes(activeTag))
    : posts

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-border/50 pb-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-display uppercase tracking-tight text-primary">
            // FILTER_BY_TAG
          </h2>
        </div>
        <TagFilter 
          tags={allTags} 
          activeTag={activeTag} 
          onTagSelect={setActiveTag} 
        />
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="data-terminal text-center py-12 text-muted-foreground">
          [ NO_RESULTS_MATCHING_FILTER ]
        </div>
      )}
    </div>
  )
}
