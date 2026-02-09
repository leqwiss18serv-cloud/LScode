import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

export function useFiles(projectId) {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchFiles = async () => {
    if (!projectId) {
      setFiles([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('files')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true })

      if (error) throw error

      setFiles(data || [])
    } catch (error) {
      console.error('Error fetching files:', error)
      toast.error('Failed to load files')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFiles()
  }, [projectId])

  const createFile = async (name, fileType, content = '', path = null) => {
    try {
      const { data, error } = await supabase
        .from('files')
        .insert([
          {
            project_id: projectId,
            name,
            file_type: fileType,
            content,
            path,
          },
        ])
        .select()
        .single()

      if (error) throw error

      setFiles([...files, data])
      toast.success('File created successfully!')
      return { data, error: null }
    } catch (error) {
      toast.error('Failed to create file')
      return { data: null, error }
    }
  }

  const updateFile = async (fileId, updates) => {
    try {
      const { data, error } = await supabase
        .from('files')
        .update(updates)
        .eq('id', fileId)
        .select()
        .single()

      if (error) throw error

      setFiles(files.map((f) => (f.id === fileId ? data : f)))
      return { data, error: null }
    } catch (error) {
      toast.error('Failed to update file')
      return { data: null, error }
    }
  }

  const deleteFile = async (fileId) => {
    try {
      const { error } = await supabase
        .from('files')
        .delete()
        .eq('id', fileId)

      if (error) throw error

      setFiles(files.filter((f) => f.id !== fileId))
      toast.success('File deleted successfully!')
      return { error: null }
    } catch (error) {
      toast.error('Failed to delete file')
      return { error }
    }
  }

  return {
    files,
    loading,
    createFile,
    updateFile,
    deleteFile,
    refreshFiles: fetchFiles,
  }
}
