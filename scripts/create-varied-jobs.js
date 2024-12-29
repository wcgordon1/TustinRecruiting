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
    'Software Engineer': {
    minValue: 105000,
    maxValue: 125000,
    experienceLevel: 'midLevel',
    category: 'Software Engineering',
    team: 'Software',
    yearsExperience: '3-5',
    responsibilities: 'Design and develop scalable web applications, write clean and maintainable code in languages like Python, JavaScript, and Java, implement RESTful APIs and microservices architecture, optimize application performance and database queries, participate in code reviews and architectural discussions, mentor junior developers, collaborate with product managers and designers, deploy and monitor applications in cloud environments, implement security best practices, contribute to technical documentation',
    qualifications: 'BS/MS in Computer Science or related field, strong proficiency in multiple programming languages, experience with modern frameworks (React, Node.js, Django), knowledge of cloud platforms (AWS, Azure, GCP), understanding of CI/CD pipelines, experience with agile development methodologies, strong problem-solving skills, excellent communication abilities',
    prompt: 'Create a job description for a Full Stack Software Engineer specializing in web application development. Must have strong experience with modern JavaScript frameworks, backend technologies, and cloud services. Knowledge of microservices architecture, API design, and database optimization required. Position involves both independent development and mentoring junior team members. Must understand agile methodologies, Git workflows, and DevOps practices. Role includes participating in system design, code reviews, and technical documentation. Remote work options available with occasional on-site meetings. Strong focus on code quality, scalability, and maintainable solutions. Career growth opportunities include technical leadership and architecture roles.'
    },
    'DevOps Engineer': {
    minValue: 115000,
    maxValue: 135000,
    experienceLevel: 'senior',
    category: 'Software Engineering',
    team: 'Software',
    yearsExperience: '5+',
    responsibilities: 'Design and implement CI/CD pipelines, manage cloud infrastructure using Infrastructure as Code, optimize container orchestration systems, implement security and compliance measures, monitor system performance and reliability, automate deployment processes, manage database operations and scaling, implement disaster recovery solutions, coordinate with development teams on infrastructure needs, maintain documentation for all systems',
    qualifications: 'Strong experience with AWS/Azure/GCP, expertise in Docker and Kubernetes, proficiency in scripting languages (Python, Bash), experience with monitoring tools and log aggregation, knowledge of security best practices, strong understanding of networking concepts, experience with Infrastructure as Code tools like Terraform',
    prompt: 'Create a job description for a Senior DevOps Engineer focusing on cloud infrastructure and automation. Must have extensive experience with cloud platforms, container orchestration, and automated deployment systems. Expert knowledge of CI/CD pipelines, Infrastructure as Code, and system monitoring required. Position involves designing and implementing scalable cloud solutions, optimizing infrastructure costs, and maintaining high-availability systems. Must understand security best practices, compliance requirements, and disaster recovery strategies. Role includes mentoring junior engineers and collaborating with development teams. On-call rotation required for production support. Career path leads to Cloud Architecture or Site Reliability Engineering roles.'
    },
    'Data Scientist': {
    minValue: 110000,
    maxValue: 130000,
    experienceLevel: 'midLevel',
    category: 'Data Science',
    team: 'Analytics',
    yearsExperience: '3-7',
    responsibilities: 'Develop and implement machine learning models, analyze large datasets to extract insights, create predictive analytics solutions, build data pipelines for model deployment, collaborate with business stakeholders on requirements, present findings to executive teams, optimize model performance and accuracy, maintain documentation of methodologies, ensure data quality and integrity, implement A/B testing frameworks',
    qualifications: 'MS/PhD in Data Science, Statistics, or related field, strong programming skills in Python and R, experience with ML frameworks (TensorFlow, PyTorch), expertise in SQL and data manipulation, knowledge of big data technologies, strong statistical analysis skills, experience with data visualization tools, excellent communication abilities',
    prompt: 'Create a job description for a Data Scientist specializing in machine learning and predictive analytics. Must have strong background in statistical analysis, machine learning algorithms, and data modeling. Experience with Python, R, and major ML frameworks required. Position involves developing predictive models, analyzing complex datasets, and presenting insights to stakeholders. Must understand A/B testing, experimental design, and feature engineering. Role includes both independent research and collaboration with business teams. Strong focus on practical application of ML solutions to business problems. Career growth opportunities include Lead Data Scientist and ML Architecture roles.'
    },
    'Product Manager': {
    minValue: 100000,
    maxValue: 120000,
    experienceLevel: 'senior',
    category: 'Product Management',
    team: 'Software',
    yearsExperience: '5-8',
    responsibilities: 'Define product strategy and roadmap, conduct market research and competitive analysis, gather and prioritize product requirements, work closely with engineering teams on implementation, manage product launches and iterations, analyze product metrics and user feedback, present to stakeholders and executives, coordinate with marketing on product positioning, maintain product documentation, conduct user interviews and testing',
    qualifications: 'BA/BS in Business or Technical field, MBA preferred, proven experience in product management, strong analytical and data interpretation skills, excellent communication and presentation abilities, experience with agile methodologies, understanding of software development lifecycle, demonstrated leadership skills',
    prompt: 'Create a job description for a Senior Product Manager focusing on technology products. Must have strong experience in product strategy, market analysis, and agile development processes. Knowledge of user experience design, data analytics, and technical architecture required. Position involves leading product vision, coordinating with multiple teams, and driving business growth. Must excel at stakeholder management, strategic planning, and cross-functional leadership. Role includes defining product roadmap, analyzing metrics, and ensuring product-market fit. Regular travel to customer sites may be required. Career path leads to Director of Product or VP of Product roles.'
    },
    'UX Designer': {
    minValue: 110000,
    maxValue: 120000,
    experienceLevel: 'midLevel',
    category: 'Design',
    team: 'Software',
    yearsExperience: '3-6',
    responsibilities: 'Create user-centered designs for digital products, develop wireframes and prototypes, conduct user research and usability testing, design responsive interfaces for web and mobile applications, create and maintain design systems, collaborate with product and engineering teams, analyze user feedback and metrics, ensure consistency across platforms, create user flows and journey maps, maintain design documentation',
    qualifications: 'BA/BS in Design or related field, strong portfolio demonstrating UI/UX work, proficiency in design tools (Figma, Adobe XD), experience with interaction design patterns, knowledge of accessibility standards, understanding of front-end development principles, strong visual design skills, excellent communication abilities',
    prompt: 'Create a job description for a Senior UX/UI Designer specializing in digital products. Must have strong portfolio showing user-centered design process and results. Experience with modern design tools, prototyping, and user research required. Position involves creating intuitive interfaces, developing design systems, and ensuring consistent user experience. Must understand accessibility requirements, responsive design, and mobile-first principles. Role includes conducting user research, creating wireframes, and collaborating with development teams. Some remote work possible with regular on-site collaboration. Career growth opportunities include Lead Designer or Design Director roles.'
    },
    'Medical Device Sales': {
minValue: 90000,
maxValue: 110000,
experienceLevel: 'midLevel',
category: 'Sales',
team: 'Medical Device',
yearsExperience: '3-5',
responsibilities: 'Build and maintain relationships with healthcare providers and hospital systems, demonstrate complex medical devices to medical professionals, provide technical product training to clinical staff, develop territory growth strategies, manage sales pipeline in CRM, coordinate with clinical specialists for product evaluations, maintain detailed account records, analyze market trends and competitive landscape, ensure compliance with healthcare regulations, participate in medical conferences and trade shows',
qualifications: 'Bachelor degree in Life Sciences or Business, proven medical sales experience, strong understanding of hospital purchasing processes, knowledge of healthcare regulations and compliance requirements, excellent presentation and demonstration skills, ability to build relationships with medical professionals, strong technical aptitude for learning complex products, clean driving record and professional appearance, willingness to travel within territory',
prompt: 'Create a job description for a Medical Device Sales Representative specializing in surgical equipment. Must have proven track record in medical device or healthcare sales. Experience with hospital systems, purchasing committees, and healthcare regulations required. Position involves managing territory relationships, conducting product demonstrations, and providing clinical education. Must understand surgical workflows, hospital protocols, and value analysis processes. Role includes regular travel to healthcare facilities, attendance at medical conferences, and coordination with clinical specialists. Commission-based compensation with excellent earning potential. Career growth opportunities include Senior Sales Representative or Regional Sales Manager roles. Clean background check and drug screening required. Uncapped commission structure.'
},
'Enterprise Software Sales': {
minValue: 95000,
maxValue: 115000,
experienceLevel: 'senior',
category: 'Sales',
team: 'Software',
yearsExperience: '5-8',
responsibilities: 'Develop and execute strategic sales plans for enterprise accounts, build relationships with C-level executives, coordinate complex software demonstrations and proof of concepts, manage contract negotiations and procurement processes, collaborate with solution architects on technical requirements, forecast sales pipeline accuracy, maintain detailed opportunity documentation, coordinate with implementation teams, analyze competitive positioning, mentor junior sales staff',
qualifications: 'Bachelor degree in Business or related field, proven enterprise software sales experience, strong understanding of enterprise software and cloud solutions, experience with complex sales cycles and contract negotiations, excellent presentation and communication skills, proven track record of exceeding quota, proficiency with CRM systems and sales tools, strategic thinking and problem-solving abilities',
prompt: 'Create a job description for an Enterprise Software Sales Executive focusing on cloud solutions and digital transformation. Must have proven track record selling complex software solutions to enterprise organizations. Experience with multi-stakeholder sales processes, contract negotiations, and solution selling required. Position involves managing strategic accounts, developing new business, and maintaining executive relationships. Must understand cloud architecture, digital transformation strategies, and enterprise software implementation. Role includes coordinating with technical teams, managing complex sales cycles, and maintaining accurate forecasts. Significant earning potential through base salary plus commission structure. Travel required for client meetings and industry events. Career path leads to Regional Vice President or Global Account Executive roles.'
},
'Technical Sales Engineer': {
minValue: 85000,
maxValue: 105000,
experienceLevel: 'midLevel',
category: 'Sales',
team: 'Engineering',
yearsExperience: '3-6',
responsibilities: 'Provide technical expertise during sales process, conduct product demonstrations and proof of concepts, develop technical solutions for customer requirements, create detailed proposals and technical documentation, support customer implementations and integrations, analyze customer technical needs and challenges, collaborate with product development teams, maintain knowledge of industry trends and competitive solutions, provide technical training to sales team members, participate in technical conferences and trade shows',
qualifications: 'Bachelor degree in Engineering or Computer Science, experience in technical sales or solutions engineering, strong understanding of software development and system architecture, excellent problem-solving and analytical skills, ability to translate technical concepts for non-technical audiences, strong presentation and communication abilities, project management experience, customer-focused mindset',
prompt: 'Create a job description for a Technical Sales Engineer specializing in enterprise software solutions. Must have strong technical background and customer-facing experience. Expertise in software architecture, integration patterns, and solution design required. Position involves supporting complex sales cycles, conducting technical demonstrations, and designing customer solutions. Must understand various technology stacks, integration methods, and implementation approaches. Role includes creating technical documentation, supporting proof of concepts, and providing product expertise. Some travel required for customer meetings and technical conferences. Base salary plus bonus structure. Career growth opportunities include Senior Solutions Architect or Technical Sales Director roles. Strong focus on continuous learning to stay current with technology trends.'
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
}
};

const LOCATIONS = [
  // Orange County's 15 Most Populous Cities
  { city: 'Anaheim', state: 'CA', zipCode: '92805' },
  { city: 'Santa Ana', state: 'CA', zipCode: '92701' },
  { city: 'Irvine', state: 'CA', zipCode: '92618' },
  { city: 'Huntington Beach', state: 'CA', zipCode: '92648' },
  { city: 'Garden Grove', state: 'CA', zipCode: '92840' },
  { city: 'Orange', state: 'CA', zipCode: '92868' },
  { city: 'Fullerton', state: 'CA', zipCode: '92832' },
  { city: 'Costa Mesa', state: 'CA', zipCode: '92626' },
  { city: 'Mission Viejo', state: 'CA', zipCode: '92691' },
  { city: 'Westminster', state: 'CA', zipCode: '92683' },
  { city: 'Newport Beach', state: 'CA', zipCode: '92660' },
  { city: 'Lake Forest', state: 'CA', zipCode: '92630' },
  { city: 'Buena Park', state: 'CA', zipCode: '90620' },
  { city: 'Tustin', state: 'CA', zipCode: '92780' },
  { city: 'Yorba Linda', state: 'CA', zipCode: '92886' },

  // LA County West of Ontario's 15 Most Populous Cities
  { city: 'Los Angeles', state: 'CA', zipCode: '90012' },
  { city: 'Long Beach', state: 'CA', zipCode: '90802' },
  { city: 'Santa Clarita', state: 'CA', zipCode: '91355' },
  { city: 'Glendale', state: 'CA', zipCode: '91205' },
  { city: 'Torrance', state: 'CA', zipCode: '90503' },
  { city: 'Pasadena', state: 'CA', zipCode: '91101' },
  { city: 'West Covina', state: 'CA', zipCode: '91790' },
  { city: 'Norwalk', state: 'CA', zipCode: '90650' },
  { city: 'Burbank', state: 'CA', zipCode: '91502' },
  { city: 'Carson', state: 'CA', zipCode: '90745' },

  // San Diego County's 15 Most Populous Cities
  { city: 'San Diego', state: 'CA', zipCode: '92101' },
  { city: 'Chula Vista', state: 'CA', zipCode: '91910' },
  { city: 'Oceanside', state: 'CA', zipCode: '92054' },
  { city: 'Escondido', state: 'CA', zipCode: '92025' },
  { city: 'Carlsbad', state: 'CA', zipCode: '92008' },
  { city: 'Vista', state: 'CA', zipCode: '92081' },
  { city: 'San Marcos', state: 'CA', zipCode: '92069' },
  { city: 'Encinitas', state: 'CA', zipCode: '92024' },
  { city: 'Poway', state: 'CA', zipCode: '92064' },
  { city: 'Imperial Beach', state: 'CA', zipCode: '91932' }
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
