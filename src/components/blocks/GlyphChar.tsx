import { createReactInlineContentSpec } from "@blocknote/react";

import "./GlyphChar.css";

/**
 * A custom BlockNote inline content node that renders a single hieroglyph
 * character as a styled, atomic (non-editable) span.
 *
 * Inserted via the Hieroglyph Library panel; serialised as part of the
 * BlockNote document JSON.
 */
export const createGlyphChar = createReactInlineContentSpec(
  {
    type: "glyphChar" as const,
    propSchema: {
      glyph: { default: "" },
      glyphId: { default: "" },
    },
    content: "none",
  },
  {
    render: ({ inlineContent }) => (
      <span
        className="glyph-char glyph-font"
        title={inlineContent.props.glyphId || undefined}
        aria-label={inlineContent.props.glyphId || undefined}
        // contentEditable={false} is handled by BlockNote for content:"none"
      >
        {inlineContent.props.glyph}
      </span>
    ),
  },
);
