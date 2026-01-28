import type { APIRoute } from 'astro';

interface IssueRequestBody {
  name: string;
  email: string;
  category: string;
  subject: string;
  description: string;
  honeypot?: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  bug: 'bug',
  feature: 'enhancement',
  question: 'question',
  account: 'account',
  other: 'support',
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: IssueRequestBody = await request.json();

    // Honeypot spam check - if this field is filled, it's likely a bot
    if (body.honeypot) {
      // Return success to not tip off the bot, but don't create an issue
      return new Response(
        JSON.stringify({ success: true, message: 'Your ticket has been submitted.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate required fields
    const { name, email, category, subject, description } = body;
    if (!name || !email || !category || !subject || !description) {
      return new Response(
        JSON.stringify({ success: false, message: 'All fields are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Please provide a valid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get environment variables
    const githubToken = import.meta.env.GITHUB_TOKEN;
    const githubRepo = import.meta.env.PUBLIC_GITHUB_ISSUES_REPO;

    if (!githubToken || !githubRepo) {
      console.error('Missing GitHub configuration');
      return new Response(
        JSON.stringify({ success: false, message: 'Support ticket system is not configured. Please try again later.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Build issue body
    const issueBody = `## Support Ticket

**From:** ${name}
**Email:** ${email}
**Category:** ${category}

---

### Description

${description}

---

*This issue was automatically created from a support ticket submission.*`;

    // Get label for category
    const label = CATEGORY_LABELS[category] || 'support';

    // Create GitHub issue
    const response = await fetch(`https://api.github.com/repos/${githubRepo}/issues`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: JSON.stringify({
        title: `[Support] ${subject}`,
        body: issueBody,
        labels: [label, 'support-ticket'],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('GitHub API error:', response.status, errorData);
      return new Response(
        JSON.stringify({ success: false, message: 'Failed to create support ticket. Please try again later.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const issueData = await response.json();

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Your support ticket has been submitted successfully. We will get back to you soon.',
        issueNumber: issueData.number,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error creating support ticket:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'An unexpected error occurred. Please try again later.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
