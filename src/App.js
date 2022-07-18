// import logo from "./logo.svg";
import "./App.css";
// import About from "./components/About";
import Textform from "./components/Textform";
import Navbar from "./components/Navbar";
import React, { useState } from 'react';
import Alert from "./components/Alert";

function App() {
  const [mode, setMode] = useState('light');

  // here we made an 'alert' variable as an object and set its value to 'null'.
  const [alert, setAlert] = useState(null);

  // in showAlert, we pass type and message as arguments and they will be used by 'setAlert' function to update 'alert' object.
  const showAlert = (type, message) => {
    // note that here type is added according to bootstarp alert types.
    setAlert({
      type: type,
      msg: message
    });
    // set a timeout to auto dismiss an alert message.
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
      // changing title dynamically.
      document.title = 'TextUtils | Dark mode';
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert('success', 'Light mode enabled.')
      document.title = 'TextUtils | Light mode';
    }
  }
  return (
    <>
      {/* <Navbar title="TextUtils" aboutText="About Textutils" /> */}
      {/* <Navbar/> */}
      <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert} />
      <Textform heading="Enter your text below" mode={mode} showAlert={showAlert} />
      {/* <About heading="About us" /> */}
    </>
  );
}

export default App;
