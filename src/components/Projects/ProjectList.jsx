import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlus, FaCode } from 'react-icons/fa'
import ProjectCard from './ProjectCard'
import CreateProject from './CreateProject'

export default function ProjectList({ projects, loading, onCreateProject, onSelectProject, onDeleteProject }) {
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await onDeleteProject(projectId)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-vscode-bg">
        <div className="text-vscode-text text-xl">Loading projects...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-vscode-bg">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-vscode-text mb-2">
              My Projects
            </h1>
            <p className="text-vscode-text-secondary">
              {projects.length} {projects.length === 1 ? 'project' : 'projects'}
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-vscode-button hover:bg-vscode-button-hover text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <FaPlus /> New Project
          </button>
        </div>

        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <FaCode className="text-6xl text-vscode-text-secondary mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-vscode-text mb-4">
              No projects yet
            </h2>
            <p className="text-vscode-text-secondary mb-8">
              Create your first project to get started
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-vscode-button hover:bg-vscode-button-hover text-white px-8 py-3 rounded-lg font-medium inline-flex items-center gap-2 transition-colors"
            >
              <FaPlus /> Create Project
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={onSelectProject}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showCreateModal && (
          <CreateProject
            onCreate={onCreateProject}
            onClose={() => setShowCreateModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
