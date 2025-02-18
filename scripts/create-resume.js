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
        "role": "Global Logistics Manager",
        "category": "Operations",
        "level": "senior",
        "focus": "Overseeing international supply chain logistics and freight operations"
      },
      {
        "role": "Director of Manufacturing Operations",
        "category": "Operations",
        "level": "senior",
        "focus": "Leading production processes and factory efficiency"
      },
      {
        "role": "Director of Supply Chain Optimization",
        "category": "Operations",
        "level": "senior",
        "focus": "Enhancing supply chain efficiency and cost-effectiveness"
      },
      {
        "role": "Food Safety Manager",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Ensuring compliance with food safety regulations and quality control"
      },
      {
        "role": "Director of Customer Experience",
        "category": "Operations",
        "level": "senior",
        "focus": "Optimizing customer service operations and satisfaction strategies"
      },
      {
        "role": "Construction Safety Manager",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Developing and enforcing workplace safety regulations on construction sites"
      },
      {
        "role": "Underground Utility Supervisor",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Managing underground utility installation and maintenance projects"
      },
      {
        "role": "Solar Panel Installer",
        "category": "Construction",
        "level": "entry-level",
        "focus": "Installing and maintaining solar energy systems"
      },
      {
        "role": "Highway Engineer",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Designing and overseeing highway and road infrastructure projects"
      },
      {
        "role": "Wind Turbine Technician",
        "category": "Construction",
        "level": "entry-level",
        "focus": "Maintaining and repairing wind energy turbines"
      },
      {
        "role": "Geotechnical Engineer",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Analyzing soil and rock mechanics for construction projects"
      },
      {
        "role": "Environmental Engineer",
        "category": "Construction",
        "level": "mid-level",
        "focus": "Developing solutions for environmental sustainability in construction"
      },
      {
        "role": "Director of Risk and Compliance",
        "category": "Finance",
        "level": "senior",
        "focus": "Ensuring regulatory compliance and managing financial risks"
      },
      {
        "role": "Head of Investor Relations",
        "category": "Finance",
        "level": "executive",
        "focus": "Managing communication with investors and financial stakeholders"
      },
      {
        "role": "Bank Compliance Officer",
        "category": "Finance",
        "level": "mid-level",
        "focus": "Monitoring banking operations for compliance with financial regulations"
      },
      {
        "role": "Commercial Loan Officer",
        "category": "Finance",
        "level": "mid-level",
        "focus": "Evaluating and approving commercial loan applications"
      },
      {
        "role": "Equity Trader",
        "category": "Finance",
        "level": "mid-level",
        "focus": "Executing buy and sell orders for stocks and securities"
      },
      {
        "role": "Derivatives Analyst",
        "category": "Finance",
        "level": "mid-level",
        "focus": "Analyzing financial derivatives and risk exposure"
      },
      {
        "role": "VP of Corporate Development",
        "category": "Finance",
        "level": "executive",
        "focus": "Driving mergers, acquisitions, and strategic investments"
      },
      {
        "role": "AI Product Manager",
        "category": "Technology",
        "level": "senior",
        "focus": "Managing the development and deployment of AI-driven products"
      },
      {
        "role": "Quantum Computing Engineer",
        "category": "Technology",
        "level": "senior",
        "focus": "Researching and developing quantum computing applications"
      },
      {
        "role": "Augmented Reality Developer",
        "category": "Technology",
        "level": "mid-level",
        "focus": "Building immersive AR applications and user experiences"
      },
      {
        "role": "Chief Information Security Officer (CISO)",
        "category": "Technology",
        "level": "executive",
        "focus": "Leading cybersecurity strategy and risk management"
      },
      {
        "role": "Site Reliability Architect",
        "category": "Technology",
        "level": "senior",
        "focus": "Designing scalable and resilient system infrastructures"
      },
      {
        "role": "Director of Artificial Intelligence",
        "category": "Technology",
        "level": "senior",
        "focus": "Developing AI strategies and machine learning solutions"
      },
      {
        "role": "Ethical Hacker",
        "category": "Technology",
        "level": "mid-level",
        "focus": "Performing security penetration testing and vulnerability assessments"
      },
      {
        "role": "VP of Growth Marketing",
        "category": "Sales",
        "level": "executive",
        "focus": "Overseeing demand generation and customer acquisition strategies"
      },
      {
        "role": "Director of Customer Acquisition",
        "category": "Sales",
        "level": "senior",
        "focus": "Developing and executing strategies to attract new customers"
      },
      {
        "role": "Enterprise Account Manager",
        "category": "Sales",
        "level": "mid-level",
        "focus": "Managing high-value enterprise customer relationships"
      },
      {
        "role": "Director of Sales Enablement",
        "category": "Sales",
        "level": "senior",
        "focus": "Providing sales teams with tools and training for success"
      },
      {
        "role": "Luxury Goods Sales Manager",
        "category": "Sales",
        "level": "mid-level",
        "focus": "Selling high-end luxury products and managing VIP clients"
      },
      {
        "role": "Medical Device Sales Representative",
        "category": "Sales",
        "level": "mid-level",
        "focus": "Selling medical devices to healthcare facilities"
      },
      {
        "role": "EdTech Sales Executive",
        "category": "Sales",
        "level": "mid-level",
        "focus": "Selling educational technology solutions to institutions"
      },
      {
        "role": "Director of Client Success",
        "category": "Sales",
        "level": "senior",
        "focus": "Ensuring client retention and maximizing lifetime value"
      },
      {
        "role": "Regional Director of Operations",
        "category": "Operations",
        "level": "senior",
        "focus": "Overseeing operational performance across multiple locations"
      },
      {
        "role": "Chief Automation Officer",
        "category": "Technology",
        "level": "executive",
        "focus": "Leading robotic process automation (RPA) and AI transformation"
      },
      {
        "role": "Director of Cyber Risk Management",
        "category": "Technology",
        "level": "senior",
        "focus": "Developing risk mitigation strategies for cybersecurity threats"
      },
      {
        "role": "Consumer Insights Analyst",
        "category": "Sales",
        "level": "mid-level",
        "focus": "Analyzing customer data to drive sales strategy"
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