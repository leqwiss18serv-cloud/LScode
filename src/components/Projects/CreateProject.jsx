import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'

export default function CreateProject({ onCreate, onClose }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    await onCreate(name.trim(), description.trim())
    setLoading(false)
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-vscode-sidebar border border-vscode-border rounded-lg p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-vscode-text">
            Create New Project
          </h2>
          <button
            onClick={onClose}
            className="text-vscode-text-secondary hover:text-vscode-text transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-vscode-text text-sm mb-2">
              Project Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-vscode-input text-vscode-text px-4 py-3 rounded border border-vscode-border focus:border-vscode-button focus:outline-none"
              placeholder="My Awesome Project"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-vscode-text text-sm mb-2">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-vscode-input text-vscode-text px-4 py-3 rounded border border-vscode-border focus:border-vscode-button focus:outline-none resize-none"
              placeholder="A brief description of your project..."
              rows={4}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-vscode-input hover:bg-vscode-border text-vscode-text py-3 rounded font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="flex-1 bg-vscode-button hover:bg-vscode-button-hover text-white py-3 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
