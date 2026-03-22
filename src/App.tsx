import BlockNoteEditor from './components/BlockNoteEditor'
import { EditorLayout } from './components/EditorLayout'
import { Sidebar } from './components/Sidebar'
import { Card, CardContent } from './components/ui/card'

function App() {
  return (
    <EditorLayout sidebar={<Sidebar />}>
      <div className="container mx-auto max-w-5xl p-6">
        <BlockNoteEditor />
      </div>
    </EditorLayout>
  )
}

export default App
