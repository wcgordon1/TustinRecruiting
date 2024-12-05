import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
async function POST({ request }) {
  try {
    const resend = new Resend("re_aANL2VrW_kKKLeaEwZoLEV8DmAb3XMTPe");
    if (false) ;
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const linkedin = formData.get("linkedin");
    const coverLetter = formData.get("coverLetter");
    const jobTitle = formData.get("jobTitle");
    const resume = formData.get("resume");
    const emails = JSON.parse(formData.get("emails"));
    const resumeArrayBuffer = await resume.arrayBuffer();
    const resumeContent = Buffer.from(resumeArrayBuffer).toString("base64");
    const data = await resend.emails.send({
      from: "Application Alert <no-reply@tustinjobalert.com>",
      to: emails,
      subject: `New Job Application: ${jobTitle} from ${name}`,
      text: `
Job Application Details:

Position: ${jobTitle}
Company: ${formData.get("company")}
Location: ${formData.get("location")}
Job ID: ${formData.get("jobId")}

Applicant Information:
Name: ${name}
Email: ${email}
Phone: ${phone}
LinkedIn: ${linkedin || "Not provided"}

Cover Letter:
${coverLetter || "Not provided"}

Thank you!

*This is an automated email.*

will@tustinrecruiting.com
      `,
      attachments: [
        {
          filename: resume.name,
          content: resumeContent,
          contentType: resume.type
        }
      ]
    });
    return new Response(
      JSON.stringify({
        success: true,
        id: data.id
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store"
        }
      }
    );
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "An error occurred"
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store"
        }
      }
    );
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };