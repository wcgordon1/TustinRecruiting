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
        "role": "Frontend Developer",
        "category": "Technology",
        "level": "mid-level",
        "focus": "Building user-facing web applications and interfaces"
      },
      {
        "role": "Backend Developer",
        "category": "Technology",
        "level": "mid-level",
        "focus": "Developing server-side logic and database interactions"
      },
      {
        "role": "Full Stack Developer",
        "category": "Technology",
        "level": "mid-level",
        "focus": "Working on both frontend and backend development"
      },
      {
        "role": "DevOps Engineer",
        "category": "Technology",
        "level": "senior",
        "focus": "Managing CI/CD pipelines and cloud infrastructure"
      },
      {
        "role": "Data Scientist",
        "category": "Technology",
        "level": "mid-level",
        "focus": "Analyzing data to extract insights and build predictive models"
      },
      {
        "role": "Data Engineer",
        "category": "Technology",
        "level": "mid-level",
        "focus": "Building and maintaining data pipelines and warehouses"
      },
      {
        "role": "Cybersecurity Analyst",
        "category": "Technology",
        "level": "mid-level",
        "focus": "Protecting systems and networks from cyber threats"
      },
      {
        "role": "Machine Learning Engineer",
        "category": "Technology",
        "level": "mid-level",
        "focus": "Developing and deploying machine learning models"
      },
      {
        "role": "Cloud Engineer",
        "category": "Technology",
        "level": "mid-level",
        "focus": "Designing and managing cloud-based infrastructure"
      },
      {
        "role": "AI Engineer",
        "category": "Technology",
        "level": "senior",
        "focus": "Building AI-powered applications and solutions"
      },
      {
        "role": "Blockchain Developer",
        "category": "Technology",
        "level": "mid-level",
        "focus": "Developing decentralized applications and smart contracts"
      },
      {
        "role": "IT Support Specialist",
        "category": "Technology",
        "level": "entry-level",
        "focus": "Providing technical support and troubleshooting IT issues"
      },
      {
        "role": "System Administrator",
        "category": "Technology",
        "level": "mid-level",
        "focus": "Managing servers, networks, and IT infrastructure"
      },
      {
        "role": "Network Engineer",
        "category": "Technology",
        "level": "mid-level",
        "focus": "Designing and maintaining computer networks"
      },
      {
        "role": "Database Administrator",
        "category": "Technology",
        "level": "mid-level",
        "focus": "Managing and optimizing databases"
      },
      {
        "role": "Business Intelligence Analyst",
        "category": "Technology",
        "level": "mid-level",
        "focus": "Using data to generate insights for business decisions"
      },
      {
        "role": "Product Manager",
        "category": "Technology",
        "level": "senior",
        "focus": "Defining product strategy and managing development"
      },
      {
        "role": "Scrum Master",
        "category": "Technology",
        "level": "mid-level",
        "focus": "Facilitating Agile development processes"
      },
      {
        "role": "UI/UX Designer",
        "category": "Technology",
        "level": "mid-level",
        "focus": "Designing user-friendly interfaces and experiences"
      },
      {
        "role": "QA Engineer",
        "category": "Technology",
        "level": "mid-level",
        "focus": "Testing software to ensure quality and reliability"
      },
      {
        "role": "Embedded Systems Engineer",
        "category": "Technology",
        "level": "senior",
        "focus": "Developing software for embedded devices"
      },
      {
        "role": "IoT Engineer",
        "category": "Technology",
        "level": "mid-level",
        "focus": "Building Internet of Things applications and systems"
      },
      {
        "role": "IT Project Manager",
        "category": "Technology",
        "level": "senior",
        "focus": "Overseeing technology projects and teams"
      },
      {
        "role": "Penetration Tester",
        "category": "Technology",
        "level": "mid-level",
        "focus": "Simulating cyberattacks to find security vulnerabilities"
      },
      {
        "role": "Robotics Engineer",
        "category": "Technology",
        "level": "senior",
        "focus": "Developing robotic systems and automation solutions"
      },
      {
        "role": "Site Reliability Engineer",
        "category": "Technology",
        "level": "mid-level",
        "focus": "Ensuring system reliability and uptime"
      },
      {
        "role": "IT Compliance Analyst",
        "category": "Technology",
        "level": "mid-level",
        "focus": "Ensuring regulatory compliance in IT operations"
      },
      {
        "role": "Solutions Architect",
        "category": "Technology",
        "level": "senior",
        "focus": "Designing scalable technical solutions"
      },
      {
        "role": "IT Security Consultant",
        "category": "Technology",
        "level": "senior",
        "focus": "Advising companies on cybersecurity best practices"
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