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
    };

  return (
    <>
    <header>
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
      <Navbar.Brand href="/">The<br></br> Oracle</Navbar.Brand>
      <Nav className="me-auto">
          <Link to="/language_gpt_3_serverless" id="3.5-turbo" className="nav-link">
            <span class="full-text">GPT 3.5 S</span>
            <span class="short-text">3.5S</span>
            </Link>
          <Link to="/language_gpt_3.5_turbo" id="3.5-turbo" className="nav-link">
              <span class="full-text">GPT 3.5 TURBO</span>
              <span class="short-text">3.5</span>
            </Link>
          <Link to="/language_gpt_4.0_turbo" id="4-turbo" className="nav-link">
              <span class="full-text">GPT 4.0 TURBO</span>
              <span class="short-text">4.0</span>
            </Link>
          <Link to="/images_dall_e_2" id="dalle2" className="nav-link">
              <span class="full-text">DALL-E-2</span>
              <span class="short-text">E-2</span>
            </Link>
          <Link to="/images_dall_e_3" id="dalle3" className="nav-link">
              <span class="full-text">DALL-E-3</span>
              <span class="short-text">E-3</span>
            </Link>
         </Nav>
         <div className="login-interface">
              {token ? (
              <div className="index-logout">
              <p className="user-name">Welcome <br></br>{user}</p>
              <Button className="log-out-button" variant="outline-secondary" onClick={logout}>Logout</Button>
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