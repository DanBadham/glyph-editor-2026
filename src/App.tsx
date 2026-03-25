import BlockNoteEditor from './components/BlockNoteEditor'
import { EditorLayout } from './components/EditorLayout'
import HieroglyphLibrary from './components/HieroglyphLibrary'
import { Sidebar } from './components/Sidebar'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable"

function App() {
  return (
    <EditorLayout sidebar={<Sidebar />}>
      <div id="mainContent" className="flex h-full min-h-0 flex-col">
        <ResizablePanelGroup orientation="vertical" className="min-h-[200px] flex-1">
          <ResizablePanel defaultSize={70}>
            <BlockNoteEditor />
          </ResizablePanel>
          <ResizableHandle withHandle orientation="vertical" />
          <ResizablePanel defaultSize={30} maxSize={'30%'}>
            <HieroglyphLibrary />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </EditorLayout>
  )
}

export default App
