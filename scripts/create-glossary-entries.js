const path = require('node:path');
const fs = require('node:fs');
const matter = require('gray-matter');
const OpenAI = require('openai');
require('dotenv').config({ 
  path: path.resolve(__dirname, 'config/.env.local')
});

if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY is not set in config/.env.local');
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const GLOSSARY_TERMS = [
  {
    "term": "Penetration Testing",
    "icon": "mdi:security",
    "category": "Software Engineering",
    "vertical": "Cybersecurity",
    "description": "A simulated cyberattack used to identify vulnerabilities in networks, applications, or systems."
  },
  {
    "term": "Zero Trust Architecture",
    "icon": "mdi:security",
    "category": "Software Engineering",
    "vertical": "Cybersecurity",
    "description": "A security model that requires continuous verification for every access request, regardless of location."
  },
  {
    "term": "Endpoint Detection and Response (EDR)",
    "icon": "mdi:security",
    "category": "Software Engineering",
    "vertical": "Cybersecurity",
    "description": "A security solution that monitors and responds to threats on endpoints like laptops and mobile devices."
  },
  {
    "term": "Security Information and Event Management (SIEM)",
    "icon": "mdi:security",
    "category": "Software Engineering",
    "vertical": "Cybersecurity",
    "description": "A system that aggregates and analyzes security logs from multiple sources to detect potential threats."
  },
  {
    "term": "Threat Intelligence",
    "icon": "mdi:security",
    "category": "Software Engineering",
    "vertical": "Cybersecurity",
    "description": "The collection and analysis of data to identify emerging cybersecurity threats and vulnerabilities."
  },
  {
    "term": "Multi-Factor Authentication (MFA)",
    "icon": "mdi:security",
    "category": "Software Engineering",
    "vertical": "Cybersecurity",
    "description": "A security method requiring users to provide two or more verification factors to gain access."
  },
  {
    "term": "Public Key Infrastructure (PKI)",
    "icon": "mdi:security",
    "category": "Software Engineering",
    "vertical": "Cybersecurity",
    "description": "A framework that uses cryptographic keys and digital certificates to secure communications."
  },
  {
    "term": "Data Loss Prevention (DLP)",
    "icon": "mdi:security",
    "category": "Software Engineering",
    "vertical": "Cybersecurity",
    "description": "A security strategy to prevent sensitive data from being leaked, lost, or accessed by unauthorized users."
  },
  {
    "term": "Cloud Security Posture Management (CSPM)",
    "icon": "mdi:security",
    "category": "Software Engineering",
    "vertical": "Cybersecurity",
    "description": "A system that continuously monitors cloud infrastructure for security risks and compliance violations."
  },
  {
    "term": "Red Teaming",
    "icon": "mdi:security",
    "category": "Software Engineering",
    "vertical": "Cybersecurity",
    "description": "A security exercise where ethical hackers simulate real-world attacks to test an organization's defenses."
  },
  {
    "term": "Secure Software Development Lifecycle (SSDLC)",
    "icon": "mdi:security",
    "category": "Software Engineering",
    "vertical": "Cybersecurity",
    "description": "A development process that integrates security at every stage of the software lifecycle."
  },
  {
    "term": "Identity and Access Management (IAM)",
    "icon": "mdi:security",
    "category": "Software Engineering",
    "vertical": "Cybersecurity",
    "description": "A framework for ensuring that the right individuals have the right access to IT resources."
  },
  {
    "term": "Privilege Escalation",
    "icon": "mdi:security",
    "category": "Software Engineering",
    "vertical": "Cybersecurity",
    "description": "A security exploit where attackers gain higher access levels than originally permitted."
  },
  {
    "term": "Ransomware Mitigation",
    "icon": "mdi:security",
    "category": "Software Engineering",
    "vertical": "Cybersecurity",
    "description": "Techniques and strategies used to prevent or minimize damage from ransomware attacks."
  },
  {
    "term": "Bug Bounty Programs",
    "icon": "mdi:security",
    "category": "Software Engineering",
    "vertical": "Cybersecurity",
    "description": "Programs where ethical hackers are rewarded for finding and reporting security vulnerabilities."
  },
  {
    "term": "Web Application Firewall (WAF)",
    "icon": "mdi:security",
    "category": "Software Engineering",
    "vertical": "Cybersecurity",
    "description": "A security solution that filters and monitors HTTP traffic to prevent web-based attacks."
  },
  {
    "term": "Insider Threat Detection",
    "icon": "mdi:security",
    "category": "Software Engineering",
    "vertical": "Cybersecurity",
    "description": "Monitoring and analyzing employee behavior to detect potential security risks from within an organization."
  },
  {
    "term": "Cryptographic Hashing",
    "icon": "mdi:security",
    "category": "Software Engineering",
    "vertical": "Cybersecurity",
    "description": "A process that converts data into a fixed-size hash value to ensure data integrity."
  },
  {
    "term": "Container Security",
    "icon": "mdi:security",
    "category": "Software Engineering",
    "vertical": "Cybersecurity",
    "description": "Protecting containerized applications from security threats at runtime and during deployment."
  },
  {
    "term": "Security Orchestration, Automation, and Response (SOAR)",
    "icon": "mdi:security",
    "category": "Software Engineering",
    "vertical": "Cybersecurity",
    "description": "A system that automates security workflows, threat detection, and response actions."
  }
  // ... more terms
];

// Add related terms mapping
const RELATED_TERMS = {
  "Penetration Testing": ["Red Teaming", "Bug Bounty Programs", "Threat Intelligence", "Privilege Escalation", "Web Application Firewall (WAF)"],
  "Zero Trust Architecture": ["Multi-Factor Authentication (MFA)", "Identity and Access Management (IAM)", "Cloud Security Posture Management (CSPM)", "Privilege Escalation", "Data Loss Prevention (DLP)"],
  "Endpoint Detection and Response (EDR)": ["Security Information and Event Management (SIEM)", "Threat Intelligence", "Insider Threat Detection", "Ransomware Mitigation", "Container Security"],
  "Security Information and Event Management (SIEM)": ["Threat Intelligence", "Data Loss Prevention (DLP)", "Security Orchestration, Automation, and Response (SOAR)", "Web Application Firewall (WAF)", "Penetration Testing"],
  "Threat Intelligence": ["Penetration Testing", "SIEM", "Insider Threat Detection", "Cloud Security Posture Management (CSPM)", "Zero Trust Architecture"],
  "Multi-Factor Authentication (MFA)": ["Identity and Access Management (IAM)", "Zero Trust Architecture", "Privilege Escalation", "Secure Software Development Lifecycle (SSDLC)", "Data Loss Prevention (DLP)"],
  "Public Key Infrastructure (PKI)": ["Cryptographic Hashing", "Identity and Access Management (IAM)", "Zero Trust Architecture", "Data Loss Prevention (DLP)", "Security Orchestration, Automation, and Response (SOAR)"],
  "Data Loss Prevention (DLP)": ["Zero Trust Architecture", "Cloud Security Posture Management (CSPM)", "Insider Threat Detection", "Security Orchestration, Automation, and Response (SOAR)", "Privilege Escalation"],
  "Cloud Security Posture Management (CSPM)": ["Data Loss Prevention (DLP)", "Identity and Access Management (IAM)", "Zero Trust Architecture", "Threat Intelligence", "Privilege Escalation"],
  "Red Teaming": ["Penetration Testing", "Bug Bounty Programs", "Privilege Escalation", "Insider Threat Detection", "Web Application Firewall (WAF)"],
  "Secure Software Development Lifecycle (SSDLC)": ["Multi-Factor Authentication (MFA)", "Identity and Access Management (IAM)", "Privilege Escalation", "Threat Intelligence", "Cryptographic Hashing"],
  "Privilege Escalation": ["Zero Trust Architecture", "Red Teaming", "Penetration Testing", "Bug Bounty Programs", "Insider Threat Detection"],
  "Ransomware Mitigation": ["Endpoint Detection and Response (EDR)", "Threat Intelligence", "Security Information and Event Management (SIEM)", "Data Loss Prevention (DLP)", "Cloud Security Posture Management (CSPM)"]
};

async function createGlossaryEntry(term, icon, category, vertical, description) {
  const filename = term.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const filePath = path.join(__dirname, '..', 'src', 'content', 'glossary', `${filename}.md`);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: `Create a detailed glossary entry for the ${vertical} industry term "${term}". 
                 Use this description as a starting point: "${description}"
                 Include:
                 1. Start with a Detailed explanation of the term, no headings before this.
                 2. Display the rest of the content separated into h2 - h4 headings.
                 3. Common applications
                 4. Safety considerations if applicable
                 5. Related terms or concepts
                 6. Only use h2, h3, and h4 headings, do not use h1.
                 Format in markdown so i can copy and paste into the file, do not reiterate any of your instructions, do not diplay ticks around the markdown either.`
      }
    ],
    temperature: 0.7
  });

  const content = completion.choices[0].message.content;

  // Create frontmatter with vertical included
  const frontmatter = {
    term,
    icon,
    category,
    vertical,
    description,
    details: [
      {
        title: "Category",
        value: category
      },
      {
        title: "Industry",
        value: vertical
      },
      {
        title: "Related Terms",
        value: RELATED_TERMS[term] ? RELATED_TERMS[term].join(', ') : 'None'
      }
    ]
  };

  const fileContent = matter.stringify(content, frontmatter);
  fs.writeFileSync(filePath, fileContent);
  console.log(`Created glossary entry: ${filename}.md (${vertical} - ${category})`);
}

async function createAllEntries() {
  // Group entries by vertical for logging
  const entriesByVertical = {};
  
  for (const entry of GLOSSARY_TERMS) {
    await createGlossaryEntry(entry.term, entry.icon, entry.category, entry.vertical, entry.description);
    
    // Track entries by vertical
    entriesByVertical[entry.vertical] = entriesByVertical[entry.vertical] || [];
    entriesByVertical[entry.vertical].push(entry.term);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Log summary by vertical
  console.log('\nCreated entries by vertical:');
  Object.entries(entriesByVertical).forEach(([vertical, terms]) => {
    console.log(`\n${vertical}:`);
    terms.forEach(term => console.log(`  - ${term}`));
  });
}

createAllEntries().catch(console.error); 