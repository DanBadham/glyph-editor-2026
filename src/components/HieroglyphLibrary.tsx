import { useMemo, useState } from "react"
import glyphsData from "@/data/glyphs.json"

type Glyph = {
  id: string
  unicode: string
  hieroglyph: string
  description: string
}

type GlyphGroup = {
  description: string
  glyphs: Glyph[]
}

type GlyphMap = Record<string, GlyphGroup>

const typedGlyphsData = glyphsData as GlyphMap

export default function HieroglyphLibrary() {
  const groups = useMemo(() => Object.entries(typedGlyphsData), [])
  const [selectedGroupKey, setSelectedGroupKey] = useState(groups[0]?.[0] ?? "")

  const selectedGroup = selectedGroupKey ? typedGlyphsData[selectedGroupKey] : null

  if (groups.length === 0) {
    return null
  }

  return (
    <section className="mt-6 border-t border-border pt-6">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-semibold text-foreground">Hieroglyph Library</h2>
        <p className="text-sm text-muted-foreground">{selectedGroup?.glyphs.length ?? 0} glyphs</p>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {groups.map(([groupKey, group]) => {
          const isActive = selectedGroupKey === groupKey

          return (
            <button
              key={groupKey}
              type="button"
              onClick={() => setSelectedGroupKey(groupKey)}
              className={[
                "rounded-md border px-2.5 py-1 text-xs transition-colors",
                isActive
                  ? "border-zinc-500 bg-zinc-100 text-zinc-900"
                  : "border-border bg-background text-muted-foreground hover:bg-muted",
              ].join(" ")}
              title={group.description}
            >
              {groupKey}
            </button>
          )
        })}
      </div>

      {selectedGroup && (
        <>
          <p className="mb-4 text-sm text-muted-foreground">{selectedGroup.description}</p>
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12">
            {selectedGroup.glyphs.map((glyph) => (
              <button
                key={glyph.id}
                type="button"
                className="aspect-square rounded-md border border-zinc-400 bg-white text-2xl leading-none text-zinc-900 transition-colors hover:bg-zinc-50"
                title={`${glyph.id}: ${glyph.description}`}
                aria-label={`${glyph.id}: ${glyph.description}`}
              >
                {glyph.hieroglyph}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
