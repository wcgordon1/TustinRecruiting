const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');

const jobsDir = path.resolve(__dirname, '../src/content/jobs');

// Get all job files
const jobFiles = fs.readdirSync(jobsDir)
  .filter(file => file.endsWith('.md'));

console.log(`Found ${jobFiles.length} job files`);

// Process each job file
for (const file of jobFiles) {
  const filePath = path.join(jobsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const doc = matter(content);
  
  // Update salary unitText from HOUR to YEAR
  if (doc.data.baseSalary && doc.data.baseSalary.unitText === 'HOUR') {
    doc.data.baseSalary.unitText = 'YEAR';
    
    // Write back to file
    const updatedContent = matter.stringify(doc.content, doc.data);
    fs.writeFileSync(filePath, updatedContent);
    
    console.log(`Updated salary unit in ${file}`);
  }
}

console.log(`\nChecked ${jobFiles.length} job files`); 