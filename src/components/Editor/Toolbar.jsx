import { useState } from 'react'
import { FaPlay, FaArrowLeft, FaPlus, FaSave } from 'react-icons/fa'

export default function Toolbar({
  onBack,
  onRun,
  onNewFile,
  onSave,
  projectName,
  hasChanges,
}) {
  return (
    <div className="bg-vscode-titlebar border-b border-vscode-border px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="text-vscode-text hover:text-vscode-button transition-colors flex items-center gap-2"
        >
          <FaArrowLeft /> Back
        </button>
        <div className="text-vscode-text font-semibold">{projectName}</div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onNewFile}
          className="bg-vscode-input hover:bg-vscode-border text-vscode-text px-4 py-2 rounded flex items-center gap-2 transition-colors"
        >
          <FaPlus /> New File
        </button>
        <button
          onClick={onSave}
          disabled={!hasChanges}
          className="bg-vscode-input hover:bg-vscode-border text-vscode-text px-4 py-2 rounded flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaSave /> {hasChanges ? 'Save' : 'Saved'}
        </button>
        <button
          onClick={onRun}
          className="bg-vscode-button hover:bg-vscode-button-hover text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
        >
          <FaPlay /> Run
        </button>
      </div>
    </div>
  )
}
