// import logo from "./logo.svg";
import "./App.css";
// import About from "./components/About";
import Textform from "./components/Textform";
import Navbar from "./components/Navbar";
import React, { useState } from 'react';

function App() {
  const [mode, setMode] = useState('light');
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#002547';
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  }
  return (
    <>
      {/* <Navbar title="TextUtils" aboutText="About Textutils" /> */}
      {/* <Navbar/> */}
      <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
      <Textform heading="Enter your text below" mode={mode} />
      {/* <About heading="About us" /> */}
    </>
  );
}

export default App;
