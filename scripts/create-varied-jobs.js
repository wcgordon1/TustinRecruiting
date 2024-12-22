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
  { city: 'Downey', state: 'CA', zipCode: '90241', county: 'Los Angeles' },
  { city: 'Inglewood', state: 'CA', zipCode: '90301', county: 'Los Angeles' },
  { city: 'West Covina', state: 'CA', zipCode: '91790', county: 'Los Angeles' },
  { city: 'Norwalk', state: 'CA', zipCode: '90650', county: 'Los Angeles' },
  { city: 'Burbank', state: 'CA', zipCode: '91502', county: 'Los Angeles' },
  { city: 'Compton', state: 'CA', zipCode: '90220', county: 'Los Angeles' },
  { city: 'Carson', state: 'CA', zipCode: '90745', county: 'Los Angeles' },
  { city: 'Santa Monica', state: 'CA', zipCode: '90401', county: 'Los Angeles' },
  { city: 'Whittier', state: 'CA', zipCode: '90602', county: 'Los Angeles' },
  { city: 'Hawthorne', state: 'CA', zipCode: '90250', county: 'Los Angeles' },
  { city: 'Alhambra', state: 'CA', zipCode: '91801', county: 'Los Angeles' },
  { city: 'Lakewood', state: 'CA', zipCode: '90712', county: 'Los Angeles' },
  { city: 'Bellflower', state: 'CA', zipCode: '90706', county: 'Los Angeles' },

  // Orange County
  { city: 'Anaheim', state: 'CA', zipCode: '92805', county: 'Orange' },
  { city: 'Santa Ana', state: 'CA', zipCode: '92701', county: 'Orange' },
  { city: 'Irvine', state: 'CA', zipCode: '92612', county: 'Orange' },
  { city: 'Huntington Beach', state: 'CA', zipCode: '92648', county: 'Orange' },
  { city: 'Garden Grove', state: 'CA', zipCode: '92840', county: 'Orange' },
  { city: 'Orange', state: 'CA', zipCode: '92868', county: 'Orange' },
  { city: 'Fullerton', state: 'CA', zipCode: '92832', county: 'Orange' },
  { city: 'Costa Mesa', state: 'CA', zipCode: '92626', county: 'Orange' },
  { city: 'Mission Viejo', state: 'CA', zipCode: '92691', county: 'Orange' },
  { city: 'Westminster', state: 'CA', zipCode: '92683', county: 'Orange' },
  { city: 'Newport Beach', state: 'CA', zipCode: '92660', county: 'Orange' },
  { city: 'Buena Park', state: 'CA', zipCode: '90620', county: 'Orange' },
  { city: 'Lake Forest', state: 'CA', zipCode: '92630', county: 'Orange' },
  { city: 'Tustin', state: 'CA', zipCode: '92780', county: 'Orange' },


  // San Diego County
  { city: 'San Diego', state: 'CA', zipCode: '92101', county: 'San Diego' },
  { city: 'Chula Vista', state: 'CA', zipCode: '91910', county: 'San Diego' },
  { city: 'Oceanside', state: 'CA', zipCode: '92054', county: 'San Diego' },
  { city: 'Escondido', state: 'CA', zipCode: '92025', county: 'San Diego' },
  { city: 'Carlsbad', state: 'CA', zipCode: '92008', county: 'San Diego' },
  { city: 'El Cajon', state: 'CA', zipCode: '92020', county: 'San Diego' },
  { city: 'Vista', state: 'CA', zipCode: '92084', county: 'San Diego' },
  { city: 'San Marcos', state: 'CA', zipCode: '92069', county: 'San Diego' },
  { city: 'Encinitas', state: 'CA', zipCode: '92024', county: 'San Diego' },
  { city: 'National City', state: 'CA', zipCode: '91950', county: 'San Diego' },
  { city: 'La Mesa', state: 'CA', zipCode: '91942', county: 'San Diego' },
  { city: 'Santee', state: 'CA', zipCode: '92071', county: 'San Diego' },
  { city: 'Poway', state: 'CA', zipCode: '92064', county: 'San Diego' }
];

const TEAMS = ['Commercial'];

const JOB_TYPES = {
  // B2B Sales Roles
  'Enterprise Account Executive': {
    minValue: 75000,
    maxValue: 95000,
    experienceLevel: 'midLevel',
    category: 'Sales',
    yearsExperience: '3-5',
    prompt: 'Create a job description for an Enterprise Account Executive role focusing on B2B software sales, managing large enterprise accounts, and complex sales cycles.'
  },
  'Sales Operations Manager': {
    minValue: 85000,
    maxValue: 110000,
    experienceLevel: 'seniorLevel',
    category: 'Sales',
    yearsExperience: '5-7',
    prompt: 'Create a job description for a Sales Operations Manager overseeing sales processes, CRM management, and sales analytics for a B2B tech company.'
  },
  'Channel Partner Manager': {
    minValue: 80000,
    maxValue: 100000,
    experienceLevel: 'midLevel',
    category: 'Sales',
    yearsExperience: '4-6',
    prompt: 'Create a job description for a Channel Partner Manager focused on developing and managing B2B partnerships and reseller relationships.'
  },

  // Software Roles
  'Full Stack Developer': {
    minValue: 95000,
    maxValue: 130000,
    experienceLevel: 'midLevel',
    category: 'Engineering',
    yearsExperience: '3-5',
    prompt: 'Create a job description for a Remote Full Stack Developer working with React, Node.js, and cloud technologies in a modern development environment.'
  },
  'DevOps Engineer': {
    minValue: 110000,
    maxValue: 140000,
    experienceLevel: 'seniorLevel',
    category: 'Engineering',
    yearsExperience: '4-7',
    prompt: 'Create a job description for a Remote DevOps Engineer focusing on CI/CD, infrastructure as code, and cloud platform management.'
  },
  'Mobile App Developer': {
    minValue: 90000,
    maxValue: 125000,
    experienceLevel: 'midLevel',
    category: 'Engineering',
    yearsExperience: '3-6',
    prompt: 'Create a job description for a Remote Mobile App Developer specializing in React Native and cross-platform development.'
  },

  // AI Roles
  'Machine Learning Engineer': {
    minValue: 150000,
    maxValue: 160000,
    experienceLevel: 'seniorLevel',
    category: 'AI',
    yearsExperience: '4-7',
    prompt: 'Create a job description for a Remote Machine Learning Engineer focusing on model development, deployment, and MLOps practices.'
  },
  'AI Product Manager': {
    minValue: 140000,
    maxValue: 150000,
    experienceLevel: 'seniorLevel',
    category: 'AI',
    yearsExperience: '5-8',
    prompt: 'Create a job description for a Remote AI Product Manager overseeing AI/ML product development and go-to-market strategy.'
  },
  'Computer Vision Engineer': {
    minValue: 145000,
    maxValue: 155000,
    experienceLevel: 'seniorLevel',
    category: 'AI',
    yearsExperience: '3-6',
    prompt: 'Create a job description for a Remote Computer Vision Engineer working on deep learning models and image processing applications.'
  },

  // Technical Support Roles
  'Systems Administrator': {
    minValue: 75000,
    maxValue: 95000,
    experienceLevel: 'midLevel',
    category: 'IT',
    yearsExperience: '3-5',
    prompt: 'Create a job description for a Systems Administrator managing cloud infrastructure, network systems, and security protocols.'
  },
  'Technical Support Engineer': {
    minValue: 65000,
    maxValue: 85000,
    experienceLevel: 'midLevel',
    category: 'IT',
    yearsExperience: '2-4',
    prompt: 'Create a job description for a Technical Support Engineer providing advanced troubleshooting and customer support for enterprise software.'
  },
  'IT Operations Specialist': {
    minValue: 60000,
    maxValue: 80000,
    experienceLevel: 'midLevel',
    category: 'IT',
    yearsExperience: '2-5',
    prompt: 'Create a job description for an IT Operations Specialist managing help desk, system monitoring, and IT infrastructure support.'
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
  'Engineering': [
    'AWS Solutions Architect',
    'Azure Developer Associate',
    'Google Cloud Professional',
    'Kubernetes Administrator',
    'Docker Certified Associate'
  ],
  'AI': [
    'TensorFlow Developer Certificate',
    'AWS Machine Learning Specialty',
    'Deep Learning Specialization',
    'Azure AI Engineer',
    'Google Cloud ML Engineer'
  ],
  'IT': [
    'CompTIA A+',
    'AWS SysOps Administrator',
    'Microsoft 365 Certified',
    'ITIL Foundation',
    'Cisco CCNA'
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
  'Engineering': [
    'React',
    'Node.js',
    'AWS/Azure/GCP',
    'Docker',
    'Kubernetes',
    'TypeScript',
    'GraphQL'
  ],
  'AI': [
    'TensorFlow',
    'PyTorch',
    'Python',
    'Scikit-learn',
    'MLflow',
    'Kubernetes',
    'Docker'
  ],
  'IT': [
    'Azure Active Directory',
    'VMware',
    'ServiceNow',
    'Splunk',
    'AWS CloudWatch',
    'Terraform'
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
    length: 450,
    format: 'bullet-focused',
    sections: ['Overview', 'Key Responsibilities', 'Requirements', 'Benefits'],
    style: 'Direct and brief'
  },
  standard: {
    length: 600,
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

const STREET_NAMES = [
  'Tech Park St',
  'Main St',
  'First St',
  'Second St',
  'Third St',
  'Fourth St',
  'Fifth St',
  'Innovation Dr',
  'Digital Wy',
  'Enterprise Blvd',
  'Startup Ln',
  'Silicon St',
  'Cloud Ave',
  'Data Dr',
  'Circuit Rd',
  'Venture Wy'
];

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

  const schedule = 'Standard Business Hours';

  // Randomly select a description style
  const styleKey = Object.keys(DESCRIPTION_STYLES)[Math.floor(Math.random() * Object.keys(DESCRIPTION_STYLES).length)];
  const styleGuide = DESCRIPTION_STYLES[styleKey];

  // Check if the prompt includes "Remote"
  const isRemote = jobInfo.prompt.toLowerCase().includes('remote');
  const workStyle = isRemote ? 'Remote position with ' : 'On-site position with ';

  const prompt = `
Create a ${styleGuide.style} job description for a ${isRemote ? '100% Remote ' : ''}${jobType} position in ${location.city}, ${location.state}. 
Use a ${styleGuide.format} format with approximately ${styleGuide.length} words. Please display this text in markdown, do not use ticks to display the markdown. Just show the markdown and do not repeat any instructions.

Start with a concise paragraph emphasizing this is a ${workStyle}${workEnv.type} focused company.

After go into the following with headings, h2, h3, and h4 tags. Never use h1 tags. 
Key Details:
- Experience Required: ${jobInfo.yearsExperience} years
- Work Location: ${isRemote ? '100% Remote (US-Based)' : location.city + ', ' + location.state}
- Schedule: ${schedule}
- Work Environment: ${workEnv.type} (${workEnv.clients.join(', ')})
- Team Structure: ${teamStructure.structure}
- Travel: ${isRemote ? 'No travel required' : travel.description}
- Training: ${training.type} focused

${isRemote ? '## Remote Work Requirements\n- Strong communication skills for remote collaboration\n- Experience with remote work tools and practices\n- Self-motivated and able to work independently\n- Home office setup with reliable internet\n' : ''}

Required Skills & Certifications:
- Required Certifications: ${requiredCerts.join(', ')}
- Preferred Certifications: ${preferredCerts.join(', ')}
- Technology Stack: ${tools.join(', ')}
- Benefits: ${benefits.tier} - don't name the tier, just list the benefits as they relate to the job.

Structure the response using these sections:
${styleGuide.sections.map(section => `## ${section}`).join('\n')}

Style Guidelines:
- Format: ${styleGuide.format}
- Length: Approximately ${styleGuide.length} words
- Tone: ${styleGuide.style}

${isRemote ? 'Emphasize remote work culture, virtual collaboration, and distributed team dynamics. ' : ''}Make the description engaging and market-specific. Focus on growth opportunities and tech industry dynamics in ${location.city}.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
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
    travelRequirement: travel.description,
    trainingProgram: {
      focus: training.type,
      programs: training.programs
    }
  };
}

function generateStreetAddress() {
  const number = Math.floor(Math.random() * (9999 - 100) + 100);
  const streetName = STREET_NAMES[Math.floor(Math.random() * STREET_NAMES.length)];
  return `${number} ${streetName}`;
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
      'will@tustinrecruiting.com',
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