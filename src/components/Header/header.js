import React from "react";
import "./style.css"
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Button, Container, Navbar, Nav } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";

const Layout = () => {

  const { auth } = useAuth();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

let token = auth?.token;
let user = auth?.user;

  const logout = () => {
    localStorage.removeItem('token');
    setAuth( null );
    console.log(token, user)
    };

  return (
    <>
    <header>
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
      <Navbar.Brand href="/">The Oracle</Navbar.Brand>
      <Nav className="me-auto">
          <Link to="/language_gpt_3_serverless" id="3.5-turbo" className="nav-link">GPT 3.5 S</Link>
          <Link to="/language_gpt_3.5_turbo" id="3.5-turbo" className="nav-link">GPT 3.5</Link>
          <Link to="/language_gpt_4.0_turbo" id="4-turbo" className="nav-link">GPT-4 TURBO</Link>
          <Link to="/images_dall_e_2" id="dalle2" className="nav-link">DALL-E-2</Link>
          <Link to="/images_dall_e_3" id="dalle3" className="nav-link">DALL-E-3</Link>
         </Nav>
         <div className="login-interface">
              {token ? (
              <div className="index-logout">
              <p className="user-name">Welcome <br></br>{user}</p>
              <Button variant="outline-secondary" onClick={logout}>Logout</Button>
              </div>
              ) : (
              <div>
                <Button variant="outline-success" onClick={()=>navigate("/login")}>Login</Button>
              </div>
              )}
         </div>
        </Container>
        </Navbar>   
      </header>
      <Outlet />
    </>
  )
};

export default Layout;