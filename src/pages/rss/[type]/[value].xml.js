import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { marked } from 'marked';

export async function getStaticPaths() {
  const jobs = await getCollection('jobs');
  
  // Get unique categories and teams
  const categories = [...new Set(jobs.map(job => job.data.occupationalCategory))].filter(Boolean);
  const teams = [...new Set(jobs.map(job => job.data.team))].filter(Boolean);
  
  console.log('Available Categories:', categories);
  console.log('Available Teams:', teams);
  
  // Create paths for both categories and teams
  const paths = [
    // Category paths
    ...categories.map(category => ({
      params: { 
        type: 'category',
        value: category.toLowerCase().replace(/\s+/g, '-')
      },
      props: { 
        type: 'category',
        filterValue: category
      }
    })),
    // Team paths
    ...teams.map(team => ({
      params: {
        type: 'team',
        value: team.toLowerCase().replace(/\s+/g, '-')
      },
      props: {
        type: 'team',
        filterValue: team
      }
    }))
  ];

  console.log('Generated RSS paths:', paths.map(p => `/rss/${p.params.type}/${p.params.value}.xml`));
  return paths;
}

export async function GET({ params, props }) {
  const { type, filterValue } = props;
  const jobs = await getCollection('jobs');
  
  console.log(`Generating RSS feed for ${type}: ${filterValue}`);
  
  // Filter jobs based on type
  const filteredJobs = jobs.filter(job => {
    if (type === 'category') {
      const matches = job.data.occupationalCategory === filterValue;
      if (matches) {
        console.log(`Matched job: ${job.data.position} (${job.data.occupationalCategory})`);
      }
      return matches;
    }
    const matches = job.data.team === filterValue;
    if (matches) {
      console.log(`Matched job: ${job.data.position} (${job.data.team})`);
    }
    return matches;
  });
  
  console.log(`Found ${filteredJobs.length} jobs for ${type}: ${filterValue}`);

  const title = type === 'category'
    ? `Tustin Recruiting - ${filterValue} Positions`
    : `Tustin Recruiting - ${filterValue} Team`;

  const description = type === 'category'
    ? `Latest ${filterValue} positions across the United States`
    : `Latest ${filterValue} team positions across the United States`;

  const site = new URL('https://tustinrecruiting.com');

  return rss({
    title,
    description,
    site: site.toString(),
    items: filteredJobs.map((job) => ({
      title: job.data.position,
      pubDate: new Date(job.data.datePosted),
      description: marked.parse(job.body),
      link: `/jobs/${job.slug}`,
      customData: `
        <company>
          <name>${job.data.hiringOrganization.name}</name>
          <logo>${job.data.hiringOrganization.logo}</logo>
          <url>${job.data.hiringOrganization.sameAs}</url>
        </company>
        <datePosted>${job.data.datePosted}</datePosted>
        <validThrough>${job.data.validThrough}</validThrough>
        <location>${job.data.location}</location>
        <streetAddress>${job.data.jobLocation.streetAddress}</streetAddress>
        <city>${job.data.jobLocation.addressLocality}</city>
        <state>${job.data.jobLocation.addressRegion}</state>
        <country>${job.data.jobLocation.addressCountry}</country>
        <postalCode>${job.data.jobLocation.postalCode}</postalCode>
        <salary>
          <currency>${job.data.baseSalary.currency}</currency>
          <minimum>${job.data.baseSalary.minValue}</minimum>
          <maximum>${job.data.baseSalary.maxValue}</maximum>
          <monetaryAmount>${job.data.baseSalary.unitText}</monetaryAmount>
        </salary>
        <category>${job.data.occupationalCategory}</category>
        <team>${job.data.team}</team>
        <directApply>true</directApply>
        <guid>${job.data.identifier.value}</guid>
        <setting>
          <remote>false</remote>
          <employmentType>${job.data.employmentType}</employmentType>
        </setting>
      `,
    })),
  });
}