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
    "position": "Full-Stack Developer",
    "category": "Technical",
    "vertical": "Software Engineering",
    "tags": ["Interview Prep", "Front-End", "Back-End", "JavaScript", "Node.js"]
  },
  {
    "position": "Front-End Engineer",
    "category": "Technical",
    "vertical": "Software Engineering",
    "tags": ["Interview Prep", "React", "Vue.js", "CSS", "JavaScript"]
  },
  {
    "position": "Back-End Developer",
    "category": "Technical",
    "vertical": "Software Engineering",
    "tags": ["Interview Prep", "APIs", "Databases", "Node.js", "Java"]
  },
  {
    "position": "Python Developer",
    "category": "Technical",
    "vertical": "Software Engineering",
    "tags": ["Interview Prep", "Django", "Flask", "Data Structures", "Python"]
  },
  {
    "position": "Java Developer",
    "category": "Technical",
    "vertical": "Software Engineering",
    "tags": ["Interview Prep", "Spring Boot", "Multithreading", "OOP", "Java"]
  },
  {
    "position": "C++ Developer",
    "category": "Technical",
    "vertical": "Software Engineering",
    "tags": ["Interview Prep", "Memory Management", "STL", "Multithreading", "C++"]
  },
  {
    "position": "DevOps Engineer",
    "category": "Technical",
    "vertical": "Software Engineering",
    "tags": ["Interview Prep", "CI/CD", "Kubernetes", "AWS", "Infrastructure"]
  },
  {
    "position": "Cloud Engineer",
    "category": "Technical",
    "vertical": "Software Engineering",
    "tags": ["Interview Prep", "AWS", "Azure", "GCP", "Cloud Computing"]
  },
  {
    "position": "Data Engineer",
    "category": "Technical",
    "vertical": "Software Engineering",
    "tags": ["Interview Prep", "ETL", "Big Data", "SQL", "Python"]
  },
  {
    "position": "Machine Learning Engineer",
    "category": "Technical",
    "vertical": "Software Engineering",
    "tags": ["Interview Prep", "Neural Networks", "Deep Learning", "TensorFlow", "Python"]
  },
  {
    "position": "AI Engineer",
    "category": "Technical",
    "vertical": "Software Engineering",
    "tags": ["Interview Prep", "Natural Language Processing", "LLMs", "AI Algorithms", "Python"]
  },
  {
    "position": "Cybersecurity Engineer",
    "category": "Technical",
    "vertical": "Software Engineering",
    "tags": ["Interview Prep", "Penetration Testing", "Network Security", "Encryption", "C"]
  },
  {
    "position": "Embedded Systems Engineer",
    "category": "Technical",
    "vertical": "Software Engineering",
    "tags": ["Interview Prep", "Microcontrollers", "RTOS", "C", "Assembly"]
  },
  {
    "position": "Mobile App Developer",
    "category": "Technical",
    "vertical": "Software Engineering",
    "tags": ["Interview Prep", "iOS", "Android", "Swift", "Kotlin"]
  },
  {
    "position": "Game Developer",
    "category": "Technical",
    "vertical": "Software Engineering",
    "tags": ["Interview Prep", "Unity", "Unreal Engine", "C#", "Game Physics"]
  },
  {
    "position": "Blockchain Developer",
    "category": "Technical",
    "vertical": "Software Engineering",
    "tags": ["Interview Prep", "Smart Contracts", "Solidity", "Ethereum", "Cryptography"]
  },
  {
    "position": "Site Reliability Engineer (SRE)",
    "category": "Technical",
    "vertical": "Software Engineering",
    "tags": ["Interview Prep", "Observability", "Monitoring", "Automation", "Cloud"]
  },
  {
    "position": "Software Architect",
    "category": "Technical",
    "vertical": "Software Engineering",
    "tags": ["Interview Prep", "System Design", "Scalability", "Microservices", "Architecture"]
  },
  {
    "position": "Test Automation Engineer",
    "category": "Technical",
    "vertical": "Software Engineering",
    "tags": ["Interview Prep", "Selenium", "JUnit", "Integration Testing", "QA"]
  },
  {
    "position": "Low-Code/No-Code Developer",
    "category": "Technical",
    "vertical": "Software Engineering",
    "tags": ["Interview Prep", "Bubble.io", "Webflow", "Automation", "No-Code"]
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
  const term = `${position} ${titleFormat}`;
  
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

  const content = completion.choices[0].message.content;
  const date = generateRandomDate();

  // Generate description
  const descPrompt = `Write a concise description (under 500 characters) for a ${position} ${titleFormat}. Focus on what job seekers will learn from this guide.`;
  
  const descCompletion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: descPrompt }],
    temperature: 0.7,
  });

  const description = descCompletion.choices[0].message.content;

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
  console.log(`Created interview guide: ${filePath}`);
}

async function createAllGuides() {
  for (const guide of INTERVIEW_GUIDES) {
    // Randomly select one title format for each position
    const randomFormat = TITLE_FORMATS[Math.floor(Math.random() * TITLE_FORMATS.length)];
    await generateInterviewGuide(
      guide.position,
      randomFormat,
      guide.category,
      guide.vertical,
      guide.tags
    );
  }
}

createAllGuides().catch(console.error); 