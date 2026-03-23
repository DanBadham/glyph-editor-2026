import { useMemo, useState } from "react"
import glyphsData from "@/data/glyphs.json"
import Glyph from "@/components/Glyph"

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
  const [query, setQuery] = useState("")

  const selectedGroup = selectedGroupKey ? typedGlyphsData[selectedGroupKey] : null
  const normalizedQuery = query.trim().toLowerCase()

  const filteredGlyphs = useMemo(() => {
    if (!selectedGroup) {
      return []
    }

    if (!normalizedQuery) {
      return selectedGroup.glyphs
    }

    return selectedGroup.glyphs.filter((glyph) => {
      const searchable = [glyph.id, glyph.unicode, glyph.hieroglyph, glyph.description]
        .join(" ")
        .toLowerCase()

      return searchable.includes(normalizedQuery)
    })
  }, [selectedGroup, normalizedQuery])

  if (groups.length === 0) {
    return null
  }

  return (
    <section className="flex-3 min-h-0 overflow-auto border-t border-border p-4">
      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <h2 className="mr-1 whitespace-nowrap text-sm font-semibold text-foreground">
          Hieroglyph Library
        </h2>

        <label htmlFor="glyph-group" className="sr-only">
          Select hieroglyph group
        </label>
        <select
          id="glyph-group"
          value={selectedGroupKey}
          onChange={(event) => setSelectedGroupKey(event.target.value)}
          className="h-8 min-w-47.5 rounded-md border border-border bg-background px-2 text-xs text-foreground outline-none transition-colors focus:border-zinc-400 focus:ring-1 focus:ring-zinc-300"
        >
          {groups.map(([groupKey, group]) => (
            <option key={groupKey} value={groupKey}>
              {groupKey} - {group.description}
            </option>
          ))}
        </select>

        <label htmlFor="glyph-filter" className="sr-only">
          Filter glyphs
        </label>
        <input
          id="glyph-filter"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filter by ID, description, etc."
          className="h-8 min-w-47.5 flex-1 rounded-md border border-border bg-background px-2.5 text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-zinc-400 focus:ring-1 focus:ring-zinc-300"
          aria-label="Filter glyphs"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="h-8 rounded-md border border-border px-2 text-[11px] text-muted-foreground transition-colors hover:bg-muted"
          >
            Clear
          </button>
        )}

        <p className="ml-auto whitespace-nowrap text-[11px] text-muted-foreground">
          {filteredGlyphs.length}/{selectedGroup?.glyphs.length ?? 0}
        </p>
      </div>

      {selectedGroup && (
        <>
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12">
            {filteredGlyphs.map((glyph) => (
              <button
                key={glyph.id}
                type="button"
                className="aspect-square rounded-md border border-zinc-400 bg-white text-zinc-900 transition-colors hover:bg-zinc-50"
                title={`${glyph.id}: ${glyph.description}`}
                aria-label={`${glyph.id}: ${glyph.description}`}
              >
                <span className="flex h-full flex-col items-center justify-center gap-1 leading-none">
                  <Glyph glyph={glyph.hieroglyph} size="md" />
                  <span className="text-[10px] font-medium text-zinc-600">{glyph.id}</span>
                </span>
              </button>
            ))}
          </div>

          {filteredGlyphs.length === 0 && (
            <p className="mt-3 text-sm text-muted-foreground">No glyphs match your filter.</p>
          )}
        </>
      )}
    </section>
  )
}
