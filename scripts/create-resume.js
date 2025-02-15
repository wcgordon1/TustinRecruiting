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
        "role": "Chief Executive Officer (CEO)",
        "category": "Executive Leadership",
        "level": "executive",
        "focus": "Overseeing overall business strategy and operations"
      },
      {
        "role": "Chief Operating Officer (COO)",
        "category": "Executive Leadership",
        "level": "executive",
        "focus": "Managing daily business operations and efficiency"
      },
      {
        "role": "Chief Financial Officer (CFO)",
        "category": "Executive Leadership",
        "level": "executive",
        "focus": "Overseeing financial planning, reporting, and strategy"
      },
      {
        "role": "Chief Technology Officer (CTO)",
        "category": "Executive Leadership",
        "level": "executive",
        "focus": "Driving technology strategy and innovation"
      },
      {
        "role": "Chief Information Officer (CIO)",
        "category": "Executive Leadership",
        "level": "executive",
        "focus": "Managing IT infrastructure and digital transformation"
      },
      {
        "role": "Chief Marketing Officer (CMO)",
        "category": "Executive Leadership",
        "level": "executive",
        "focus": "Leading marketing, branding, and customer engagement"
      },
      {
        "role": "Chief Revenue Officer (CRO)",
        "category": "Executive Leadership",
        "level": "executive",
        "focus": "Maximizing revenue generation across all sales channels"
      },
      {
        "role": "Chief Human Resources Officer (CHRO)",
        "category": "Executive Leadership",
        "level": "executive",
        "focus": "Managing talent acquisition, employee relations, and culture"
      },
      {
        "role": "Chief Product Officer (CPO)",
        "category": "Executive Leadership",
        "level": "executive",
        "focus": "Overseeing product development and innovation"
      },
      {
        "role": "Chief Customer Officer (CCO)",
        "category": "Executive Leadership",
        "level": "executive",
        "focus": "Ensuring customer satisfaction and loyalty"
      },
      {
        "role": "Chief Data Officer (CDO)",
        "category": "Executive Leadership",
        "level": "executive",
        "focus": "Managing data strategy, governance, and analytics"
      },
      {
        "role": "Chief Risk Officer (CRO)",
        "category": "Executive Leadership",
        "level": "executive",
        "focus": "Overseeing risk management and regulatory compliance"
      },
      {
        "role": "Chief Innovation Officer (CINO)",
        "category": "Executive Leadership",
        "level": "executive",
        "focus": "Driving innovation and new business opportunities"
      },
      {
        "role": "Chief Legal Officer (CLO)",
        "category": "Executive Leadership",
        "level": "executive",
        "focus": "Managing legal strategy and corporate compliance"
      },
      {
        "role": "Chief Strategy Officer (CSO)",
        "category": "Executive Leadership",
        "level": "executive",
        "focus": "Developing and executing long-term corporate strategy"
      },
      {
        "role": "Chief Communications Officer (CCO)",
        "category": "Executive Leadership",
        "level": "executive",
        "focus": "Managing corporate communication and public relations"
      },
      {
        "role": "Chief Experience Officer (CXO)",
        "category": "Executive Leadership",
        "level": "executive",
        "focus": "Enhancing customer and employee experience strategies"
      },
      {
        "role": "Chief Supply Chain Officer (CSCO)",
        "category": "Executive Leadership",
        "level": "executive",
        "focus": "Overseeing logistics, procurement, and supply chain strategy"
      },
      {
        "role": "General Manager",
        "category": "Executive Leadership",
        "level": "senior",
        "focus": "Managing business unit operations and profitability"
      },
      {
        "role": "Vice President of Sales",
        "category": "Executive Leadership",
        "level": "senior",
        "focus": "Leading sales teams and revenue growth strategies"
      },
      {
        "role": "Vice President of Marketing",
        "category": "Executive Leadership",
        "level": "senior",
        "focus": "Overseeing marketing campaigns and brand strategy"
      },
      {
        "role": "Vice President of Operations",
        "category": "Executive Leadership",
        "level": "senior",
        "focus": "Managing and optimizing business operations"
      },
      {
        "role": "Vice President of Finance",
        "category": "Executive Leadership",
        "level": "senior",
        "focus": "Leading financial strategy and budget planning"
      },
      {
        "role": "Vice President of Engineering",
        "category": "Executive Leadership",
        "level": "senior",
        "focus": "Overseeing engineering teams and product development"
      },
      {
        "role": "Vice President of Customer Success",
        "category": "Executive Leadership",
        "level": "senior",
        "focus": "Ensuring customer satisfaction and retention"
      },
      {
        "role": "Director of Business Development",
        "category": "Executive Leadership",
        "level": "senior",
        "focus": "Driving strategic partnerships and market expansion"
      },
      {
        "role": "Director of Product Management",
        "category": "Executive Leadership",
        "level": "senior",
        "focus": "Overseeing product lifecycle and innovation"
      },
      {
        "role": "Director of IT",
        "category": "Executive Leadership",
        "level": "senior",
        "focus": "Managing IT operations and security infrastructure"
      },
      {
        "role": "Director of Human Resources",
        "category": "Executive Leadership",
        "level": "senior",
        "focus": "Leading talent management and company culture initiatives"
      },
      {
        "role": "Director of Finance",
        "category": "Executive Leadership",
        "level": "senior",
        "focus": "Overseeing financial operations and risk management"
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