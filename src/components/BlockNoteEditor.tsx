import { useMemo } from "react";
import {
	BlockNoteSchema,
	defaultBlockSpecs,
	defaultInlineContentSpecs,
	defaultStyleSpecs,
	type PartialBlock,
} from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useTheme } from "@/components/theme-provider";

import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import "./BlockNoteEditor.css";

type BlockNoteEditorProps = {
	initialContent?: PartialBlock[];
};

const DEFAULT_INITIAL_CONTENT: PartialBlock[] = [
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
		type: "paragraph",
	},
];

function createEditorSchema() {
	return BlockNoteSchema.create({
		blockSpecs: {
			...defaultBlockSpecs,
			// Add custom blocks here, e.g.
			// glyphSign: GlyphSignBlock,
		},
		inlineContentSpecs: {
			...defaultInlineContentSpecs,
		},
		styleSpecs: {
			...defaultStyleSpecs,
		},
	});
}

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

	const editor = useCreateBlockNote({
		schema,
		initialContent,
	});

	return (
		<div className="blocknote-theme-scope h-full" data-color-scheme={colorScheme}>
			<BlockNoteView editor={editor} data-custom-css theme={colorScheme} />
		</div>
	);
}
