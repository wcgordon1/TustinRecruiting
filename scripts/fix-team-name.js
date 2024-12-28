const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');

const jobsDir = path.resolve(__dirname, '../src/content/jobs');

// Get all job files
const jobFiles = fs.readdirSync(jobsDir)
  .filter(file => file.endsWith('.md'));

console.log(`Found ${jobFiles.length} job files`);

let updatedCount = 0;

// Process each job file
for (const file of jobFiles) {
  const filePath = path.join(jobsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const doc = matter(content);
  
  // Check if team is 'Sofware' and update to 'Software'
  if (doc.data.team === 'Healthcare') {
    doc.data.team = 'Software';
    
    // Write back to file
    const updatedContent = matter.stringify(doc.content, doc.data);
    fs.writeFileSync(filePath, updatedContent);
    
    console.log(`Updated team name in ${file}`);
    updatedCount++;
  }
}

console.log(`\nUpdated ${updatedCount} files out of ${jobFiles.length} total files`); 