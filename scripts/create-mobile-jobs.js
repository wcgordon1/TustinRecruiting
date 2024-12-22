const OpenAI = require('openai');
const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');

require('dotenv').config({ 
  path: path.resolve(__dirname, 'config/.env.local')
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const JOB_TYPES = {
  'Senior iOS Engineer': {
    minValue: 140000,
    maxValue: 180000,
    experienceLevel: 'seniorLevel',
    category: 'Mobile',
    yearsExperience: '5-8',
    prompt: 'Create a job description for a Remote Senior iOS Engineer position. Focus on Swift, SwiftUI, and modern iOS development practices for a well-funded LA-based startup building a consumer mobile app.'
  },
  'React Native Engineer': {
    minValue: 130000,
    maxValue: 170000,
    experienceLevel: 'midLevel',
    category: 'Mobile',
    yearsExperience: '3-6',
    prompt: 'Create a job description for a Remote React Native Engineer position. Focus on cross-platform development, React Native, and TypeScript for a Series A startup in Los Angeles developing a social commerce platform.'
  },
  'Mobile DevOps Engineer': {
    minValue: 135000,
    maxValue: 175000,
    experienceLevel: 'seniorLevel',
    category: 'Mobile',
    yearsExperience: '4-7',
    prompt: 'Create a job description for a Remote Mobile DevOps Engineer position. Focus on CI/CD for mobile apps, automated testing, and app store deployment for a venture-backed LA startup.'
  },
  'Mobile Architecture Lead': {
    minValue: 150000,
    maxValue: 160000,
    experienceLevel: 'seniorLevel',
    category: 'Mobile',
    yearsExperience: '7-10',
    prompt: 'Create a job description for a Remote Mobile Architecture Lead position. Focus on technical leadership, mobile architecture decisions, and team mentoring for a well-funded LA startup scaling their mobile engineering team.'
  },
  'iOS Platform Engineer': {
    minValue: 135000,
    maxValue: 145000,
    experienceLevel: 'seniorLevel',
    category: 'Mobile',
    yearsExperience: '5-8',
    prompt: 'Create a job description for a Remote iOS Platform Engineer position. Focus on building shared frameworks, core infrastructure, and platform architecture for a Series B LA startup developing a suite of consumer apps.'
  },
  'Senior Mobile Application Developer': {
    minValue: 130000,
    maxValue: 150000,
    experienceLevel: 'seniorLevel',
    category: 'Mobile',
    yearsExperience: '5-8',
    prompt: 'Create a job description for a Remote Senior Mobile Application Developer position. Focus on iOS development with Swift, UIKit, and SwiftUI for a growing LA-based startup building a health and wellness platform.'
  },
  'Lead iOS Developer': {
    minValue: 140000,
    maxValue: 160000,
    experienceLevel: 'seniorLevel',
    category: 'Mobile',
    yearsExperience: '6-9',
    prompt: 'Create a job description for a Remote Lead iOS Developer position. Focus on technical leadership, iOS best practices, and mentoring junior developers for an LA startup scaling their flagship social media app.'
  }
};

const CERTIFICATIONS = {
  'Mobile Engineering': [
    'AWS Mobile Developer',
    'Google Mobile Web Specialist',
    'Apple Developer Certification',
    'React Native Certification',
    'Flutter Developer Certification',
    'Mobile App Security Certification',
    'Kubernetes Application Developer',
    'Azure Mobile Developer',
    'iOS Advanced Development',
    'Android Advanced Development'
  ]
};

const TECH = {
  'Mobile Engineering': [
    'Swift/SwiftUI',
    'React Native',
    'Flutter/Dart',
    'TypeScript',
    'Kotlin',
    'GraphQL',
    'REST APIs',
    'Firebase',
    'AWS Amplify',
    'CircleCI/Jenkins',
    'Fastlane',
    'TestFlight',
    'App Store Connect',
    'Play Store Console',
    'Redux/MobX',
    'Jest/Detox'
  ]
};

const WORK_ENVIRONMENTS = [
  { 
    type: 'Consumer Tech', 
    clients: ['Social Media Users', 'Digital Content Creators', 'Mobile-First Consumers'] 
  },
  { 
    type: 'E-commerce', 
    clients: ['Online Shoppers', 'Retail Partners', 'Digital Marketplaces'] 
  },
  { 
    type: 'FinTech', 
    clients: ['Mobile Banking Users', 'Digital Payment Users', 'Crypto Enthusiasts'] 
  }
];

const TEAM_STRUCTURES = [
  { size: 'Startup', structure: 'Part of a lean 4-6 person mobile team' },
  { size: 'Growing', structure: 'Leading a pod of 3-4 mobile developers' },
  { size: 'Scaling', structure: 'Working with cross-functional product teams' }
];

const BENEFITS = [
  {
    tier: 'Startup Premium',
    items: [
      'Competitive Equity Package',
      'Unlimited PTO',
      'Premium Health Insurance',
      'Home Office Stipend',
      'Learning & Development Budget',
      'Quarterly Team Offsites in LA'
    ],
    description: 'Full startup benefits package'
  }
];

const TRAINING_PROGRAMS = [
  { 
    type: 'Mobile Development', 
    programs: [
      'iOS Development Mastery',
      'Advanced Swift Programming',
      'Mobile Architecture Patterns',
      'App Store Optimization'
    ] 
  },
  { 
    type: 'Engineering Excellence', 
    programs: [
      'System Design for Mobile',
      'Performance Optimization',
      'Mobile Security Best Practices',
      'CI/CD for Mobile Apps'
    ] 
  },
  { 
    type: 'Leadership', 
    programs: [
      'Technical Team Leadership',
      'Mobile Product Strategy',
      'Remote Team Management',
      'Agile Development'
    ] 
  },
  { 
    type: 'Product Development', 
    programs: [
      'Mobile UX Design',
      'App Analytics and Metrics',
      'A/B Testing for Mobile',
      'User Research'
    ] 
  }
];

const STREET_NAMES = [
  'Main St',
  'First St',
  'Second St',
  'Olive St',
  'Broadway Blvd',
  'Market Blvd',
  'Valley Blvd',
  'Plaza Blvd',
  'Venture Blvd'
];

// Add this function before createAllJobs
function generateStreetAddress() {
  const number = Math.floor(Math.random() * (9999 - 100) + 100);
  const streetName = STREET_NAMES[Math.floor(Math.random() * STREET_NAMES.length)];
  return `${number} ${streetName}`;
}

// Function to get random items from array
function getRandomItems(array, count) {
  return [...array].sort(() => 0.5 - Math.random()).slice(0, count);
}

async function createAllJobs() {
  const locations = [
  { city: 'Philadelphia', state: 'PA', zipCode: '19102' },
  { city: 'San Antonio', state: 'TX', zipCode: '78205' },
  { city: 'San Diego', state: 'CA', zipCode: '92101' },
  { city: 'Dallas', state: 'TX', zipCode: '75201' },
  { city: 'San Jose', state: 'CA', zipCode: '95113' },
  { city: 'Austin', state: 'TX', zipCode: '78701' },
  { city: 'Jacksonville', state: 'FL', zipCode: '32202' },
  { city: 'Fort Worth', state: 'TX', zipCode: '76102' },
  { city: 'Columbus', state: 'OH', zipCode: '43215' },
  { city: 'San Francisco', state: 'CA', zipCode: '94102' },
  { city: 'Charlotte', state: 'NC', zipCode: '28202' },
  { city: 'Indianapolis', state: 'IN', zipCode: '46204' },
  { city: 'Seattle', state: 'WA', zipCode: '98104' },
  { city: 'Denver', state: 'CO', zipCode: '80202' },
  { city: 'Washington', state: 'DC', zipCode: '20004' },
  { city: 'Boston', state: 'MA', zipCode: '02108' },
  { city: 'El Paso', state: 'TX', zipCode: '79901' },
  { city: 'Detroit', state: 'MI', zipCode: '48226' },
  { city: 'Nashville', state: 'TN', zipCode: '37219' },
  { city: 'Portland', state: 'OR', zipCode: '97204' },
  { city: 'Memphis', state: 'TN', zipCode: '38103' },
  { city: 'Oklahoma City', state: 'OK', zipCode: '73102' },
  { city: 'Las Vegas', state: 'NV', zipCode: '89101' },
  { city: 'Louisville', state: 'KY', zipCode: '40202' },
  { city: 'Baltimore', state: 'MD', zipCode: '21202' },
  { city: 'Milwaukee', state: 'WI', zipCode: '53202' },
  { city: 'Albuquerque', state: 'NM', zipCode: '87102' },
  { city: 'Tucson', state: 'AZ', zipCode: '85701' },
  { city: 'Fresno', state: 'CA', zipCode: '93721' },
  { city: 'Sacramento', state: 'CA', zipCode: '95814' },
  { city: 'Mesa', state: 'AZ', zipCode: '85201' },
  { city: 'Kansas City', state: 'MO', zipCode: '64106' },
  { city: 'Atlanta', state: 'GA', zipCode: '30303' },
  { city: 'Long Beach', state: 'CA', zipCode: '90802' },
  { city: 'Colorado Springs', state: 'CO', zipCode: '80903' },
  { city: 'Raleigh', state: 'NC', zipCode: '27601' },
  { city: 'Miami', state: 'FL', zipCode: '33131' },
  { city: 'Virginia Beach', state: 'VA', zipCode: '23451' },
  { city: 'Omaha', state: 'NE', zipCode: '68102' },
  { city: 'Oakland', state: 'CA', zipCode: '94612' },
  { city: 'Minneapolis', state: 'MN', zipCode: '55415' },
  { city: 'Tulsa', state: 'OK', zipCode: '74103' },
  { city: 'Arlington', state: 'TX', zipCode: '76004' },
  { city: 'Tampa', state: 'FL', zipCode: '33602' },
  { city: 'New Orleans', state: 'LA', zipCode: '70112' }
  ];
  
  // For each location, create one random job
  for (const location of locations) {
    // Get random job type
    const jobTypes = Object.keys(JOB_TYPES);
    const randomJobType = jobTypes[Math.floor(Math.random() * jobTypes.length)];
    
    console.log(`Creating ${randomJobType} position in ${location.city}...`);
    await createJob(location, randomJobType);
    
    // Add delay between API calls
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('Done! Run npm run index-recent-jobs -- -days=0 to index new jobs');
}

// Rest of the functions from create-varied-jobs.js, but use the new constants
// The createJob and generateJobDescription functions remain largely the same
// Just ensure they use the mobile-specific constants

async function generateJobDescription(jobType, location, jobInfo) {
  const workEnv = WORK_ENVIRONMENTS[Math.floor(Math.random() * WORK_ENVIRONMENTS.length)];
  const teamStructure = TEAM_STRUCTURES[Math.floor(Math.random() * TEAM_STRUCTURES.length)];
  const training = TRAINING_PROGRAMS ? TRAINING_PROGRAMS[Math.floor(Math.random() * TRAINING_PROGRAMS.length)] : null;
  
  const benefits = BENEFITS[0]; // Only one benefits tier for mobile jobs
  const requiredCerts = getRandomItems(CERTIFICATIONS['Mobile Engineering'], 2);
  const preferredCerts = getRandomItems(CERTIFICATIONS['Mobile Engineering'], 2);
  const tools = getRandomItems(TECH['Mobile Engineering'], 6);

  const schedule = 'Full Time';

  const prompt = `
Create a detailed job description for a Remote ${jobType} position in ${location.city}, ${location.state}. 
Format in markdown with clear sections. Show me the markdown code and do not use ticks to display the markdown or repeat your instructions. This is a remote position with a well-funded LA-based startup.

Start with a paragraph about the company and the role. Do not use headings before hand. then, go into the rest of the content using h2, h3, and h4 headings. Never use h1 headings. 
Key Details:
- Experience Required: ${jobInfo.yearsExperience} years
- Work Location: 100% Remote (US-Based)
- Schedule: ${schedule}
- Work Environment: ${workEnv.type} (${workEnv.clients.join(', ')})
- Team Structure: ${teamStructure.structure}
- Training: ${training?.type || 'Comprehensive'} focused

## Remote Work Requirements
- Strong communication skills for remote collaboration
- Experience with remote work tools and practices
- Self-motivated and able to work independently
- Home office setup with reliable internet

Required Skills & Certifications:
- Required Certifications: ${requiredCerts.join(', ')}
- Preferred Certifications: ${preferredCerts.join(', ')}
- Technology Stack: ${tools.join(', ')}

Structure the response using these sections:
## Position Overview
## Key Responsibilities
## Required Qualifications
## Preferred Qualifications
## Benefits & Perks
## Growth & Development

Emphasize remote work culture, virtual collaboration, and distributed team dynamics. Focus on growth opportunities in a well-funded startup environment.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.8,
  });

  return {
    fullDescription: completion.choices[0].message.content,
    benefits,
    schedule,
    requiredCerts,
    preferredCerts,
    workEnvironment: workEnv,
    teamStructure: teamStructure.structure,
    travelRequirement: 'Remote',
    trainingProgram: training
  };
}

async function createJob(location, jobType) {
  const today = new Date();
  const validThrough = new Date(today);
  validThrough.setDate(validThrough.getDate() + Math.floor(Math.random() * (45 - 31 + 1) + 31));

  const jobInfo = JOB_TYPES[jobType];
  const jobId = `${jobType.substring(0, 4).toUpperCase()}-${Math.random().toString(36).substring(2, 8)}`;

  // Generate random salary adjustment between -5000 and +15000
  const salaryAdjustment = Math.floor(Math.random() * 20000) - 5000;
  const adjustedMinValue = jobInfo.minValue + salaryAdjustment;
  const adjustedMaxValue = jobInfo.maxValue + salaryAdjustment;

  // Generate unique description with variations
  const { 
    fullDescription, 
    benefits, 
    schedule, 
    requiredCerts, 
    preferredCerts,
    workEnvironment,
    teamStructure,
    travelRequirement,
    trainingProgram
  } = await generateJobDescription(jobType, location, jobInfo);

  // Create frontmatter data
  const jobData = {
    position: jobType,
    description: fullDescription.substring(0, 500) + '...',
    location: `${location.city}, ${location.state}`,
    team: 'Mobile',
    schedule: 'Full Time',
    requiredCertifications: requiredCerts,
    preferredCertifications: preferredCerts,
    benefits: benefits.items,
    datePosted: today.toISOString(),
    validThrough: validThrough.toISOString(),
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      name: 'Tustin Recruiting',
      sameAs: 'https://www.tustinrecruiting.com/',
      logo: '/images/LOGO1.png'
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
      value: Math.floor((adjustedMinValue + adjustedMaxValue) / 2),
      minValue: adjustedMinValue,
      maxValue: adjustedMaxValue,
      unitText: 'YEAR'
    },
    experienceRequirements: jobInfo.experienceLevel,
    occupationalCategory: 'Software Engineering',
    identifier: {
      name: 'Tustin Recruiting',
      value: jobId
    },
    featured: Math.random() < 0.2,
    email: [
      'will@tustinrecruiting.com',
      'john@tustinrecruiting.com'
    ],
    workEnvironment,
    teamStructure,
    travelRequirements: 'Remote',
    trainingProgram
  };

  // Create the markdown content
  const frontmatter = matter.stringify('', jobData);
  const finalContent = `${frontmatter}\n\n${fullDescription}`;

  const filename = `tr-${jobType.toLowerCase().replace(/\s+/g, '-')}-${location.city.toLowerCase().replace(/\s+/g, '-')}-${jobId.toLowerCase()}.md`;
  const filePath = path.join(__dirname, '..', 'src', 'content', 'jobs', filename);
  fs.writeFileSync(filePath, finalContent);

  console.log(`Created ${jobType} in ${location.city}: ${filename}`);
}

createAllJobs().catch(console.error);