import BlockNoteEditor from './components/BlockNoteEditor'
import { EditorLayout } from './components/EditorLayout'
import HieroglyphLibrary from './components/HieroglyphLibrary'
import { Sidebar } from './components/Sidebar'

function App() {
  return (
    <EditorLayout sidebar={<Sidebar />}>
      <div className="flex h-full min-h-0 flex-col">
        <div className="max-h-9/12 min-h-8/12 overflow-auto p-6">
          <BlockNoteEditor />
        </div>

        <HieroglyphLibrary />
      </div>
    </EditorLayout>
  )
}

export default App
