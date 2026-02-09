import { motion } from 'framer-motion'
import { FaTrash, FaEdit, FaClock } from 'react-icons/fa'

export default function ProjectCard({ project, onSelect, onDelete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-vscode-sidebar border border-vscode-border rounded-lg p-6 cursor-pointer hover:border-vscode-button transition-colors group"
      onClick={() => onSelect(project)}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-vscode-text group-hover:text-vscode-button transition-colors">
          {project.name}
        </h3>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(project.id)
          }}
          className="text-vscode-text-secondary hover:text-red-500 transition-colors"
        >
          <FaTrash />
        </button>
      </div>

      {project.description && (
        <p className="text-vscode-text-secondary mb-4 line-clamp-2">
          {project.description}
        </p>
      )}

      <div className="flex items-center text-sm text-vscode-text-secondary">
        <FaClock className="mr-2" />
        <span>Updated {formatDate(project.updated_at)}</span>
      </div>
    </motion.div>
  )
}
