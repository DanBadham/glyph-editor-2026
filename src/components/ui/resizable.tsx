import { GripVertical } from "lucide-react"
import { Group, Panel, Separator, type GroupProps, type SeparatorProps } from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = ({
  className,
  ...props
}: GroupProps) => (
  <Group
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
)

const ResizablePanel = Panel

const ResizableHandle = ({
  withHandle,
  orientation = "horizontal",
  className,
  ...props
}: SeparatorProps & {
  withHandle?: boolean
  orientation?: "horizontal" | "vertical"
}) => (
  <Separator
    className={cn(
      "relative flex items-center justify-center bg-border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
      orientation === "vertical"
        ? "h-px w-full after:absolute after:inset-x-0 after:top-1/2 after:h-1 after:-translate-y-1/2"
        : "w-px after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className={cn(
        "z-10 flex h-8 w-4 items-center justify-center rounded-sm border bg-border",
        orientation === "vertical" && "rotate-90"
      )}>
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </Separator>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
