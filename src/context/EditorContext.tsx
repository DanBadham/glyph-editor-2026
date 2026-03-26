import { createContext, useCallback, useContext, useRef } from "react";

type InsertGlyphFn = (glyph: string, glyphId: string) => void;

type EditorContextValue = {
  /** Insert a glyph at the current editor cursor position. No-op if editor is not mounted. */
  insertGlyph: InsertGlyphFn;
  /** Called once by BlockNoteEditor after the editor instance is created. */
  setInsertGlyph: (fn: InsertGlyphFn) => void;
};

const EditorContext = createContext<EditorContextValue>({
  insertGlyph: () => {},
  setInsertGlyph: () => {},
});

export function EditorContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Store the insert function in a ref so registration never triggers re-renders.
  const insertGlyphRef = useRef<InsertGlyphFn | null>(null);

  const setInsertGlyph = useCallback((fn: InsertGlyphFn) => {
    insertGlyphRef.current = fn;
  }, []);

  // Stable wrapper — context consumers never get a stale reference.
  const insertGlyph = useCallback<InsertGlyphFn>((glyph, glyphId) => {
    insertGlyphRef.current?.(glyph, glyphId);
  }, []);

  return (
    <EditorContext.Provider value={{ insertGlyph, setInsertGlyph }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditorContext() {
  return useContext(EditorContext);
}
