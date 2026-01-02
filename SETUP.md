# Setup Guide: Supabase + Static Generation

This guide explains how to set up the database and run the migrated Korean Tutor app.

## Prerequisites

- Supabase account with a project created
- Environment variables already configured in `.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 1: Run the Schema in Supabase

1. **Open Supabase SQL Editor**:
   - Go to your Supabase project dashboard
   - Navigate to "SQL Editor" in the left sidebar

2. **Run the content schema**:
   - Copy the contents of `supabase-schema-content.sql`
   - Paste into a new query in the SQL Editor
   - Click "Run" to execute

3. **Verify tables were created**:
   - Go to "Table Editor" in the left sidebar
   - You should see 4 new tables:
     - `chapters`
     - `vocabulary`
     - `grammar_lessons`
     - `grammar_exercises`

## Step 2: Get Service Role Key

1. Go to Supabase project settings → API
2. Copy the `service_role` key (NOT the anon key)
3. Add to `.env.local`:
   ```
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

**IMPORTANT**: The service role key bypasses RLS. Never commit it to git or expose it client-side. Only use it for the seed script.

## Step 3: Run the Seed Script

```bash
# Install ts-node if you don't have it
npm install -D ts-node

# Run the seed script
npx ts-node scripts/seed-database.ts
```

You should see output like:
```
🌱 Starting database seed...
📚 Seeding chapters...
✅ Seeded 20 chapters
📝 Seeding vocabulary...
✅ Seeded 200 vocabulary words
📖 Seeding grammar lessons...
✅ Seeded 6 grammar lessons
✏️  Seeding grammar exercises...
✅ Seeded 20 grammar exercises
✅ ✅ ✅ Database seeding completed successfully! ✅ ✅ ✅
```

## Step 4: Verify Data in Supabase

1. Go to "Table Editor" in Supabase
2. Check each table has data:
   - `chapters`: 20 rows
   - `vocabulary`: 200 rows
   - `grammar_lessons`: 6 rows
   - `grammar_exercises`: 20 rows

## Step 5: Build and Test

```bash
# Clean build cache (important!)
rm -rf .next

# Build the app
npm run build

# Run locally
npm run dev
```

Visit `http://localhost:3000` and verify:
- Dashboard loads with vocabulary count
- Words page shows all 200 words
- Grammar page shows all 6 lessons
- Practice sessions work correctly

## How It Works

### Build Time vs Runtime

**Build Time** (runs once when deploying):
- Next.js fetches all content from Supabase
- Generates static HTML pages
- All vocabulary, grammar lessons, exercises pre-rendered

**Runtime** (every user visit):
- Static pages served instantly from CDN
- NO database queries for content
- User progress still uses Supabase (separate concern)

### Revalidation

When you add new content to Supabase:
1. Manually trigger a rebuild in Vercel dashboard
2. New build fetches updated content from Supabase
3. New static pages deployed

## Troubleshooting

### Build fails with "Error fetching vocabulary"
- Check Supabase URL and anon key in `.env.local`
- Verify tables exist in Supabase
- Check RLS is disabled on content tables

### Seed script fails with "Missing environment variables"
- Make sure `SUPABASE_SERVICE_ROLE_KEY` is in `.env.local`
- Use the service role key, not the anon key

### Pages show no data
- Verify seed script ran successfully
- Check Supabase Table Editor to confirm data exists
- Rebuild the app: `rm -rf .next && npm run build`

### TypeScript errors
- Run `npm install` to ensure all dependencies are installed
- Check that `@supabase/supabase-js` is installed

## Production Deployment

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Migrate to Supabase + static generation"
   git push
   ```

2. **Vercel will automatically rebuild** with new content from Supabase

3. **To update content later**:
   - Add/edit content in Supabase directly
   - Trigger manual rebuild in Vercel dashboard

## Free Tier Usage

With this setup:
- **Database size**: ~2 MB (well under 500 MB limit)
- **Build-time queries**: ~50 per build
- **Runtime queries**: 0 for content (only user progress)
- **Result**: Stays FREE indefinitely ✅

## Next Steps

- Add more vocabulary (Chapters 5-20)
- Add more grammar lessons
- Create admin panel for content management
- Set up webhook for automatic rebuilds on content changes
