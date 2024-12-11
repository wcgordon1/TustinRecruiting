const OpenAI = require('openai');
const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');

require('dotenv').config({ 
  path: path.resolve(__dirname, 'config/.env.local')
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// New random variables
const COMPANY_SIZES = ['Small Startup', 'Mid-size Company', 'Large Enterprise', 'Fortune 500'];
const WORK_ENVIRONMENTS = ['Fast-paced', 'Collaborative', 'Innovation-focused', 'Traditional'];
const TECH_STACKS = ['Modern Tech Stack', 'Legacy Systems', 'Hybrid Infrastructure', 'Cloud-native'];

// Expanded TEAMS array
const TEAMS = [
  'Data',
  'Artificial Intelligence',
  'Cloud Infrastructure',
  'DevOps',
];

const LOCATIONS = [
    { city: 'Los Angeles', state: 'CA', zipCode: '90001', multiplier: 1.3 },
    { city: 'San Francisco', state: 'CA', zipCode: '94105', multiplier: 1.5 },
    { city: 'Oakland', state: 'CA', zipCode: '94601', multiplier: 1.3 },
    { city: 'San Diego', state: 'CA', zipCode: '92101', multiplier: 1.2 },
    { city: 'San Jose', state: 'CA', zipCode: '95113', multiplier: 1.4 },
    { city: 'Irvine', state: 'CA', zipCode: '92618', multiplier: 1.25 },
    { city: 'Sacramento', state: 'CA', zipCode: '95814', multiplier: 1.15 },
    { city: 'Chicago', state: 'IL', zipCode: '60601', multiplier: 1.2 },
    { city: 'Denver', state: 'CO', zipCode: '80201', multiplier: 1.1 },
    { city: 'Atlanta', state: 'GA', zipCode: '30301', multiplier: 1.1 },
    { city: 'Houston', state: 'TX', zipCode: '77001', multiplier: 1.1 },
    { city: 'Seattle', state: 'WA', zipCode: '98101', multiplier: 1.3 },
    { city: 'Miami', state: 'FL', zipCode: '33101', multiplier: 1.1 },
    { city: 'Boston', state: 'MA', zipCode: '02101', multiplier: 1.25 },
    { city: 'New York', state: 'NY', zipCode: '10001', multiplier: 1.4 }
];

const JOB_TYPES = {
  'Account Executive': {
    minValue: 75000,
    maxValue: 85000,
    experienceLevel: 'seniorLevel',
    category: 'Sales',
    prompt: 'Create a detailed job description for a Fire Alarm Technician. Include experience with troubleshooting and maintenance of existing fire alarm systems.'
  },
  'Enterprise Account Executive': {
    minValue: 85000,
    maxValue: 105000,
    experienceLevel: 'seniorLevel',
    category: 'Sales',
    prompt: 'Create a detailed job description for a Fire Alarm Installer focusing on new construction installations.'
  }
};

async function generateJobDescription(jobType, location, companySize, workEnv, techStack, team) {
  const prompt = `
Create a detailed job description for:

Position: ${jobType}
Location: ${location.city}, ${location.state}
Company Size: ${companySize}
Work Environment: ${workEnv}
Technology Stack: ${techStack}
Team: ${team}

Include:
- Key responsibilities specific to the Company Size: ${companySize}, Work Environment: ${workEnv}, Technology Stack: ${techStack}, Team: ${team}
- Required qualifications and certifications
- Specific tools and equipment knowledge
- Safety requirements
- Benefits and growth opportunities
- Team culture and work environment details
- Technology and systems used

The description should be detailed and focus on ${location.city}, ${location.state} and Company Size: ${companySize}, Work Environment: ${workEnv}.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return completion.choices[0].message.content;
}

async function createJob(jobType, location) {
  // Select random constants for this job
  const companySize = COMPANY_SIZES[Math.floor(Math.random() * COMPANY_SIZES.length)];
  const workEnv = WORK_ENVIRONMENTS[Math.floor(Math.random() * WORK_ENVIRONMENTS.length)];
  const techStack = TECH_STACKS[Math.floor(Math.random() * TECH_STACKS.length)];
  const team = TEAMS[Math.floor(Math.random() * TEAMS.length)];

  // Calculate salary adjustments
  const companySizeMultiplier = {
    'Small Startup': 0.9,
    'Mid-size Company': 1.0,
    'Large Enterprise': 1.15,
    'Fortune 500': 1.25
  }[companySize];

  const baseJob = JOB_TYPES[jobType];
  const adjustedMin = Math.round(baseJob.minValue * location.multiplier * companySizeMultiplier);
  const adjustedMax = Math.round(baseJob.maxValue * location.multiplier * companySizeMultiplier);

  const today = new Date();
  const validThrough = new Date(today);
  validThrough.setDate(validThrough.getDate() + 60);

  const jobId = `${jobType.substring(0, 4).toUpperCase()}-${Math.random().toString(36).substring(2, 8)}`.replace(/\s+/g, '-');

  const fullDescription = await generateJobDescription(jobType, location, companySize, workEnv, techStack, team);

  const jobData = {
    position: jobType,
    description: `${fullDescription.substring(0, 500)}...`,
    location: `${location.city}, ${location.state}`,
    team,
    datePosted: today.toISOString(),
    validThrough: validThrough.toISOString(),
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      name: 'Tustin Recruiting',
      sameAs: 'https://www.tustinrecruiting.com',
      logo: '/images/LOGO1.png'
    },
    jobLocation: {
      streetAddress: '123 Main Street',
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.zipCode,
      addressCountry: 'USA'
    },
    baseSalary: {
      currency: 'USD',
      value: Math.floor((adjustedMin + adjustedMax) / 2),
      minValue: adjustedMin,
      maxValue: adjustedMax,
      unitText: 'YEAR'
    },
    experienceRequirements: baseJob.experienceLevel,
    occupationalCategory: baseJob.category,
    identifier: {
      name: 'Tustin Recruiting',
      value: jobId
    },
    featured: Math.random() < 0.2,
    email: ['hello@tustinrecruiting.com', 'john@tustinrecruiting.com']
  };

  const frontmatter = matter.stringify('', jobData);
  const finalContent = `${frontmatter}\n\n${fullDescription}`;

  const filename = `tr-${jobType.toLowerCase().replace(/\s+/g, '-')}-${location.city.toLowerCase()}-${jobId.toLowerCase()}.md`;
  const filePath = path.join(__dirname, '..', 'src', 'content', 'jobs', filename);
  
  fs.writeFileSync(filePath, finalContent);
  console.log(`Created ${jobType} in ${location.city}: ${filename}`);
}

async function createAllJobs() {
  for (const location of LOCATIONS) {
    // Randomly select 2 job types for this location
    const selectedJobTypes = Object.keys(JOB_TYPES)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    console.log(`Creating 2 random jobs in ${location.city}...`);
    
    for (const jobType of selectedJobTypes) {
      await createJob(jobType, location);
      // Add delay between API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log('Done! Run npm run index-recent-jobs -- -days=0 to index new jobs');
}

createAllJobs().catch(console.error); 