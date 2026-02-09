# Contributing to LS Code

Thank you for your interest in contributing to LS Code! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, inclusive, and constructive in all interactions.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser and OS information

### Suggesting Features

Feature requests are welcome! Please:
- Check existing issues first
- Describe the feature clearly
- Explain the use case
- Consider implementation complexity

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/leqwiss18serv-cloud/LScode.git
   cd LScode
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Make your changes**
   - Follow the code style
   - Add comments for complex logic
   - Update documentation if needed

5. **Test your changes**
   ```bash
   npm run dev
   # Test manually in browser
   npm run build
   # Verify build succeeds
   ```

6. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: description of changes"
   ```

7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- A code editor (VS Code recommended)

### Local Development

1. Clone and install:
   ```bash
   git clone https://github.com/leqwiss18serv-cloud/LScode.git
   cd LScode
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173

### Project Structure

```
src/
├── components/     # React components
│   ├── Auth/      # Authentication components
│   ├── Editor/    # Code editor components
│   ├── Layout/    # Layout components
│   └── Projects/  # Project management
├── hooks/         # Custom React hooks
├── lib/           # Third-party integrations
├── utils/         # Utility functions
├── App.jsx        # Main component
└── main.jsx       # Entry point
```

## Code Style Guidelines

### JavaScript/React
- Use functional components with hooks
- Use arrow functions for component definitions
- Destructure props
- Use meaningful variable names
- Keep components focused and small

Example:
```jsx
export default function MyComponent({ data, onAction }) {
  const [state, setState] = useState(null)
  
  const handleClick = () => {
    // Do something
  }
  
  return (
    <div>
      {/* Component content */}
    </div>
  )
}
```

### CSS/Tailwind
- Use Tailwind utility classes
- Follow mobile-first approach
- Use VS Code color scheme variables
- Keep custom CSS minimal

Example:
```jsx
<div className="bg-vscode-bg text-vscode-text p-4 rounded-lg">
  Content
</div>
```

### Commits
Use conventional commit messages:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Build/tooling changes

Example: `feat: add file search functionality`

## Areas for Contribution

### High Priority
- [ ] File/folder organization with directories
- [ ] Keyboard shortcuts
- [ ] Better error handling
- [ ] Loading states and animations
- [ ] Mobile responsiveness improvements

### Medium Priority
- [ ] Code snippets library
- [ ] Multiple editor themes
- [ ] Export/import projects
- [ ] Settings panel
- [ ] User profile customization

### Advanced Features
- [ ] Real-time collaboration
- [ ] Terminal emulation
- [ ] Version control integration
- [ ] Extension system
- [ ] Code formatting tools

## Testing

Currently, LS Code relies on manual testing. Contributions to add automated testing are welcome!

### Manual Testing Checklist
- [ ] User registration
- [ ] User login/logout
- [ ] Create project
- [ ] Delete project
- [ ] Create file
- [ ] Edit file
- [ ] Delete file
- [ ] Save changes
- [ ] Run preview
- [ ] Drag & drop images
- [ ] File tree navigation

## Documentation

When contributing:
- Update README.md if needed
- Add JSDoc comments to functions
- Update DEPLOYMENT.md for deployment changes
- Create/update examples

## Questions?

- Open an issue for questions
- Check existing issues and PRs
- Review the README.md

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Thank You!

Every contribution helps make LS Code better for everyone! 🎉
