import { FileText, Plus, Search, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { useState } from "react"

type Page = {
  id: string
  title: string
  icon?: React.ReactNode
}

const MOCK_PAGES: Page[] = [
  { id: "1", title: "Getting Started", icon: <FileText className="h-4 w-4" /> },
  { id: "2", title: "My First Glyph", icon: <FileText className="h-4 w-4" /> },
  { id: "3", title: "Research Notes", icon: <FileText className="h-4 w-4" /> },
  { id: "4", title: "Egyptian Dictionary", icon: <FileText className="h-4 w-4" /> },
]

export function Sidebar() {
  const [selectedPageId, setSelectedPageId] = useState("1")

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Glyph Editor</span>
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator />

      {/* Search */}
      <div className="p-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          size="sm"
        >
          <Search className="mr-2 h-4 w-4" />
          Search pages...
        </Button>
      </div>

      <Separator />

      {/* Pages List */}
      <div className="flex-1 overflow-auto p-2">
        <div className="space-y-1">
          <div className="mb-2 flex items-center justify-between px-2">
            <span className="text-xs font-medium text-muted-foreground">
              PAGES
            </span>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {MOCK_PAGES.map((page) => (
            <Button
              key={page.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-sm font-normal",
                selectedPageId === page.id &&
                  "bg-accent text-accent-foreground"
              )}
              onClick={() => setSelectedPageId(page.id)}
            >
              {page.icon}
              <span className="ml-2 truncate">{page.title}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border p-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-xs text-muted-foreground"
        >
          <Plus className="mr-2 h-3 w-3" />
          New Page
        </Button>
      </div>
    </div>
  )
}
