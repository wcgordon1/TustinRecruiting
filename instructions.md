# Google Indexing API Implementation for Job Postings

## Prerequisites Setup

1. **Google Search Console & API Setup** (Already Completed)
   - Site verified in Search Console ✓
   - Google Cloud Project created ✓
   - Service account credentials downloaded (electricianjobs-3fbbf4fd4ce5.json) ✓

2. **Project Structure Setup**
```bash
# Create necessary directories
mkdir -p scripts/config
mkdir -p scripts/logs

# Move credentials file to secure location
cp /Users/williamgordon/Downloads/electricianjobs-3fbbf4fd4ce5.json scripts/config/credentials.json

# Create required files
touch scripts/index-jobs.js
touch scripts/config/.env
touch scripts/logs/indexing.log
```

3. **Environment Setup**
```bash
# Install required packages
npm install googleapis dotenv gray-matter

# Add to package.json scripts
{
  "scripts": {
    "index-jobs": "node scripts/index-jobs.js"
  }
}
```

4. **Configure Environment Variables**
Add to scripts/config/.env:
```env
GOOGLE_APPLICATION_CREDENTIALS="./config/credentials.json"
SITE_URL="https://bestelectricianjobs.com"
JOBS_DIRECTORY="../content/jobs"
LOG_FILE="./logs/indexing.log"
```

## Implementation Steps

1. **Create Basic Script Structure**
File: scripts/index-jobs.js
```javascript
require('dotenv').config({ path: './config/.env' });
const { google } = require('googleapis');
const fs = require('fs');
const matter = require('gray-matter');
const path = require('path');

// Log function
const log = (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp}: ${message}\n`;
  fs.appendFileSync(process.env.LOG_FILE, logMessage);
  console.log(message);
};
```

2. **Add Job Reading Function**
```javascript
async function getRecentJobs() {
  const jobsDir = path.resolve(__dirname, process.env.JOBS_DIRECTORY);
  const files = fs.readdirSync(jobsDir);
  const today = new Date();
  const thirtyDaysAgo = new Date(today - 30 * 24 * 60 * 60 * 1000);

  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const content = fs.readFileSync(path.join(jobsDir, file), 'utf8');
      const { data } = matter(content);
      return {
        slug: file.replace('.md', ''),
        datePosted: new Date(data.datePosted),
        url: `${process.env.SITE_URL}/jobs/${file.replace('.md', '')}`
      };
    })
    .filter(job => job.datePosted > thirtyDaysAgo);
}
```

3. **Add Indexing Function**
```javascript
async function indexJobs() {
  try {
    // Auth setup
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const indexing = google.indexing({ version: 'v3', auth });
    const jobs = await getRecentJobs();

    for (const job of jobs) {
      try {
        const result = await indexing.urlNotifications.publish({
          requestBody: {
            url: job.url,
            type: 'URL_UPDATED'
          }
        });
        log(`Indexed: ${job.url} - Status: ${result.status}`);
      } catch (error) {
        log(`Error indexing ${job.url}: ${error.message}`);
      }
    }
  } catch (error) {
    log(`Fatal error: ${error.message}`);
  }
}
```

## Running the Script

1. **First Time Setup**
```bash
# Create directories and move files
mkdir -p scripts/config scripts/logs
cp /Users/williamgordon/Downloads/electricianjobs-3fbbf4fd4ce5.json scripts/config/credentials.json

# Install dependencies
npm install googleapis dotenv gray-matter
```

2. **Test Run**
```bash
# Run script manually
npm run index-jobs
```

3. **Check Results**
- Review scripts/logs/indexing.log
- Check Google Search Console for indexing status

## Security Notes
- ✓ Keep credentials.json secure and never commit it
- ✓ Add scripts/config/credentials.json to .gitignore
- ✓ Add scripts/config/.env to .gitignore
- ✓ Add scripts/logs/* to .gitignore

## Maintenance
- Run script manually after adding new jobs
- Check logs for any indexing errors
- Monitor Search Console for job indexing status

Would you like me to explain any part in more detail?




### added this first to test:
},
  "engines": {
    "node": "18.x"
  }
  <<< This seems to have worked... not sure why... going to test.


Vercel error: https://vercel.com/guides/serverless-function-contains-invalid-runtime-error

Yes, the plan remains the same even though the error message is older. Here's why:
You're running Node 20.17.0 locally, but your previous successful deployment was likely built with Node 18 by default on Vercel
The safest plan is still:

# Create .nvmrc to lock the version
echo "18.19.0" > .nvmrc

# Switch to Node 18
nvm install 18
nvm use 18

Why this makes sense:
Your project was working on Vercel hours ago (likely with Node 18)
Node 18 is still fully supported until 2025
This matches Vercel's recommended runtime
No code changes needed
Easily reversible
After switching:
Clear your node_modules and package-lock.json

rm -rf node_modules package-lock.json
npm install

install
2. Then redeploy on Vercel
This should get you back to a working state without any risk, since we know it was working hours ago with (presumably) Node 18.

getting this error: 

nvm install 18
nvm use 18
zsh: command not found: nvm
zsh: command not found: nvm