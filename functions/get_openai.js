require('dotenv').config();

async function handler(event) {
    let myInput = undefined;
    try {
      myInput = JSON.parse(event.body);
      // rest of the code
    } catch (error) {
      return {
        statusCode: 400,
        body: `Error: ${error}, req body: ${event.body.input}, myInput: ${myInput}`,
      };
    }
  
    // The configuration for the API request to OpenAI
    const openAiConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_OPEN_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: myInput.messages,
        temperature: 1,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      }),
    };
    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        openAiConfig,
      );
      const data = await response.json();
      return {
        statusCode: 200,
        body: JSON.stringify(data?.choices[0].message),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `error occured: ${error}`,
      };
    }
  }

module.exports = { handler };