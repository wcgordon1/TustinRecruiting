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
        "position": "Enterprise Account Executive",
        "category": "Sales",
        "industry": "Enterprise",
        "tags": ["Interview Prep", "B2B Sales", "Large Accounts", "Solution Selling"]
      },
      {
        "position": "Enterprise Business Development Manager",
        "category": "Sales",
        "industry": "Enterprise",
        "tags": ["Interview Prep", "Lead Generation", "Prospecting", "Consultative Sales"]
      },
      {
        "position": "Enterprise Sales Engineer",
        "category": "Sales",
        "industry": "Enterprise",
        "tags": ["Interview Prep", "Technical Sales", "Pre-Sales Support", "Solutions Architecture"]
      },
      {
        "position": "Enterprise Sales Director",
        "category": "Sales",
        "industry": "Enterprise",
        "tags": ["Interview Prep", "Sales Leadership", "Revenue Growth", "Strategic Partnerships"]
      },
      {
        "position": "Manufacturing Sales Executive",
        "category": "Sales",
        "industry": "Enterprise",
        "tags": ["Interview Prep", "Industrial Sales", "Machinery & Equipment", "B2B Negotiation"]
      },
      {
        "position": "Healthcare Enterprise Sales Manager",
        "category": "Sales",
        "industry": "Enterprise",
        "tags": ["Interview Prep", "Healthcare Partnerships", "Regulatory Compliance", "Solution Selling"]
      },
      {
        "position": "Enterprise Channel Sales Manager",
        "category": "Sales",
        "industry": "Enterprise",
        "tags": ["Interview Prep", "Partnerships", "Reseller Sales", "Channel Strategy"]
      },
      {
        "position": "Enterprise Key Account Manager",
        "category": "Sales",
        "industry": "Enterprise",
        "tags": ["Interview Prep", "Account Management", "Customer Retention", "Renewals"]
      },
      {
        "position": "Government Enterprise Sales Representative",
        "category": "Sales",
        "industry": "Enterprise",
        "tags": ["Interview Prep", "Government Contracts", "RFPs", "Public Sector Sales"]
      },
      {
        "position": "Enterprise Inside Sales Representative",
        "category": "Sales",
        "industry": "Enterprise",
        "tags": ["Interview Prep", "Lead Qualification", "B2B Inside Sales", "Pipeline Management"]
      },
      {
        "position": "Enterprise Sales Operations Manager",
        "category": "Sales",
        "industry": "Enterprise",
        "tags": ["Interview Prep", "CRM Management", "Sales Enablement", "Process Optimization"]
      },
      {
        "position": "Enterprise Partner Development Manager",
        "category": "Sales",
        "industry": "Enterprise",
        "tags": ["Interview Prep", "Strategic Partnerships", "Joint Ventures", "Reseller Networks"]
      },
      {
        "position": "Enterprise Solutions Consultant",
        "category": "Sales",
        "industry": "Enterprise",
        "tags": ["Interview Prep", "Consultative Selling", "Product Demos", "Customer Education"]
      },
      {
        "position": "Enterprise National Account Executive",
        "category": "Sales",
        "industry": "Enterprise",
        "tags": ["Interview Prep", "Corporate Sales", "National Accounts", "Contract Negotiation"]
      },
      {
        "position": "Enterprise Sales Development Representative (SDR)",
        "category": "Sales",
        "industry": "Enterprise",
        "tags": ["Interview Prep", "Prospecting", "Cold Outreach", "Pipeline Development"]
      },
      {
        "position": "Enterprise Field Sales Representative",
        "category": "Sales",
        "industry": "Enterprise",
        "tags": ["Interview Prep", "Outside Sales", "Client Visits", "Business Networking"]
      },
      {
        "position": "Enterprise Territory Sales Manager",
        "category": "Sales",
        "industry": "Enterprise",
        "tags": ["Interview Prep", "Regional Sales", "Market Expansion", "Quota Management"]
      },
      {
        "position": "Enterprise Customer Success Manager",
        "category": "Sales",
        "industry": "Enterprise",
        "tags": ["Interview Prep", "Retention Strategies", "Upselling", "Customer Experience"]
      },
      {
        "position": "Enterprise Sales Training Manager",
        "category": "Sales",
        "industry": "Enterprise",
        "tags": ["Interview Prep", "Sales Enablement", "Training Programs", "Team Coaching"]
      },
    
      // SAAS SALES (20)
      {
        "position": "SaaS Account Executive",
        "category": "Sales",
        "industry": "SaaS",
        "tags": ["Interview Prep", "B2B Software Sales", "Demo Presentations", "Quota Attainment"]
      },
      {
        "position": "SaaS Business Development Representative (BDR)",
        "category": "Sales",
        "industry": "SaaS",
        "tags": ["Interview Prep", "Prospecting", "Cold Calling", "Lead Generation"]
      },
      {
        "position": "SaaS Sales Engineer",
        "category": "Sales",
        "industry": "SaaS",
        "tags": ["Interview Prep", "Technical Sales", "API Integrations", "Solution Architecture"]
      },
    
      // MEDICAL DEVICE SALES (20)
      {
        "position": "Medical Device Sales Representative",
        "category": "Sales",
        "industry": "Medical Device",
        "tags": ["Interview Prep", "Hospital Sales", "Surgical Equipment", "Regulatory Compliance"]
      },
      {
        "position": "Medical Equipment Account Manager",
        "category": "Sales",
        "industry": "Medical Device",
        "tags": ["Interview Prep", "Client Management", "Hospital Procurement", "B2B Sales"]
      },
      {
        "position": "Orthopedic Device Sales Representative",
        "category": "Sales",
        "industry": "Medical Device",
        "tags": ["Interview Prep", "Orthopedics", "Physician Relationships", "Surgical Sales"]
      },
      {
        "position": "Medical Device Territory Manager",
        "category": "Sales",
        "industry": "Medical Device",
        "tags": ["Interview Prep", "Regional Sales", "Product Training", "Surgeon Support"]
      },
      {
        "position": "Cardiovascular Device Sales Specialist",
        "category": "Sales",
        "industry": "Medical Device",
        "tags": ["Interview Prep", "Cardiology Sales", "Hospital Accounts", "Medical Compliance"]
      },
      {
        "position": "Medical Device Product Specialist",
        "category": "Sales",
        "industry": "Medical Device",
        "tags": ["Interview Prep", "Product Knowledge", "Technical Sales", "Surgeon Training"]
      },
      {
        "position": "Medical Robotics Sales Executive",
        "category": "Sales",
        "industry": "Medical Device",
        "tags": ["Interview Prep", "Robotic Surgery", "Hospital Sales", "Technology Adoption"]
      },
      {
        "position": "Surgical Equipment Sales Representative",
        "category": "Sales",
        "industry": "Medical Device",
        "tags": ["Interview Prep", "Operating Room Sales", "Surgeon Engagement", "Equipment Demos"]
      },
      {
        "position": "Medical Device Distributor Sales Representative",
        "category": "Sales",
        "industry": "Medical Device",
        "tags": ["Interview Prep", "Distributor Management", "Supply Chain", "Wholesale Medical Sales"]
      },
      {
        "position": "SaaS Enterprise Account Executive",
        "category": "Sales",
        "industry": "SaaS",
        "tags": ["Interview Prep", "Enterprise SaaS Sales", "B2B Software", "Quota Management"]
      },
      {
        "position": "SaaS Channel Sales Manager",
        "category": "Sales",
        "industry": "SaaS",
        "tags": ["Interview Prep", "Reseller Sales", "Partner Relationships", "Channel Growth"]
      },
      {
        "position": "SaaS Mid-Market Account Executive",
        "category": "Sales",
        "industry": "SaaS",
        "tags": ["Interview Prep", "SMB & Mid-Market", "Quota Attainment", "Consultative Selling"]
      },
      {
        "position": "SaaS Outbound Sales Representative",
        "category": "Sales",
        "industry": "SaaS",
        "tags": ["Interview Prep", "Cold Calling", "Prospecting", "Lead Generation"]
      },
      {
        "position": "SaaS Partner Sales Manager",
        "category": "Sales",
        "industry": "SaaS",
        "tags": ["Interview Prep", "Partnership Development", "Reseller Programs", "B2B Alliances"]
      },
      {
        "position": "SaaS SDR Manager",
        "category": "Sales",
        "industry": "SaaS",
        "tags": ["Interview Prep", "Sales Development", "Pipeline Growth", "Team Leadership"]
      },
      {
        "position": "SaaS Renewal Sales Specialist",
        "category": "Sales",
        "industry": "SaaS",
        "tags": ["Interview Prep", "Customer Retention", "Subscription Renewals", "Upselling"]
      },
      {
        "position": "SaaS Customer Success Executive",
        "category": "Sales",
        "industry": "SaaS",
        "tags": ["Interview Prep", "Post-Sales Support", "Account Expansion", "Churn Prevention"]
      },
      {
        "position": "SaaS Sales Enablement Manager",
        "category": "Sales",
        "industry": "SaaS",
        "tags": ["Interview Prep", "Sales Training", "Onboarding", "Process Optimization"]
      },
      {
        "position": "SaaS Solutions Consultant",
        "category": "Sales",
        "industry": "SaaS",
        "tags": ["Interview Prep", "Technical Demos", "Solution Selling", "Pre-Sales Strategy"]
      },
      {
        "position": "SaaS Regional Sales Director",
        "category": "Sales",
        "industry": "SaaS",
        "tags": ["Interview Prep", "Regional Growth", "Revenue Forecasting", "Territory Expansion"]
      },
      {
        "position": "SaaS VP of Sales",
        "category": "Sales",
        "industry": "SaaS",
        "tags": ["Interview Prep", "Sales Strategy", "Leadership", "Revenue Growth"]
      },
      {
        "position": "SaaS Freemium Conversion Specialist",
        "category": "Sales",
        "industry": "SaaS",
        "tags": ["Interview Prep", "Trial Conversions", "User Engagement", "Pricing Strategy"]
      },
      {
        "position": "SaaS Expansion Sales Representative",
        "category": "Sales",
        "industry": "SaaS",
        "tags": ["Interview Prep", "Upselling", "Cross-Selling", "Customer Growth"]
      },
      {
        "position": "SaaS Vertical Sales Specialist",
        "category": "Sales",
        "industry": "SaaS",
        "tags": ["Interview Prep", "Industry-Specific SaaS", "Custom Solutions", "B2B SaaS Sales"]
      },
      {
        "position": "Surgical Sales Specialist",
        "category": "Sales",
        "industry": "Medical Device",
        "tags": ["Interview Prep", "Operating Room Sales", "Surgeon Engagement", "Medical Equipment"]
      },
      {
        "position": "Diagnostic Equipment Sales Representative",
        "category": "Sales",
        "industry": "Medical Device",
        "tags": ["Interview Prep", "Diagnostic Imaging", "Hospital Sales", "Regulatory Compliance"]
      },
      {
        "position": "Medical Capital Equipment Sales Manager",
        "category": "Sales",
        "industry": "Medical Device",
        "tags": ["Interview Prep", "Capital Equipment", "Hospital Procurement", "Budgeting"]
      },
      {
        "position": "Medical Device Market Development Manager",
        "category": "Sales",
        "industry": "Medical Device",
        "tags": ["Interview Prep", "Market Expansion", "Product Launches", "Territory Growth"]
      },
      {
        "position": "Veterinary Medical Device Sales Representative",
        "category": "Sales",
        "industry": "Medical Device",
        "tags": ["Interview Prep", "Veterinary Clinics", "Animal Health Equipment", "B2B Sales"]
      },
      {
        "position": "Medical Device National Sales Director",
        "category": "Sales",
        "industry": "Medical Device",
        "tags": ["Interview Prep", "Sales Leadership", "Revenue Growth", "Strategic Planning"]
      },
      {
        "position": "Medical Device Reimbursement Specialist",
        "category": "Sales",
        "industry": "Medical Device",
        "tags": ["Interview Prep", "Insurance Billing", "Healthcare Providers", "Product Pricing"]
      },
      {
        "position": "Medical Device Inside Sales Representative",
        "category": "Sales",
        "industry": "Medical Device",
        "tags": ["Interview Prep", "Lead Qualification", "Cold Calling", "Medical Technology"]
      },
      {
        "position": "Medical Device Clinical Liaison",
        "category": "Sales",
        "industry": "Medical Device",
        "tags": ["Interview Prep", "Clinical Support", "Medical Training", "Hospital Engagement"]
      },
      {
        "position": "Medical Wearable Technology Sales Representative",
        "category": "Sales",
        "industry": "Medical Device",
        "tags": ["Interview Prep", "Wearable Devices", "Patient Monitoring", "Remote Healthcare"]
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