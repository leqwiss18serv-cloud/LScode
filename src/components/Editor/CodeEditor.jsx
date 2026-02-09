import { useCallback, useState } from 'react'
import Editor from '@monaco-editor/react'
import { useDropzone } from 'react-dropzone'
import { getLanguage, isImageFile } from '../../utils/fileHelpers'

export default function CodeEditor({ file, onContentChange }) {
  const [imagePreview, setImagePreview] = useState(null)

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (!file || !isImageFile(file.name)) return

      const imageFile = acceptedFiles[0]
      if (imageFile) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const base64 = e.target.result
          setImagePreview(base64)
          onContentChange(base64)
        }
        reader.readAsDataURL(imageFile)
      }
    },
    [file, onContentChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'],
    },
    multiple: false,
    noClick: !isImageFile(file?.name || ''),
  })

  if (!file) {
    return (
      <div className="flex-1 bg-vscode-editor flex items-center justify-center text-vscode-text-secondary">
        Select a file to start editing
      </div>
    )
  }

  // Handle image files
  if (isImageFile(file.name)) {
    return (
      <div
        {...getRootProps()}
        className="flex-1 bg-vscode-editor flex items-center justify-center cursor-pointer"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className="text-vscode-button text-xl">Drop the image here</div>
        ) : file.content || imagePreview ? (
          <div className="text-center">
            <img
              src={imagePreview || file.content}
              alt={file.name}
              className="max-w-full max-h-[80vh] object-contain mb-4"
            />
            <p className="text-vscode-text-secondary">
              Drag and drop to replace image
            </p>
          </div>
        ) : (
          <div className="text-center text-vscode-text-secondary">
            <p className="text-xl mb-2">📷</p>
            <p>Drag and drop an image here</p>
            <p className="text-sm mt-2">or click to select</p>
          </div>
        )}
      </div>
    )
  }

  // Handle code files
  const language = getLanguage(file.name)

  return (
    <div className="flex-1">
      <Editor
        height="100%"
        language={language}
        value={file.content || ''}
        onChange={(value) => onContentChange(value || '')}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
        }}
      />
    </div>
  )
}
