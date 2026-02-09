/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vscode-bg': '#1e1e1e',
        'vscode-sidebar': '#252526',
        'vscode-titlebar': '#323233',
        'vscode-editor': '#1e1e1e',
        'vscode-border': '#454545',
        'vscode-input': '#3c3c3c',
        'vscode-button': '#0e639c',
        'vscode-button-hover': '#1177bb',
        'vscode-text': '#cccccc',
        'vscode-text-secondary': '#969696',
      },
      fontFamily: {
        'mono': ['Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
