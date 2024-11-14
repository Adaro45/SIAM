import "./App.css";
import React, { useState } from 'react';
import Header from './Components/Header';
import Footer from "./Components/Footer";
import ProjectsPage from "./pages/Projects";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import ProjectDetail from "./pages/ProjectDetail";
import MapPage from "./pages/MapPage";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import LogOut from "./pages/LogOut";
import UserAccount from "./pages/UserAccount";
import AdminDashBoard from "./pages/AdminDashBoard";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { UserProvider } from "./context/UserContext";

function App() {

  return (
<UserProvider>
<Router>
<Header/>
<Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminDashBoard />} />
          <Route path="/layout" element={<Layout/>} />
          <Route path="/login" element={<LogIn/>} />
          <Route path="/logout" element={<LogOut/>} />
          <Route path="/UserAccount" element={<UserAccount/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetail/>}/>
          <Route path="/historia" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
</Router>
<Footer/>
</UserProvider>
  );
}
export default App;
