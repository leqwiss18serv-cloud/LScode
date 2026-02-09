# Quick Start Guide - LS Code

Get up and running with LS Code in 5 minutes!

## ⚡ For Users

### 1. Access LS Code
Visit your deployed LS Code URL (e.g., `https://lscode.pages.dev`)

### 2. Register (First Time)
- Click "Register"
- Enter username, email, and password
- Click "Create Account"

### 3. Create Your First Project
- Click "New Project"
- Name: "My First Website"
- Description: "Learning LS Code"
- Click "Create"

### 4. Create an HTML File
- Click "New File"
- Enter: `index.html`
- The editor opens with a template

### 5. Write Some Code
```html
<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Hello, LS Code! 🚀</h1>
    <p>This is my first web page.</p>
</body>
</html>
```

### 6. Save and Run
- Click "Save" button
- Click "Run" button
- See your page in the preview panel!

### 7. Add Styling
- Click "New File"
- Enter: `styles.css`
- Add CSS:
```css
body {
    background: linear-gradient(to right, #667eea, #764ba2);
    color: white;
    font-family: Arial, sans-serif;
    padding: 50px;
    text-align: center;
}

h1 {
    font-size: 3em;
    margin: 20px 0;
}
```

### 8. Link CSS and Run
Update your HTML:
```html
<head>
    <title>My First Page</title>
    <link rel="stylesheet" href="styles.css">
</head>
```

Click "Save" then "Run" - Beautiful! 🎨

## 🚀 For Developers

### Local Development

```bash
# Clone repository
git clone https://github.com/leqwiss18serv-cloud/LScode.git
cd LScode

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm run dev

# Open http://localhost:5173
```

### Deploy to Cloudflare Pages

```bash
# Build
npm run build

# Deploy
npx wrangler pages deploy dist --project-name=lscode
```

Or use the Cloudflare Dashboard (see DEPLOYMENT.md).

## 📚 Next Steps

### For Users
1. ✅ Created first project
2. ✅ Created HTML file
3. ✅ Added CSS styling
4. Next: Add JavaScript for interactivity
5. Next: Try creating images and other file types
6. Next: Build a complete website

### For Developers
1. ✅ Set up local environment
2. ✅ Built successfully
3. Next: Read CONTRIBUTING.md
4. Next: Explore the codebase
5. Next: Make your first contribution

## 🎯 Common Use Cases

### Build a Landing Page
1. Create `index.html` - structure
2. Create `styles.css` - design
3. Create `script.js` - interactions
4. Use Run to preview
5. Share with others!

### Learn Web Development
1. Experiment with HTML tags
2. Try different CSS properties
3. Add JavaScript functionality
4. See results immediately
5. No setup required!

### Quick Prototyping
1. Create project
2. Add files
3. Code and preview
4. Iterate rapidly
5. Export when ready

## 🆘 Getting Help

- 📖 Read the [User Guide](USER_GUIDE.md)
- 📘 Check the [README](README.md)
- 🐛 Report issues on GitHub
- 💬 Ask questions in discussions

## 🎉 You're Ready!

Start building amazing projects with LS Code!

Happy coding! 🚀✨
