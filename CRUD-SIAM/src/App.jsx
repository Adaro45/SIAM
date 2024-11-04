import "./App.css";
import React, { useState } from 'react';
import Header from './Components/Header';
import MainContent from "./Components/MainContent";
import Footer from "./Components/Footer";
import ProjectsPage from "./pages/Projects";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import ProjectDetail from "./pages/ProjectDetail";
import MapPage from "./pages/MapPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
<Router>
<Header/>
<Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetail/>}/>
          <Route path="/historia" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
</Router>
<Footer/>
</>
  );
}
export default App;
