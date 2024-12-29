import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export const prerender = true;

export async function GET(context) {
  const jobs = await getCollection('jobs');
  
  return rss({
    title: 'Tustin Recruiting Jobs',
    description: 'Find the best jobs in Orange County, CA!',
    site: context.site,
    items: jobs.map((job) => ({
      title: job.data.position,
      pubDate: new Date(job.data.datePosted),
      description: `
        <div>
          <p>${job.data.description}</p>
        </div>
      `,
      link: `${context.site}jobs/${job.slug}`,
      customData: `
        <company>${job.data.hiringOrganization.name}</company>
        <companyLogo>${job.data.hiringOrganization.logo}</companyLogo>
        <datePosted>${job.data.datePosted}</datePosted>
        <validThrough>${job.data.validThrough}</validThrough>
        <location>${job.data.location}</location>
        <salary>
          <currency>${job.data.baseSalary.currency}</currency>
          <minimum>${job.data.baseSalary.minValue}</minimum>
          <maximum>${job.data.baseSalary.maxValue}</maximum>
          <unit>${job.data.baseSalary.unitText}</unit>
        </salary>
        <remote>false</remote>
        <employmentType>${job.data.employmentType}</employmentType>
      `,
    })),
  });
}