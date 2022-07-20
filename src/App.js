import "./App.css";
import React, { useState } from 'react';
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Textform from "./components/Textform";
import About from "./components/About";
import {
  BrowserRouter as Router,
  Route,
  // Link,
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

  const removeClasses = () => {
    document.body.classList.remove('bg-primary');
    document.body.classList.remove('bg-secondary');
    document.body.classList.remove('bg-success');
    document.body.classList.remove('bg-danger');
    document.body.classList.remove('bg-warning');
    document.body.classList.remove('bg-info');
    document.body.classList.remove('bg-light');
    document.body.classList.remove('bg-dark');
  }

  // `toggleMode` is made to to use for toggling modes.
  const toggleMode = (cls) => {
    removeClasses();
    console.log(cls); 
    document.body.classList.add('bg-' + cls);
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#002547';
      // showAlert('success', 'Dark mode enabled.')
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      // showAlert('success', 'Light mode enabled.')
    }
  }

  return (
    <>
      <Router>
        <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        <Routes>
          <Route exact path="/about" element={<About heading="About us" mode={mode} />} />
          <Route exact path="/" element={<Textform heading="Try TextUtils - Word counter, Character counter, Remove extra spaces" mode={mode} showAlert={showAlert} />} />
        </Routes>
      </Router>
    </>
  );
}
