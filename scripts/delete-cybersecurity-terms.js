const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');

async function deleteCybersecurityTerms() {
  const glossaryDir = path.join(process.cwd(), 'src/content/glossary');
  const files = await fs.readdir(glossaryDir);
  let deletedCount = 0;

  console.log('🔍 Scanning for cybersecurity terms...\n');

  for (const file of files) {
    if (!file.endsWith('.md')) continue;

    const filePath = path.join(glossaryDir, file);
    const content = await matter.read(filePath);

    if (content.data.vertical?.toLowerCase() === 'cybersecurity') {
      await fs.unlink(filePath);
      console.log(`🗑️  Deleted: ${file}`);
      deletedCount++;
    }
  }

  console.log(`\n✅ Deleted ${deletedCount} cybersecurity terms`);
}

deleteCybersecurityTerms().catch(console.error); 