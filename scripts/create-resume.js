import OpenAI from 'openai';
import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: join(__dirname, 'config', '.env.local') });

const RESUMES_TO_BUILD = [
  {
    role: "UX Designer",
    category: "creative",
    level: "mid-level",
    focus: "User research and interface design"
  },
  {
    role: "Sales Engineer",
    category: "sales",
    level: "mid-level",
    focus: "Technical sales and solution architecture"
  }
];

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const RESUMES_DIR = join(process.cwd(), 'src/data/resumes');

async function generateResume(position) {
  const systemPrompt = `You are a professional resume writer. Create a resume template for a ${position.role} position. 
  The resume should be focused on ${position.focus} and target a ${position.level} position.
  Return the response as a JSON object matching the exact structure provided.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: systemPrompt 
        },
        {
          role: "user",
          content: `Create a detailed resume template with realistic placeholder data. Return the response as JSON with this exact structure:
          {
            "metadata": {
              "title": "${position.role} Resume Template",
              "description": "A professional resume template tailored for ${position.role} positions, highlighting technical skills and project experience",
              "category": "${position.category}",
              "role": "${position.role}",
              "slug": "${position.role.toLowerCase().replace(/\s+/g, '-')}",
              "experience_level": "${position.level}",
              "keywords": ["keyword1", "keyword2"],
              "last_updated": "${new Date().toISOString().split('T')[0]}"
            },
            "template_tips": [
              "Focus on specific achievements",
              "Include metrics and impact where possible",
              "Highlight both technical and soft skills",
              "Keep it to one page unless you have 10+ years of experience"
            ],
            "resume_content": {
              "header": {
                "name": "[Your Full Name]",
                "title": "${position.role}",
                "contact": {
                  "email": "your.email@example.com",
                  "phone": "(555) 555-5555",
                  "location": "City, State",
                  "linkedin": "linkedin.com/in/yourprofile",
                  "github": "github.com/yourusername"
                }
              },
              "summary": "Results-driven professional with experience in ${position.focus}. Proven track record of delivering high-quality solutions and optimizing performance.",
              "skills": {
                "languages": [],
                "frameworks": [],
                "tools": [],
                "concepts": []
              },
              "experience": [
                {
                  "title": "Senior ${position.role}",
                  "company": "Company Name",
                  "location": "City, State",
                  "dates": "Jan 2022 - Present",
                  "achievements": [
                    "Achievement 1",
                    "Achievement 2",
                    "Achievement 3"
                  ]
                }
              ],
              "education": {
                "degree": "B.S. Relevant Degree",
                "school": "University Name",
                "location": "City, State",
                "graduation": "2019"
              },
              "projects": [
                {
                  "name": "Project Name",
                  "description": "Project description",
                  "technologies": ["Tech1", "Tech2", "Tech3"]
                }
              ]
            }
          }`
        }
      ],
      response_format: { type: "json_object" }
    });

    let resumeData;
    try {
      resumeData = JSON.parse(completion.choices[0].message.content);
      console.log('Parsed resume data successfully');
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      console.log('Raw response:', completion.choices[0].message.content);
      throw parseError;
    }

    // Ensure metadata is consistent
    resumeData.metadata.category = position.category;
    resumeData.metadata.experience_level = position.level;
    resumeData.metadata.slug = position.role.toLowerCase().replace(/\s+/g, '-');
    resumeData.metadata.last_updated = new Date().toISOString().split('T')[0];
    
    const filename = `${resumeData.metadata.slug}.json`;
    const filePath = join(RESUMES_DIR, filename);

    await fs.writeFile(filePath, JSON.stringify(resumeData, null, 2));
    console.log('Created resume template:', filePath);

    return resumeData;
  } catch (error) {
    console.error('Error generating resume:', error);
    if (error.response) {
      console.error('OpenAI API Error:', error.response.data);
    }
    throw error;
  }
}

async function generateAllResumes() {
  for (const position of RESUMES_TO_BUILD) {
    console.log('\nGenerating resume for', position.role);
    try {
      await generateResume(position);
      console.log('Waiting 3 seconds before next resume...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (error) {
      console.error('Failed to generate resume for', position.role, ':', error.message);
    }
  }
}

generateAllResumes().catch(console.error); 