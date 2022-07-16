// import logo from "./logo.svg";
import "./App.css";
import About from "./components/About";
import Navbar from "./components/Navbar";
// import Textform from "./components/Textform";

function App() {
  return (
    <>
      {/* <Navbar title="TextUtils" aboutText="About Textutils" /> */}
      {/* <Navbar/> */}
      <Navbar title="TextUtils" />
      {/* <Textform heading="Enter your text below" /> */}
      <About heading="About us" />
    </>
  );
}

export default App;
