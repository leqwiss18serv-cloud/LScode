import { useEffect, useRef, useState } from 'react'

export default function PreviewPanel({ files, isVisible }) {
  const iframeRef = useRef(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isVisible || !iframeRef.current) return

    try {
      // Find HTML, CSS, and JS files
      const htmlFile = files.find((f) => f.name.endsWith('.html'))
      const cssFiles = files.filter((f) => f.name.endsWith('.css'))
      const jsFiles = files.filter((f) => f.name.endsWith('.js'))

      if (!htmlFile) {
        setError('No HTML file found. Create a .html file to see preview.')
        return
      }

      setError(null)

      let html = htmlFile.content || ''

      // Inject CSS
      if (cssFiles.length > 0) {
        const cssContent = cssFiles.map((f) => f.content || '').join('\n')
        const styleTag = `<style>${cssContent}</style>`
        if (html.includes('</head>')) {
          html = html.replace('</head>', `${styleTag}</head>`)
        } else {
          html = `${styleTag}${html}`
        }
      }

      // Inject JS
      if (jsFiles.length > 0) {
        const jsContent = jsFiles.map((f) => f.content || '').join('\n')
        const scriptTag = `<script>${jsContent}</script>`
        if (html.includes('</body>')) {
          html = html.replace('</body>', `${scriptTag}</body>`)
        } else {
          html = `${html}${scriptTag}`
        }
      }

      // Write to iframe
      const iframeDoc = iframeRef.current.contentDocument
      iframeDoc.open()
      iframeDoc.write(html)
      iframeDoc.close()
    } catch (err) {
      setError(`Preview error: ${err.message}`)
    }
  }, [files, isVisible])

  if (!isVisible) return null

  return (
    <div className="flex-1 bg-white flex flex-col">
      <div className="bg-vscode-titlebar border-b border-vscode-border px-4 py-2">
        <span className="text-vscode-text font-semibold">Preview</span>
      </div>
      {error ? (
        <div className="flex items-center justify-center h-full text-gray-600">
          {error}
        </div>
      ) : (
        <iframe
          ref={iframeRef}
          className="flex-1 w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin"
          title="Preview"
        />
      )}
    </div>
  )
}
