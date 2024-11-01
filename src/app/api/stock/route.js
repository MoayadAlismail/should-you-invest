import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req) {
  
  console.log(req.url); // Log the request URL

  const { searchParams } = new URL(req.url); // Extracting search params from the URL
  const symbol = searchParams.get('symbol'); // Extracting 'symbol' query parameter

  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`

    );

    return NextResponse.json(response.data); // Return the data from Alpha Vantage
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
  }
}
