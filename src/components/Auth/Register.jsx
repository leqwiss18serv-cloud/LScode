import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa'

export default function Register({ onSignUp, onSwitchToLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    await onSignUp(email, password, username)
    setLoading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="bg-vscode-sidebar p-8 rounded-lg border border-vscode-border shadow-xl">
        <h2 className="text-3xl font-bold text-vscode-text mb-6 text-center">
          Create Account
        </h2>
        <p className="text-vscode-text-secondary mb-8 text-center">
          Join LS Code today
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-vscode-text text-sm mb-2">
              Username
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vscode-text-secondary" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-vscode-input text-vscode-text pl-10 pr-4 py-3 rounded border border-vscode-border focus:border-vscode-button focus:outline-none"
                placeholder="johndoe"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-vscode-text text-sm mb-2">
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vscode-text-secondary" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-vscode-input text-vscode-text pl-10 pr-4 py-3 rounded border border-vscode-border focus:border-vscode-button focus:outline-none"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-vscode-text text-sm mb-2">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vscode-text-secondary" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-vscode-input text-vscode-text pl-10 pr-4 py-3 rounded border border-vscode-border focus:border-vscode-button focus:outline-none"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          </div>

          <div>
            <label className="block text-vscode-text text-sm mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vscode-text-secondary" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-vscode-input text-vscode-text pl-10 pr-4 py-3 rounded border border-vscode-border focus:border-vscode-button focus:outline-none"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-vscode-button hover:bg-vscode-button-hover text-white py-3 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-vscode-text-secondary text-center mt-6">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-vscode-button hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </motion.div>
  )
}
