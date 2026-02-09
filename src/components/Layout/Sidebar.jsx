import { FaFolder, FaFile } from 'react-icons/fa'

export default function Sidebar({ activeView, onViewChange }) {
  const menuItems = [
    { id: 'projects', icon: FaFolder, label: 'Projects' },
    { id: 'editor', icon: FaFile, label: 'Editor' },
  ]

  return (
    <div className="bg-vscode-sidebar border-r border-vscode-border w-16 flex flex-col items-center py-4 gap-4">
      {menuItems.map((item) => {
        const Icon = item.icon
        return (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`p-3 rounded transition-colors ${
              activeView === item.id
                ? 'bg-vscode-input text-vscode-button'
                : 'text-vscode-text-secondary hover:text-vscode-text'
            }`}
            title={item.label}
          >
            <Icon size={20} />
          </button>
        )
      })}
    </div>
  )
}
