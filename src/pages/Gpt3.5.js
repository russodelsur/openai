import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import ChatContainer from '../components/ResponseBox';

function Language() {
  const [content, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, addChat] = useState([]);
  const [error, setError] = useState();

  const handleChange = event => {
    setMessage(event.target.value);
  };

  async function OpenAI(content) {
    setLoading(true);

    let messages = [{role: "user", content: content}];
    // let messages = {messages: [{role: "user", content: content}],}

    let arrayInput = chatHistory;
    arrayInput.push(messages[0]);
    addChat(arrayInput);

    const getUsers = async (messages) => {
      try {
          await fetch(
          ('/.netlify/functions/get_openai'), {
              method: "POST",
              // isBase64Encoded: true,
              // statusCode: "httpStatusCode",
              body: JSON.stringify({ messages }),
              headers: {
                  'Content-Type': 'application/json'
              }  
          })  
          .then(response => response.text())
          .then(data => {
            let answer = JSON.parse(data);
            let arrayOutput = chatHistory;

            arrayOutput.push(answer);
            addChat(arrayOutput);
            setLoading(false); // Stop loading
            setError(""); // reset error messages
          })

      } catch (e) {
        setError(JSON.stringify(e.name+"-"+e.messages))
        addChat([])
        setLoading(false); // Stop loading
      }
}
getUsers(messages)
}

const resetButton = () => {
  addChat([])
  setError(""); // reset error messages
}
  return (
    <Container className="App">
        <h3 style={{margin: "1rem"}}>GPT-3.5 Turbo- SERVERLESS - 10 SECOND LIMIT</h3>
        <Button className='reset-button' variant="dark" onClick={() => resetButton()}>Reset</Button>
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
        <ChatContainer chatHistory={chatHistory}/>
    </Container>
  );
}

export default Language;
