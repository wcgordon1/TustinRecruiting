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
      "term": "GPO Contract",
      "icon": "mdi:medical-bag",
      "category": "Sales",
      "vertical": "Medical Device",
      "description": "A Group Purchasing Organization (GPO) contract allows hospitals to negotiate bulk pricing for medical devices and equipment."
    },
    {
      "term": "Hospital Buy-In",
      "icon": "mdi:medical-bag",
      "category": "Sales",
      "vertical": "Medical Device",
      "description": "The process of securing stakeholder approval within a hospital for purchasing a medical device."
    },
    {
      "term": "Procurement Cycle",
      "icon": "mdi:medical-bag",
      "category": "Sales",
      "vertical": "Medical Device",
      "description": "The timeline hospitals or clinics follow when evaluating, approving, and purchasing medical devices."
    },
    {
      "term": "Value Analysis Committee (VAC)",
      "icon": "mdi:medical-bag",
      "category": "Sales",
      "vertical": "Medical Device",
      "description": "A hospital committee responsible for assessing medical devices based on cost, clinical need, and outcomes."
    },
    {
      "term": "Formulary Approval",
      "icon": "mdi:medical-bag",
      "category": "Sales",
      "vertical": "Medical Device",
      "description": "The process of getting a medical device included in a hospital's approved product list for purchasing."
    },
    {
      "term": "Clinical Adoption",
      "icon": "mdi:medical-bag",
      "category": "Sales",
      "vertical": "Medical Device",
      "description": "The rate at which physicians and healthcare providers integrate a new medical device into their practice."
    },
    {
      "term": "Per-Procedure Pricing",
      "icon": "mdi:medical-bag",
      "category": "Sales",
      "vertical": "Medical Device",
      "description": "A pricing model where hospitals pay for medical devices based on usage in individual procedures."
    },
    {
      "term": "Capital Equipment Sales",
      "icon": "mdi:medical-bag",
      "category": "Sales",
      "vertical": "Medical Device",
      "description": "High-cost, long-term medical devices that require large hospital investments, such as MRI machines or robotic surgery systems."
    },
    {
      "term": "Consumables Revenue",
      "icon": "mdi:medical-bag",
      "category": "Sales",
      "vertical": "Medical Device",
      "description": "Ongoing revenue generated from disposable or limited-use components of medical devices, such as catheters or electrodes."
    },
    {
      "term": "Surgeon Preference Item (SPI)",
      "icon": "mdi:medical-bag",
      "category": "Sales",
      "vertical": "Medical Device",
      "description": "A medical device specifically chosen by a surgeon based on personal preference rather than hospital standardization."
    },
    {
      "term": "Hospital Capital Budgeting",
      "icon": "mdi:medical-bag",
      "category": "Sales",
      "vertical": "Medical Device",
      "description": "The financial planning hospitals use to allocate funds for high-cost medical equipment."
    },
    {
      "term": "Charge Capture",
      "icon": "mdi:medical-bag",
      "category": "Sales",
      "vertical": "Medical Device",
      "description": "The process of ensuring that hospitals properly bill for medical devices used in procedures."
    },
    {
      "term": "Reimbursement Coding",
      "icon": "mdi:medical-bag",
      "category": "Sales",
      "vertical": "Medical Device",
      "description": "The use of CPT and HCPCS codes to ensure medical devices are eligible for insurance reimbursement."
    },
    {
      "term": "Distributor Margin",
      "icon": "mdi:medical-bag",
      "category": "Sales",
      "vertical": "Medical Device",
      "description": "The profit percentage medical device distributors earn when selling products to hospitals or clinics."
    },
    {
      "term": "In-Service Training",
      "icon": "mdi:medical-bag",
      "category": "Sales",
      "vertical": "Medical Device",
      "description": "Hands-on training provided to hospital staff and surgeons on how to use new medical devices."
    },
    {
      "term": "Service-Level Agreement (SLA)",
      "icon": "mdi:medical-bag",
      "category": "Sales",
      "vertical": "Medical Device",
      "description": "A contract defining maintenance and support commitments for medical devices sold to hospitals."
    },
    {
      "term": "Device Utilization Rate",
      "icon": "mdi:medical-bag",
      "category": "Sales",
      "vertical": "Medical Device",
      "description": "A measure of how often a medical device is used in clinical procedures after purchase."
    },
    {
      "term": "Rep-Driven Sale",
      "icon": "mdi:medical-bag",
      "category": "Sales",
      "vertical": "Medical Device",
      "description": "A sales process heavily reliant on a sales rep's relationship with surgeons or hospital decision-makers."
    },
    {
      "term": "Break-Even Analysis",
      "icon": "mdi:medical-bag",
      "category": "Sales",
      "vertical": "Medical Device",
      "description": "A calculation that determines how many procedures need to be performed before a hospital recoups the cost of a medical device."
    },
    {
      "term": "Hospital Standardization Initiative",
      "icon": "mdi:medical-bag",
      "category": "Sales",
      "vertical": "Medical Device",
      "description": "An effort by hospitals to limit device options and lower costs by purchasing from a select group of vendors."
    }  
  // ... more terms
];

// Add related terms mapping
const RELATED_TERMS = {
  "GPO Contract": ["Procurement Cycle", "Hospital Buy-In", "Formulary Approval", "Distributor Margin", "Hospital Standardization Initiative"],
  "Hospital Buy-In": ["Value Analysis Committee (VAC)", "Clinical Adoption", "Hospital Capital Budgeting", "Per-Procedure Pricing", "Charge Capture"],
  "Procurement Cycle": ["GPO Contract", "Formulary Approval", "Device Utilization Rate", "Capital Equipment Sales", "Break-Even Analysis"],
  "Value Analysis Committee (VAC)": ["Formulary Approval", "Hospital Buy-In", "GPO Contract", "Clinical Adoption", "Charge Capture"],
  "Formulary Approval": ["Procurement Cycle", "Value Analysis Committee (VAC)", "Reimbursement Coding", "Surgeon Preference Item (SPI)", "Distributor Margin"],
  "Clinical Adoption": ["In-Service Training", "Rep-Driven Sale", "Hospital Buy-In", "Surgeon Preference Item (SPI)", "Device Utilization Rate"],
  "Per-Procedure Pricing": ["Charge Capture", "Break-Even Analysis", "Capital Equipment Sales", "Hospital Standardization Initiative", "Consumables Revenue"],
  "Capital Equipment Sales": ["Procurement Cycle", "Hospital Capital Budgeting", "Service-Level Agreement (SLA)", "Break-Even Analysis", "Rep-Driven Sale"],
  "Consumables Revenue": ["Per-Procedure Pricing", "Distributor Margin", "Device Utilization Rate", "Service-Level Agreement (SLA)", "Charge Capture"],
  "Surgeon Preference Item (SPI)": ["Clinical Adoption", "Formulary Approval", "Rep-Driven Sale", "Distributor Margin", "Hospital Standardization Initiative"],
  "Hospital Capital Budgeting": ["Capital Equipment Sales", "Procurement Cycle", "Break-Even Analysis", "Service-Level Agreement (SLA)", "GPO Contract"],
  "Charge Capture": ["Per-Procedure Pricing", "Reimbursement Coding", "Consumables Revenue", "Break-Even Analysis", "Formulary Approval"],
  "Reimbursement Coding": ["Charge Capture", "Formulary Approval", "Break-Even Analysis", "Device Utilization Rate", "Clinical Adoption"],
  "Distributor Margin": ["Consumables Revenue", "GPO Contract", "Surgeon Preference Item (SPI)", "Per-Procedure Pricing", "Service-Level Agreement (SLA)"],
  "In-Service Training": ["Clinical Adoption", "Rep-Driven Sale", "Service-Level Agreement (SLA)", "Device Utilization Rate", "Surgeon Preference Item (SPI)"],
  "Service-Level Agreement (SLA)": ["Capital Equipment Sales", "Hospital Capital Budgeting", "Consumables Revenue", "Rep-Driven Sale", "Hospital Standardization Initiative"],
  "Device Utilization Rate": ["Clinical Adoption", "Consumables Revenue", "Reimbursement Coding", "Break-Even Analysis", "Hospital Standardization Initiative"],
  "Rep-Driven Sale": ["Surgeon Preference Item (SPI)", "Clinical Adoption", "Capital Equipment Sales", "In-Service Training", "Service-Level Agreement (SLA)"],
  "Break-Even Analysis": ["Capital Equipment Sales", "Charge Capture", "Per-Procedure Pricing", "Procurement Cycle", "Hospital Capital Budgeting"],
  "Hospital Standardization Initiative": ["GPO Contract", "Surgeon Preference Item (SPI)", "Service-Level Agreement (SLA)", "Device Utilization Rate", "Per-Procedure Pricing"]
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