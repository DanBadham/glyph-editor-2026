import { useState } from "react"
import { PanelLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type EditorLayoutProps = {
  sidebar: React.ReactNode
  children: React.ReactNode
}

export function EditorLayout({ sidebar, children }: EditorLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "relative flex flex-col border-r border-border bg-muted/30 transition-all duration-300 ease-in-out",
          sidebarOpen ? "w-64" : "w-0"
        )}
      >
        <div
          className={cn(
            "flex h-full flex-col overflow-hidden transition-opacity duration-200",
            sidebarOpen ? "opacity-100" : "opacity-0"
          )}
        >
          {sidebar}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="flex h-12 items-center border-b border-border px-4 gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="h-8 w-8"
          >
            <PanelLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1" />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto flex-grow">
          {children}
        </div>
      </main>
    </div>
  )
}
