import { useEffect, useMemo } from "react";
import {
	BlockNoteSchema,
	defaultBlockSpecs,
	defaultInlineContentSpecs,
	defaultStyleSpecs,
	type PartialBlock,
} from "@blocknote/core";
import {
  filterSuggestionItems,
  insertOrUpdateBlockForSlashMenu,
} from "@blocknote/core/extensions";
import {
  FormattingToolbarController,
  blockTypeSelectItems,
  useCreateBlockNote,
	type BlockTypeSelectItem,
  FormattingToolbar,
	type DefaultReactSuggestionItem,
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
} from "@blocknote/react";

import { BlockNoteView } from "@blocknote/mantine";
import { useTheme } from "@/components/theme-provider";

import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import "./BlockNoteEditor.css";

import { RiAlertFill, RiLayoutGridLine } from "react-icons/ri";
import { createAlert } from "./blocks/Alert";
import { createGlyphBoard } from "./blocks/GlyphBoard";
import { createGlyphChar } from "./blocks/GlyphChar";
import { useEditorContext } from "@/context/EditorContext";

type BlockNoteEditorProps = {
	initialContent?: PartialBlock<any, any, any>[];
};

// Custom Slash Menu item for Glyph Board.
const insertGlyphBoardItem = (editor: ReturnType<typeof useCreateBlockNote>) => ({
  title: "Glyph Board",
  onItemClick: () =>
    insertOrUpdateBlockForSlashMenu(editor, {
      type: "glyphBoard",
    }),
  aliases: ["glyph", "board", "hieroglyph", "glyphboard"],
  group: "Custom Blocks",
  icon: <RiLayoutGridLine size={18} />,
  subtext: "A styled board for laying out hieroglyphs.",
});

// Custom Slash Menu item to insert a block after the current one.
const insertHelloWorldItem = (editor: ReturnType<typeof useCreateBlockNote>) => ({
  title: "Alert",
  onItemClick: () =>
    // If the block containing the text caret is empty, `insertOrUpdateBlock`
    // changes its type to the provided block. Otherwise, it inserts the new
    // block below and moves the text caret to it. We use this function with
    // a block containing 'Hello World' in bold.
    insertOrUpdateBlockForSlashMenu(editor, {
      type: "alert",
      content: [{ type: "text", text: "This is an example alert" }],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any),
  aliases: ["note", "warning", "error"],
  group: "Custom Blocks",
  icon: <RiAlertFill size={18} />,
  subtext: "Used to insert an alert block.",
});

// List containing all default Slash Menu Items, as well as our custom one.
const getCustomSlashMenuItems = (
  editor: ReturnType<typeof useCreateBlockNote>,
): DefaultReactSuggestionItem[] => [
  ...getDefaultReactSlashMenuItems(editor),
  insertGlyphBoardItem(editor),
  insertHelloWorldItem(editor),
];

function createEditorSchema() {
	return BlockNoteSchema.create({
		blockSpecs: {
			...defaultBlockSpecs,
			alert: createAlert(),
			glyphBoard: createGlyphBoard(),
		},
		inlineContentSpecs: {
			...defaultInlineContentSpecs,
			glyphChar: createGlyphChar,
		},
		styleSpecs: {
			...defaultStyleSpecs,
		},
	});
}

// const customSchema = BlockNoteSchema.create({
//   blockSpecs: {
// 		...defaultBlockSpecs,
//     // Creates an instance of the Alert block and adds it to the schema.
//     alert: createAlert(),
//   },
// 	inlineContentSpecs: {
// 		...defaultInlineContentSpecs,
// 	},
// 	styleSpecs: {
// 		...defaultStyleSpecs,
// 	},
// });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEFAULT_INITIAL_CONTENT: PartialBlock<any, any, any>[] = [
	{
		type: "heading",
		content: "Welcome to your glyph editor!",
	},
	{
		type: "paragraph",
		content:
			"This component is structured to make adding custom BlockNote blocks straightforward.",
	},
	{
		type: "alert",
		content:
			"This is an example alert",
	},
	{
		type: "paragraph",
	},
	
];

export default function BlockNoteEditor({
	initialContent = DEFAULT_INITIAL_CONTENT,
}: BlockNoteEditorProps) {
	const { theme } = useTheme();
	const schema = useMemo(() => createEditorSchema(), []);
	const colorScheme =
		theme === "system"
			? window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light"
			: theme;

	const { setInsertGlyph } = useEditorContext();

	const editor = useCreateBlockNote({
		schema,
		initialContent,
	});

	// Register the glyph insertion function in context so HieroglyphLibrary
	// can call it without needing a direct reference to the editor.
	useEffect(() => {
		setInsertGlyph((glyph, glyphId) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			editor.insertInlineContent([{ type: "glyphChar", props: { glyph, glyphId } }] as any);
		});
	}, [editor, setInsertGlyph]);

	return (
		<div className="blocknote-theme-scope h-full pt-8" data-color-scheme={colorScheme}>
			<BlockNoteView editor={editor} data-custom-css theme={colorScheme} formattingToolbar={false} slashMenu={false}>
				{/* Replaces the default Formatting Toolbar */}
      <FormattingToolbarController
        formattingToolbar={() => (
          // Uses the default Formatting Toolbar.
          <FormattingToolbar
            // Sets the items in the Block Type Select.
            blockTypeSelectItems={[
              // Gets the default Block Type Select items.
              ...blockTypeSelectItems(editor.dictionary),
              // Adds an item for the Alert block.
              {
                name: "Alert",
                type: "alert",
                icon: RiAlertFill,
              } satisfies BlockTypeSelectItem,
              {
                name: "Glyph Board",
                type: "glyphBoard",
                icon: RiLayoutGridLine,
              } satisfies BlockTypeSelectItem,
            ]}
          />
        )}
      />
			<SuggestionMenuController
        triggerCharacter={"/"}
        // Replaces the default Slash Menu items with our custom ones.
        getItems={async (query) =>
          filterSuggestionItems(getCustomSlashMenuItems(editor), query)
        }
      />
			</BlockNoteView>
		</div>
	);
}
