import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import ChatContainer from '../components/ResponseBox';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
const { Configuration, OpenAIApi } = require("openai");

function Language4() {

  const [content, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, addChat] = useState([]);
  const [error, setError] = useState();
  const { auth } = useAuth();

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

    
   try{ const completion = await openai.createChatCompletion({
      model: "gpt-4-turbo",
      messages: message.messages,
    });
    
    let arrayOutput = chatHistory;
    arrayOutput.push(completion.data.choices[0].message);

    const usage = completion.data.usage;
    const username = auth?.user;
      try {
        await axios.post('/.netlify/functions/userExperience', 
        JSON.stringify({username, usage}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
    } catch (e) {
        if (e.response) {
          console.log(e.response.data.message);
    }
  }
    addChat(arrayOutput);
    setLoading(false); // Stop loading
    setError(""); // reset error message
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
    <Container className="container-gpt">
    <div className='wrapper'>

      <Container className='title'>
        <h3 style={{margin: "1rem"}}>GPT-4 Turbo</h3>
        <Button className='reset-button' variant="outline-danger" onClick={() => resetButton()}>Reset text</Button>
      </Container>
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
    <Button style={{marginBottom: "1rem"}} variant="outline-light" onClick={() => OpenAI(content)}>{loading ? <>Loading..</> : <>Let the magic begin</>}</Button>
    <p style={{padding:".1rem"}} className='error-chat'>{error}</p>
  </div>

  <ChatContainer chatHistory={chatHistory}/>
</Container>
  );
}

export default Language4;
