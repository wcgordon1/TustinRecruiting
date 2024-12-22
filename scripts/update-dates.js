const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');

const jobsDir = path.resolve(__dirname, '../src/content/jobs');

// Get random date within last 2 days with random time
function getRandomDateInRange() {
  const now = new Date();
  const twoDaysAgo = new Date(now - 2 * 24 * 60 * 60 * 1000);
  
  // Get random timestamp between twoDaysAgo and now
  const randomTime = twoDaysAgo.getTime() + Math.random() * (now.getTime() - twoDaysAgo.getTime());
  
  // Create date with random hours, minutes, seconds
  const date = new Date(randomTime);
  date.setHours(
    Math.floor(Math.random() * 14) + 7, // Random hour between 7am and 9pm
    Math.floor(Math.random() * 60), // Random minutes
    Math.floor(Math.random() * 60), // Random seconds
    Math.floor(Math.random() * 1000) // Random milliseconds
  );
  
  return date;
}

// Get random number of days between 31-45
function getRandomValidDays() {
  return Math.floor(Math.random() * (45 - 31 + 1) + 31);
}

// Get all job files
const jobFiles = fs.readdirSync(jobsDir)
  .filter(file => file.endsWith('.md'));

console.log(`Found ${jobFiles.length} job files`);

// Process each job file
for (const file of jobFiles) {
  const filePath = path.join(jobsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const doc = matter(content);
  
  // Generate random datePosted in last 2 days
  const datePosted = getRandomDateInRange();
  
  // Calculate validThrough (31-45 days after datePosted)
  const validThrough = new Date(datePosted);
  validThrough.setDate(validThrough.getDate() + getRandomValidDays());
  
  // Update the frontmatter with millisecond precision
  doc.data.datePosted = datePosted.toISOString();
  doc.data.validThrough = validThrough.toISOString();
  
  // Write back to file
  const updatedContent = matter.stringify(doc.content, doc.data);
  fs.writeFileSync(filePath, updatedContent);
  
  console.log(`Updated ${file}:`);
  console.log(`  datePosted: ${doc.data.datePosted}`);
  console.log(`  validThrough: ${doc.data.validThrough}`);
}

console.log(`\nUpdated ${jobFiles.length} job files`);