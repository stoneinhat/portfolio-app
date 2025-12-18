import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// This is the API route that will be called from your contact form.
export async function POST(request: Request) {
  try {
    // 1. Get the form data from the request body
    const body = await request.json();
    const { message } = body;

    // 2. Basic validation: ensure all fields are present
    if (!message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 3. Get the Slack Webhook URL from environment variables
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!slackWebhookUrl) {
      console.error('SLACK_WEBHOOK_URL is not defined in environment variables.');
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    // 4. Construct the Slack message payload using Slack's "Block Kit" for better formatting
    const slackMessage = {
      text: `New Portfolio Chat Message`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '💬 New Portfolio Chat Message',
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `A visitor sent a message from your portfolio chat bar. They may have included their email in the text below.`,
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Message:*\n\`\`\`${message}\`\`\``,
          },
        },
        {
            type: 'context',
            elements: [
                {
                    type: 'mrkdwn',
                    text: `Received at: ${new Date().toLocaleString()}`
                }
            ]
        }
      ],
    };

    // 5. Send the message to Slack
    const slackResponse = await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackMessage),
    });

    // 6. Check if the message was sent successfully
    if (!slackResponse.ok) {
        const responseText = await slackResponse.text();
        console.error('Failed to send message to Slack:', responseText);
        return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
    }

    // 7. Return a success response to the client
    return NextResponse.json({ message: 'Message sent successfully!' }, { status: 200 });

  } catch (error)
  {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
