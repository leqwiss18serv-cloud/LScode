# Deployment Guide for LS Code

This guide covers deploying LS Code to Cloudflare Pages.

## Prerequisites

1. A GitHub account with the repository
2. A Cloudflare account (free tier works)
3. Supabase project set up with credentials

## Step-by-Step Deployment

### 1. Prepare Your Supabase Database

Before deploying, ensure your Supabase database is set up:

1. Log in to [Supabase](https://supabase.com)
2. Create a new project or use an existing one
3. Navigate to the SQL Editor
4. Copy and paste the contents of `SUPABASE_SETUP.sql`
5. Run the script to create all tables and policies
6. Verify the tables were created in the Table Editor

### 2. Get Supabase Credentials

1. In your Supabase project, go to **Settings** > **API**
2. Copy the following:
   - **Project URL** (something like `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### 3. Deploy to Cloudflare Pages

#### Option A: Using Cloudflare Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Create Cloudflare Pages Project**
   - Go to [Cloudflare Pages](https://dash.cloudflare.com/pages)
   - Click **Create a project**
   - Click **Connect to Git**
   - Select your GitHub repository: `leqwiss18serv-cloud/LScode`
   - Authorize Cloudflare to access your repository

3. **Configure Build Settings**
   - **Project name**: `lscode` (or your preferred name)
   - **Production branch**: `main`
   - **Framework preset**: Select `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`

4. **Add Environment Variables**
   Click **Environment variables** and add:
   - **Variable name**: `VITE_SUPABASE_URL`
     - **Value**: Your Supabase project URL
   - **Variable name**: `VITE_SUPABASE_ANON_KEY`
     - **Value**: Your Supabase anon key

5. **Deploy**
   - Click **Save and Deploy**
   - Wait for the build to complete (usually 2-3 minutes)
   - Your site will be live at `https://lscode.pages.dev` (or your custom domain)

#### Option B: Using Wrangler CLI

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Deploy**
   ```bash
   npx wrangler pages deploy dist --project-name=lscode
   ```

5. **Set Environment Variables**
   After first deployment, go to the Cloudflare dashboard and add environment variables as described above.

### 4. Custom Domain (Optional)

1. In Cloudflare Pages dashboard, go to your project
2. Navigate to **Custom domains**
3. Click **Set up a custom domain**
4. Follow the instructions to add your domain
5. DNS will be automatically configured if domain is on Cloudflare

## Post-Deployment

### Verify Deployment

1. Visit your deployed URL
2. Test user registration
3. Create a test project
4. Create and edit files
5. Test the preview functionality

### Common Issues

#### Build Fails
- Check that all environment variables are set correctly
- Verify build command is `npm run build`
- Verify output directory is `dist`

#### Authentication Not Working
- Verify Supabase URL and key are correct
- Check Supabase project is active
- Verify database tables were created correctly

#### Preview Not Working
- This is normal if no HTML file exists
- Create an `index.html` file in your project
- Click Run to see the preview

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | `https://xxxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | `eyJhbGc...` |

## Monitoring and Maintenance

### View Deployment Logs
1. Go to Cloudflare Pages dashboard
2. Select your project
3. Click on a deployment
4. View build logs and function logs

### Redeploy
- Cloudflare automatically redeploys on every push to your production branch
- For manual redeploy, go to deployments and click **Retry deployment**

### Rollback
1. Go to deployments
2. Find a previous successful deployment
3. Click the three dots menu
4. Select **Rollback to this deployment**

## Production Checklist

Before going live with LS Code:

- [ ] Database setup completed
- [ ] Environment variables configured
- [ ] Test user registration and login
- [ ] Test project creation and deletion
- [ ] Test file operations (create, edit, delete)
- [ ] Test preview functionality
- [ ] Test on mobile devices
- [ ] Set up custom domain (optional)
- [ ] Configure Supabase Auth settings for production
- [ ] Review Supabase RLS policies
- [ ] Set up monitoring/analytics (optional)

## Updating Your Deployment

To update your live site:

1. Make changes to your code
2. Test locally with `npm run dev`
3. Commit changes: `git commit -am "Description of changes"`
4. Push to GitHub: `git push origin main`
5. Cloudflare automatically rebuilds and deploys

## Support

For deployment issues:
- Cloudflare Pages: [Documentation](https://developers.cloudflare.com/pages/)
- Supabase: [Documentation](https://supabase.com/docs)
- GitHub Issues: Report issues in the repository
