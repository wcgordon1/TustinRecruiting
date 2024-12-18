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

const LOCATIONS = [

  // Texas
  { city: 'Houston', state: 'TX', zipCode: '77002' },
  { city: 'San Antonio', state: 'TX', zipCode: '78205' },
  { city: 'Dallas', state: 'TX', zipCode: '75201' },
  { city: 'Austin', state: 'TX', zipCode: '78701' },
  { city: 'Fort Worth', state: 'TX', zipCode: '76102' },
];

const TEAMS = ['Commercial'];

const JOB_TYPES = {
  'Inside Sales Rep': {
    minValue: 55000,
    maxValue: 65000,
    experienceLevel: 'entryLevel',
    category: 'Sales',
    yearsExperience: '1-2',
    prompt: 'Create a job description for an Inside Sales Representative role at a growing tech company. Focus on handling inbound leads, conducting product demos, and closing small to mid-sized deals for enterprise software.'
  },
  'Business Development Representative': {
    minValue: 52000,
    maxValue: 60000,
    experienceLevel: 'entryLevel',
    category: 'Sales',
    yearsExperience: '0-1',
    prompt: 'Create a job description for a Business Development Representative in tech sales. Focus on outbound prospecting, social selling, and pipeline building for enterprise software solutions.'
  },
  'Account Executive': {
    minValue: 55000,
    maxValue: 70000,
    experienceLevel: 'juniorLevel',
    category: 'Sales',
    yearsExperience: '1-3',
    prompt: 'Create a job description for a SaaS Account Executive position. Focus on managing small to medium accounts, upselling existing customers, and developing new business relationships in the tech sector.'
  }
};

const BENEFITS = [
  {
    tier: 'Advanced',
    items: ['Premium Health Insurance', '4 Weeks PTO', '401k Match', 'Quarterly Bonuses', 'Vehicle Allowance'],
    description: 'Comprehensive benefits package'
  },
  {
    tier: 'Standard Plus',
    items: ['Full Health Insurance', '3 Weeks PTO', '401k Match', 'Performance Bonuses', 'Tool Allowance'],
    description: 'Competitive benefits package'
  }
];

const CERTIFICATIONS = {
  'Sales': [
    'Salesforce Certified Administrator',
    'HubSpot Sales Software Certification',
    'AWS Cloud Practitioner',
    'Google Analytics Certification'
  ],
  'Business Development': [
    'SPIN Selling Certification',
    'Sandler Training Certificate',
    'LinkedIn Sales Navigator Certification',
    'Challenger Sales Certification'
  ]
};

const TECH = {
  'Sales': [
    'Salesforce',
    'HubSpot',
    'Outreach.io',
    'LinkedIn Sales Navigator',
    'ZoomInfo'
  ],
  'Business Development': [
    'SalesLoft',
    'Gong.io',
    'Apollo.io',
    'Clearbit',
    'Lusha'
  ],
  'Sales Operations': [
    'Tableau',
    'Clari',
    'Salesloft',
    'Drift',
    'DocuSign'
  ]
};

const WORK_ENVIRONMENTS = [
  { 
    type: 'SaaS', 
    clients: ['Enterprise Software Companies', 'Cloud Platforms', 'B2B Tech Companies'] 
  },
  { 
    type: 'Fintech', 
    clients: ['Financial Services', 'Payment Processors', 'Digital Banking'] 
  },
  { 
    type: 'Healthcare Tech', 
    clients: ['Digital Health Platforms', 'Medical Software', 'Healthcare Analytics'] 
  },
  { 
    type: 'MarTech', 
    clients: ['Marketing Platforms', 'Analytics Companies', 'Automation Tools'] 
  },
  { 
    type: 'Security Software', 
    clients: ['Cybersecurity Firms', 'Identity Management', 'Cloud Security'] 
  }
];

const TEAM_STRUCTURES = [
  { size: 'Small', structure: 'Part of a 3-5 person specialized team' },
  { size: 'Medium', structure: 'Leading a team of 4-6 technicians' },
  { size: 'Large', structure: 'Member of a 10+ person regional team' },
  { size: 'Matrix', structure: 'Working across multiple project teams' }
];

const TRAVEL_REQUIREMENTS = [
  { range: 'Local', description: 'Within 30 miles of home base' },
  { range: 'Regional', description: 'Up to 100 mile radius' },
  { range: 'Multi-City', description: 'Regular travel to nearby major cities' }
];

const TRAINING_PROGRAMS = [
  { 
    type: 'Sales Development', 
    programs: [
      'Sales Methodology Training',
      'Product Knowledge Certification',
      'Cold Calling Mastery',
      'Social Selling Techniques'
    ] 
  },
  { 
    type: 'Technical', 
    programs: [
      'CRM Platform Certification',
      'Sales Analytics Tools',
      'Sales Automation Systems',
      'Business Intelligence Tools'
    ] 
  },
  { 
    type: 'Professional Growth', 
    programs: [
      'Leadership Development',
      'Negotiation Skills',
      'Business Communication',
      'Time Management'
    ] 
  },
  { 
    type: 'Industry', 
    programs: [
      'Tech Industry Fundamentals',
      'SaaS Business Models',
      'Market Analysis',
      'Competitive Intelligence'
    ] 
  }
];

const DESCRIPTION_STYLES = {
  concise: {
    length: 300,
    format: 'bullet-focused',
    sections: ['Overview', 'Key Responsibilities', 'Requirements', 'Benefits'],
    style: 'Direct and brief'
  },
  standard: {
    length: 500,
    format: 'mixed',
    sections: ['Position Overview', 'Key Responsibilities', 'Required Qualifications', 'Preferred Qualifications', 'Benefits & Perks', 'Growth & Development'],
    style: 'Balanced mix of paragraphs and bullets'
  },
  detailed: {
    length: 800,
    format: 'narrative',
    sections: ['About the Role', 'What You\'ll Do', 'What You\'ll Need', 'Nice to Have', 'Why Join Us', 'Our Tech Stack', 'Benefits & Growth'],
    style: 'Story-telling with detailed context'
  }
};

const STREET_TYPES = ['Main St.', 'Maple Ave.', 'Sierra Pkwy.'];

async function generateJobDescription(jobType, location, jobInfo) {
  const workEnv = WORK_ENVIRONMENTS[Math.floor(Math.random() * WORK_ENVIRONMENTS.length)];
  const teamStructure = TEAM_STRUCTURES[Math.floor(Math.random() * TEAM_STRUCTURES.length)];
  const travel = TRAVEL_REQUIREMENTS[Math.floor(Math.random() * TRAVEL_REQUIREMENTS.length)];
  const training = TRAINING_PROGRAMS[Math.floor(Math.random() * TRAINING_PROGRAMS.length)];
  
  const benefits = BENEFITS[Math.floor(Math.random() * BENEFITS.length)];
  const requiredCerts = CERTIFICATIONS[jobInfo.category]
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);
  const preferredCerts = CERTIFICATIONS[jobInfo.category]
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);
  const tools = TECH[jobInfo.category]
    .sort(() => 0.5 - Math.random());

  const scheduleTypes = [
    'First Shift (6:00 AM - 2:30 PM)',
    'Second Shift (2:00 PM - 10:30 PM)',
    'Flexible Hours',
    'Standard Business Hours'
  ];
  const schedule = scheduleTypes[Math.floor(Math.random() * scheduleTypes.length)];

  // Randomly select a description style
  const styleKey = Object.keys(DESCRIPTION_STYLES)[Math.floor(Math.random() * Object.keys(DESCRIPTION_STYLES).length)];
  const styleGuide = DESCRIPTION_STYLES[styleKey];

  const prompt = `
Create a ${styleGuide.style} job description for a ${jobType} position in ${location.city}, ${location.state}. 
Use a ${styleGuide.format} format with approximately ${styleGuide.length} words.

Key Details:
- Experience Required: ${jobInfo.yearsExperience} years
- Schedule: ${schedule}
- Work Environment: ${workEnv.type} (${workEnv.clients.join(', ')})
- Team Structure: ${teamStructure.structure}
- Travel: ${travel.description}
- Training: ${training.type} focused

Required Skills & Certifications:
- Required Certifications: ${requiredCerts.join(', ')}
- Preferred Certifications: ${preferredCerts.join(', ')}
- Technology Stack: ${tools.join(', ')}
- Benefits Tier: ${benefits.tier}

Structure the response using these sections:
${styleGuide.sections.map(section => `## ${section}`).join('\n')}

Style Guidelines:
- Format: ${styleGuide.format}
- Length: Approximately ${styleGuide.length} words
- Tone: ${styleGuide.style}

Make the description engaging and market-specific. Focus on growth opportunities and tech industry dynamics in ${location.city}.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.9,
  });

  return {
    fullDescription: completion.choices[0].message.content,
    benefits,
    schedule,
    requiredCerts,
    preferredCerts,
    workEnvironment: workEnv,
    teamStructure: teamStructure.structure,
    travelRequirement: travel.description,
    trainingProgram: {
      focus: training.type,
      programs: training.programs
    }
  };
}

function generateStreetAddress() {
  const number = Math.floor(Math.random() * (12000 - 1000) + 1000);
  const streetType = STREET_TYPES[Math.floor(Math.random() * STREET_TYPES.length)];
  return `${number} ${streetType}`;
}

async function createJob(location, jobType) {
  const today = new Date();
  const validThrough = new Date(today);
  validThrough.setDate(validThrough.getDate() + Math.floor(Math.random() * (45 - 30 + 1) + 30));

  const jobInfo = JOB_TYPES[jobType];
  const jobId = `${jobType.substring(0, 4).toUpperCase()}-${Math.random().toString(36).substring(2, 8)}`;

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
  
  // Add salary variation based on location and experience
  const locationMultiplier = Math.random() * (1.15 - 0.85) + 0.85;
  const experienceMultiplier = 1 + (parseInt(jobInfo.yearsExperience.split('-')[0]) * 0.02);
  
  const adjustedMinValue = Math.round(jobInfo.minValue * locationMultiplier * experienceMultiplier);
  const adjustedMaxValue = Math.round(jobInfo.maxValue * locationMultiplier * experienceMultiplier);

  // Create frontmatter data with variations - ensure all properties are defined
  const jobData = {
    position: jobType || 'Untitled Position',
    description: fullDescription ? 
      `${fullDescription.substring(0, DESCRIPTION_STYLES[
        Object.keys(DESCRIPTION_STYLES)[Math.floor(Math.random() * Object.keys(DESCRIPTION_STYLES).length)]
      ].length)}...` : 
      'No description available',
    location: `${location.city}, ${location.state}`,
    team: 'Software',
    schedule: schedule || 'Full Time',
    requiredCertifications: requiredCerts || [],
    preferredCertifications: preferredCerts || [],
    benefits: benefits?.items || [],
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
      unitText: 'HOUR'
    },
    experienceRequirements: jobInfo.experienceLevel || 'midLevel',
    occupationalCategory: jobInfo.category || 'General',
    identifier: {
      name: 'Tustin Recruiting',
      value: jobId
    },
    featured: Math.random() < 0.2,
    email: [
      'will@bestelectricianjobs.com',
      'john@tustinrecruiting.com'
    ],
    workEnvironment: workEnvironment ? {
      type: workEnvironment.type || 'Commercial',
      clients: workEnvironment.clients || []
    } : {
      type: 'Software',
      clients: []
    },
    teamStructure: teamStructure || 'Standard Team',
    travelRequirements: travelRequirement || 'Local Area',
    trainingProgram: trainingProgram ? {
      focus: trainingProgram.focus || 'General',
      programs: trainingProgram.programs || []
    } : {
      focus: 'General',
      programs: []
    }
  };

  // Create the markdown content
  const frontmatter = matter.stringify('', jobData);
  const finalContent = `${frontmatter}\n\n${fullDescription || 'No description available'}`;

  const filename = `tr-${jobType.toLowerCase().replace(/\s+/g, '-')}-${location.city.toLowerCase().replace(/\s+/g, '-')}-${jobId.toLowerCase().replace(/\s+/g, '-')}.md`;
  const filePath = path.join(__dirname, '..', 'src', 'content', 'jobs', filename);
  fs.writeFileSync(filePath, finalContent);

  console.log(`Created ${jobType} in ${location.city}: ${filename}`);
}

async function createAllJobs() {
  // Create a pool of job types
  const jobTypes = Object.keys(JOB_TYPES);
  
  // Process each location with a random job type
  for (const location of LOCATIONS) {
    // Select a random job type for this location
    const randomJobType = jobTypes[Math.floor(Math.random() * jobTypes.length)];
    
    console.log(`Creating ${randomJobType} in ${location.city}...`);
    await createJob(location, randomJobType);
    
    // Add delay between API calls
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('Done! Run npm run index-recent-jobs -- -days=0 to index new jobs');
}

createAllJobs().catch(console.error); 