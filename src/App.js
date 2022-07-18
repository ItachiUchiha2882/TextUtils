// import logo from "./logo.svg";
import "./App.css";
import React, { useState } from 'react';
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Textform from "./components/Textform";
import About from "./components/About";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";

export default function App() {
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
      <Router>
        <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        {/* Note that their is some difference in v5 and v6, switch is not used anymore. */}
        <Routes>
          <Route exact path="/about" element={<About heading="About us" />} />
          <Route exact path="/" element={<Textform heading="Enter your text below" mode={mode} showAlert={showAlert} />} />
        </Routes>
      </Router>
    </>
  );
}
