import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import ChatContainer from '../components/ResponseBox';
const { Configuration, OpenAIApi } = require("openai");

function Language3() {
  const [context, setContext] = useState("")
  const [content, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, addChat] = useState([]);
  const [error, setError] = useState();

  const handleChange = event => {
    setMessage(event.target.value);
  };

  async function OpenAI(content) {
    setLoading(true);
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPEN_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    let message = {messages: [{role: "user", content: content}],}

    let arrayInput = chatHistory;
    arrayInput.push(message.messages[0]);
    addChat(arrayInput);

    if (chatHistory.length > 2) {
      let response = {role: "system", content: context}
      message.messages.push(response);
    }
    
   try{ const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: message.messages,
    });

    let arrayOutput = chatHistory;
    arrayOutput.push(completion.data.choices[0].message);

    addChat(arrayOutput);

    setLoading(false); // Stop loading
    setError(""); // reset error message
    setContext(completion.data.choices[0].message.content)
       }
      catch (e){
        setError(JSON.stringify(e.name+"-"+e.message))
        addChat([])
        setLoading(false); // Stop loading
      } 
    }
    const resetButton = () => {
      addChat([])
      setError(""); // reset error messages
    }
  return (
    <Container className="text-container">
        <div className='wrapper'>
        <h3 style={{margin: "1rem"}}>GPT-3.5 Turbo</h3>
        <Button className='reset-button' variant="dark" onClick={() => resetButton()}>Reset text</Button>
        <h5 style={{margin: "1rem"}}>THIS MODEL CAN FOLLOW UP ONE QUESTION AT THE TIME</h5>
        <ChatContainer chatHistory={chatHistory}/>
        <Form.Control
        className='input'
        as="textarea"
        type="textarea"
        id="content"
        name="content"
        onChange={handleChange}
        value={content}
        autoComplete="on"
      />
        <Button style={{marginBottom: "1rem"}} variant="dark" onClick={() => OpenAI(content)}>{loading ? <>Loading..</> : <>Let the magic begin</>}</Button>
        <p style={{whiteSpace:"pre-line", padding:"2rem", color:"red",fontWeight:"600"}}>{error}</p>
        </div>
    </Container>
  );
}

export default Language3;
