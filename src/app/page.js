'use client';

import { useState } from 'react';
import axios from 'axios';
import './globals.css'; // Ensure to import the global styles

export default function Home() {
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState(null);
  const [chatResponse, setChatResponse] = useState('');
  const [error, setError] = useState('');

  const handleFetchStockData = async () => {
    setError(''); // Reset any previous error messages

    if (!symbol) {
      setError('Please enter a stock symbol.');
      return;
    }

    try {
      // Fetch stock data from Alpha Vantage
      const response = await axios.get(`/api/stock?symbol=${symbol}`);
      
      // Check if the response has an error
      if (response.data.error) {
        setError(response.data.error);
        return;
      }

      // Set the fetched stock data
      const rawStockData = response.data;
      setStockData(rawStockData);
      
      // Pass raw data to ChatGPT API for analysis
      await fetchChatAnalysis(rawStockData);
    } catch (error) {
      console.error("Error fetching stock data:", error.response ? error.response.data : error.message);
      setError("An error occurred while fetching the stock data.");
    }
  };

  const fetchChatAnalysis = async (rawData) => {
    try {
      // Send the raw stock data directly to ChatGPT API
      const chatResponse = await axios.post('/api/chatgpt', {
        prompt: `Please analyze the following stock data technically using a strategy of your choice and give me a recommendation of whether I should buy, sell, or wait: ${JSON.stringify(rawData)}`, // Updated prompt
      });

      // Log the entire response for debugging
      console.log("ChatGPT API response:", chatResponse.data);

      // Check if the response structure is as expected
      if (chatResponse.data && chatResponse.data.choices && chatResponse.data.choices.length > 0) {
        setChatResponse(chatResponse.data.choices[0].message.content); // Set the response from ChatGPT
      } else {
        console.error("Unexpected response structure:", chatResponse.data);
        setChatResponse("Unexpected response from ChatGPT.");
      }
    } catch (error) {
      console.error("Error fetching ChatGPT response:", error.response ? error.response.data : error.message);
      setChatResponse("An error occurred while fetching the analysis from ChatGPT.");
    } 
  };

  return (
    <div className="container">
      <h1 className="title">Should you invest?</h1>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Enter stock symbol"
        className="input"
      />
      <button onClick={handleFetchStockData} className="button">Fetch Stock Data and Analyze</button>

      {error && <p className="error">{error}</p>}

      {chatResponse && (
        <div className="response">
          <h2 className="response-title">AI Analysis for {symbol}</h2>
          <p className="response-content">{chatResponse}</p>
        </div>
      )}
    </div>
  );
}

