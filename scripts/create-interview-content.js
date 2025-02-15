#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');
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

// Interview guide metadata
const INTERVIEW_GUIDES = [
    {
        "position": "Investment Banking Analyst",
        "category": "Finance",
        "vertical": "Investment Banking",
        "tags": ["Interview Prep", "Financial Modeling", "M&A", "Valuation"]
      },
      {
        "position": "Investment Banking Associate",
        "category": "Finance",
        "vertical": "Investment Banking",
        "tags": ["Interview Prep", "Capital Markets", "Deal Structuring", "LBO Modeling"]
      },
      {
        "position": "Managing Director - Investment Banking",
        "category": "Finance",
        "vertical": "Investment Banking",
        "tags": ["Interview Prep", "Corporate Finance", "Strategic Advisory", "IPO"]
      },
      {
        "position": "Mergers & Acquisitions Analyst",
        "category": "Finance",
        "vertical": "Investment Banking",
        "tags": ["Interview Prep", "Due Diligence", "Deal Execution", "Valuation"]
      },
      {
        "position": "Mergers & Acquisitions Associate",
        "category": "Finance",
        "vertical": "Investment Banking",
        "tags": ["Interview Prep", "Financial Strategy", "DCF Modeling", "LBO"]
      },
      {
        "position": "Private Equity Associate",
        "category": "Finance",
        "vertical": "Investment Banking",
        "tags": ["Interview Prep", "Fundraising", "Investment Analysis", "Portfolio Management"]
      },
      {
        "position": "Private Equity Analyst",
        "category": "Finance",
        "vertical": "Investment Banking",
        "tags": ["Interview Prep", "Market Research", "Financial Due Diligence", "Valuation"]
      },
      {
        "position": "Leveraged Finance Analyst",
        "category": "Finance",
        "vertical": "Investment Banking",
        "tags": ["Interview Prep", "Debt Financing", "High-Yield Bonds", "LBO"]
      },
      {
        "position": "Capital Markets Analyst",
        "category": "Finance",
        "vertical": "Investment Banking",
        "tags": ["Interview Prep", "Debt & Equity Offerings", "Securities Pricing", "Underwriting"]
      },
      {
        "position": "Equity Research Analyst",
        "category": "Finance",
        "vertical": "Investment Banking",
        "tags": ["Interview Prep", "Stock Analysis", "Earnings Forecasting", "Industry Trends"]
      },
      {
        "position": "Hedge Fund Analyst",
        "category": "Finance",
        "vertical": "Investment Banking",
        "tags": ["Interview Prep", "Risk Analysis", "Portfolio Management", "Alternative Investments"]
      },
      {
        "position": "Fixed Income Analyst",
        "category": "Finance",
        "vertical": "Investment Banking",
        "tags": ["Interview Prep", "Bond Markets", "Interest Rate Modeling", "Credit Analysis"]
      },
      {
        "position": "Risk Arbitrage Analyst",
        "category": "Finance",
        "vertical": "Investment Banking",
        "tags": ["Interview Prep", "Event-Driven Trading", "M&A Strategy", "Market Trends"]
      },
      {
        "position": "Debt Capital Markets Associate",
        "category": "Finance",
        "vertical": "Investment Banking",
        "tags": ["Interview Prep", "Debt Issuance", "Bond Structuring", "Corporate Finance"]
      },
      {
        "position": "Investment Banking Vice President",
        "category": "Finance",
        "vertical": "Investment Banking",
        "tags": ["Interview Prep", "Deal Origination", "Corporate Finance", "M&A Advisory"]
      },
      {
        "position": "Sell-Side Analyst",
        "category": "Finance",
        "vertical": "Investment Banking",
        "tags": ["Interview Prep", "Stock Recommendations", "Market Research", "Valuation"]
      },
      {
        "position": "Buy-Side Analyst",
        "category": "Finance",
        "vertical": "Investment Banking",
        "tags": ["Interview Prep", "Asset Management", "Investment Research", "Portfolio Strategy"]
      },
      {
        "position": "Securities Trader",
        "category": "Finance",
        "vertical": "Investment Banking",
        "tags": ["Interview Prep", "Market Execution", "Options Trading", "Risk Hedging"]
      },
      {
        "position": "Corporate Finance Associate",
        "category": "Finance",
        "vertical": "Investment Banking",
        "tags": ["Interview Prep", "Capital Budgeting", "Financial Planning", "Corporate Strategy"]
      },
    
      {
        "position": "Wealth Manager",
        "category": "Finance",
        "vertical": "Wealth Management",
        "tags": ["Interview Prep", "Asset Allocation", "Client Advisory", "Estate Planning"]
      },
      {
        "position": "Financial Advisor",
        "category": "Finance",
        "vertical": "Wealth Management",
        "tags": ["Interview Prep", "Investment Planning", "Retirement Strategy", "Portfolio Management"]
      },
      {
        "position": "Private Wealth Advisor",
        "category": "Finance",
        "vertical": "Wealth Management",
        "tags": ["Interview Prep", "HNW Clients", "Tax Planning", "Financial Strategy"]
      },
      {
        "position": "Portfolio Manager",
        "category": "Finance",
        "vertical": "Wealth Management",
        "tags": ["Interview Prep", "Asset Management", "Risk Analysis", "Investment Research"]
      },
      {
        "position": "Estate Planner",
        "category": "Finance",
        "vertical": "Wealth Management",
        "tags": ["Interview Prep", "Trusts & Wills", "Tax Minimization", "Asset Protection"]
      },
    
      {
        "position": "Equipment Finance Analyst",
        "category": "Finance",
        "vertical": "Equipment Financing",
        "tags": ["Interview Prep", "Credit Analysis", "Loan Structuring", "Equipment Leasing"]
      },
      {
        "position": "Equipment Leasing Specialist",
        "category": "Finance",
        "vertical": "Equipment Financing",
        "tags": ["Interview Prep", "Commercial Lending", "Contract Negotiation", "Asset-Based Financing"]
      },
      {
        "position": "Senior Equipment Finance Manager",
        "category": "Finance",
        "vertical": "Equipment Financing",
        "tags": ["Interview Prep", "Risk Assessment", "Lease Structuring", "Corporate Clients"]
      },
      {
        "position": "Equipment Loan Underwriter",
        "category": "Finance",
        "vertical": "Equipment Financing",
        "tags": ["Interview Prep", "Credit Risk", "Asset Valuation", "Financial Statements"]
      },
      {
        "position": "Commercial Equipment Finance Officer",
        "category": "Finance",
        "vertical": "Equipment Financing",
        "tags": ["Interview Prep", "Sales & Leasing", "Loan Portfolio", "Client Management"]
      },
      {
        "position": "Account Executive",
        "category": "Finance",
        "vertical": "Equipment Financing",
        "tags": ["Interview Prep", "Client Acquisition", "Sales", "Leasing", "Commercial Lending"]
      },
      {
        "position": "Territory Manager",
        "category": "Finance",
        "vertical": "Equipment Financing",
        "tags": ["Interview Prep", "Regional Sales", "Business Development", "Asset Financing"]
      },
      {
        "position": "Syndication Manager",
        "category": "Finance",
        "vertical": "Equipment Financing",
        "tags": ["Interview Prep", "Loan Syndication", "Portfolio Management", "Risk Analysis"]
      },
      {
        "position": "Vice President of Sales",
        "category": "Finance",
        "vertical": "Equipment Financing",
        "tags": ["Interview Prep", "Executive Leadership", "Revenue Growth", "Strategic Partnerships"]
      },
      {
        "position": "Middle-Market Sales Representative",
        "category": "Finance",
        "vertical": "Equipment Financing",
        "tags": ["Interview Prep", "Commercial Lending", "Client Management", "Mid-Sized Businesses"]
      },
      {
        "position": "Small-Ticket Sales Representative",
        "category": "Finance",
        "vertical": "Equipment Financing",
        "tags": ["Interview Prep", "Vendor Financing", "Fast-Approval Loans", "Retail Equipment"]
      },
      {
        "position": "Director",
        "category": "Finance",
        "vertical": "Equipment Financing",
        "tags": ["Interview Prep", "Leadership", "Corporate Finance", "Market Expansion"]
      },
      {
        "position": "Credit Risk Manager",
        "category": "Finance",
        "vertical": "Equipment Financing",
        "tags": ["Interview Prep", "Risk Assessment", "Loan Underwriting", "Asset-Based Lending"]
      },
      {
        "position": "Funding Coordinator",
        "category": "Finance",
        "vertical": "Equipment Financing",
        "tags": ["Interview Prep", "Loan Processing", "Funding Disbursement", "Compliance"]
      },
      {
        "position": "Vendor Finance Relationship Manager",
        "category": "Finance",
        "vertical": "Equipment Financing",
        "tags": ["Interview Prep", "Vendor Partnerships", "Leasing Programs", "Business Development"]
      },
      {
        "position": "Ultra High Net Worth Wealth Manager",
        "category": "Finance",
        "vertical": "Wealth Management",
        "tags": ["Interview Prep", "UHNW Clients", "Tax Strategies", "Alternative Investments"]
      },
      {
        "position": "Trust & Fiduciary Advisor",
        "category": "Finance",
        "vertical": "Wealth Management",
        "tags": ["Interview Prep", "Trusts & Wills", "Legal Compliance", "Wealth Protection"]
      },
      {
        "position": "Private Banking Relationship Manager",
        "category": "Finance",
        "vertical": "Wealth Management",
        "tags": ["Interview Prep", "Private Banking", "Lending Solutions", "HNW Client Services"]
      },
      {
        "position": "Financial Planning Specialist",
        "category": "Finance",
        "vertical": "Wealth Management",
        "tags": ["Interview Prep", "Retirement Planning", "Tax Optimization", "Risk Management"]
      },
      {
        "position": "Investment Consultant",
        "category": "Finance",
        "vertical": "Wealth Management",
        "tags": ["Interview Prep", "Portfolio Management", "Risk Assessment", "Client Advisory"]
      },
      {
        "position": "Wealth Technology Advisor",
        "category": "Finance",
        "vertical": "Wealth Management",
        "tags": ["Interview Prep", "Fintech", "Robo-Advisory", "Digital Wealth Solutions"]
      },
      {
        "position": "ESG Investment Advisor",
        "category": "Finance",
        "vertical": "Wealth Management",
        "tags": ["Interview Prep", "Sustainable Investing", "Impact Funds", "Socially Responsible Portfolios"]
      },
      {
        "position": "Philanthropy Advisor",
        "category": "Finance",
        "vertical": "Wealth Management",
        "tags": ["Interview Prep", "Charitable Giving", "Donor-Advised Funds", "Estate Strategy"]
      },
      {
        "position": "Multi-Family Office Advisor",
        "category": "Finance",
        "vertical": "Wealth Management",
        "tags": ["Interview Prep", "Family Offices", "Wealth Transfer", "Tax & Estate Planning"]
      }
  // Add more positions here
];

const TITLE_FORMATS = [
  "Interview Guide",
  "Interview Preparation",
  "Interview Questions and Answers",
  "Interview Help"
];

function generateRandomDate() {
  const start = new Date('2025-01-01');
  const end = new Date('2025-02-15');
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return randomDate.toISOString().split('T')[0];
}

async function generateInterviewGuide(position, titleFormat, category, vertical, tags) {
  console.log(`\n🔄 Starting generation for: ${position} ${titleFormat}`);
  const term = `${position} ${titleFormat}`;
  
  console.log('📝 Generating main content...');
  const prompt = `Create a comprehensive interview preparation guide for ${position} position.

The guide should include:
1. Brief overview of required and recommended certifications, educational background, and industry qualifications that can enhance a candidate's profile
2. 20 detailed interview questions with comprehensive answers, including:
   - Technical questions specific to the role
   - Behavioral questions
   - Situational questions
   - Problem-solving questions
   
For each answer:
- Provide multiple detailed examples with context and outcomes
- Include several real-world scenarios that demonstrate different approaches
- Explain the reasoning behind best practices and when to adapt them
- Walk through complete thought processes with alternative considerations
- Include technical details with practical applications and common pitfalls to avoid
- Explain both what to do and what not to do
- Include follow-up points that might come from the interviewer

Format in markdown:
- Use ## for main sections
- Use ### for subsections
- Use #### for questions
- Use bullet points and numbered lists where appropriate
- Include code snippets if relevant
- Bold important points
- Never use h1 (#) headings

Make it comprehensive and detailed, with long-form answers that cover multiple scenarios and perspectives.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });
  console.log('✅ Main content generated successfully');

  const content = completion.choices[0].message.content;
  const date = generateRandomDate();
  console.log(`📅 Generated publish date: ${date}`);

  console.log('📝 Generating description...');
  const descPrompt = `Write a concise description (under 500 characters) for a ${position} ${titleFormat}. Focus on what job seekers will learn from this guide.`;
  
  const descCompletion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: descPrompt }],
    temperature: 0.7,
  });
  console.log('✅ Description generated successfully');

  const description = descCompletion.choices[0].message.content;
  console.log(`📊 Description length: ${description.length} characters`);

  const frontmatter = `---
term: "${term}"
description: "${description}"
category: "${category}"
vertical: "${vertical}"
pubDate: ${date}
modDate: "${date}"
author: "Will Gordon"
avatar: 
  url: "/images/me.png"
  alt: "Will Gordon"
image:
  url: "/images/software-engineering-interview.jpg"
  alt: "Software Engineering Interview"
tags: ${JSON.stringify(tags)}
---

${content.trim()}`;

  const slug = term.toLowerCase().replace(/\s+/g, '-');
  const filePath = path.join(process.cwd(), 'src', 'content', 'interview', `${slug}.md`);
  fs.writeFileSync(filePath, frontmatter);
  console.log(`💾 File saved: ${filePath}`);
  console.log('✨ Guide generation complete!\n');
}

async function createAllGuides() {
  console.log('\n🚀 Starting interview guide generation process');
  console.log(`📚 Total positions to process: ${INTERVIEW_GUIDES.length}\n`);

  for (const guide of INTERVIEW_GUIDES) {
    const randomFormat = TITLE_FORMATS[Math.floor(Math.random() * TITLE_FORMATS.length)];
    console.log(`\n📌 Processing position: ${guide.position}`);
    console.log(`🎯 Selected format: ${randomFormat}`);
    console.log(`🏷️  Tags: ${guide.tags.join(', ')}`);

    await generateInterviewGuide(
      guide.position,
      randomFormat,
      guide.category,
      guide.vertical,
      guide.tags
    );

    console.log(`✅ Completed guide for: ${guide.position}\n`);
    console.log('⏳ Waiting before next guide...\n');
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('\n🎉 All interview guides generated successfully!');
  console.log(`📊 Total guides created: ${INTERVIEW_GUIDES.length}`);
}

console.log('🔑 OpenAI API Key found');
console.log('⚡ Starting script execution...\n');
createAllGuides().catch(error => {
  console.error('\n❌ Error during execution:');
  console.error(error);
  console.error(error)
}); 