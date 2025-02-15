#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const OpenAI = require('openai');
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

// Blog post metadata
const BLOG_POSTS = [
  {
    title: "Sacramento Commercial Electrician Staffing",
    slug: "sacramento-commercial-electrician-staffing",
    description: "Sacramento's growing downtown developments, business parks, and retail centers have increased the demand for skilled commercial electricians. Learn how staffing agencies are helping businesses in Sacramento find top electrical professionals.",
    tags: ["Commercial Electricians", "Staffing", "Sacramento", "Jobs"]
  },
  {
    title: "Sacramento Residential Electrician Staffing",
    slug: "sacramento-residential-electrician-staffing",
    description: "Sacramento's rapid housing expansion in areas like Natomas, Elk Grove, and Folsom has created a strong demand for residential electricians. Discover how staffing solutions are connecting homeowners and contractors with skilled professionals.",
    tags: ["Residential Electricians", "Staffing", "Sacramento", "Careers"]
  },
  {
    title: "Sacramento Industrial Electrician Staffing",
    slug: "sacramento-industrial-electrician-staffing",
    description: "Sacramento's industrial sector, including manufacturing plants and logistics hubs, relies on highly skilled industrial electricians to maintain automation systems and power infrastructure. Find out how staffing firms are helping businesses secure top electrical talent.",
    tags: ["Industrial Electricians", "Staffing", "Sacramento", "Careers"]
  },
  {
    title: "Sacramento Fire Alarm Technician Staffing",
    slug: "sacramento-fire-alarm-technician-staffing",
    description: "With strict building codes and fire safety regulations, Sacramento businesses are in need of certified fire alarm technicians. Discover how staffing agencies are supplying professionals for fire alarm installation and maintenance projects.",
    tags: ["Fire Alarm Technicians", "Staffing", "Sacramento", "Jobs"]
  },
  {
    title: "Sacramento Controls Technician Staffing",
    slug: "sacramento-controls-technician-staffing",
    description: "Sacramento's growing adoption of smart building technologies has increased the need for skilled controls technicians. Learn how staffing agencies are helping businesses find professionals for automation, HVAC, and industrial control systems.",
    tags: ["Controls Technicians", "Staffing", "Sacramento", "Careers"]
  },
  {
    title: "Sacramento Security Technician Staffing",
    slug: "sacramento-security-technician-staffing",
    description: "With corporate offices, government buildings, and residential communities needing security upgrades, Sacramento is experiencing high demand for security technicians. Learn how staffing agencies are connecting businesses with top security professionals.",
    tags: ["Security Technicians", "Staffing", "Sacramento", "Jobs"]
  },
  {
    title: "Sacramento Solar Installer Staffing",
    slug: "sacramento-solar-installer-staffing",
    description: "Sacramento's leadership in renewable energy has fueled a high demand for solar installers. Find out how staffing agencies are connecting skilled solar professionals with contractors to meet the city's clean energy goals.",
    tags: ["Solar Installers", "Staffing", "Sacramento", "Green Energy"]
  },
  {
    title: "Sacramento Voice Data Technician Staffing",
    slug: "sacramento-voice-data-technician-staffing",
    description: "Sacramento's expanding business infrastructure relies on modern communication systems, increasing the need for skilled voice data technicians. Discover how staffing agencies are supplying professionals for telecom and IT installations.",
    tags: ["Voice Data Technicians", "Staffing", "Sacramento", "Technology"]
  },
  {
    title: "Sacramento Audio Visual Technician Staffing",
    slug: "sacramento-audio-visual-technician-staffing",
    description: "With an increase in corporate events, entertainment venues, and digital workplaces, Sacramento businesses need experienced AV technicians. Learn how staffing solutions are connecting businesses with top AV professionals.",
    tags: ["Audio Visual Technicians", "Staffing", "Sacramento", "Careers"]
  },
  {
    title: "Sacramento Data Center Technician Staffing",
    slug: "sacramento-data-center-technician-staffing",
    description: "As Sacramento continues its growth as a regional technology hub, businesses need skilled data center technicians to manage critical IT infrastructure. Discover how staffing agencies are helping businesses secure top talent.",
    tags: ["Data Center Technicians", "Staffing", "Sacramento", "Technology"]
  },
  {
    title: "San Diego Commercial Electrician Staffing",
    slug: "san-diego-commercial-electrician-staffing",
    description: "San Diego's expanding corporate headquarters, hospitality sector, and mixed-use developments have fueled demand for skilled commercial electricians. Learn how staffing agencies are helping businesses in San Diego find top electrical professionals.",
    tags: ["Commercial Electricians", "Staffing", "San Diego", "Jobs"]
  },
  {
    title: "San Diego Residential Electrician Staffing",
    slug: "san-diego-residential-electrician-staffing",
    description: "With real estate growth in La Jolla, Pacific Beach, and Chula Vista, San Diego has a growing need for skilled residential electricians. Discover how staffing solutions are connecting electricians with contractors and homeowners across the county.",
    tags: ["Residential Electricians", "Staffing", "San Diego", "Careers"]
  },
  {
    title: "San Diego Industrial Electrician Staffing",
    slug: "san-diego-industrial-electrician-staffing",
    description: "San Diego's thriving industrial sector, including biotech manufacturing and aerospace facilities, requires highly skilled industrial electricians. Learn how staffing firms are connecting employers with top electrical talent to support these industries.",
    tags: ["Industrial Electricians", "Staffing", "San Diego", "Careers"]
  },
  {
    title: "San Diego Fire Alarm Technician Staffing",
    slug: "san-diego-fire-alarm-technician-staffing",
    description: "With safety regulations becoming more stringent, the demand for certified fire alarm technicians in San Diego continues to rise. Discover how staffing agencies are providing skilled professionals to install and maintain fire safety systems across commercial and residential properties.",
    tags: ["Fire Alarm Technicians", "Staffing", "San Diego", "Jobs"]
  },
  {
    title: "San Diego Controls Technician Staffing",
    slug: "san-diego-controls-technician-staffing",
    description: "San Diego’s growth in smart building technology and automation has increased the demand for controls technicians. Learn how staffing agencies are helping businesses in the city find professionals to install and maintain advanced electrical control systems.",
    tags: ["Controls Technicians", "Staffing", "San Diego", "Careers"]
  },
  {
    title: "San Diego Security Technician Staffing",
    slug: "san-diego-security-technician-staffing",
    description: "With increasing demand for security systems in office buildings, data centers, and residential complexes, San Diego is in need of skilled security technicians. Learn how staffing solutions are connecting businesses with top security professionals.",
    tags: ["Security Technicians", "Staffing", "San Diego", "Jobs"]
  },
  {
    title: "San Diego Solar Installer Staffing",
    slug: "san-diego-solar-installer-staffing",
    description: "San Diego leads California in solar energy adoption, increasing the demand for experienced solar installers. Find out how staffing agencies are supporting the city’s sustainability goals by connecting skilled solar professionals with top contractors.",
    tags: ["Solar Installers", "Staffing", "San Diego", "Green Energy"]
  },
  {
    title: "San Diego Voice Data Technician Staffing",
    slug: "san-diego-voice-data-technician-staffing",
    description: "As one of California’s tech-driven cities, San Diego businesses rely on advanced communication infrastructure. Discover how staffing agencies are meeting the demand for skilled voice data technicians in the region.",
    tags: ["Voice Data Technicians", "Staffing", "San Diego", "Technology"]
  },
  {
    title: "San Diego Audio Visual Technician Staffing",
    slug: "san-diego-audio-visual-technician-staffing",
    description: "San Diego’s vibrant corporate event spaces, tech firms, and entertainment venues require skilled audio-visual technicians. Learn how staffing solutions are helping businesses find experienced AV professionals for high-end installations and productions.",
    tags: ["Audio Visual Technicians", "Staffing", "San Diego", "Careers"]
  },
  {
    title: "San Diego Data Center Technician Staffing",
    slug: "san-diego-data-center-technician-staffing",
    description: "San Diego's expanding tech and biotech industries have driven an increased demand for data center technicians. Discover how staffing agencies are helping companies find professionals to manage and optimize these critical IT facilities.",
    tags: ["Data Center Technicians", "Staffing", "San Diego", "Technology"]
  },
  {
    title: "Bakersfield Commercial Electrician Staffing",
    slug: "bakersfield-commercial-electrician-staffing",
    description: "Bakersfield’s commercial sector, including shopping centers, office buildings, and new developments, has created a high demand for skilled commercial electricians. Learn how staffing agencies are helping businesses in Bakersfield find top electrical professionals.",
    tags: ["Commercial Electricians", "Staffing", "Bakersfield", "Jobs"]
  },
  {
    title: "Bakersfield Residential Electrician Staffing",
    slug: "bakersfield-residential-electrician-staffing",
    description: "With growing suburban developments in areas like Seven Oaks, Rosedale, and Northwest Bakersfield, there is a rising demand for residential electricians. Discover how staffing solutions are connecting electricians with homeowners and contractors in Kern County.",
    tags: ["Residential Electricians", "Staffing", "Bakersfield", "Careers"]
  },
  {
    title: "Bakersfield Industrial Electrician Staffing",
    slug: "bakersfield-industrial-electrician-staffing",
    description: "Bakersfield's industrial economy, including oil refineries, agriculture processing plants, and logistics hubs, requires highly skilled industrial electricians. Learn how staffing firms are connecting businesses with experienced electrical professionals.",
    tags: ["Industrial Electricians", "Staffing", "Bakersfield", "Careers"]
  },
  {
    title: "Bakersfield Fire Alarm Technician Staffing",
    slug: "bakersfield-fire-alarm-technician-staffing",
    description: "As Bakersfield expands its commercial and industrial infrastructure, the demand for certified fire alarm technicians is increasing. Learn how staffing agencies are helping businesses find professionals to install and maintain fire safety systems.",
    tags: ["Fire Alarm Technicians", "Staffing", "Bakersfield", "Jobs"]
  },
  {
    title: "Bakersfield Controls Technician Staffing",
    slug: "bakersfield-controls-technician-staffing",
    description: "With Bakersfield's agricultural processing and industrial automation sectors growing, the need for skilled controls technicians is rising. Discover how staffing agencies are helping businesses find professionals for electrical control and automation systems.",
    tags: ["Controls Technicians", "Staffing", "Bakersfield", "Careers"]
  },
  {
    title: "Bakersfield Security Technician Staffing",
    slug: "bakersfield-security-technician-staffing",
    description: "Bakersfield businesses and residential communities are increasing investments in security systems, leading to a high demand for skilled security technicians. Learn how staffing solutions are connecting employers with top security professionals.",
    tags: ["Security Technicians", "Staffing", "Bakersfield", "Jobs"]
  },
  {
    title: "Bakersfield Solar Installer Staffing",
    slug: "bakersfield-solar-installer-staffing",
    description: "Bakersfield’s location in California’s Central Valley makes it a prime area for large-scale solar energy projects. Find out how staffing agencies are helping meet the demand for skilled solar installers in residential, commercial, and industrial settings.",
    tags: ["Solar Installers", "Staffing", "Bakersfield", "Green Energy"]
  },
  {
    title: "Bakersfield Voice Data Technician Staffing",
    slug: "bakersfield-voice-data-technician-staffing",
    description: "As Bakersfield’s business and technology infrastructure expands, companies are relying on skilled voice data technicians to support telecom networks. Learn how staffing agencies are helping connect skilled professionals with businesses in need of voice and data services.",
    tags: ["Voice Data Technicians", "Staffing", "Bakersfield", "Technology"]
  },
  {
    title: "Bakersfield Audio Visual Technician Staffing",
    slug: "bakersfield-audio-visual-technician-staffing",
    description: "With an increase in corporate events, educational institutions, and entertainment venues, Bakersfield businesses are seeking experienced AV technicians. Discover how staffing solutions are connecting businesses with top-tier audio-visual professionals.",
    tags: ["Audio Visual Technicians", "Staffing", "Bakersfield", "Careers"]
  },
  {
    title: "Bakersfield Data Center Technician Staffing",
    slug: "bakersfield-data-center-technician-staffing",
    description: "With increasing reliance on cloud computing and IT infrastructure in Bakersfield, the demand for skilled data center technicians is on the rise. Learn how staffing agencies are helping businesses find professionals to maintain critical data centers.",
    tags: ["Data Center Technicians", "Staffing", "Bakersfield", "Technology"]
  }
];

  
  

async function generateOutline(title, description) {
  const outlinePrompt = `Create a detailed outline for a blog post titled "${title}". Start off with an introduction and never use h1 headings. The post should cover: ${description}

The outline should:
1. Include a compelling introduction
2. Have 4-6 main sections with h2 headings
3. Include 2-3 subsections under each main section with h3 headings
4. End with a strong conclusion section
5. Focus on practical, actionable information
6. Include specific examples and data points to cover, the more specific data points the better
7. Consider SEO optimization and readability

Format the outline in markdown using ## for main sections and ### for subsections. Do not include actual content, just the structure.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: outlinePrompt }],
    temperature: 0.7,
  });

  return completion.choices[0].message.content;
}

async function generateBlogPost(title, description, outline, otherPosts, currentTags) {
  const relatedPosts = otherPosts.filter(post => 
    post.title !== title && 
    (post.description.toLowerCase().includes(title.toLowerCase()) || 
     title.toLowerCase().includes(post.title.toLowerCase()) ||
     post.tags.some(tag => currentTags.includes(tag)))
  );

  const blogPrompt = `Write a comprehensive blog post based on this outline:

${outline}

The blog post should:
1. Be written in a conversational, engaging tone, and keep your sentences short, concise, and dont use filler words
2. Include practical examples and specific details
3. Use Best Electrician Jobs as the primary staffing company example throughout the content, highlighting our expertise and success in electrical staffing
4. Include specific data points and statistics around construction and hiring in the state
5. Use markdown formatting (## for h2, ### for h3, ** for bold), never use h1 headings
6. Be optimized for SEO while maintaining readability
7. Only include links to these related blog posts (no external links):
${relatedPosts.map(post => `- [${post.title}](/staffing/${post.slug})`).join('\n')}

Important guidelines:
- Present Best Electrician Jobs as a leading staffing solution in the electrical industry
- Include specific examples of how Best Electrician Jobs has successfully placed electricians in various roles
- Highlight our deep understanding of the local market and industry requirements
- Emphasize our commitment to matching qualified candidates with the right opportunities
- Reference our extensive network and proven track record in electrical staffing
- Showcase our expertise in various electrical specialties

Title: ${title}
Description: ${description}

Important:
- Do not include any SEO or readability notes at the end
- Do not include any meta commentary about the post
- End with a strong conclusion that ties everything together
- Only link to the related blog posts provided above, no external links
- Make sure to naturally reference and link to the related posts within the content where relevant
- Always refer to Best Electrician Jobs in first person (we, our, us) when discussing services and expertise

Format the content in markdown. Do not include frontmatter. Start with the main content after the introduction.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: blogPrompt }],
    temperature: 0.7,
  });

  return completion.choices[0].message.content;
}

async function createBlogPost(postData) {
  console.log(`Generating outline for: ${postData.title}`);
  const outline = await generateOutline(postData.title, postData.description);
  
  console.log(`Generating full blog post for: ${postData.title}`);
  const content = await generateBlogPost(
    postData.title, 
    postData.description, 
    outline, 
    BLOG_POSTS,
    postData.tags
  );

  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + Math.floor(Math.random() * 30) + 1);

  const frontmatter = `---
pubDate: ${futureDate.toISOString().split('T')[0]}
modDate: "${futureDate.toISOString().split('.')[0]}Z"
author: Best Electrician
title: ${postData.title}
description: "${postData.description}"
avatar:
  url: "/images/eleclog.png"
  alt: "Best Electrician Jobs"
image:
  url: "https://i.pinimg.com/564x/f3/56/71/f35671374c45021df13bb688c390a3a2.jpg"
  alt: "Best Electrician Jobs"
tags: ${JSON.stringify(postData.tags)}
---

${content.trim()}`;

  const filePath = path.join(__dirname, '..', 'src', 'content', 'staffing', `${postData.slug}.md`);
  fs.writeFileSync(filePath, frontmatter);
  console.log(`Created staffing post: ${filePath}`);
}

async function createAllBlogPosts() {
  for (const post of BLOG_POSTS) {
    await createBlogPost(post);
    // Add a delay between posts to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

createAllBlogPosts().catch(console.error); 