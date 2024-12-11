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

const LOCATIONS = [
    { city: 'Los Angeles', state: 'CA', zipCode: '90001', multiplier: 1.1 },
    { city: 'San Francisco', state: 'CA', zipCode: '94105', multiplier: 1.2 },
    { city: 'San Diego', state: 'CA', zipCode: '92101', multiplier: 1.2 },
    { city: 'San Jose', state: 'CA', zipCode: '95113', multiplier: 1.4 },
    { city: 'Irvine', state: 'CA', zipCode: '92618', multiplier: 1.25 },
    { city: 'Sacramento', state: 'CA', zipCode: '95814', multiplier: 1.15 },
    { city: 'Chicago', state: 'IL', zipCode: '60601', multiplier: 1.2 },
    { city: 'Denver', state: 'CO', zipCode: '80201', multiplier: 1.1 },
    { city: 'Seattle', state: 'WA', zipCode: '98101', multiplier: 1.3 },
    { city: 'New York', state: 'NY', zipCode: '10001', multiplier: 1.4 }
];

// Base job details - Update these values
const BASE_JOB = {
  position: 'React Native Engineer',
  team: 'Mobile',
  category: 'Software Engineering',
  minValue: 125000,
  maxValue: 135000,
  description: `RTRO, a well-funded startup based in Los Angeles, is seeking a highly skilled React Native Engineer (REMOTE) to help develop and enhance our Ecommerce iOS application. This is a fully remote role, and candidates can be based anywhere in the USA. As part of a small but growing team, you’ll have the opportunity to make a significant impact on a cutting-edge product in a fast-paced startup environment.

Responsibilities:

Develop and maintain a high-performance Ecommerce iOS application using React Native.
Collaborate closely with product managers, designers, and other engineers to deliver new features and enhancements.
Write clean, scalable, and well-documented code.
Troubleshoot and debug application issues to improve performance and user experience.
Implement responsive designs and ensure seamless user experiences across devices.
Optimize the app for maximum speed, reliability, and scalability.
Stay up-to-date with the latest React Native developments and contribute innovative ideas to the team.
Qualifications:

4+ years of experience working with React Native, with a strong focus on iOS applications.
Solid understanding of mobile development concepts, including APIs, authentication, and data management.
Experience integrating third-party libraries and APIs.
Strong knowledge of JavaScript and TypeScript.
Familiarity with mobile app performance optimization techniques.
Experience with CI/CD pipelines and app deployment to the Apple App Store.
Excellent problem-solving skills and attention to detail.
Ability to work independently in a remote environment while collaborating effectively with a team.
Nice-to-Have:

Experience with Ecommerce platforms and payment integrations.
Familiarity with design tools like Figma or Sketch.
Knowledge of Android development and cross-platform optimizations.
Compensation:

$135,000 - $150,000 annually, based on experience.
Opportunity to grow within a well-funded, fast-growing startup.
Comprehensive benefits package, including health insurance, paid time off, and more.
Join RTRO and be part of a small, highly technical team dedicated to redefining the Ecommerce experience. If you’re passionate about building great products and thrive in a startup environment, we’d love to hear from you!`
};

async function generateLocalizedDescription(baseDescription, location) {
  const prompt = `
Rewrite this job description for candidates based in ${location.city}, ${location.state} even though the role is remote. 
Make it specific to the local market and area while keeping the core responsibilities the same but alter the job description structure. 

Original description:
${baseDescription}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return completion.choices[0].message.content;
}

async function createJob(location) {
  const adjustedMin = Math.round(BASE_JOB.minValue * location.multiplier);
  const adjustedMax = Math.round(BASE_JOB.maxValue * location.multiplier);
  
  const today = new Date();
  const validThrough = new Date(today);
  validThrough.setDate(validThrough.getDate() + 60);

  const jobId = `${BASE_JOB.position.substring(0, 4).toUpperCase()}-${Math.random().toString(36).substring(2, 8)}`.replace(/\s+/g, '-');

  const fullDescription = await generateLocalizedDescription(BASE_JOB.description, location);
  
  // Create a shortened plain text version for frontmatter
  const plainTextDescription = fullDescription
    .replace(/[#*`]/g, '') // Remove markdown symbols
    .replace(/\n+/g, ' ')  // Replace multiple newlines with space
    .trim()
    .substring(0, 500) + '...';

  const jobData = {
    position: BASE_JOB.position,
    description: plainTextDescription, // Use shortened plain text in frontmatter
    location: `${location.city}, ${location.state}`,
    team: BASE_JOB.team,
    datePosted: today.toISOString(),
    validThrough: validThrough.toISOString(),
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      name: 'RTRO',
      sameAs: 'https://www.rtro.com',
      logo: '/images/rtro.png'
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
    experienceRequirements: 'seniorLevel',
    occupationalCategory: BASE_JOB.category,
    identifier: {
      name: 'RTRO',
      value: jobId
    },
    featured: Math.random() < 0.2,
    email: ['hello@tustinrecruiting.com', 'john@tustinrecruiting.com']
  };

  const frontmatter = matter.stringify('', jobData);
  // Add full markdown description after frontmatter
  const finalContent = `${frontmatter}\n\n${fullDescription}`;

  const filename = `tr-${BASE_JOB.position.toLowerCase().replace(/\s+/g, '-')}-${location.city.toLowerCase()}-${jobId.toLowerCase()}.md`;
  const filePath = path.join(__dirname, '..', 'src', 'content', 'jobs', filename);
  
  fs.writeFileSync(filePath, finalContent);
  console.log(`Created ${BASE_JOB.position} in ${location.city}: ${filename}`);
}

async function createAllJobs() {
  for (const location of LOCATIONS) {
    console.log(`Creating job in ${location.city}...`);
    await createJob(location);
    // Add delay between API calls
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('Done! Run npm run index-recent-jobs -- -days=0 to index new jobs');
}

createAllJobs().catch(console.error); 