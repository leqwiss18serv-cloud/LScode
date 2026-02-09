import { FaFile, FaTrash } from 'react-icons/fa'
import { getFileIcon } from '../../utils/fileHelpers'

export default function FileTree({ files, selectedFile, onSelectFile, onDeleteFile }) {
  return (
    <div className="bg-vscode-sidebar border-r border-vscode-border w-64 overflow-y-auto">
      <div className="p-4">
        <h3 className="text-vscode-text-secondary text-xs uppercase mb-3 font-semibold">
          Files
        </h3>
        {files.length === 0 ? (
          <p className="text-vscode-text-secondary text-sm">
            No files yet. Create one to get started.
          </p>
        ) : (
          <div className="space-y-1">
            {files.map((file) => (
              <div
                key={file.id}
                className={`flex items-center justify-between p-2 rounded cursor-pointer group ${
                  selectedFile?.id === file.id
                    ? 'bg-vscode-input text-vscode-text'
                    : 'text-vscode-text-secondary hover:bg-vscode-input hover:text-vscode-text'
                }`}
                onClick={() => onSelectFile(file)}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span>{getFileIcon(file.name)}</span>
                  <span className="truncate text-sm">{file.name}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (window.confirm(`Delete ${file.name}?`)) {
                      onDeleteFile(file.id)
                    }
                  }}
                  className="opacity-0 group-hover:opacity-100 text-vscode-text-secondary hover:text-red-500 transition-all"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
