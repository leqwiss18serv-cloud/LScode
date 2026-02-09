-- LS Code Database Setup Script
-- Run this script in Supabase SQL Editor

-- 1. Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- 2. Create projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Projects policies
CREATE POLICY "Users can read own projects" 
  ON projects FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create projects" 
  ON projects FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" 
  ON projects FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" 
  ON projects FOR DELETE 
  USING (auth.uid() = user_id);

-- 3. Create files table
CREATE TABLE files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  content TEXT,
  file_type TEXT NOT NULL,
  path TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(project_id, name, path)
);

-- Enable Row Level Security for files
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- Files policies
CREATE POLICY "Users can read own project files" 
  ON files FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = files.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create files in own projects" 
  ON files FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = files.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own project files" 
  ON files FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = files.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own project files" 
  ON files FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = files.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- 4. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. Create triggers for automatic timestamp updates
CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON projects 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_files_updated_at 
  BEFORE UPDATE ON files 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Success message
SELECT 'Database setup completed successfully!' as status;
