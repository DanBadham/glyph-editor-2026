import BlockNoteEditor from './components/BlockNoteEditor'
import { EditorLayout } from './components/EditorLayout'
import HieroglyphLibrary from './components/HieroglyphLibrary'
import { Sidebar } from './components/Sidebar'

function App() {
  return (
    <EditorLayout sidebar={<Sidebar />}>
      <div className="container mx-auto max-w-5xl p-6">
        <BlockNoteEditor />
        <HieroglyphLibrary />
      </div>
    </EditorLayout>
  )
}

export default App
