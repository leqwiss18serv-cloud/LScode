# LS Code User Guide

Welcome to LS Code! This guide will help you get started with using the web code editor.

## Table of Contents
1. [Getting Started](#getting-started)
2. [Authentication](#authentication)
3. [Projects](#projects)
4. [Files](#files)
5. [Code Editor](#code-editor)
6. [Preview](#preview)
7. [Tips & Tricks](#tips--tricks)

## Getting Started

### First Time Setup

1. **Visit LS Code**
   - Navigate to your deployed LS Code URL or local instance
   - You'll see the login screen

2. **Create an Account**
   - Click "Register" on the login page
   - Enter your username, email, and password
   - Password must be at least 6 characters
   - Click "Create Account"

3. **Sign In**
   - Enter your email and password
   - Click "Sign In"

## Authentication

### Registration
- **Username**: Unique identifier (letters, numbers, underscore)
- **Email**: Valid email address
- **Password**: Minimum 6 characters (recommend 8+ with mix of characters)

### Login
- Use your registered email and password
- Stay signed in until you manually sign out

### Sign Out
- Click your email in the top right
- Click "Sign Out"

## Projects

### Creating a Project

1. Click the **"New Project"** button
2. Enter a **project name** (required)
3. Add a **description** (optional but recommended)
4. Click **"Create"**

Your project is now created and you'll see it in the project list.

### Opening a Project

- Click on any project card to open it
- The editor interface will load with your project files

### Deleting a Project

1. Find the project in your project list
2. Click the **trash icon** on the project card
3. Confirm the deletion

⚠️ **Warning**: Deleting a project is permanent and will delete all files.

## Files

### Creating a New File

1. Open a project
2. Click the **"New File"** button in the toolbar
3. Enter the filename with extension (e.g., `index.html`, `script.js`, `styles.css`)
4. The file will be created with default content based on type

### Supported File Types

#### Code Files
- **HTML** (`.html`, `.htm`) - Web pages
- **CSS** (`.css`) - Stylesheets
- **JavaScript** (`.js`) - Scripts
- **Python** (`.py`) - Python code
- **JSON** (`.json`) - Data files
- **Markdown** (`.md`) - Documentation
- **TypeScript** (`.ts`, `.tsx`) - TypeScript code

#### Image Files
- **PNG** (`.png`)
- **JPEG** (`.jpg`, `.jpeg`)
- **GIF** (`.gif`)
- **SVG** (`.svg`)

### Selecting a File

- Click on any file in the **file tree** (left sidebar)
- The file will open in the editor

### Editing a File

1. Select the file from the file tree
2. Edit the content in the Monaco Editor
3. Changes are tracked automatically
4. Click **"Save"** to save changes

### Deleting a File

1. Hover over the file in the file tree
2. Click the **trash icon** that appears
3. Confirm the deletion

## Code Editor

### Features

- **Syntax Highlighting**: Automatic based on file type
- **Auto-completion**: IntelliSense for JavaScript and TypeScript
- **Line Numbers**: Always visible
- **Minimap**: Code overview on the right side
- **Word Wrap**: Long lines wrap automatically

### Keyboard Shortcuts

Standard editor shortcuts work:
- `Ctrl+S` / `Cmd+S` - Save file (triggers save button)
- `Ctrl+F` / `Cmd+F` - Find in file
- `Ctrl+Z` / `Cmd+Z` - Undo
- `Ctrl+Y` / `Cmd+Y` - Redo
- `Ctrl+/` / `Cmd+/` - Toggle comment

### Working with Images

1. Create a file with image extension (e.g., `logo.png`)
2. **Drag and drop** an image file onto the editor
   - OR click the editor area to browse files
3. The image will be uploaded and displayed
4. Click **"Save"** to save the image to your project

## Preview

### Running Your Code

1. Create an `index.html` file with your HTML code
2. (Optional) Create `.css` and `.js` files
3. Click the **"Run"** button in the toolbar
4. The preview panel opens on the right side

### How Preview Works

- Automatically injects CSS files into HTML `<head>`
- Automatically injects JS files before closing `</body>`
- Runs in a sandboxed iframe for security
- Updates when you save and click Run again

### Preview Example

**index.html**
```html
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Hello World!</h1>
    <p>Welcome to LS Code</p>
</body>
</html>
```

**styles.css**
```css
body {
    background: #1e1e1e;
    color: white;
    font-family: Arial;
}
```

**script.js**
```javascript
console.log('Page loaded!');
```

Click "Run" to see your page rendered!

## Tips & Tricks

### Organization
- Use descriptive filenames
- Keep related files together
- Add project descriptions for easy identification

### Performance
- Save your work frequently
- Close unused projects
- Don't create extremely large files in browser

### File Templates

When you create a new file, LS Code provides default templates:

- **HTML**: Basic HTML5 template
- **CSS**: Comment header
- **JavaScript**: Console.log example
- **Python**: Print example
- **Markdown**: Title and content structure

### Best Practices

1. **Save Often**: Click Save after making changes
2. **Test Regularly**: Use Run button to test HTML/CSS/JS
3. **Use Meaningful Names**: `homepage.html` not `file1.html`
4. **One Project Per Task**: Keep projects focused
5. **Add Descriptions**: Help future you remember what projects are for

### Troubleshooting

#### Preview Not Working
- Make sure you have an `index.html` file
- Check browser console for errors
- Verify your HTML is valid

#### File Won't Save
- Check your internet connection
- Try refreshing the page
- Contact support if issue persists

#### Can't Create File
- Make sure filename includes extension (`.html`, `.js`, etc.)
- Avoid special characters in filenames
- Each project+filename must be unique

#### Lost Work
- All saves go to Supabase database
- Your work persists across sessions
- Make sure to click Save before closing

## Keyboard Shortcuts Reference

| Action | Windows/Linux | Mac |
|--------|--------------|-----|
| Save | `Ctrl+S` | `Cmd+S` |
| Find | `Ctrl+F` | `Cmd+F` |
| Replace | `Ctrl+H` | `Cmd+H` |
| Undo | `Ctrl+Z` | `Cmd+Z` |
| Redo | `Ctrl+Y` | `Cmd+Y` |
| Comment | `Ctrl+/` | `Cmd+/` |
| Select All | `Ctrl+A` | `Cmd+A` |
| Copy | `Ctrl+C` | `Cmd+C` |
| Paste | `Ctrl+V` | `Cmd+V` |

## Support

Need help?
- Check this user guide
- Review the README.md
- Open an issue on GitHub
- Contact the development team

## What's Next?

Now that you know the basics:
1. Create your first project
2. Build a simple HTML page
3. Add some CSS styling
4. Add JavaScript interactivity
5. Use the preview to see results
6. Share your creations!

Happy coding! 🚀
