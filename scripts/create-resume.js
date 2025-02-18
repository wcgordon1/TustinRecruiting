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
        "role": "Operations Manager",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Overseeing day-to-day business operations and efficiency"
      },
      {
        "role": "Director of Operations",
        "category": "Operations",
        "level": "senior",
        "focus": "Developing and implementing operational strategies"
      },
      {
        "role": "Chief Operating Officer (COO)",
        "category": "Operations",
        "level": "executive",
        "focus": "Managing overall company operations and performance"
      },
      {
        "role": "Supply Chain Manager",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Optimizing supply chain processes and logistics"
      },
      {
        "role": "Logistics Coordinator",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Managing transportation and inventory flow"
      },
      {
        "role": "Warehouse Manager",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Supervising warehouse operations and inventory management"
      },
      {
        "role": "Fleet Manager",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Overseeing company vehicle maintenance and logistics"
      },
      {
        "role": "Inventory Control Specialist",
        "category": "Operations",
        "level": "entry-level",
        "focus": "Tracking and managing inventory levels"
      },
      {
        "role": "Facilities Manager",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Maintaining and overseeing physical facilities and assets"
      },
      {
        "role": "Procurement Manager",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Managing purchasing and supplier relationships"
      },
      {
        "role": "Quality Assurance Manager",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Ensuring product and service quality standards"
      },
      {
        "role": "Compliance Officer",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Ensuring operational adherence to legal and regulatory requirements"
      },
      {
        "role": "Process Improvement Manager",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Optimizing workflows and increasing efficiency"
      },
      {
        "role": "Operations Analyst",
        "category": "Operations",
        "level": "entry-level",
        "focus": "Analyzing data to improve operational processes"
      },
      {
        "role": "Business Continuity Manager",
        "category": "Operations",
        "level": "senior",
        "focus": "Developing plans to maintain operations during disruptions"
      },
      {
        "role": "Production Supervisor",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Overseeing production processes and workforce"
      },
      {
        "role": "Customer Operations Manager",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Improving customer service and support processes"
      },
      {
        "role": "Workforce Planning Manager",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Managing staffing levels and workforce efficiency"
      },
      {
        "role": "Service Delivery Manager",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Ensuring efficient delivery of services to customers"
      },
      {
        "role": "Event Operations Manager",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Coordinating logistics and execution of events"
      },
      {
        "role": "Health and Safety Manager",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Implementing workplace safety protocols and policies"
      },
      {
        "role": "Security Operations Manager",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Overseeing security measures and risk management"
      },
      {
        "role": "Production Planner",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Scheduling and coordinating manufacturing processes"
      },
      {
        "role": "Distribution Manager",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Managing product distribution and logistics"
      },
      {
        "role": "Energy Operations Manager",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Overseeing energy efficiency and sustainability initiatives"
      },
      {
        "role": "Transportation Coordinator",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Managing transportation logistics and fleet operations"
      },
      {
        "role": "Restaurant Operations Manager",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Overseeing daily operations of a restaurant or food service"
      },
      {
        "role": "Retail Operations Manager",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Managing store operations and sales efficiency"
      },
      {
        "role": "E-commerce Operations Manager",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Optimizing online store logistics and fulfillment processes"
      },
      {
        "role": "Field Operations Manager",
        "category": "Operations",
        "level": "mid-level",
        "focus": "Managing on-site field operations and logistics"
      },
      {
        "role": "3PL Account Manager",
        "category": "3PL",
        "level": "mid-level",
        "focus": "Managing client relationships and logistics accounts"
      },
      {
        "role": "Freight Forwarding Specialist",
        "category": "3PL",
        "level": "mid-level",
        "focus": "Coordinating international and domestic freight shipments"
      },
      {
        "role": "Logistics Coordinator",
        "category": "3PL",
        "level": "mid-level",
        "focus": "Managing transportation and shipment schedules"
      },
      {
        "role": "Freight Broker",
        "category": "3PL",
        "level": "mid-level",
        "focus": "Negotiating and coordinating freight transportation for clients"
      },
      {
        "role": "Carrier Sales Representative",
        "category": "3PL",
        "level": "mid-level",
        "focus": "Developing relationships with carriers and securing capacity"
      },
      {
        "role": "Customs Compliance Specialist",
        "category": "3PL",
        "level": "mid-level",
        "focus": "Ensuring shipments comply with customs regulations"
      },
      {
        "role": "Import/Export Coordinator",
        "category": "3PL",
        "level": "mid-level",
        "focus": "Managing international trade logistics and documentation"
      },
      {
        "role": "3PL Sales Executive",
        "category": "3PL",
        "level": "senior",
        "focus": "Selling logistics and freight services to businesses"
      },
      {
        "role": "Operations Manager - 3PL",
        "category": "3PL",
        "level": "mid-level",
        "focus": "Overseeing daily logistics operations and supply chain efficiency"
      },
      {
        "role": "Warehouse Supervisor",
        "category": "3PL",
        "level": "mid-level",
        "focus": "Managing warehouse operations and inventory control"
      },
      {
        "role": "Freight Pricing Analyst",
        "category": "3PL",
        "level": "mid-level",
        "focus": "Analyzing and setting freight pricing strategies"
      },
      {
        "role": "Supply Chain Analyst",
        "category": "3PL",
        "level": "mid-level",
        "focus": "Optimizing supply chain processes for efficiency and cost savings"
      },
      {
        "role": "Logistics Sales Manager",
        "category": "3PL",
        "level": "senior",
        "focus": "Developing sales strategies for logistics services"
      },
      {
        "role": "Transportation Manager",
        "category": "3PL",
        "level": "mid-level",
        "focus": "Coordinating and managing transportation networks"
      },
      {
        "role": "LTL (Less-than-Truckload) Specialist",
        "category": "3PL",
        "level": "mid-level",
        "focus": "Managing LTL freight shipments and carrier negotiations"
      },
      {
        "role": "FTL (Full-Truckload) Coordinator",
        "category": "3PL",
        "level": "mid-level",
        "focus": "Managing full-truckload shipments and logistics planning"
      },
      {
        "role": "Reverse Logistics Coordinator",
        "category": "3PL",
        "level": "mid-level",
        "focus": "Managing returns and product lifecycle logistics"
      },
      {
        "role": "Cold Chain Logistics Manager",
        "category": "3PL",
        "level": "mid-level",
        "focus": "Overseeing temperature-sensitive freight logistics"
      },
      {
        "role": "E-commerce Fulfillment Manager",
        "category": "3PL",
        "level": "mid-level",
        "focus": "Managing warehousing and shipping for e-commerce clients"
      },
      {
        "role": "Distribution Center Manager",
        "category": "3PL",
        "level": "senior",
        "focus": "Overseeing operations at a 3PL distribution facility"
      },
      {
        "role": "Last Mile Delivery Manager",
        "category": "3PL",
        "level": "mid-level",
        "focus": "Optimizing final-stage logistics for fast delivery"
      },
      {
        "role": "Freight Claims Specialist",
        "category": "3PL",
        "level": "mid-level",
        "focus": "Handling lost, damaged, or delayed shipment claims"
      },
      {
        "role": "Drayage Coordinator",
        "category": "3PL",
        "level": "mid-level",
        "focus": "Managing short-distance port and rail transportation logistics"
      },
      {
        "role": "Intermodal Logistics Coordinator",
        "category": "3PL",
        "level": "mid-level",
        "focus": "Managing multi-modal transport solutions including rail, truck, and ocean"
      },
      {
        "role": "Freight Audit & Payment Analyst",
        "category": "3PL",
        "level": "mid-level",
        "focus": "Ensuring accuracy in freight invoicing and cost management"
      },
      {
        "role": "Procurement Manager - Logistics",
        "category": "3PL",
        "level": "mid-level",
        "focus": "Sourcing transportation providers and negotiating contracts"
      },
      {
        "role": "Fleet Coordinator",
        "category": "3PL",
        "level": "mid-level",
        "focus": "Managing fleet operations and vehicle maintenance"
      },
      {
        "role": "Customer Success Manager - 3PL",
        "category": "3PL",
        "level": "mid-level",
        "focus": "Ensuring logistics clients receive high-quality service"
      },
      {
        "role": "International Freight Coordinator",
        "category": "3PL",
        "level": "mid-level",
        "focus": "Handling global freight movement and customs compliance"
      },
      {
        "role": "3PL Implementation Manager",
        "category": "3PL",
        "level": "senior",
        "focus": "Onboarding new clients and integrating logistics solutions"
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