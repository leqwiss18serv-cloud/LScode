# LS Code - Web Code Editor

A full-featured web-based code editor built with React, Monaco Editor, and Supabase. LS Code provides a VS Code-like experience in the browser with project management, multi-file editing, and live preview capabilities.

## Features

### 🎨 Modern Code Editor
- **Monaco Editor** integration - the same editor that powers VS Code
- Syntax highlighting for multiple programming languages (JavaScript, Python, HTML, CSS, and more)
- IntelliSense and auto-completion
- Customizable themes (VS Code dark theme by default)

### 📁 File Management
- Create and edit multiple files of different types
- Drag & drop support for image files (PNG, JPG, GIF, SVG)
- File tree navigation
- Auto-save functionality
- File icons based on file type

### 🚀 Code Execution & Preview
- Live preview panel for HTML/CSS/JS projects
- Run button to view execution results
- Sandboxed iframe for safe code execution
- Auto-update preview on code changes

### 📂 Project Management
- Create, view, and delete projects
- Project descriptions and metadata
- Multi-project support
- Project switching

### 🔐 User Authentication
- Secure user registration and login
- Email/password authentication via Supabase Auth
- Row-level security for data protection
- User-specific project isolation

### 🎯 UI/UX
- VS Code-inspired interface
- Dark theme optimized for coding
- Smooth animations with Framer Motion
- Responsive design for all screen sizes
- Toast notifications for user actions

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Monaco Editor** - Code editor component
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **React Dropzone** - File upload handling
- **React Hot Toast** - Toast notifications

### Backend & Database
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Authentication
  - Row Level Security (RLS)
  - Real-time subscriptions

### Deployment
- **Cloudflare Pages** - Static site hosting
- **GitHub Actions** - CI/CD (optional)

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- A Supabase account (free tier available)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/leqwiss18serv-cloud/LScode.git
cd LScode
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Supabase**

   a. Create a new project on [Supabase](https://supabase.com)
   
   b. Open the SQL Editor in your Supabase Dashboard
   
   c. Execute the following SQL script to set up the database:

   ```sql
   -- Enable UUID extension
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

   -- Create profiles table
   CREATE TABLE IF NOT EXISTS profiles (
     id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
     email TEXT UNIQUE NOT NULL,
     full_name TEXT,
     avatar_url TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
   );

   -- Create projects table
   CREATE TABLE IF NOT EXISTS projects (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
     name TEXT NOT NULL,
     description TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
   );

   -- Create files table
   CREATE TABLE IF NOT EXISTS files (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
     name TEXT NOT NULL,
     path TEXT DEFAULT '/' NOT NULL,
     type TEXT NOT NULL,
     content TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
     UNIQUE(project_id, name, path)
   );

   -- Enable Row Level Security
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
   ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
   ALTER TABLE files ENABLE ROW LEVEL SECURITY;

   -- Profiles policies
   CREATE POLICY "Users can view own profile"
     ON profiles FOR SELECT
     USING (auth.uid() = id);

   CREATE POLICY "Users can update own profile"
     ON profiles FOR UPDATE
     USING (auth.uid() = id);

   CREATE POLICY "Users can insert own profile"
     ON profiles FOR INSERT
     WITH CHECK (auth.uid() = id);

   -- Projects policies
   CREATE POLICY "Users can view own projects"
     ON projects FOR SELECT
     USING (auth.uid() = user_id);

   CREATE POLICY "Users can create own projects"
     ON projects FOR INSERT
     WITH CHECK (auth.uid() = user_id);

   CREATE POLICY "Users can update own projects"
     ON projects FOR UPDATE
     USING (auth.uid() = user_id);

   CREATE POLICY "Users can delete own projects"
     ON projects FOR DELETE
     USING (auth.uid() = user_id);

   -- Files policies
   CREATE POLICY "Users can view files in own projects"
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

   CREATE POLICY "Users can update files in own projects"
     ON files FOR UPDATE
     USING (
       EXISTS (
         SELECT 1 FROM projects
         WHERE projects.id = files.project_id
         AND projects.user_id = auth.uid()
       )
     );

   CREATE POLICY "Users can delete files in own projects"
     ON files FOR DELETE
     USING (
       EXISTS (
         SELECT 1 FROM projects
         WHERE projects.id = files.project_id
         AND projects.user_id = auth.uid()
       )
     );

   -- Create function to handle new user signup
   CREATE OR REPLACE FUNCTION public.handle_new_user()
   RETURNS TRIGGER AS $$
   BEGIN
     INSERT INTO public.profiles (id, email, full_name)
     VALUES (
       new.id,
       new.email,
       new.raw_user_meta_data->>'full_name'
     );
     RETURN new;
   END;
   $$ LANGUAGE plpgsql SECURITY DEFINER;

   -- Trigger to create profile on signup
   DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
   CREATE TRIGGER on_auth_user_created
     AFTER INSERT ON auth.users
     FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
   ```

   d. Verify that the tables were created successfully in the Table Editor
   
   e. Get your project credentials:
      - Go to Settings > API
      - Copy the `URL` and `anon/public` key

4. **Configure environment variables**

Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. **Start the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deploying to Cloudflare Pages

### Using Cloudflare Dashboard

1. Push your code to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com)
3. Create a new project
4. Connect your GitHub repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Environment variables**:
     - `VITE_SUPABASE_URL`: Your Supabase URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
6. Deploy!

### Using Wrangler CLI

```bash
npx wrangler pages deploy dist
```

## Project Structure

```
LScode/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── Auth/       # Authentication components
│   │   ├── Editor/     # Code editor components
│   │   ├── Layout/     # Layout components
│   │   └── Projects/   # Project management components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Third-party integrations
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main application component
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## Database Schema

### Tables

#### `profiles`
- User profile information
- Links to Supabase Auth users

#### `projects`
- User projects with name and description
- Tracks creation and update timestamps

#### `files`
- Project files with content
- Supports multiple file types
- Unique constraint on project_id + name + path

### Security

All tables use Row Level Security (RLS) to ensure users can only access their own data.

## Usage Guide

### Creating Your First Project

1. Register or sign in to LS Code
2. Click "New Project" button
3. Enter project name and optional description
4. Click "Create"

### Adding Files

1. Open a project
2. Click "New File" in the toolbar
3. Enter filename with extension (e.g., `index.html`, `script.js`)
4. Start coding!

### Running Code

1. Create an HTML file with your code
2. Add CSS and JS files as needed
3. Click the "Run" button to see the preview
4. Preview updates automatically as you edit

### Working with Images

1. Create a file with image extension (e.g., `logo.png`)
2. Drag and drop an image file onto the editor
3. The image will be displayed in the editor

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

## Roadmap

- [ ] File/folder organization with directories
- [ ] Code snippets and templates
- [ ] Collaborative editing (real-time)
- [ ] Version control integration
- [ ] Terminal emulation
- [ ] Extension support
- [ ] Multiple themes
- [ ] Import/export projects

## Acknowledgments

- Monaco Editor by Microsoft
- Supabase for backend infrastructure
- Tailwind CSS for styling utilities
- The React community
