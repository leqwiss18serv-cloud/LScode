import { FaCode, FaSignOutAlt, FaUser } from 'react-icons/fa'

export default function Header({ user, onSignOut }) {
  return (
    <header className="bg-vscode-titlebar border-b border-vscode-border px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaCode className="text-vscode-button text-2xl" />
          <h1 className="text-xl font-bold text-vscode-text">LS Code</h1>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-vscode-text">
              <FaUser className="text-vscode-text-secondary" />
              <span>{user.email}</span>
            </div>
            <button
              onClick={onSignOut}
              className="text-vscode-text-secondary hover:text-vscode-text transition-colors flex items-center gap-2"
            >
              <FaSignOutAlt /> Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
