const { config } = require('dotenv');
const OpenAI = require('openai');
const fs = require('node:fs');
const path = require('node:path');

// Load environment variables
config({ path: 'scripts/config/.env.local' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Position templates with role-specific data
const POSITIONS = {
  'Sales': {
    certifications: ['Salesforce Certification', 'Sales Management Certification', 'Industry-Specific Certifications'],
    skills: ['Solution Selling', 'Pipeline Management', 'CRM Expertise', 'Contract Negotiation', 'Enterprise Sales'],
    tooling: ['Salesforce', 'HubSpot', 'LinkedIn Sales Navigator', 'Sales Engagement Platforms'],
    salaryRange: { min: 80000, max: 200000, experience: '3-5 years B2B sales experience' }
  },
  'Software Engineering': {
    certifications: ['AWS Certified Developer', 'Azure Developer', 'Relevant Programming Certifications'],
    skills: ['Full Stack Development', 'Cloud Architecture', 'API Design', 'System Design', 'Microservices'],
    tooling: ['Modern JavaScript Frameworks', 'Cloud Platforms', 'CI/CD Tools', 'Version Control'],
    salaryRange: { min: 100000, max: 180000, experience: '3-5 years software development experience' }
  },
  'Artificial Intelligence': {
    certifications: ['Machine Learning Certifications', 'Deep Learning Specialization', 'Cloud AI Certifications'],
    skills: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'MLOps'],
    tooling: ['TensorFlow', 'PyTorch', 'Cloud ML Platforms', 'Data Processing Tools'],
    salaryRange: { min: 120000, max: 220000, experience: '3-5 years ML/AI experience' }
  },
  'Logistics': {
    certifications: ['Supply Chain Management', 'Project Management (PMP)', 'Six Sigma'],
    skills: ['Supply Chain Optimization', 'Inventory Management', 'Route Planning', 'Vendor Management'],
    tooling: ['ERP Systems', 'TMS Software', 'WMS Platforms', 'Analytics Tools'],
    salaryRange: { min: 75000, max: 150000, experience: '3-5 years logistics experience' }
  },
  'Cybersecurity': {
    certifications: ['CISSP', 'CEH', 'Security+', 'CISM'],
    skills: ['Threat Detection', 'Security Architecture', 'Incident Response', 'Risk Management'],
    tooling: ['SIEM Tools', 'Penetration Testing Tools', 'Security Frameworks', 'Cloud Security'],
    salaryRange: { min: 100000, max: 190000, experience: '3-5 years security experience' }
  },
  'Customer Success': {
    certifications: ['Customer Success Management', 'Product Certifications', 'Project Management'],
    skills: ['Account Management', 'Product Adoption', 'Customer Retention', 'Business Analytics'],
    tooling: ['CRM Platforms', 'Customer Success Tools', 'Analytics Software', 'Communication Tools'],
    salaryRange: { min: 70000, max: 140000, experience: '2-4 years customer success experience' }
  },
  'SaaS': {
    certifications: ['Product Management', 'Agile Certifications', 'Technical Certifications'],
    skills: ['Product Strategy', 'Market Analysis', 'User Experience', 'Growth Metrics'],
    tooling: ['Product Analytics', 'A/B Testing Tools', 'Project Management Software', 'CRM'],
    salaryRange: { min: 90000, max: 180000, experience: '3-5 years SaaS experience' }
  },
  'Equipment Finance': {
    certifications: ['CLFP', 'Financial Analysis', 'Risk Management'],
    skills: ['Financial Analysis', 'Credit Assessment', 'Deal Structuring', 'Vendor Programs'],
    tooling: ['Financial Software', 'Credit Analysis Tools', 'Documentation Systems', 'CRM'],
    salaryRange: { min: 85000, max: 175000, experience: '3-5 years equipment finance experience' }
  }
};

async function generateCityData(city, state) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ 
      role: "user", 
      content: `Create market data for hiring companies in ${city}, ${state}.` 
    }],
    functions: [{
      name: "get_city_data",
      description: `Get market data for ${city}, ${state} hiring companies`,
      parameters: {
        type: "object",
        properties: {
          averageSalary: {
            type: "integer",
            description: "Average electrical industry salary in this area"
          },
          salaryRange: {
            type: "object",
            properties: {
              min: {
                type: "integer",
                description: "Minimum typical salary"
              },
              max: {
                type: "integer",
                description: "Maximum typical salary"
              }
            },
            required: ["min", "max"]
          },
          growthRate: {
            type: "string",
            description: "Growth rate as percentage with % symbol",
            pattern: "^[0-9]+%$"
          },
          employmentStats: {
            type: "object",
            properties: {
              totalJobs: {
                type: "integer",
                description: "Total electrical jobs in the area"
              },
              projectedGrowth: {
                type: "string",
                description: "Growth projection with timeframe"
              }
            },
            required: ["totalJobs", "projectedGrowth"]
          },
          description: {
            type: "string",
            description: "One sentence about the market"
          },
          metropolitanArea: {
            type: "string",
            description: "Full metropolitan area name"
          },
          majorProjects: {
            type: "array",
            items: { type: "string" },
            description: `Current hiring initiatives and tech investments in ${city}, ${state}`,
            minItems: 4,
            maxItems: 6
          },
          topEmployers: {
            type: "array",
            items: { type: "string" },
            description: "Major Sales, Software Engineering, and Artificial Intelligence employers in the area",
            minItems: 4,
            maxItems: 6
          }
        },
        required: [
          "averageSalary",
          "salaryRange",
          "growthRate",
          "employmentStats",
          "description",
          "metropolitanArea",
          "majorProjects",
          "topEmployers"
        ]
      }
    }],
    function_call: { name: "get_city_data" }
  });

  const cityData = JSON.parse(completion.choices[0].message.function_call.arguments);
  return {
    ...cityData,
    demandLevel: "High" // Ensure this stays constant
  };
}

async function generatePositionData(position, city, state) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ 
      role: "user", 
      content: `Create market data for ${position} roles in ${city}, ${state}.` 
    }],
    functions: [{
      name: "get_position_data",
      description: `Get market data for ${position} roles in ${city}, ${state}`,
      parameters: {
        type: "object",
        properties: {
          description: {
            type: "string",
            description: "One sentence about the position in this market"
          },
          averageSalary: {
            type: "integer",
            description: "Average salary for this specific role"
          },
          salaryRange: {
            type: "object",
            properties: {
              min: {
                type: "integer",
                description: "Minimum salary"
              },
              max: {
                type: "integer",
                description: "Maximum salary"
              }
            },
            required: ["min", "max"]
          },
          certifications: {
            type: "array",
            items: { type: "string" },
            description: "Required certifications",
            minItems: 3,
            maxItems: 6
          },
          skills: {
            type: "array",
            items: { type: "string" },
            description: "Required skills",
            minItems: 4,
            maxItems: 8
          },
          experience: {
            type: "string",
            description: "Required experience range"
          }
        },
        required: [
          "description",
          "averageSalary",
          "salaryRange",
          "certifications",
          "skills",
          "experience"
        ]
      }
    }],
    function_call: { name: "get_position_data" }
  });

  return JSON.parse(completion.choices[0].message.function_call.arguments);
}

async function generateMarkdown(position, city, state) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ 
      role: "user", 
      content: `Create content for a ${position} direct hire recruiting firm page in ${city}, ${state}. Format using only h3, h4, and bold text (no h1 or h2).` 
    }],
    functions: [{
      name: "get_markdown_content",
      description: "Generate structured markdown content for the recruiting page",
      parameters: {
        type: "object",
        properties: {
          marketOverview: {
            type: "string",
            description: `2-3 sentences about local market conditions for ${position} professionals in ${city}, ${state}`
          },
          criticalRole: {
            type: "string",
            description: `2-3 sentences about why this position is vital to ${city}, discuss and specifically name large construction projects in or near ${city}`
          },
          hiringChallenges: {
            type: "string",
            description: `2-3 sentences about specific challenges recruiting ${position} professionals in ${city}, ${state}, content that is unique to ${city}, ${state}`
          },
          ourProcess: {
            type: "string",
            description: `2-3 sentences about the recruiting process for ${position} professionals in ${city}, ${state}, content that is unique to ${city}, ${state}`
          },
          successMetrics: {
            type: "string",
            description: `2-3 sentences about success metrics for hiring ${position} professionals in ${city}, ${state}, content that is unique to ${city}, ${state}`
          }
        },
        required: [
          "marketOverview",
          "criticalRole",
          "hiringChallenges",
          "ourProcess",
          "successMetrics"
        ]
      }
    }],
    function_call: { name: "get_markdown_content" }
  });

  const content = JSON.parse(completion.choices[0].message.function_call.arguments);
  return `### Market Overview
${content.marketOverview}

### Critical Role for ${position} in ${city}
${content.criticalRole}

### Hiring Challenges for ${position} in ${city}
${content.hiringChallenges}

### Our Process
${content.ourProcess}

### Success Metrics for ${position} in ${city}
${content.successMetrics}`;
}

async function createRecruitingContent(state, city) {
  const stateFolder = path.join(process.cwd(), 'src/content/recruiting', state.toLowerCase());
  const cityFolder = path.join(stateFolder, city.toLowerCase().replace(/\s+/g, '-'));

  // Create folders if they don't exist
  if (!fs.existsSync(cityFolder)) {
    fs.mkdirSync(cityFolder, { recursive: true });
  }

  try {
    // Generate unique city data
    console.log('Generating city data...');
    const cityData = await generateCityData(city, state);

    // Create city index.md
    const cityIndexContent = `---
name: "${city}"
state: "${state}"
marketData:
  averageSalary: ${cityData.averageSalary}
  salaryRange:
    min: ${cityData.salaryRange.min}
    max: ${cityData.salaryRange.max}
  growthRate: "${cityData.growthRate}"
  demandLevel: "High"
  employmentStats:
    totalJobs: ${cityData.employmentStats.totalJobs}
    projectedGrowth: "${cityData.employmentStats.projectedGrowth}"
description: "${cityData.description}"
metropolitanArea: "${cityData.metropolitanArea}"
majorProjects:
${cityData.majorProjects.map(project => `  - "${project}"`).join('\n')}
topEmployers:
${cityData.topEmployers.map(employer => `  - "${employer}"`).join('\n')}
---

${await generateMarkdown('Direct Hire Recruiting', city, state)}`;

    fs.writeFileSync(path.join(cityFolder, 'index.md'), cityIndexContent);
    console.log('Created city index file');

    // Create position files
    for (const [position, baseData] of Object.entries(POSITIONS)) {
      console.log(`Generating data for ${position}...`);
      const positionData = await generatePositionData(position, city, state);
      
      const slug = position.toLowerCase().replace(/\s+/g, '-');
      const fileName = `${slug}-recruiting-in-${city.toLowerCase().replace(/\s+/g, '-')}.md`;
      
      const positionContent = `---
name: "${position} Recruiting Agency in ${city}"
title: "${position} Recruiting"
position: "${position}"
city: "${city}"
state: "${state}"
description: "${positionData.description}"
marketData:
  averageSalary: ${positionData.averageSalary}
  salaryRange:
    min: ${positionData.salaryRange.min}
    max: ${positionData.salaryRange.max}
  growthRate: "${cityData.growthRate}"
  demandLevel: "High"
  employmentStats:
    totalJobs: ${Math.floor(cityData.employmentStats.totalJobs / Object.keys(POSITIONS).length)}
    projectedGrowth: "${cityData.employmentStats.projectedGrowth}"
certifications:
${positionData.certifications.map(cert => `  - "${cert}"`).join('\n')}
skills:
${positionData.skills.map(skill => `  - "${skill}"`).join('\n')}
tooling:
${baseData.tooling.map(tool => `  - "${tool}"`).join('\n')}
salaryRange:
  min: ${positionData.salaryRange.min}
  max: ${positionData.salaryRange.max}
  experience: "${positionData.experience}"
benefits:
  - "Competitive Pay"
  - "Health Insurance"
  - "401(k) with Match"
  - "Paid Time Off"
  - "Training Programs"
  - "Career Advancement"
---

${await generateMarkdown(position, city, state)}`;

      fs.writeFileSync(path.join(cityFolder, fileName), positionContent);
      console.log(`Created ${position} file`);
    }
  } catch (error) {
    console.error('Error generating content:', error);
    if (error.response) {
      console.error('OpenAI API Error:', error.response.data);
    }
    throw error;
  }
}

// Get command line arguments
const args = process.argv.slice(2);
const state = args[0];
const city = args[1];

if (!state || !city) {
  console.error('Please provide state and city arguments');
  process.exit(1);
}

createRecruitingContent(state, city)
  .then(() => console.log('Content created successfully!'))
  .catch(console.error); 