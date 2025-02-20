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
        "role": "Chief Sustainability Officer",
        "category": "Executive Leadership",
        "level": "executive",
        "focus": "Overseeing corporate sustainability initiatives and ESG compliance"
      },
      {
        "role": "Chief People Officer",
        "category": "Executive Leadership",
        "level": "executive",
        "focus": "Leading talent strategy, employee engagement, and company culture"
      },
      {
        "role": "Director of Procurement",
        "category": "Executive Leadership",
        "level": "senior",
        "focus": "Managing supplier relationships and procurement strategy"
      },
      {
        "role": "Director of Investor Relations",
        "category": "Executive Leadership",
        "level": "senior",
        "focus": "Maintaining relationships with investors and handling financial communications"
      },
      {
        "role": "VP of Strategic Partnerships",
        "category": "Executive Leadership",
        "level": "executive",
        "focus": "Developing high-value partnerships and business alliances"
      },
      {
        "role": "Cryptocurrency Compliance Officer",
        "category": "Finance",
        "level": "senior",
        "focus": "Ensuring regulatory compliance for digital asset transactions"
      },
      {
        "role": "Sustainable Finance Manager",
        "category": "Finance",
        "level": "mid-level",
        "focus": "Developing financial strategies aligned with ESG goals"
      },
      {
        "role": "Smart City Infrastructure Engineer",
        "category": "Construction",
        "level": "senior",
        "focus": "Designing and implementing urban infrastructure solutions"
      },
      {
        "role": "Renewable Energy Project Manager",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Overseeing the development of solar and wind energy projects"
      },
      {
        "role": "Autonomous Vehicle Safety Engineer",
        "category": "Technology",
        "level": "senior",
        "focus": "Ensuring safety compliance for self-driving vehicle systems"
      },
      {
        "role": "E-commerce Growth Strategist",
        "category": "Sales",
        "level": "senior",
        "focus": "Developing and optimizing online sales strategies"
      },
      {
        "role": "Omnichannel Marketing Director",
        "category": "Sales",
        "level": "senior",
        "focus": "Integrating digital and physical retail marketing strategies"
      },
      {
        "role": "Director of Workplace Experience",
        "category": "Operations",
        "level": "senior",
        "focus": "Enhancing employee engagement and office efficiency"
      },
      {
        "role": "Chief Ethical AI Officer",
        "category": "Technology",
        "level": "executive",
        "focus": "Ensuring responsible AI development and deployment"
      },
      {
        "role": "Personalized Healthcare Data Analyst",
        "category": "Technology",
        "level": "mid-level",
        "focus": "Analyzing genetic and health data for tailored treatments"
      },
      {
        "role": "Blockchain Supply Chain Manager",
        "category": "Operations",
        "level": "senior",
        "focus": "Implementing blockchain for transparent supply chain management"
      },
      {
        "role": "Director of Remote Workforce Integration",
        "category": "Operations",
        "level": "senior",
        "focus": "Managing infrastructure and policies for remote teams"
      },
      {
        "role": "Neural Interface Engineer",
        "category": "Technology",
        "level": "senior",
        "focus": "Developing brain-machine interface technologies"
      },
      {
        "role": "Sustainable Packaging Specialist",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Developing eco-friendly packaging solutions"
      },
      {
        "role": "Green Building Consultant",
        "category": "Construction",
        "level": "senior",
        "focus": "Advising on sustainable construction practices"
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