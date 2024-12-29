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
  
  if (doc.content) {
    // Clean the markdown content but keep original content intact
    const plainDescription = doc.content
      .replace(/[#*`]/g, '') // Remove markdown symbols
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links but keep text
      .replace(/[_~]/g, '') // Remove underscores and strikethroughs
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .replace(/\s+/g, ' ') // Normalize spaces
      .replace(/[>|-]/g, '') // Remove blockquotes and list markers
      .trim();
    
    // Update only the description in frontmatter
    doc.data.description = plainDescription;
    
    // Write back to file with original markdown content preserved
    const updatedContent = matter.stringify(doc.content, doc.data);
    fs.writeFileSync(filePath, updatedContent);
    
    console.log(`Updated description in ${file}`);
    updatedCount++;
  }
}

console.log(`\nUpdated ${updatedCount} files out of ${jobFiles.length} total files`); 