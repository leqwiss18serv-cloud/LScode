/**
 * Get file icon based on file type
 */
export const getFileIcon = (fileName) => {
  const ext = fileName.split('.').pop().toLowerCase()
  
  const iconMap = {
    js: '📄',
    jsx: '⚛️',
    ts: '📘',
    tsx: '⚛️',
    py: '🐍',
    html: '🌐',
    css: '🎨',
    json: '📋',
    md: '📝',
    txt: '📄',
    png: '🖼️',
    jpg: '🖼️',
    jpeg: '🖼️',
    gif: '🖼️',
    svg: '🖼️',
    pdf: '📕',
    zip: '📦',
  }

  return iconMap[ext] || '📄'
}

/**
 * Get language for Monaco Editor
 */
export const getLanguage = (fileName) => {
  const ext = fileName.split('.').pop().toLowerCase()
  
  const languageMap = {
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
    py: 'python',
    html: 'html',
    css: 'css',
    json: 'json',
    md: 'markdown',
    txt: 'plaintext',
    xml: 'xml',
    sql: 'sql',
    sh: 'shell',
  }

  return languageMap[ext] || 'plaintext'
}

/**
 * Check if file is an image
 */
export const isImageFile = (fileName) => {
  const ext = fileName.split('.').pop().toLowerCase()
  return ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(ext)
}

/**
 * Check if file is executable/previewable
 */
export const isPreviewable = (fileName) => {
  const ext = fileName.split('.').pop().toLowerCase()
  return ['html', 'htm'].includes(ext)
}

/**
 * Get default file content based on type
 */
export const getDefaultContent = (fileName) => {
  const ext = fileName.split('.').pop().toLowerCase()
  
  const templates = {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello World!</h1>
</body>
</html>`,
    css: `/* Your styles here */
body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}`,
    js: `// Your JavaScript code here
console.log('Hello World!');`,
    py: `# Your Python code here
print("Hello World!")`,
    md: `# Title

Your markdown content here...`,
  }

  return templates[ext] || ''
}
