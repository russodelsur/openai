import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
const { Configuration, OpenAIApi } = require("openai");

function Image() {
  const [content, setMessage] = useState('');
  const [data, setData] = useState("");

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
        size: "1024x1024",
      });
      // console.log(response.data.choices[0].message);
      // console.log(response.data)
      setData(response);
    }


  return (
    <Container className="App">
        <Form.Control
        className='input'
        as="textarea"
        type="textarea"
        id="content"
        name="content"
        onChange={handleChange}
        value={content}
        autoComplete="off"
      />
        <Button variant="dark" onClick={() => OpenAI(content)}>Let the magic begin</Button>
        
        {data?.data?.data?.map((image, index) => (
        <img key={index} alt={index} src={image.url}></img>
        ))}

        
        <p style={{whiteSpace:"pre-line", padding:"2rem"}}>{data?.data?.data[0].url}</p>
    </Container>
  );
}

export default Image;