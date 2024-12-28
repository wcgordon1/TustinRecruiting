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
  'Account Executive': {
    minValue: 60000,
    maxValue: 80000,
    experienceLevel: 'entryLevel',
    category: 'Sales',
    team: 'Finance',
    yearsExperience: '1-3',
    prompt: 'Create a job description for an Account Executive position for an Equipment Finance company. This is a B2B sales role that focuses on selling to the Finance Department and CFOs of large companies. Heavy prospecting, cold calling, and networking. Candidates should be familiar with Salesforce and have expereince cold calling and prospecting.'
  },
  'Senior Software Engineer': {
   minValue: 130000,
   maxValue: 150000,
   experienceLevel: 'senior', 
   category: 'Engineering',
   team: 'Healthcare',
   yearsExperience: '5-8',
   prompt: 'Create a job description for a Senior Software Engineer position at a healthcare technology company. Focus on building scalable backend systems for electronic health records and patient data management. Must have experience with Java, Python, AWS, microservices architecture, and HIPAA compliance. Strong knowledge of healthcare data standards (HL7, FHIR) required. Experience with containerization, CI/CD pipelines, and agile development methodologies essential.'
 },
 'Sales Development Representative': {
   minValue: 50000,
   maxValue: 65000,
   experienceLevel: 'entryLevel',
   category: 'Sales',
   team: 'Software',
   yearsExperience: '0-2',
   prompt: 'Create a job description for a Sales Development Representative position at a B2B SaaS company. Role focuses on outbound prospecting to generate qualified leads for Account Executives. Must be proficient with Salesforce, Outreach.io, and LinkedIn Sales Navigator. Strong communication skills and ability to understand technical concepts required. Experience with cold calling, email campaigns, and social selling preferred.'
 },
 'Full Stack Developer': {
   minValue: 110000,
   maxValue: 130000,
   experienceLevel: 'midLevel',
   category: 'Engineering', 
   team: 'Finance',
   yearsExperience: '3-5',
   prompt: 'Create a job description for a Full Stack Developer position at a fintech startup. Focus on building secure, scalable web applications for payment processing and financial transactions. Must have strong experience with React, Node.js, TypeScript, and PostgreSQL. Knowledge of payment gateway APIs, PCI compliance, and financial regulations required. Experience with Redux, GraphQL, and AWS essential.'
 },
 'Enterprise Account Executive': {
   minValue: 120000,
   maxValue: 150000,
   experienceLevel: 'senior',
   category: 'Sales',
   team: 'Software',
   yearsExperience: '5-8',
   prompt: 'Create a job description for an Enterprise Account Executive position at a cybersecurity company. Role focuses on selling enterprise security solutions to Fortune 500 companies. Must understand complex security frameworks (NIST, ISO) and compliance requirements. Experience selling to CISOs and IT leaders required. Proven track record of closing deals over $500K. Proficient with Salesforce, security concepts, and enterprise sales cycles.'
 },
 'DevOps Engineer': {
   minValue: 110000,
   maxValue: 130000,
   experienceLevel: 'midLevel',
   category: 'Engineering',
   team: 'Software',
   yearsExperience: '3-6',
   prompt: 'Create a job description for a DevOps Engineer position at a large e-commerce platform. Focus on maintaining and scaling infrastructure during high-traffic periods. Must have strong experience with Kubernetes, Docker, Terraform, and major cloud platforms (AWS/GCP). Knowledge of monitoring tools (Datadog, New Relic), CI/CD pipelines, and automation required. Experience with microservices architecture and performance optimization essential.'
 },
 'Solutions Engineer': {
   minValue: 100000,
   maxValue: 150000,
   experienceLevel: 'midLevel',
   category: 'Engineering',
   team: 'Software',
   yearsExperience: '3-5',
   prompt: 'Create a job description for a Solutions Engineer position at an advertising technology company. Role bridges technical and sales teams to implement complex ad serving solutions. Must have strong programming skills (Python, JavaScript) and understanding of digital advertising concepts (RTB, programmatic). Experience with API integration, SQL, and customer-facing technical presentations required. Knowledge of major ad platforms and analytics tools essential.'
 },
 'Regional Sales Manager': {
   minValue: 140000,
   maxValue: 180000,
   experienceLevel: 'senior',
   category: 'Sales',
   team: 'Logistics',
   yearsExperience: '7-10',
   prompt: 'Create a job description for a Regional Sales Manager position at an industrial manufacturing company. Role oversees team of sales representatives selling industrial equipment and automation solutions. Must have experience managing complex B2B sales cycles and distributor relationships. Knowledge of manufacturing processes, supply chain, and industry regulations required. Proven track record of territory growth and team development essential.'
 },
 'Account Executive': {
   minValue: 65000,
   maxValue: 85000,
   experienceLevel: 'midLevel',
   category: 'Sales',
   team: 'Logistics',
   yearsExperience: '2-4',
   prompt: 'Create a job description for an Account Executive position at a Third Party Logistics company. Role focuses on selling transportation, warehousing, and supply chain solutions to mid-market and enterprise companies. Must understand freight modes (FTL, LTL, intermodal), warehousing operations, and supply chain optimization. Experience with TMS systems, rate negotiations, and logistics sales cycles required. Knowledge of customs, international shipping, and carrier networks essential. Must be proficient with Salesforce, Excel, and have experience managing complex stakeholder relationships. Base salary plus uncapped commision.'
 },
 'Business Development Manager': {
   minValue: 90000,
   maxValue: 105000,
   experienceLevel: 'senior',
   category: 'Sales',
   team: 'Logistics',
   yearsExperience: '5-8',
   prompt: 'Create a job description for a Business Development Manager position at a Third Party Logistics company. Role focuses on developing strategic partnerships with enterprise clients and identifying new market opportunities. Must have deep understanding of supply chain operations, contract negotiations, and RFP processes. Experience managing large logistics accounts ($5M+) and developing customized supply chain solutions required. Strong knowledge of industry trends, competitive landscape, and emerging technologies in logistics. Must be proficient with CRM systems, financial modeling, and executive presentations.'
 },
 'SaaS Account Executive': {
   minValue: 82000,
   maxValue: 92000,
   experienceLevel: 'midLevel',
   category: 'Sales',
   team: 'Software',
   yearsExperience: '3-5',
   prompt: 'Create a job description for an Account Executive position at a B2B SaaS company. Role focuses on full-cycle enterprise software sales with deal sizes ranging from $100K-$500K annually. Must have experience selling complex technical solutions to IT and business leaders. Strong understanding of software implementation processes, ROI analysis, and contract negotiations required. Proficient with Salesforce, sales engagement platforms, and virtual demonstration tools. Experience with consultative selling methodology and solution-based selling approach essential.'
 },
 'Channel Sales Manager': {
   minValue: 95000,
   maxValue: 115000,
   experienceLevel: 'midLevel',
   category: 'Sales',
   team: 'Software',
   yearsExperience: '4-6',
   prompt: 'Create a job description for a Channel Sales Manager position focusing on building and managing reseller partnerships. Role involves recruiting, enabling, and growing a network of value-added resellers and system integrators. Must have experience developing channel programs, partner enablement materials, and managing complex partner ecosystems. Strong understanding of channel economics, deal registration programs, and partner incentive structures required. Proficient with partner relationship management (PRM) systems and channel marketing strategies.'
 },
 'Medical Device Sales Representative': {
   minValue: 80000,
   maxValue: 115000,
   experienceLevel: 'midLevel',
   category: 'Sales',
   team: 'Medical Device',
   yearsExperience: '3-5',
   prompt: 'Create a job description for a Medical Device Sales Representative position. Role focuses on selling medical devices and equipment to hospitals, clinics, and healthcare providers. Must have experience navigating complex healthcare sales cycles and understanding of hospital procurement processes. Knowledge of medical terminology, surgical procedures, and healthcare regulations required. Experience with value analysis committees, clinical evaluations, and OR protocol essential. Must be comfortable with clinical training and supporting live procedures. Strong relationships with healthcare providers and procurement teams preferred.'
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
  'short': 400,
  'medium': 600,
  'long': 900
};

const COMPANIES = {
  'Tustin Recruiting': {
    name: 'Tustin Recruiting',
    sameAs: 'https://www.tustinrecruiting.com/',
    logo: '/images/LOGO1.png'
  }
};

const LOCATIONS = [
  { city: 'San Francisco', state: 'CA', zipCode: '94105' },
  { city: 'San Jose', state: 'CA', zipCode: '95110' },
  { city: 'Mountain View', state: 'CA', zipCode: '94043' },
  { city: 'Palo Alto', state: 'CA', zipCode: '94301' },
  { city: 'Sunnyvale', state: 'CA', zipCode: '94086' },
  { city: 'Santa Clara', state: 'CA', zipCode: '95050' },
  { city: 'Menlo Park', state: 'CA', zipCode: '94025' },
  { city: 'Cupertino', state: 'CA', zipCode: '95014' },
  { city: 'Redwood City', state: 'CA', zipCode: '94063' },
  { city: 'Oakland', state: 'CA', zipCode: '94612' },
  { city: 'Berkeley', state: 'CA', zipCode: '94704' },
  { city: 'Emeryville', state: 'CA', zipCode: '94608' },
  { city: 'South San Francisco', state: 'CA', zipCode: '94080' },
  { city: 'San Mateo', state: 'CA', zipCode: '94401' },
  { city: 'Foster City', state: 'CA', zipCode: '94404' },
  { city: 'Los Angeles', state: 'CA', zipCode: '90012' },
  { city: 'Santa Monica', state: 'CA', zipCode: '90401' },
  { city: 'Playa Vista', state: 'CA', zipCode: '90094' },
  { city: 'Venice', state: 'CA', zipCode: '90291' },
  { city: 'Culver City', state: 'CA', zipCode: '90232' },
  { city: 'El Segundo', state: 'CA', zipCode: '90245' },
  { city: 'Pasadena', state: 'CA', zipCode: '91101' },
  { city: 'Irvine', state: 'CA', zipCode: '92618' },
  { city: 'San Diego', state: 'CA', zipCode: '92101' },
  { city: 'Sacramento', state: 'CA', zipCode: '95814' },
  { city: 'Portland', state: 'OR', zipCode: '97204' },
  { city: 'Hillsboro', state: 'OR', zipCode: '97124' },
  { city: 'Beaverton', state: 'OR', zipCode: '97005' },
  { city: 'Seattle', state: 'WA', zipCode: '98104' },
  { city: 'Bellevue', state: 'WA', zipCode: '98004' },
  { city: 'Redmond', state: 'WA', zipCode: '98052' },
  { city: 'Kirkland', state: 'WA', zipCode: '98033' },
  { city: 'Fremont', state: 'CA', zipCode: '94538' },
  { city: 'Santa Barbara', state: 'CA', zipCode: '93101' },
  { city: 'Milpitas', state: 'CA', zipCode: '95035' },
  { city: 'Campbell', state: 'CA', zipCode: '95008' },
  { city: 'San Ramon', state: 'CA', zipCode: '94583' },
  { city: 'Pleasanton', state: 'CA', zipCode: '94566' },
  { city: 'Walnut Creek', state: 'CA', zipCode: '94596' },
  { city: 'Alameda', state: 'CA', zipCode: '94501' },
  { city: 'Brisbane', state: 'CA', zipCode: '94005' },
  { city: 'Burlingame', state: 'CA', zipCode: '94010' },
  { city: 'San Bruno', state: 'CA', zipCode: '94066' },
  { city: 'Marina del Rey', state: 'CA', zipCode: '90292' },
  { city: 'Glendale', state: 'CA', zipCode: '91203' },
  { city: 'Burbank', state: 'CA', zipCode: '91502' },
  { city: 'Costa Mesa', state: 'CA', zipCode: '92626' },
  { city: 'Newport Beach', state: 'CA', zipCode: '92660' },
  { city: 'Carlsbad', state: 'CA', zipCode: '92008' },
  { city: 'La Jolla', state: 'CA', zipCode: '92037' },
  { city: 'Vancouver', state: 'WA', zipCode: '98660' },
  { city: 'Renton', state: 'WA', zipCode: '98057' },
  { city: 'Bothell', state: 'WA', zipCode: '98011' },
  { city: 'Eugene', state: 'OR', zipCode: '97401' },
  { city: 'Tigard', state: 'OR', zipCode: '97223' },
  { city: 'Corvallis', state: 'OR', zipCode: '97330' },
  { city: 'Lake Oswego', state: 'OR', zipCode: '97034' },
  { city: 'Tualatin', state: 'OR', zipCode: '97062' },
  { city: 'Los Gatos', state: 'CA', zipCode: '95030' },
  { city: 'Morgan Hill', state: 'CA', zipCode: '95037' },
  { city: 'Dublin', state: 'CA', zipCode: '94568' },
  { city: 'Union City', state: 'CA', zipCode: '94587' },
  { city: 'Newark', state: 'CA', zipCode: '94560' },
  { city: 'Hayward', state: 'CA', zipCode: '94541' },
  { city: 'San Carlos', state: 'CA', zipCode: '94070' },
  { city: 'Belmont', state: 'CA', zipCode: '94002' },
  { city: 'Novato', state: 'CA', zipCode: '94945' },
  { city: 'San Rafael', state: 'CA', zipCode: '94901' },
  { city: 'West Hollywood', state: 'CA', zipCode: '90069' },
  { city: 'Beverly Hills', state: 'CA', zipCode: '90210' },
  { city: 'Manhattan Beach', state: 'CA', zipCode: '90266' },
  { city: 'Redondo Beach', state: 'CA', zipCode: '90277' },
  { city: 'Huntington Beach', state: 'CA', zipCode: '92648' },
  { city: 'Mission Viejo', state: 'CA', zipCode: '92691' },
  { city: 'Sorrento Valley', state: 'CA', zipCode: '92121' },
  { city: 'Del Mar', state: 'CA', zipCode: '92014' },
  { city: 'Issaquah', state: 'WA', zipCode: '98027' },
  { city: 'Sammamish', state: 'WA', zipCode: '98074' },
  { city: 'Mercer Island', state: 'WA', zipCode: '98040' },
  { city: 'Bend', state: 'OR', zipCode: '97701' },
  { city: 'Salem', state: 'OR', zipCode: '97301' },
  { city: 'Medford', state: 'OR', zipCode: '97501' },
  { city: 'Gresham', state: 'OR', zipCode: '97030' },
  { city: 'Los Angeles', state: 'CA', zipCode: '90012' },
  { city: 'Long Beach', state: 'CA', zipCode: '90802' },
  { city: 'Anaheim', state: 'CA', zipCode: '92805' },
  { city: 'Santa Ana', state: 'CA', zipCode: '92701' },
  { city: 'Irvine', state: 'CA', zipCode: '92618' },
  { city: 'Glendale', state: 'CA', zipCode: '91203' },
  { city: 'Huntington Beach', state: 'CA', zipCode: '92648' },
  { city: 'Santa Clarita', state: 'CA', zipCode: '91355' },
  { city: 'Garden Grove', state: 'CA', zipCode: '92840' },
  { city: 'Fullerton', state: 'CA', zipCode: '92832' },
  { city: 'Pasadena', state: 'CA', zipCode: '91101' },
  { city: 'Orange', state: 'CA', zipCode: '92868' },
  { city: 'Torrance', state: 'CA', zipCode: '90501' },
  { city: 'Costa Mesa', state: 'CA', zipCode: '92626' },
  { city: 'Burbank', state: 'CA', zipCode: '91502' },
  { city: 'Mission Viejo', state: 'CA', zipCode: '92691' },
  { city: 'Newport Beach', state: 'CA', zipCode: '92660' },
  { city: 'El Monte', state: 'CA', zipCode: '91731' },
  { city: 'Downey', state: 'CA', zipCode: '90241' },
  { city: 'Tustin', state: 'CA', zipCode: '92780' }
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
  const adjustment = Math.floor(Math.random() * 7000) - 2000;
  
  return {
    minValue: Math.round(baseMin + adjustment),
    maxValue: Math.round(baseMax + adjustment)
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

  const prompt = `${selectedStyle[1]} Create a ${selectedLength[0]} word job description in markdown format, do not include ticks to show the markdown:

${jobInfo.prompt}

This job description is for Tustin Recruiting's client, so please write it in from a third party recruiter perspective but minimize the use of the word "Tustin Recruiting" and instead use Our Client when referring to the company.

Start with a paragraph about the role in ${location.city}, ${location.state}. Name surrounding neighboring cities to ${location.city}. Never use h1 tags or headings before this paragraph. After the paragraph intro, go into h2 tags for Qualifications, Responsibilities, and Pay/Benefits, Use the following information to format the job:

- Responsibilities: ${jobInfo.responsibilities}
- Qualifications: ${jobInfo.qualifications}
- Salary Range: $${minValue}-$${maxValue} per year and benefits

Format in markdown without h1 tags. Do not include ticks or markdown formatting instructions. just show me the markdown.`;

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
