import { cn } from "@/lib/utils"

export type GlyphSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl"

type GlyphProps = {
  glyph: string
  size?: GlyphSize
  className?: string
  title?: string
  ariaLabel?: string
}

const SIZE_CLASSES: Record<GlyphSize, string> = {
  xs: "text-base",
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
  xxl: "text-5xl",
}

export default function Glyph({
  glyph,
  size = "md",
  className,
  title,
  ariaLabel,
}: GlyphProps) {
  return (
    <span
      className={cn("glyph-font leading-none font-bold", SIZE_CLASSES[size], className)}
      title={title}
      aria-label={ariaLabel}
    >
      {glyph}
    </span>
  )
}
