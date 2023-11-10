import React from "react";
import "./style.css"
import { Outlet, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";

const Layout = () => {

  const { auth } = useAuth();
  const { setAuth } = useAuth();

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
      <nav>
        <ul>
          <div>
              {token ? (
              <div>
              <p>Welcome {user}</p>
              <Button onClick={logout}>Logout</Button>
              </div>
              ) : (
              <div />
              )}
         </div>
          <li>
            <Link to="/" id="home" className="home">The Oracle</Link>
          </li>
          <li>
           <Link to="/language_gpt_3_serverless" id="3.5-turbo" className="nav-button">TEXT <br></br>gpt 3.5 serverless</Link>
          </li>
          <li>
           <Link to="/language_gpt_3.5_turbo" id="3.5-turbo" className="nav-button">TEXT <br></br>gpt 3.5 turbo</Link>
          </li>
          <li>
            <Link to="/language_gpt_4.0_turbo" id="4-turbo" className="nav-button">TEXT <br></br>gpt 4.0 turbo</Link>
          </li>
          <li>
          <Link to="/images_dall_e_2" id="dalle2" className="nav-button">IMAGE<br></br>dall_e_2</Link>
          </li>
          <li>
          <Link to="/images_dall_e_3" id="dalle3" className="nav-button">IMAGE<br></br>dall_e_3</Link>
          </li>
        </ul>
      </nav>
      </header>
      <Outlet />
    </>
  )
};

export default Layout;