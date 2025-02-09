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
    "term": "Absorption Rate",
    "icon": "mdi:home-city",
    "category": "Sales",
    "vertical": "Real Estate",
    "description": "The rate at which available homes are sold in a specific real estate market over a given time period."
  },
  {
    "term": "Cap Rate",
    "icon": "mdi:home-city",
    "category": "Sales",
    "vertical": "Real Estate",
    "description": "Capitalization rate, a metric used to evaluate the return on investment for income-producing properties."
  },
  {
    "term": "Escalation Clause",
    "icon": "mdi:home-city",
    "category": "Sales",
    "vertical": "Real Estate",
    "description": "A clause in a purchase contract that allows the buyer to automatically increase their offer if competing bids arise."
  },
  {
    "term": "Pocket Listing",
    "icon": "mdi:home-city",
    "category": "Sales",
    "vertical": "Real Estate",
    "description": "A property for sale that is not publicly listed on the MLS, often marketed privately by real estate agents."
  },
  {
    "term": "Debt-Service Coverage Ratio (DSCR)",
    "icon": "mdi:home-city",
    "category": "Sales",
    "vertical": "Real Estate",
    "description": "A financial metric used by lenders to determine if a property’s income is sufficient to cover its loan payments."
  },
  {
    "term": "Earnest Money Deposit",
    "icon": "mdi:home-city",
    "category": "Sales",
    "vertical": "Real Estate",
    "description": "A deposit made by a buyer to demonstrate serious intent to purchase a property, typically held in escrow."
  },
  {
    "term": "Underwriting Approval",
    "icon": "mdi:home-city",
    "category": "Sales",
    "vertical": "Real Estate",
    "description": "A process where a lender evaluates a buyer’s financial status to approve a mortgage loan."
  },
  {
    "term": "Dual Agency",
    "icon": "mdi:home-city",
    "category": "Sales",
    "vertical": "Real Estate",
    "description": "When a real estate agent or brokerage represents both the buyer and seller in a transaction."
  },
  {
    "term": "Title Contingency",
    "icon": "mdi:home-city",
    "category": "Sales",
    "vertical": "Real Estate",
    "description": "A clause that allows a buyer to back out of a real estate deal if there are title-related issues."
  },
  {
    "term": "Escrow Holdback",
    "icon": "mdi:home-city",
    "category": "Sales",
    "vertical": "Real Estate",
    "description": "Funds held in escrow after closing to cover outstanding repairs or contractual obligations."
  },
  {
    "term": "Loan-to-Value Ratio (LTV)",
    "icon": "mdi:home-city",
    "category": "Sales",
    "vertical": "Real Estate",
    "description": "A financial term that compares the amount of a mortgage loan to the appraised value of the property."
  },
  {
    "term": "Conforming Loan Limit",
    "icon": "mdi:home-city",
    "category": "Sales",
    "vertical": "Real Estate",
    "description": "The maximum loan amount that can be backed by Fannie Mae or Freddie Mac under federal lending guidelines."
  },
  {
    "term": "Leaseback Agreement",
    "icon": "mdi:home-city",
    "category": "Sales",
    "vertical": "Real Estate",
    "description": "An arrangement where the seller of a property leases it back from the buyer after closing."
  },
  {
    "term": "Shadow Inventory",
    "icon": "mdi:home-city",
    "category": "Sales",
    "vertical": "Real Estate",
    "description": "Homes that are in foreclosure or owned by lenders but not yet listed for sale."
  },
  {
    "term": "Wholesaling",
    "icon": "mdi:home-city",
    "category": "Sales",
    "vertical": "Real Estate",
    "description": "A real estate investment strategy where a buyer contracts a property at a lower price and assigns it to another buyer for a profit."
  }
  // ... more terms
];

// Add related terms mapping
const RELATED_TERMS = {
  "Absorption Rate": ["Cap Rate", "Shadow Inventory", "Loan-to-Value Ratio (LTV)", "Underwriting Approval", "Pocket Listing"],
  "Cap Rate": ["Absorption Rate", "Debt-Service Coverage Ratio (DSCR)", "Loan-to-Value Ratio (LTV)", "Leaseback Agreement", "Wholesaling"],
  "Escalation Clause": ["Earnest Money Deposit", "Pocket Listing", "Underwriting Approval", "Dual Agency", "Title Contingency"],
  "Pocket Listing": ["Escalation Clause", "Absorption Rate", "Shadow Inventory", "Title Contingency", "Loan-to-Value Ratio (LTV)"],
  "Debt-Service Coverage Ratio (DSCR)": ["Cap Rate", "Loan-to-Value Ratio (LTV)", "Underwriting Approval", "Leaseback Agreement", "Escrow Holdback"],
  "Earnest Money Deposit": ["Escalation Clause", "Underwriting Approval", "Title Contingency", "Escrow Holdback", "Loan-to-Value Ratio (LTV)"],
  "Underwriting Approval": ["Debt-Service Coverage Ratio (DSCR)", "Escalation Clause", "Loan-to-Value Ratio (LTV)", "Conforming Loan Limit", "Title Contingency"],
  "Dual Agency": ["Escalation Clause", "Pocket Listing", "Leaseback Agreement", "Title Contingency", "Wholesaling"],
  "Title Contingency": ["Escrow Holdback", "Earnest Money Deposit", "Pocket Listing", "Loan-to-Value Ratio (LTV)", "Shadow Inventory"],
  "Escrow Holdback": ["Earnest Money Deposit", "Debt-Service Coverage Ratio (DSCR)", "Title Contingency", "Cap Rate", "Underwriting Approval"],
  "Loan-to-Value Ratio (LTV)": ["Absorption Rate", "Cap Rate", "Debt-Service Coverage Ratio (DSCR)", "Underwriting Approval", "Escalation Clause"],
  "Conforming Loan Limit": ["Loan-to-Value Ratio (LTV)", "Underwriting Approval", "Debt-Service Coverage Ratio (DSCR)", "Leaseback Agreement", "Wholesaling"],
  "Leaseback Agreement": ["Cap Rate", "Debt-Service Coverage Ratio (DSCR)", "Conforming Loan Limit", "Dual Agency", "Escrow Holdback"],
  "Shadow Inventory": ["Absorption Rate", "Pocket Listing", "Title Contingency", "Wholesaling", "Loan-to-Value Ratio (LTV)"],
  "Wholesaling": ["Cap Rate", "Dual Agency", "Shadow Inventory", "Loan-to-Value Ratio (LTV)", "Conforming Loan Limit"]
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