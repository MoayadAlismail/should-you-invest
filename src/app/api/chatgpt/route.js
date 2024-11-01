// src/app/api/chatgpt/route.js
// File: src/app/api/chatgpt/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  try {
    // Parse incoming data from the request body
    const { prompt } = await req.json();

    // Call ChatGPT API with the raw data as prompt
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: JSON.stringify(prompt) }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json(response.data); // Return ChatGPT's response
  } catch (error) {
    console.error("Error in ChatGPT API route:", error);
    return NextResponse.json(
      { error: 'Failed to fetch ChatGPT analysis' },
      { status: 500 }
    );
  }
}

// import axios from 'axios';

// export async function POST(request) {
//   const { prompt } = await request.json();

//   try {
//     const response = await axios.post('https://api.openai.com/v1/chat/completions', {
//       model: 'gpt-3.5-turbo',
//       messages: [{ role: 'user', content: prompt }],
//     }, {
//       headers: {
//         'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     return new Response(JSON.stringify(response.data), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error("Error from OpenAI:", error);
//     return new Response('Error contacting ChatGPT API', { status: 500 });
//   }
// }

// import { NextResponse } from 'next/server';
// import axios from 'axios';

// export async function POST(req) {
//   try {
//     const { company } = await req.json();  // Parse company from request body

//     const prompt = `Describe the company ${company}.`;

//     // Make a request to OpenAI's API
//     const response = await axios.post(
//       'https://api.openai.com/v1/chat/completions',
//       {
//         model: 'gpt-3.5-turbo',
//         messages: [{ role: 'user', content: prompt }],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,  // Make sure the API key is valid
//         },
//       }
//     );

//     // Return the response from the ChatGPT API
//     return NextResponse.json(response.data);
//   } catch (error) {
//     console.error('Error in POST /api/chatgpt:', error.response?.data || error.message);
//     return NextResponse.json({ error: 'Failed to fetch ChatGPT response' }, { status: 500 });
//   }
// }

// import { NextResponse } from 'next/server';
// import axios from 'axios';

// export async function POST(req) {
//   try {
//     // Parse the incoming request body
//     const body = await req.json();
//     const prompt = body.prompt;

//     // Make a request to OpenAI API
//     const response = await axios.post(
//       'https://api.openai.com/v1/chat/completions',
//       {
//         model: 'gpt-3.5-turbo',
//         messages: [{ role: 'user', content: prompt }],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//         },
//       }
//     );

//     // Return the OpenAI response to the client
//     return NextResponse.json(response.data);
//   } catch (error) {
//     console.error('Error fetching ChatGPT response:', error);
//     return NextResponse.json({ error: 'Failed to fetch ChatGPT response' }, { status: 500 });
//   }
// }
