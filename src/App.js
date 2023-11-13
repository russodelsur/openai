import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Header/header';
import Language from './pages/Gpt3.5';
import Image from './pages/Dalle2';
import ImageDalle from './pages/Dalle3';
import Language4 from './pages/Gpt4';
import Language3 from './pages/Gpt3.5-turbo';
import Login from './pages/Login';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './pages/Unauthorized';
import Missing from "./pages/Missing";
import Home from "./pages/Home";
import PersistLogin from './components/PersistLogin';

const roles = {
  'User': "user",
  'Admin': "admin",
  "Ad": "advanced"
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route element={<PersistLogin />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login/>} />

          <Route path="/unauthorized" element={<Unauthorized />} />


                  <Route element={<RequireAuth allowedRoles={[roles.Admin, roles.Ad]} />}>
                    <Route path="/language_gpt_3_serverless" element={<Language />} />
                  </Route>

                  <Route element={<RequireAuth allowedRoles={[roles.User, roles.Admin, roles.Ad]} />}>
                    <Route path="/language_gpt_3.5_turbo" element={<Language3 />} />
                  </Route>

                  <Route element={<RequireAuth allowedRoles={[roles.Admin, roles.Ad]} />}>
                    <Route path="/language_gpt_4.0_turbo" element={<Language4 />} />
                  </Route>

                  <Route element={<RequireAuth allowedRoles={[roles.Admin]} />}>
                    <Route path="/images_dall_e_2" element={<Image />} />
                  </Route>

                  <Route element={<RequireAuth allowedRoles={[roles.Admin]} />}>
                    <Route path="/images_dall_e_3" element={<ImageDalle />} />
                  </Route>
                    {/* <Route path="/users" element={<Users />} /> */}
                    <Route path="*" element={<Missing />} />
                </Route>
            </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
