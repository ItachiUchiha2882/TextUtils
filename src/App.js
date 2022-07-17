// import logo from "./logo.svg";
import "./App.css";
// import About from "./components/About";
import Textform from "./components/Textform";
import Navbar from "./components/Navbar";
import React, { useState } from 'react';
import Alert from "./components/Alert";

function App() {
  const [mode, setMode] = useState('light');

  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => { 
    //note that here types are added according to bootstarp.
    setAlert({
      type : type,    
      msg : message
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  //  `toggleMode` is made to to use button toggling.
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#002547';
      showAlert('success', 'Dark mode enabled.')
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert('success', 'Light mode enabled.')
    }
  }
  return (
    <>
      {/* <Navbar title="TextUtils" aboutText="About Textutils" /> */}
      {/* <Navbar/> */}
      <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert} />
      <Textform heading="Enter your text below" mode={mode} showAlert={showAlert}/>
      {/* <About heading="About us" /> */}
    </>
  );
}

export default App;
