import { promises as fs } from 'node:fs';
import { join } from 'node:path';

export async function getResumes() {
  const resumesDir = join(process.cwd(), 'src/data/resumes');
  console.log('Looking for resumes in:', resumesDir);
  const resumes = [];

  try {
    const entries = await fs.readdir(resumesDir);
    console.log('Found files:', entries);
    
    for (const entry of entries) {
      if (entry.endsWith('.json')) {
        try {
          const fullPath = join(resumesDir, entry);
          const content = await fs.readFile(fullPath, 'utf-8');
          const data = JSON.parse(content);
          
          if (data?.metadata?.category && data?.metadata?.slug) {
            console.log('Processing resume:', data.metadata.category, data.metadata.slug);
            resumes.push(data);
          } else {
            console.error(`Missing required metadata in ${entry}`);
          }
        } catch (parseError) {
          console.error(`Error parsing ${entry}:`, parseError);
        }
      }
    }

    console.log('Total valid resumes found:', resumes.length);
  } catch (error) {
    console.error('Error reading resumes directory:', error);
  }

  return resumes;
} 