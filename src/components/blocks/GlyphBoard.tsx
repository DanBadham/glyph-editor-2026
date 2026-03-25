import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { RiLayoutGridLine } from "react-icons/ri";

import "./GlyphBoard.css";

// Scaffolded variant values — "simple" is the only active v1 layout.
// "rows" and "grouped" are reserved for future row/group features.
export type GlyphBoardVariant = "simple" | "rows" | "grouped";

export const createGlyphBoard = createReactBlockSpec(
  {
    type: "glyphBoard",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      // Variant prop: scaffolds future row/group layout — no UI controls in v1.
      variant: {
        default: "simple" as GlyphBoardVariant,
        values: ["simple", "rows", "grouped"] as const,
      },
    },
    content: "inline",
  },
  {
    render: (props) => (
      <div
        className="glyph-board"
        data-variant={props.block.props.variant}
      >
        {/* Label bar — non-editable, identifies the block type */}
        <div className="glyph-board-label" contentEditable={false}>
          <RiLayoutGridLine size={11} />
          Glyph Board
        </div>

        {/*
          Row wrapper: anticipates future multi-row layout.
          When rows feature lands, this becomes one of several
          .glyph-board-row nodes, each with its own content area.
        */}
        <div className="glyph-board-row">
          <div className="glyph-board-content" ref={props.contentRef} />
        </div>
      </div>
    ),
  },
);
