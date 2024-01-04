import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
const { Configuration, OpenAIApi } = require("openai");

function Image() {
  const [content, setMessage] = useState('');
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, addChat] = useState([]);
  const [error, setError] = useState();

  const handleChange = event => {
    setMessage(event.target.value);
  };

  async function OpenAI(content) {
    const configuration = new Configuration({
      apiKey:(process.env.REACT_APP_OPEN_API_KEY),
    });
    const openai = new OpenAIApi(configuration);
    
    const response = await openai.createImage({
        model: "dall-e",
        prompt: content,
        n: 1,
        size: "256x256",
      });
      setData(response);
    }
    const resetButton = () => {
      addChat([])
      setError(""); // reset error messages
    }

  return (
    <Container className="container-gpt">
    <div className='wrapper'>

      <Container className='title'>
        <h3 style={{margin: "1rem"}}>DALL-E-2</h3>
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
    <p className='error-chat'>{error}</p>
  </div>
        {data?.data?.data?.map((image, index) => (
        <img key={index} alt={index} src={image.url}></img>
        ))}

        
        <p style={{whiteSpace:"pre-line", padding:"2rem"}}>{data?.data?.data[0].url}</p>
    </Container>
  );
}

export default Image;