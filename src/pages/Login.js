import React, { useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Form, Row, Col, Container, Card } from 'react-bootstrap';

const Login = () => {

const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [errorMessage, setErrorMessage] = useState('');

const { setAuth } = useAuth();
const navigate = useNavigate();
const location = useLocation();
const from = location.state?.from?.pathname || "/";


const handleLogin = async (e) => {
    e.preventDefault();
    const cookies = localStorage.getItem("token");
    try {
    const response = await axios.post('/.netlify/functions/authController', 
    JSON.stringify({username,password,cookies}),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );

    const { token, user, role } = response.data.user;

    setAuth({ user, role, token });
    console.log(token)
    localStorage.setItem("token", token);
    setUsername('');
    setPassword('');
    navigate(from, { replace: true });
} catch (e) {
    if (e.response) {
    setErrorMessage(e.response.data.message);
    } 
    else {
    setErrorMessage('Failed to login. Please try again later.');
    }
}
};

return (
    <Container className="container-sm">
    <Card style={{ maxWidth: '25rem', margin:"auto", padding:"2rem", alignItems:"center"}}>
        <Form onSubmit={handleLogin}>
            <h2>Login</h2>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="4">
                Username
                </Form.Label>
                <Col sm="8">
                <Form.Control type="text" placeholder="Username..." value={username} onChange={(e) => setUsername(e.target.value)} />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="4"  >
                Password
                </Form.Label>
                <Col sm="8">
                <Form.Control type="password" placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Col>
            </Form.Group>
            <Button className='login-button' type="submit">Login</Button>
                {errorMessage && <p>{errorMessage}</p>}
        </Form>
        </Card>
        {/* <h2>Login</h2> */}
            {/* <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
                {errorMessage && <p>{errorMessage}</p>}
                </form> */}
    </Container>
);
};

export default Login;
