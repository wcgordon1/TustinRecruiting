#!/usr/bin/env node
const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');
const OpenAI = require('openai');

require('dotenv').config({ 
  path: path.join(__dirname, 'config', '.env.local')
});

if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY not found in scripts/config/.env.local file');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const JOB_TYPES = {
  'Assistant Property Manager': {
    minValue: 70000,
    maxValue: 90000,
    experienceLevel: 'entryLevel',
    category: 'Property Management',
    team: 'Operations',
    yearsExperience: '1-3',
    responsibilities: 'Support property managers in day-to-day operations, assist with tenant communications, coordinate maintenance requests and vendor management, maintain accurate property records and reports, assist in preparing budgets and monitoring expenses, oversee small-scale construction projects, ensure compliance with lease agreements, track rent payments and follow up on delinquencies, assist in marketing and leasing activities, attend property inspections and meetings',
    qualifications: 'Experience with property management software and Microsoft Excel, excellent organizational and communication skills, ability to handle multiple tasks and meet deadlines, basic understanding of property maintenance and leasing terms, ability to work collaboratively with a team, strong attention to detail',
    prompt: 'Create a job description for an Assistant Property Manager focusing on supporting retail leasing operations. Emphasize tenant communication, vendor coordination, and budgeting assistance. Must have experience with Excel and property management software. A strong attention to detail and ability to multitask are required.'
},

'Leasing Coordinator': {
    minValue: 70000,
    maxValue: 90000,
    experienceLevel: 'entryLevel',
    category: 'Leasing',
    team: 'Commercial',
    yearsExperience: '1-3',
    responsibilities: 'Coordinate leasing activities for retail properties, draft lease agreements and amendments, manage lease expirations and renewals, maintain leasing and marketing databases, assist in preparing financial models for leasing opportunities, support brokers and property managers with market research and presentations, ensure lease compliance with company policies and legal requirements, communicate regularly with tenants to address leasing inquiries and concerns, track leasing KPIs and provide regular reports to management, assist in site tours and marketing efforts',
    qualifications: 'Experience with leasing processes and legal terminology, proficiency in Microsoft Excel and property management software, excellent verbal and written communication skills, ability to analyze market data and financial models, strong organizational and multitasking skills, customer service-oriented approach',
    prompt: 'Create a job description for a Leasing Coordinator in a retail-focused commercial property management company. Highlight responsibilities in lease drafting, tracking, and compliance. Include tenant communication and coordination with brokers. Must have strong Excel skills and organizational abilities.'
},

'Construction Project Coordinator': {
    minValue: 75000,
    maxValue: 95000,
    experienceLevel: 'midLevel',
    category: 'Construction',
    team: 'Project Management',
    yearsExperience: '3-5',
    responsibilities: 'Oversee construction projects within retail properties, coordinate with contractors, vendors, and property managers to ensure timely completion, prepare project schedules and track progress, assist in reviewing construction budgets and bids, manage documentation, including permits and change orders, conduct regular site inspections to ensure work aligns with plans and safety standards, communicate project updates to stakeholders, resolve on-site issues to minimize delays, maintain project cost controls and reporting, ensure compliance with local building codes and regulations',
    qualifications: 'Experience with construction management in commercial properties, strong knowledge of project scheduling and budgeting, proficiency in Microsoft Excel and project management software, ability to manage multiple projects simultaneously, strong problem-solving and communication skills, knowledge of local building codes and safety regulations',
    prompt: 'Create a job description for a Construction Project Coordinator specializing in retail property projects. Focus on construction scheduling, vendor coordination, and cost tracking. Experience in commercial property construction management required, with strong Excel and project management software skills.'
},

'Retail Property Analyst': {
    minValue: 75000,
    maxValue: 95000,
    experienceLevel: 'midLevel',
    category: 'Finance',
    team: 'Strategy',
    yearsExperience: '2-4',
    responsibilities: 'Analyze financial performance of retail properties, prepare detailed reports on property budgets, expenses, and profitability, develop financial models to evaluate leasing scenarios, provide market research and competitor analysis to inform leasing strategies, assist property managers with budget preparation and expense tracking, monitor portfolio performance and identify opportunities for improvement, maintain databases of lease terms, tenant information, and market data, support due diligence for acquisitions or dispositions of properties, present insights and recommendations to senior management',
    qualifications: 'Strong analytical and financial modeling skills, proficiency in Microsoft Excel and data visualization tools, knowledge of commercial property management practices, excellent communication and presentation abilities, detail-oriented with the ability to manage multiple projects, basic understanding of market research methods',
    prompt: 'Create a job description for a Retail Property Analyst focusing on financial performance analysis, budgeting, and market research for retail leasing. Include financial modeling, database management, and reporting responsibilities. Must have strong analytical skills and experience with Excel and data visualization tools.'
},

'Property Manager': {
    minValue: 80000,
    maxValue: 100000,
    experienceLevel: 'seniorLevel',
    category: 'Property Management',
    team: 'Leadership',
    yearsExperience: '5-7',
    responsibilities: 'Manage day-to-day operations of retail properties, develop and execute property budgets and financial plans, oversee tenant relations, including handling inquiries, disputes, and lease compliance, coordinate property maintenance and vendor management to ensure high-quality service, negotiate and manage service contracts, lead leasing efforts and support marketing activities, ensure compliance with local regulations and company policies, monitor rent collections and address delinquencies, prepare monthly and quarterly reports for senior management, mentor and guide junior team members, conduct property inspections and ensure safety standards are met',
    qualifications: 'Proven experience in property management, strong knowledge of budgeting and financial planning, excellent leadership and communication skills, proficiency in property management software and Microsoft Excel, ability to manage multiple properties and priorities, broker’s license preferred but not required',
    prompt: 'Create a job description for a Property Manager specializing in retail properties. Focus on tenant relations, budgeting, and maintenance coordination. Must have proven property management experience and strong financial skills. A broker’s license is preferred but not required.'
}
};

const PROMPT_STYLES = {
  'conversational': 'Make this job description friendly and conversational, using casual language while maintaining professionalism. Use "you" and "we" to speak directly to the candidate. Randomly select which requirement and certs are necessary for the role.',
  'formal': 'Write this job description in a formal, traditional corporate style with clear sections and bullet points. Randomly select which requirement and certs are necessary for the role.',
  'detailed': 'Create a comprehensive and detailed job description with specific examples and clear expectations for each responsibility. Randomly select which requirement and certs are necessary for the role.',
  'concise': 'Write a clear and concise job description focusing on key requirements and essential responsibilities. Randomly select which requirement and certs are necessary for the role.',
  'engaging': 'Create an engaging and energetic job description that excites potential candidates while highlighting growth opportunities. Randomly select which requirement and certs are necessary for the role.'
};

const DESCRIPTION_LENGTHS = {
  'short': 500,
  'medium': 800,
  'long': 1000
};

const COMPANIES = {
  'Tustin Recruiting': {
  name: 'Tustin Recruiting',
  sameAs: 'https://www.tustinrecruiting.com/',
  logo: '/images/LOGO1.png'
},
'Perkins Properties': {
  name: 'Perkins Properties',
  sameAs: 'https://www.perkinsproperties.us/',
  logo: 'https://www.perkinsproperties.us/wp-content/uploads/2018/01/logo-1.jpg'
}
};

const LOCATIONS = [
  { city: 'Bellevue', state: 'NE', zipCode: '68005' },
{ city: 'Papillion', state: 'NE', zipCode: '68046' },
{ city: 'La Vista', state: 'NE', zipCode: '68128' },
{ city: 'Ralston', state: 'NE', zipCode: '68127' },
{ city: 'Council Bluffs', state: 'IA', zipCode: '51501' },
{ city: 'Bennington', state: 'NE', zipCode: '68007' },
{ city: 'Elkhorn', state: 'NE', zipCode: '68022' },
{ city: 'Gretna', state: 'NE', zipCode: '68028' },
{ city: 'Springfield', state: 'NE', zipCode: '68059' },
{ city: 'Carter Lake', state: 'IA', zipCode: '51510' },
{ city: 'Fort Calhoun', state: 'NE', zipCode: '68023' },
{ city: 'Blair', state: 'NE', zipCode: '68008' },
{ city: 'Offutt AFB', state: 'NE', zipCode: '68113' },
{ city: 'Waterloo', state: 'NE', zipCode: '68069' },
{ city: 'Ashland', state: 'NE', zipCode: '68003' },
{ city: 'Plattsmouth', state: 'NE', zipCode: '68048' },
{ city: 'Louisville', state: 'NE', zipCode: '68037' },
{ city: 'Valley', state: 'NE', zipCode: '68064' },
{ city: 'Arlington', state: 'NE', zipCode: '68002' },
{ city: 'Pacific Junction', state: 'IA', zipCode: '51561' }
];

const STREET_TYPES = [
  'Main St.', 'Technology Dr.', 'Innovation Way', 'Corporate Blvd.', 
  'Commerce Dr.', 'Industrial Pkwy.', 'Enterprise Ave.', 'Business Center Dr.',
  'Professional Pkwy.', 'Executive Dr.', 'Tech Park Way', 'Trade Center Blvd.'
];

function generateStreetAddress() {
  const number = Math.floor(Math.random() * (12000 - 1000) + 1000);
  const streetType = STREET_TYPES[Math.floor(Math.random() * STREET_TYPES.length)];
  return `${number} ${streetType}`;
}

function generateSalaryWithCents(baseMin, baseMax) {
  // Generate random adjustment between -2000 and +5000
  const adjustment = Math.floor(Math.random() * 7000) - 2000;
  
  // Round to nearest 100
  const roundedMin = Math.round((baseMin + adjustment) / 100) * 100;
  const roundedMax = Math.round((baseMax + adjustment) / 100) * 100;
  
  return {
    minValue: roundedMin,
    maxValue: roundedMax
  };
}

function generateRecentDate() {
  const now = new Date();
  const twoDaysAgo = new Date(now - (2 * 24 * 60 * 60 * 1000));
  const randomTime = twoDaysAgo.getTime() + Math.random() * (now.getTime() - twoDaysAgo.getTime());
  return new Date(randomTime).toISOString();
}

function generateValidThrough(datePosted) {
  const postedDate = new Date(datePosted);
  const daysToAdd = Math.floor(Math.random() * (45 - 31 + 1) + 31);
  const validThrough = new Date(postedDate.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
  return validThrough.toISOString();
}

function generateJobId(company, type) {
  return `${company.name.substring(0, 4).toUpperCase().replace(/\s+/g, '')}${Math.random().toString(36).substring(2, 8)}`;
}

function generateFilename(company, title, location, jobId) {
  return `${company.name.toLowerCase().replace(/\s+/g, '-')}-${title.toLowerCase().replace(/\s+/g, '-')}-${location.city.toLowerCase().replace(/\s+/g, '-')}-${jobId.toLowerCase()}.md`;
}

async function createJob(location, jobType, company) {
  const datePosted = generateRecentDate();
  const validThrough = generateValidThrough(datePosted);
  const jobInfo = JOB_TYPES[jobType];
  const jobId = generateJobId(company, jobType);
  
  const { minValue, maxValue } = generateSalaryWithCents(jobInfo.minValue, jobInfo.maxValue);

  const promptStyles = Object.entries(PROMPT_STYLES);
  const selectedStyle = promptStyles[Math.floor(Math.random() * promptStyles.length)];
  
  const descLengths = Object.entries(DESCRIPTION_LENGTHS);
  const selectedLength = descLengths[Math.floor(Math.random() * descLengths.length)];

  const prompt = `${selectedStyle[1]} 

Create a ${selectedLength[0]} word job description for a ${jobType} position at ${company.name} in ${location.city}, ${location.state}. 

Base content:
${jobInfo.prompt}

Start with a paragraph about the role in ${location.city}, ${location.state}. This job is for Tustin Recruiting's client but do not focus on Tustin Recruiting, make the reader engaged with the role. Never use h1 tags or headings before this paragraph. 

After the paragraph intro, use these sections with h2 tags:

## Key Responsibilities
${jobInfo.responsibilities} (choose at random which ones to emphasize)
- Add 3-4 more responsibilities of your choosing

## Required Qualifications (choose at random which ones to emphasize)
${jobInfo.qualifications}
- ${jobInfo.yearsExperience} years of experience required for ${jobInfo.category} work in ${jobInfo.team} setting
- Add 2-3 location-specific qualifications for ${location.city}

## Compensation & Benefits
- Competitive salary range: $${minValue}-$${maxValue} depending on experience
- Comprehensive medical, dental, and vision coverage
- Paid time off and holidays
- Career advancement opportunities
- Ongoing training and certifications

Format in markdown without h1 tags. Do not include ticks or markdown formatting instructions. Keep the total length to ${selectedLength[0]} words while maintaining the ${selectedStyle[0]} style.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ 
      role: "user", 
      content: prompt
    }],
    temperature: 0.7,
  });

  const fullDescription = completion.choices[0].message.content;

  const jobData = {
    position: jobType,
    description: fullDescription.substring(0, 500) + '...',
    location: `${location.city}, ${location.state}`,
    team: jobInfo.team,
    datePosted: datePosted,
    validThrough: validThrough,
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      name: company.name,
      sameAs: company.sameAs,
      logo: company.logo
    },
    jobLocation: {
      streetAddress: generateStreetAddress(),
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.zipCode,
      addressCountry: 'USA'
    },
    baseSalary: {
      currency: 'USD',
      value: Number(((minValue + maxValue) / 2).toFixed(2)),
      minValue: minValue,
      maxValue: maxValue,
      unitText: 'YEAR'
    },
    experienceRequirements: jobInfo.experienceLevel,
    occupationalCategory: jobInfo.category,
    identifier: {
      name: company.name,
      value: jobId
    },
    featured: Math.random() < 0.2,
    email: [
      'will@tustinrecruiting.com',
      'john@tustinrecruiting.com'
    ]
  };

  const frontmatter = matter.stringify('', jobData);
  const finalContent = `${frontmatter}\n\n${fullDescription}`;

  const filename = generateFilename(company, jobType, location, jobId);
  const filePath = path.join(__dirname, '..', 'src', 'content', 'jobs', filename);
  
  fs.writeFileSync(filePath, finalContent);
  console.log(`Created ${jobType} for ${company.name} in ${location.city}: ${filename}`);
}

async function createAllJobs() {
  const companies = Object.values(COMPANIES);
  const jobTypes = Object.keys(JOB_TYPES);
  
  for (const location of LOCATIONS) {
    const company = companies[Math.floor(Math.random() * companies.length)];
    const jobType = jobTypes[Math.floor(Math.random() * jobTypes.length)];
    
    await createJob(location, jobType, company);
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

createAllJobs().catch(console.error);
