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
        "role": "Construction Manager",
        "category": "Construction",
        "level": "senior",
        "focus": "Overseeing construction projects from planning to completion"
      },
      {
        "role": "Project Engineer",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Managing technical aspects of construction projects"
      },
      {
        "role": "Civil Engineer",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Designing and overseeing infrastructure projects"
      },
      {
        "role": "Structural Engineer",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Ensuring structural integrity of buildings and bridges"
      },
      {
        "role": "Mechanical Engineer",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Designing mechanical systems for buildings"
      },
      {
        "role": "Electrical Engineer",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Designing and maintaining electrical systems in construction"
      },
      {
        "role": "General Contractor",
        "category": "Construction",
        "level": "senior",
        "focus": "Managing and coordinating construction projects"
      },
      {
        "role": "Site Superintendent",
        "category": "Construction",
        "level": "senior",
        "focus": "Overseeing daily construction site operations"
      },
      {
        "role": "Estimator",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Calculating costs and budgets for construction projects"
      },
      {
        "role": "Surveyor",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Measuring land and defining construction boundaries"
      },
      {
        "role": "Electrician",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Installing and repairing electrical systems in buildings"
      },
      {
        "role": "Journeyman Electrician",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Performing advanced electrical installations and repairs"
      },
      {
        "role": "Master Electrician",
        "category": "Construction",
        "level": "senior",
        "focus": "Leading electrical projects and ensuring code compliance"
      },
      {
        "role": "Plumber",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Installing and maintaining plumbing systems"
      },
      {
        "role": "HVAC Technician",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Installing and servicing heating and cooling systems"
      },
      {
        "role": "Welder",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Joining metal parts in construction projects"
      },
      {
        "role": "Crane Operator",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Operating heavy cranes for lifting materials"
      },
      {
        "role": "Heavy Equipment Operator",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Operating machinery like bulldozers and excavators"
      },
      {
        "role": "Mason",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Building structures with brick, stone, and concrete"
      },
      {
        "role": "Carpenter",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Constructing and repairing wooden structures"
      },
      {
        "role": "Roofer",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Installing and repairing roofs on buildings"
      },
      {
        "role": "Drywall Installer",
        "category": "Construction",
        "level": "entry-level",
        "focus": "Installing drywall panels in buildings"
      },
      {
        "role": "Concrete Finisher",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Smoothing and finishing concrete surfaces"
      },
      {
        "role": "Demolition Worker",
        "category": "Construction",
        "level": "entry-level",
        "focus": "Safely tearing down buildings and structures"
      },
      {
        "role": "Glazier",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Installing and repairing glass in buildings"
      },
      {
        "role": "Steel Erector",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Assembling steel structures and frameworks"
      },
      {
        "role": "Construction Laborer",
        "category": "Construction",
        "level": "entry-level",
        "focus": "Performing general tasks on construction sites"
      },
      {
        "role": "Landscaper",
        "category": "Construction",
        "level": "entry-level",
        "focus": "Designing and maintaining outdoor spaces"
      },
      {
        "role": "Scaffolder",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Erecting and dismantling scaffolding for workers"
      },
      {
        "role": "Tiler",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Installing ceramic and stone tiles on surfaces"
      }
];

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const RESUMES_DIR = join(process.cwd(), 'src/data/resumes');

async function generateResume(position) {
  const systemPrompt = `You are a professional resume writer. Create a resume template for a ${position.role} position. 
  The resume should be focused on ${position.focus} and target a ${position.level} position.
  Include 3 relevant job experiences showing career progression from junior to current level.
  Use realistic company names, locations, and achievements specific to the ${position.role} role.`;

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
          content: `Create a detailed resume template with realistic placeholder data. Include 3 jobs showing progression from junior to current level, with specific achievements for a ${position.role}. 
          The most recent job should be current (2022-Present), with previous jobs having appropriate dates showing 5-6 years of experience.
          Return the response as JSON with this exact structure:
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
                  "title": "",
                  "company": "",
                  "location": "",
                  "dates": "Jan 2022 - Present",
                  "achievements": []
                },
                {
                  "title": "",
                  "company": "",
                  "location": "",
                  "dates": "Mar 2019 - Dec 2021",
                  "achievements": []
                },
                {
                  "title": "",
                  "company": "",
                  "location": "",
                  "dates": "Jun 2017 - Feb 2019",
                  "achievements": []
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