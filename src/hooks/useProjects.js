import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

export function useProjects(userId) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })

      if (error) throw error

      setProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userId) {
      fetchProjects()
    }
  }, [userId])

  const createProject = async (name, description = '') => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            user_id: userId,
            name,
            description,
          },
        ])
        .select()
        .single()

      if (error) throw error

      setProjects([data, ...projects])
      toast.success('Project created successfully!')
      return { data, error: null }
    } catch (error) {
      toast.error('Failed to create project')
      return { data: null, error }
    }
  }

  const updateProject = async (projectId, updates) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', projectId)
        .select()
        .single()

      if (error) throw error

      setProjects(projects.map((p) => (p.id === projectId ? data : p)))
      toast.success('Project updated successfully!')
      return { data, error: null }
    } catch (error) {
      toast.error('Failed to update project')
      return { data: null, error }
    }
  }

  const deleteProject = async (projectId) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)

      if (error) throw error

      setProjects(projects.filter((p) => p.id !== projectId))
      toast.success('Project deleted successfully!')
      return { error: null }
    } catch (error) {
      toast.error('Failed to delete project')
      return { error }
    }
  }

  return {
    projects,
    loading,
    createProject,
    updateProject,
    deleteProject,
    refreshProjects: fetchProjects,
  }
}
