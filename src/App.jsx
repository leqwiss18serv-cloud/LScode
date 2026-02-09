import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'

// Hooks
import { useAuth } from './hooks/useAuth'
import { useProjects } from './hooks/useProjects'
import { useFiles } from './hooks/useFiles'

// Components
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Header from './components/Layout/Header'
import ProjectList from './components/Projects/ProjectList'
import Toolbar from './components/Editor/Toolbar'
import FileTree from './components/Editor/FileTree'
import CodeEditor from './components/Editor/CodeEditor'
import PreviewPanel from './components/Editor/PreviewPanel'

// Utils
import { getDefaultContent } from './utils/fileHelpers'

function App() {
  const { user, loading: authLoading, signIn, signUp, signOut } = useAuth()
  const [showRegister, setShowRegister] = useState(false)
  const [currentProject, setCurrentProject] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileContent, setFileContent] = useState('')
  const [hasChanges, setHasChanges] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const {
    projects,
    loading: projectsLoading,
    createProject,
    deleteProject,
  } = useProjects(user?.id)

  const {
    files,
    loading: filesLoading,
    createFile,
    updateFile,
    deleteFile,
  } = useFiles(currentProject?.id)

  // Reset selected file when changing projects
  useEffect(() => {
    setSelectedFile(null)
    setFileContent('')
    setHasChanges(false)
    setShowPreview(false)
  }, [currentProject])

  // Update file content when selecting a file
  useEffect(() => {
    if (selectedFile) {
      setFileContent(selectedFile.content || '')
      setHasChanges(false)
    }
  }, [selectedFile])

  const handleFileContentChange = (content) => {
    setFileContent(content)
    setHasChanges(content !== (selectedFile?.content || ''))
  }

  const handleSaveFile = async () => {
    if (!selectedFile || !hasChanges) return

    await updateFile(selectedFile.id, { content: fileContent })
    setHasChanges(false)
  }

  const handleNewFile = async () => {
    const fileName = prompt('Enter file name (e.g., index.html, script.js):')
    if (!fileName) return

    const fileType = fileName.split('.').pop()
    const defaultContent = getDefaultContent(fileName)

    const { data } = await createFile(fileName, fileType, defaultContent)
    if (data) {
      setSelectedFile(data)
    }
  }

  const handleRun = () => {
    setShowPreview(true)
  }

  const handleBackToProjects = () => {
    if (hasChanges) {
      if (window.confirm('You have unsaved changes. Save before leaving?')) {
        handleSaveFile()
      }
    }
    setCurrentProject(null)
  }

  // Auth loading state
  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-vscode-bg">
        <div className="text-vscode-text text-xl">Loading...</div>
      </div>
    )
  }

  // Not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-vscode-bg flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {showRegister ? (
            <Register
              key="register"
              onSignUp={signUp}
              onSwitchToLogin={() => setShowRegister(false)}
            />
          ) : (
            <Login
              key="login"
              onSignIn={signIn}
              onSwitchToRegister={() => setShowRegister(true)}
            />
          )}
        </AnimatePresence>
        <Toaster position="top-right" />
      </div>
    )
  }

  // Authenticated - Show projects or editor
  return (
    <div className="h-screen flex flex-col bg-vscode-bg">
      <Header user={user} onSignOut={signOut} />

      {!currentProject ? (
        <ProjectList
          projects={projects}
          loading={projectsLoading}
          onCreateProject={createProject}
          onSelectProject={setCurrentProject}
          onDeleteProject={deleteProject}
        />
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden">
          <Toolbar
            projectName={currentProject.name}
            onBack={handleBackToProjects}
            onRun={handleRun}
            onNewFile={handleNewFile}
            onSave={handleSaveFile}
            hasChanges={hasChanges}
          />

          <div className="flex-1 flex overflow-hidden">
            <FileTree
              files={files}
              selectedFile={selectedFile}
              onSelectFile={setSelectedFile}
              onDeleteFile={deleteFile}
            />

            <div className="flex-1 flex overflow-hidden">
              <CodeEditor
                file={selectedFile}
                onContentChange={handleFileContentChange}
              />

              {showPreview && (
                <PreviewPanel files={files} isVisible={showPreview} />
              )}
            </div>
          </div>
        </div>
      )}

      <Toaster position="top-right" />
    </div>
  )
}

export default App
