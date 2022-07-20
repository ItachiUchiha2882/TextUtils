# TextUtils 📝

**Date:**  20/07/2022

This includes [CWH ReactJS tutorials](https://www.youtube.com/playlist?list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt) from tut1 to tut21. Started on 11 july, 2022 and finished on 20 july, 2022.

View deployment [here](https://leviackerman2882.github.io/TextUtils/). Note that this deployement won't contain `About` page as gitHub pages doesn’t support routers that use the HTML5 `pushState` history API under the hood (for example, React Router using `browserHistory`).

Access github repo [here](https://github.com/LeviAckerman2882/TextUtils) by [@LeviAckerman2882](https://github.com/LeviAckerman2882).


## Extra  : Fixing issues and features to add-on

- Issue after reloading, only title and active class changes not content of page.

- Can change title to `TextTime` or `TextFlex`.

- Can add footer and logo.

- Can add extra features like replacing words etc. 😊

## Tut19 + Tut21  : Fixing issues in TextUtils

Lots of issues fixed and new features added according to video and by my learnings : 

- Layout shifting by alerts.

  Fixed by giving height to alerts.

- Responsiveness.

  Fixed by 'my-1' class given to buttons.

- Disabling buttons if no text.

  Added `disabled={text.length===0}` for buttons.

- Improved SEO.

  Added meta tags.

- Changed content in About.js

  Updated lines.

- Changing title dynamically.

  Done in `Navbar.js` using if-else.

- Adding active class for current tab.

  Done in `Navbar.js` using ternary operator.

- Color of About collapse button.

  Used entirely different syntax.
  
  For adding [button style](https://stackoverflow.com/questions/28269669/css-pseudo-elements-in-react#comment89056174_28269950), used this syntax. And regarding updates in `index.css` used [for extra style ](https://stackoverflow.com/questions/66335238/changing-the-color-arrow-in-bootstrap).

- Fix icon.

  fixed :)

### Extra info:

To remove selection from text :
> document.getSelection().removeAllRanges();

### Final code after tut19:
Please note that final code after tut21 will be added along with whole completion of extra features.

`App.js`

```js
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

  // `toggleMode` is made to to use button toggling.
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
```

`Navbar.js`

```js
import React from "react";  // used command 'rfc'
import PropTypes from 'prop-types'; //used command 'impt'
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">{props.title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">{props.aboutText}</Link>
            </li>
          </ul>
          {/* here in following js code for switch text color, we made sure that text-color and mode will be in invesre. */}
          <div className={`form-check form-switch text-${props.mode === 'light' ? 'dark' : 'light'}`}>
            <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable Dark Mode</label>
          </div>
        </div>

      </div>
    </nav>
  );
}
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  aboutText: PropTypes.string
}
Navbar.defaultProps = {
  title: 'Title',
  aboutText: 'About'
};
```

`Alert.js`

```js
import React from 'react'

export default function Alert(props) {
	// function to make the first letter of word capital.
	const makeCapital = (word) => {
		let lower = word.toLowerCase();
		return lower.charAt(0).toUpperCase() + lower.slice(1);
	}
	return (
		<div style={{height : '45px'}}>
			{props.alert &&
			<div>
				<div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
					<strong>{makeCapital(props.alert.type)}</strong>: {props.alert.msg}
					{/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
				</div>
			</div>}
		</div>
	)
}
```

`Textform.js`

```js
import React, { useState } from "react";

export default function Textform(props) {
	// Declare a new state variable, which we'll call "count"
	const [text, setText] = useState('');

	// function for 'convert to uppercase' button
	const handleUpClick = () => {
		let newText = text.toUpperCase();
		setText(newText);
		props.showAlert('success', 'Converted to uppercase.');
	}
	// function for 'convert to lowercase' button
	const handleLowClick = () => {
		let newText = text.toLowerCase();
		setText(newText);
		props.showAlert('success', 'Converted to lowercase.');

	}
	// function for 'copy' button
	const handleCopy = () => {
		navigator.clipboard.writeText(text);
		props.showAlert('success', 'Copied to clipboard.');
	}

	// // another function to copy text.
	// const handleCopy = () => {
	// 	let txt = document.getElementById('exampleFormControlTextarea1');
	// 	txt.select();
	// 	navigator.clipboard.writeText(txt.value);
	// 	document.getSelection().removeAllRanges();
	// } 

	// function for 'remove extra spaces' button'
	const handleExtraSpaces = () => {
		let newText = text.replace(/\s+/g, ' ').trim();
		setText(newText);
		props.showAlert('success', 'Removed extra spaces.');
	}

	// // another function to remove extra spaces in text.
	// const handleExtraSpaces = () => {
	// 	let newText = text.split(/[ ]+/);
	// 	setText(newText.join(" "));
	// }

	// function for 'clear' button
	const handleClear = () => {
		let newText = "";
		setText(newText);
		props.showAlert('danger', 'Text cleared.');
	}

	const handleOnChange = (event) => {
		// console.log("On change");
		setText(event.target.value);
	}

	// let words = text.trim().split(" ").length;
	// let words = text.split(" ").filter((element) => {return element.length!==0}).length;
	let words = text.trim().split(/\s+/).length;
	if (text.trim() === "") {	// for words to be 0 at starting for exta whitespaces.
		words = 0;
	}
	let timeToRead = (0.004 * words);

	// function for preview button
	const handlePreview = () => {
		document.getElementById('preview').innerHTML = text;
	}

	// CSS object for style of <textarea>
	const textareaStyle = {
		backgroundColor: props.mode === 'light' ? 'white' : '#282c33',
		// color : `${props.mode==='light'?'black':'white'}`  // this also works.
		color: props.mode === 'light' ? 'black' : 'white'
	};

	return (
		<>
			<div className="container my-3" style={{ color: props.mode === 'light' ? 'black' : 'white' }}>
				<h2 className="mb-3">{props.heading}</h2>
				<div className="mb-3">
					<textarea className="form-control" style={textareaStyle} id="exampleFormControlTextarea1" rows="8" value={text} onChange={handleOnChange}></textarea>
				</div>
				<button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to uppercase</button>
				<button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLowClick}>Convert to lowercase</button>
				<button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy</button>
				<button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove extra spaces</button>
				<button disabled={text.length===0} className="btn btn-danger mx-1 my-1" onClick={handleClear}>Clear</button>
			</div>
			<div className="container" style={{ color: props.mode === 'light' ? 'black' : 'white' }}>
				<h3>Your text summary</h3>
				<p><strong>{words}</strong> words and <strong>{text.length}</strong> characters</p>
				<p>{timeToRead} minutes read</p>
			</div>
			<div className="container" style={{ color: props.mode === 'light' ? 'black' : 'white' }}>
				<button disabled={text.length===0} className="btn btn-primary mx-1" onClick={handlePreview}>Preview</button>
				<p id="preview" className="container my-3"></p>
			</div>
		</>
	);
}
```

`About.js`

```js
import React from 'react'

export default function About(props) {
	const myStyle = {
		// backgroundColor: props.mode === 'light' ? 'white' : '#282c33',
		backgroundColor: props.mode === 'light' ? 'white' : 'rgb(31 75 151)', 
		color: props.mode === 'light' ? 'black' : 'white'
	};

	return (
		<>
			<div className='container my-3'>
				<h2 style={{ color: props.mode === 'light' ? 'black' : 'white' }}>{props.heading}</h2>
				<div className="accordion" id="accordionExample">
					<div className="accordion-item">
						<h2 className="accordion-header" id="headingOne">
							<button className="accordion-button" style={myStyle} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
								<strong>Analyze your text</strong>
							</button>
						</h2>
						<div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
							<div className="accordion-body" style={myStyle}>
								Textutils gives you a way to analyze your text quickly and efficiently. Be it word count, character count or modifing it with different buttons.
							</div>
						</div>
					</div>
					<div className="accordion-item">
						<h2 className="accordion-header" id="headingTwo">
							<button className="accordion-button collapsed" style={myStyle} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
								<strong>Free to use</strong>
							</button>
						</h2>
						<div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
							<div className="accordion-body" style={myStyle}>
								TextUtils is a free character counter tool that provides instant character count & word count statistics for a given text. Textutils reports the number of words and characters. Thus it is suitable for writing text with word / character limit.
							</div>
						</div>
					</div>
					<div className="accordion-item">
						<h2 className="accordion-header" id="headingThree">
							<button className="accordion-button collapsed" style={myStyle} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
								<strong>Browser Compatible</strong>	
							</button>
						</h2>
						<div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
							<div className="accordion-body" style={myStyle}>
								This word counter software works in any web browsers such as Chrome, Firefox, Internet Explorer, Safari, Opera. It suits to count characters in facebook, blog, books, excel document, pdf document, essays, etc.
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
```

`public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico"/>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="TextUtils is a word counter and a character counting utility which can be used to manipulate your text in the way you want. You can remove extra spaces, copy the manipulated text as well as convert your text from Uppercase to lowercase and lowercase to Uppercase. Also it provides the utility to preview it. You even get a information about 'How much time it takes to read?'."
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/android-icon-36x36.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

    <!-- bootstrap code  -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
    <title>TextUtils - Word counter, Character counter, Remove extra spaces</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    
    <!-- bootstrap code  -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js" integrity="sha384-Xe+8cL9oJa6tN/veChSP7q+mnSPaj5Bcu9mPX5F5xIGE0DVittaqT5lorf0EI7Vk" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-kjU+l4N0Yf4ZOJErLsIcvOU2qSb74wXpOhqTvwVx3OElZRweTnQ6d31fXEoRD1Jy" crossorigin="anonymous"></script>
  </body>
</html>
```

## Tut18 : Purchasing domain and hosting on VPS

Well, I am not gonna do it, if you want, you can spend it buying domain :).

## Tut17 : Building and hosting on github pages (free)

First of all you can build react-app by `npm run build`. Then for [deployment of create react app](https://create-react-app.dev/docs/deployment/#github-pages) you can follow the doc or video. You can't host routing pages that easily, so good luck with other solutions. This tutorials code can be viewed in commit "completed tut17 (updated for github pages deployment)" on github.

## Tut16 : React router setup and usage

React router helps in avoiding reloading of page again and again.

First install `react-router-dom` by
> npm install react-router-dom

then add following in `App.js`
```js
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
```
And to avoid reloading use `<Link>` instead of `<a>` and `to="..."` instead of `href="..."` everywhere. Also use `exact path` instead of `path` for better precision.

### Error correction:
import error: 'Switch' is not exported from 'react-router-dom'.

- first solution : 

1. Uninstall Previous Version-
npm uninstall react-router-dom
2. Install Older version-
npm install react-router-dom@5.2.0

because after v6 `switch` is not included in react-router-dom 

- another solution :

for new version of react-router-dom

Instead of 

```js
<Router>
  <Switch>
    <Route exact path="/"> <Home/> </Route>
    <Route exact path="/users"> <Users/> </Route>
  </Switch>
</Router>
```

Use this...

```js
<Router>
  <Routes>
    <Route exact path="/" element={<Home/>} />
    <Route exact path="users/*" element={<User/>} />
  </Routes>
</Router>
```
### Final code:

`App.js`

```js
// import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Textform from "./components/Textform";
import About from "./components/About";
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  // Switch,
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
```

`Navbar.js`

```js
import React from "react";  // used command 'rfc'
import PropTypes from 'prop-types'; //used command 'impt'
import { Link } from "react-router-dom"; 

export default function Navbar(props) {
  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">{props.title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">{props.aboutText}</Link>
            </li>
          </ul>
          {/* here in following js code for switch text color, we made sure that text-color and mode will be in invesre. */}
          <div className={`form-check form-switch text-${props.mode === 'light' ? 'dark' : 'light'}`}>
            <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable Dark Mode</label>
          </div>
          {/* <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form> */}
        </div>

      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  aboutText: PropTypes.string
}

// Specifies the default values for props:
Navbar.defaultProps = {
  title: 'Title',
  aboutText: 'About'
};
```


## Tut15 : Changing titles and adding favicons

You can add favicon by generating from any site and about changing the title dynamically you can do `document.title = '..';`

just one function changed a bit in `App.js`
```js
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
```

And changed one or two lines in `public/index.html`. Those are meta tags and title also link tag.

## Tut14 + Tut20 : Exercise-2 : Adding different backgrounds

Note that you should never give function call in `onClick`, instaed give a function and if you need to pass an argumen, pass it using arrow function.

We add different buttons in `Navbar.js`, then through onClick, we pass `cls` as argument and then we add background color by adding `bg-cls` as className, but before that we run `removeClasses` function to remove previous set classes.

### Final code:

`App.js`

```js
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
```

`Navbar.js`

```js
import React, { useState } from "react";  // used command 'rfc'
import PropTypes from 'prop-types'; //used command 'impt'
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const [tab, setTab] = useState('home');

  if (tab === 'home') {
    document.title = 'TextUtils - Home';
  }
  else if (tab === 'about') {
    document.title = 'TextUtils - About';
  }

  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" onClick={() => { setTab('home') }} to="/">{props.title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${tab === 'home' ? 'active' : ''}`} aria-current="page" onClick={() => { setTab('home') }} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${tab === 'about' ? 'active' : ''}`} onClick={() => { setTab('about') }} to="/about">{props.aboutText}</Link>
            </li>
          </ul>
          <div>
            <button type="button" onClick={()=> props.toggleMode('primary')} className="btn mx-1 btn-primary">&nbsp;</button>
            <button type="button" onClick={()=> props.toggleMode('secondary')} className="btn mx-1 btn-secondary">&nbsp;</button>
            <button type="button" onClick={()=> props.toggleMode('success')} className="btn mx-1 btn-success">&nbsp;</button>
            <button type="button" onClick={()=> props.toggleMode('danger')} className="btn mx-1 btn-danger">&nbsp;</button>
            <button type="button" onClick={()=> props.toggleMode('warning')} className="btn mx-1 btn-warning">&nbsp;</button>
            <button type="button" onClick={()=> props.toggleMode('info')} className="btn mx-1 btn-info">&nbsp;</button>
            <button type="button" onClick={()=> props.toggleMode('light')} className="btn mx-1 btn-light">&nbsp;</button>
            <button type="button" onClick={()=> props.toggleMode('dark')} className="btn mx-1 btn-dark">&nbsp;</button>
          </div>
          {/* <div className={`form-check form-switch text-${props.mode === 'light' ? 'dark' : 'light'}`}>
            <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable Dark Mode</label>
          </div> */}
        </div>

      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  aboutText: PropTypes.string
}
Navbar.defaultProps = {
  title: 'Title',
  aboutText: 'About'
};
```

## Tut13 : Alerts 

Here first we made an `alert` object using useState, and made `showAlert` function to update `setAlert`. Also used different type of syntax for the first time to handle the null property of props.alert and later made some modifications

`App.js`

```js
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
      <Textform heading="Enter your text below" mode={mode} showAlert={showAlert} />
      {/* <About heading="About us" /> */}
    </>
  );
}

export default App;
```

`Alert.js`

```js
import React from 'react'

export default function Alert(props) {
	// function to make the first letter of word capital.
	const makeCapital = (word) => {
		let lower = word.toLowerCase();
		return lower.charAt(0).toUpperCase() + lower.slice(1);
	}
	return (
		// new syntax used here, basically it works like --> whenever props.alert is false, code is not executed and if it is true then the code is executed. this ensures that code works well even if 'alert' object is set to null. 
		props.alert &&
		<div>
			<div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
				<strong>{makeCapital(props.alert.type)}</strong>: {props.alert.msg}
				{/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
			</div>
		</div>
	)
}
```

`Textform.js`

```js
import React, { useState } from "react";
// import PropTypes from 'prop-types'

export default function Textform(props) {
	// Declare a new state variable, which we'll call "count"
	const [text, setText] = useState('');
	// text = "new text";  // wrong way to change the state.
	// setText("hello");   // correct way to change the state.

	// function for 'convert to uppercase' button
	const handleUpClick = () => {
		// console.log("Uppercase clicked: " + text);
		// setText("You have clicked on uppercase button");
		let newText = text.toUpperCase();
		setText(newText);
		props.showAlert('success', 'Converted to uppercase.');
	}
	// function for 'convert to lowercase' button
	const handleLowClick = () => {
		let newText = text.toLowerCase();
		setText(newText);
		props.showAlert('success', 'Converted to lowercase.');

	}
	// function for 'copy' button
	const handleCopy = () => {
		navigator.clipboard.writeText(text);
		props.showAlert('success', 'Copied to clipboard.');
	}

	// // another function to copy text.
	// const handleCopy = () => {
	// 	let txt = document.getElementById('exampleFormControlTextarea1');
	// 	txt.select();
	// 	navigator.clipboard.writeText(txt.value);
	// } 

	// function for 'remove extra spaces' button'
	const handleExtraSpaces = () => {
		let newText = text.replace(/\s+/g, ' ').trim();
		setText(newText);
		props.showAlert('success', 'Removed extra spaces.');
	}

	// // another function to remove extra spaces in text.
	// const handleExtraSpaces = () => {
	// 	let newText = text.split(/[ ]+/);
	// 	setText(newText.join(" "));
	// }

	// function for 'clear' button
	const handleClear = () => {
		let newText = "";
		setText(newText);
		props.showAlert('danger', 'Text cleared.');
	}

	const handleOnChange = (event) => {
		// console.log("On change");
		setText(event.target.value);
	}

	// let words = text.trim().split(" ").length;
	let words = text.trim().split(/\s+/).length;
	if (text.trim() === "") {	// for words to be 0 at starting for exta whitespaces.
		words = 0;
	}
	let timeToRead = (0.004 * words);

	// function for preview button
	const handlePreview = () => {
		document.getElementById('preview').innerHTML = text;
	}

	// note that we can make style objects like this and can use them but we can also directly write object inside style like i did in following code.
	// CSS object for style of <textarea>
	const textareaStyle = {
		backgroundColor: props.mode === 'light' ? 'white' : '#282c33',
		// color : `${props.mode==='light'?'black':'white'}`  // this also works.
		color: props.mode === 'light' ? 'black' : 'white'
	};

	return (
		<>
			<div className="container my-3" style={{ color: props.mode === 'light' ? 'black' : 'white' }}>
				<h2>{props.heading}</h2>
				<div className="mb-3">
					<textarea className="form-control" style={textareaStyle} id="exampleFormControlTextarea1" rows="8" value={text} onChange={handleOnChange}></textarea>
				</div>
				<button className="btn btn-primary mx-1" onClick={handleUpClick}>Convert to uppercase</button>
				<button className="btn btn-primary mx-1" onClick={handleLowClick}>Convert to lowercase</button>
				<button className="btn btn-primary mx-1" onClick={handleCopy}>Copy</button>
				<button className="btn btn-primary mx-1" onClick={handleExtraSpaces}>Remove extra spaces</button>
				<button className="btn btn-danger mx-1" onClick={handleClear}>Clear</button>
			</div>
			<div className="container" style={{ color: props.mode === 'light' ? 'black' : 'white' }}>
				<h3>Your text summary</h3>
				<p><strong>{words}</strong> words and <strong>{text.length}</strong> characters</p>
				<p>{timeToRead} minutes to read</p>
			</div>
			{/* <div className="container my-2">
				<button className="btn btn-primary mx-1" onClick={handleLowClick}>Replace</button>
				<input type="text" name="text1" id="text1" className="mx-3"/>
				with
				<input type="text" name="text2" id="text2" className="mx-3"/>
			</div> */}
			<div className="container" style={{ color: props.mode === 'light' ? 'black' : 'white' }}>
				<button className="btn btn-primary mx-1" onClick={handlePreview}>Preview</button>
				<p id="preview" className="container my-3"></p>
			</div>
		</>
	);
}

```

## Tut12 : Improving dark mode 

We made sure that all controls lie in `App.js`. First we made `mode` state variable and then handles toggling by `toggleMode` function. Also used ternary operator for CSS at various places.

`App.js`

```js
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
```

`Navbar.js`

```js
import React from "react";  // used command 'rfc'
import PropTypes from 'prop-types'; //used command 'impt'

export default function Navbar(props) {
  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">{props.title}</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">{props.aboutText}</a>
            </li>
          </ul>
          {/* here in following js code for switch text color, we made sure that text-color and mode will be in invesre. */}
          <div className={`form-check form-switch text-${props.mode === 'light' ? 'dark' : 'light'}`}>
            <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable Dark Mode</label>
          </div>
          {/* <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form> */}
        </div>

      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  aboutText: PropTypes.string
}

// Specifies the default values for props:
Navbar.defaultProps = {
  title: 'Title',
  aboutText: 'About'
};
```

`Textform.js`

```js
import React, { useState } from "react";
// import PropTypes from 'prop-types'

export default function Textform(props) {
	// Declare a new state variable, which we'll call "count"
	const [text, setText] = useState('');
	// text = "new text";  // wrong way to change the state.
	// setText("hello");   // correct way to change the state.

	const handleUpClick = () => {
		// console.log("Uppercase clicked: " + text);
		// setText("You have clicked on uppercase button");
		let newText = text.toUpperCase();
		setText(newText);
	}
	const handleLowClick = () => {
		let newText = text.toLowerCase();
		setText(newText);
	}
	const handleCopy = () => {
		navigator.clipboard.writeText(text);
	}

	// // another function to copy text.
	// const handleCopy = () => {
	// 	let txt = document.getElementById('exampleFormControlTextarea1');
	// 	txt.select();
	// 	navigator.clipboard.writeText(txt.value);
	// } 

	const handleExtraSpaces = () => {
		let newText = text.replace(/\s+/g, ' ').trim();
		setText(newText);
	}

	// // another function to remove extra spaces in text.
	// const handleExtraSpaces = () => {
	// 	let newText = text.split(/[ ]+/);
	// 	setText(newText.join(" "));
	// }

	const handleClear = () => {
		let newText = "";
		setText(newText);
	}

	const handleOnChange = (event) => {
		// console.log("On change");
		setText(event.target.value);
	}

	// let words = text.trim().split(" ").length;
	let words = text.trim().split(/\s+/).length;
	if (text.trim() === "") {	// for words to be 0 at starting for exta whitespaces.
		words = 0;
	}
	let timeToRead = (0.004 * words);

	// function for preview button
	const handlePreview = () => {
		document.getElementById('preview').innerHTML = text;
	}

	// note that we can make style objects like this and can use them but we can also directly write object inside style like i did in following code.
	const textareaStyle = {
		backgroundColor: props.mode === 'light' ? 'white' : '#282c33',
		// color : `${props.mode==='light'?'black':'white'}`  // this also works.
		color: props.mode === 'light' ? 'black' : 'white'
	};

	return (
		<>
			<div className="container my-3" style={{ color: props.mode === 'light' ? 'black' : 'white' }}>
				<h2>{props.heading}</h2>
				<div className="mb-3">
					<textarea className="form-control" style={textareaStyle} id="exampleFormControlTextarea1" rows="8" value={text} onChange={handleOnChange}></textarea>
				</div>
				<button className="btn btn-primary mx-1" onClick={handleUpClick}>Convert to uppercase</button>
				<button className="btn btn-primary mx-1" onClick={handleLowClick}>Convert to lowercase</button>
				<button className="btn btn-primary mx-1" onClick={handleCopy}>Copy</button>
				<button className="btn btn-primary mx-1" onClick={handleExtraSpaces}>Remove extra spaces</button>
				<button className="btn btn-danger mx-1" onClick={handleClear}>Clear</button>
			</div>
			<div className="container" style={{ color: props.mode === 'light' ? 'black' : 'white' }}>
				<h3>Your text summary</h3>
				<p><strong>{words}</strong> words and <strong>{text.length}</strong> characters</p>
				<p>{timeToRead} minutes to read</p>
			</div>
			{/* <div className="container my-2">
				<button className="btn btn-primary mx-1" onClick={handleLowClick}>Replace</button>
				<input type="text" name="text1" id="text1" className="mx-3"/>
				with
				<input type="text" name="text2" id="text2" className="mx-3"/>
			</div> */}
			<div className="container" style={{ color: props.mode === 'light' ? 'black' : 'white' }}>
				<button className="btn btn-primary mx-1" onClick={handlePreview}>Preview</button>
				<p id="preview" className="container my-3"></p>
			</div>
		</>
	);
}
```


## Tut10 : Enabling dark mode using useState hook

We commented out the textform.js part in this tut. To add CSS, we make an object and add properties their and include that wherever required by `style={obj}`

`App.js`

```js
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
```

`About.js`

```js
import React, { useState } from 'react'

export default function About(props) {

	// makes set variable and sets it to following props.
	const [myStyle, setMyStyle] = useState({
		color: 'black',
		backgroundColor: 'white'
	});

	// this is used to toggle the text on the buttton.
	const [btnText, setBtnText] = useState("Enable dark mode");

	// used to toggle the CSS by 'myStyle' variable.
	let toggleStyle = () => {
		if (myStyle.color === 'black') {
			setMyStyle({
				color: 'white',
				backgroundColor: 'black',
				border: '0.5px solid white'
			});
			setBtnText("Enable light mode");
		}
		else {
			setMyStyle({
				color: 'black',
				backgroundColor: 'white'
			});
			setBtnText("Enable dark mode");
		}

	}
	return (
		<>
			<div className='container' style={myStyle}>
				<h2>{props.heading}</h2>
				<div className="accordion" id="accordionExample">
					<div className="accordion-item">
						<h2 className="accordion-header" id="headingOne">
							<button className="accordion-button" style={myStyle} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
								Accordion Item #1
							</button>
						</h2>
						<div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
							<div className="accordion-body" style={myStyle}>
								<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
							</div>
						</div>
					</div>
					<div className="accordion-item">
						<h2 className="accordion-header" id="headingTwo">
							<button className="accordion-button collapsed" style={myStyle} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
								Accordion Item #2
							</button>
						</h2>
						<div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
							<div className="accordion-body" style={myStyle}>
								<strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
							</div>
						</div>
					</div>
					<div className="accordion-item">
						<h2 className="accordion-header" id="headingThree">
							<button className="accordion-button collapsed" style={myStyle} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
								Accordion Item #3
							</button>
						</h2>
						<div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
							<div className="accordion-body" style={myStyle}>
								<strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
							</div>
						</div>
					</div>
				</div>
				<div className="btn btn-primary my-3" onClick={toggleStyle}>{btnText}</div>
			</div>
		</>
	)
}
```

## Tut9 + Tut11 : Exercise-1 : Enhancing TextUtils

- [remove-the-extra-spaces](https://stackoverflow.com/questions/16974664/how-to-remove-the-extra-spaces-in-a-string).

No changes in `App.js`.

`Textform.js`

```js
import React, { useState } from "react";
// import PropTypes from 'prop-types'

export default function Textform(props) {
	// Declare a new state variable, which we'll call "count"
	const [text, setText] = useState('');
	// text = "new text";  // wrong way to change the state.
	// setText("hello");   // correct way to change the state.

	const handleUpClick = () => {
		// console.log("Uppercase clicked: " + text);
		// setText("You have clicked on uppercase button");
		let newText = text.toUpperCase();
		setText(newText);
	}
	const handleLowClick = () => {
		let newText = text.toLowerCase();
		setText(newText);
	}
	const handleCopy = () => {
		navigator.clipboard.writeText(text);
	} 

	// // another function to copy text.
	// const handleCopy = () => {
	// 	let txt = document.getElementById('exampleFormControlTextarea1');
	// 	txt.select();
	// 	navigator.clipboard.writeText(txt.value);
	// } 

	const handleExtraSpaces = () => {
		let newText = text.replace(/\s+/g,' ').trim(); 
		setText(newText);
	}

	// // another function to remove extra spaces in text.
	// const handleExtraSpaces = () => {
	// 	let newText = text.split(/[ ]+/);
	// 	setText(newText.join(" "));
	// }

	const handleClear = () => {
		let newText = "";
		setText(newText);
	}

	const handleOnChange = (event) => {
		// console.log("On change");
		setText(event.target.value);
	}

	// let words = text.trim().split(" ").length;
	let words = text.trim().split(/\s+/).length;
	if (text.trim() === "") {	// for words to be 0 at starting for exta whitespaces.
		words = 0;
	}
	let timeToRead = (0.004 * words);

	// function for preview button
	const handlePreview = () => {
		document.getElementById('preview').innerHTML = text;
	}

	return (
		<>
			<div className="container my-3">
				<h2>{props.heading}</h2>
				<div className="mb-3">
					<textarea className="form-control" id="exampleFormControlTextarea1" rows="8" value={text} onChange={handleOnChange}></textarea>
				</div>
				<button className="btn btn-primary mx-1" onClick={handleUpClick}>Convert to uppercase</button>
				<button className="btn btn-primary mx-1" onClick={handleLowClick}>Convert to lowercase</button>
				<button className="btn btn-primary mx-1" onClick={handleCopy}>Copy</button>
				<button className="btn btn-primary mx-1" onClick={handleExtraSpaces}>Remove extra spaces</button>
				<button className="btn btn-danger mx-1" onClick={handleClear}>Clear</button>
			</div>
			<div className="container">
				<h3>Your text summary</h3>
				<p><strong>{words}</strong> words and <strong>{text.length}</strong> characters</p>
				<p>{timeToRead} minutes to read</p>
			</div>
			{/* <div className="container my-2">
				<button className="btn btn-primary mx-1" onClick={handleLowClick}>Replace</button>
				<input type="text" name="text1" id="text1" className="mx-3"/>
				with
				<input type="text" name="text2" id="text2" className="mx-3"/>
			</div> */}
			<div className="container">
				<button className="btn btn-primary mx-1" onClick={handlePreview}>Preview</button>
				<p id="preview" className="container my-3"></p>
			</div>
		</>
	);
}
```

## Tut8 : Adding more logic to TextUtils

Here, added more features like preview, word-count, character-count, lowercase and time to read text.

Few references useful for [word count](https://stackoverflow.com/questions/18679576/counting-words-in-string)

- For [The difference between .split(" ") and .split(/\s+/)](https://stackoverflow.com/questions/28127794/difference-between-split-s-and-split) click here.

No changes in `App.js`.

`Textform.js`

```js
import React, {useState} from "react";
// import PropTypes from 'prop-types'

export default function Textform(props) {
  const handleUpClick = ()=>{
    // console.log("Uppercase clicked: " + text);
    // setText("You have clicked on uppercase button");
    let newText = text.toUpperCase();
    setText(newText);
  }
  const handleLowClick = ()=>{
    // console.log("Uppercase clicked: " + text);
    // setText("You have clicked on uppercase button");
    let newText = text.toLowerCase();
    setText(newText);
  }
  
  const handleOnChange = (event)=>{
    // console.log("On change");
    setText(event.target.value);
  }

  // Declare a new state variable, which we'll call "count"
  const [text, setText] = useState('');
  // text = "new text";  // wrong way to change the state.
  // setText("hello");   // correct way to change the state.

  // let words = text.trim().split(" ").length;
  let words = text.trim().split(/\s+/).length;
  if (text.trim() === "") {	// for words to be 0 at starting for exta whitespaces.
	words = 0;
  }
  let timeToRead = (0.004 * words);

  // function for preview button
  const handlePreview = ()=>{	
	document.getElementById('preview').innerHTML = text;
  }

  return (
    <>
    <div className="container my-3">
      <h2>{props.heading}</h2>
      <div className="mb-3">
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="8"
          value={text}
          onChange={handleOnChange}
        ></textarea>
      </div>
      <button className="btn btn-primary mx-1" onClick={handleUpClick}>Convert to uppercase</button>
      <button className="btn btn-primary mx-1" onClick={handleLowClick}>Convert to lowercase</button>
    </div>
	<div className="container">
		<h3>Your text summary</h3>
		<p><strong>{words}</strong> words and <strong>{text.length}</strong> characters</p>
		<p>{timeToRead} minutes to read</p>
		<button className="btn btn-primary mx-1" onClick={handlePreview}>Preview</button>
		<p id="preview" className="container my-3"></p>
	</div>
    </>
  );
}
```

## Tut7 : state and handling events

Hooks let you use state and other React features without writing a class. Here {useState} hook is imported first then : 

>const [text, setText] = useState('Enter text here');

Here `text` is state variable and `setText` is used to update that as we can't directly update the `text`.
Furthermore, we set `value{text}` for `<textarea>` along with `onChange={...}`. We also call a new function when the button is pressed by `onClick={...}`. Because of `onChange` we are able to type in the textarea and update text to our input. Also we get `event` object whenever we listen to an event in reactJS, here `setText(event.target.value)` is used to set our input to the `text` variable.

`Textform.js`

```js
import React, {useState} from "react";
// import PropTypes from 'prop-types'

export default function Textform(props) {
  const handleUpClick = ()=>{
    // console.log("Uppercase clicked: " + text);
    // setText("You have clicked on uppercase button");
    let newText = text.toUpperCase();
    setText(newText);
  }
  
  const handleOnChange = (event)=>{
    // console.log("On change");
    setText(event.target.value);
  }

  // Declare a new state variable, which we'll call "text"
  const [text, setText] = useState('Enter text here');
  // text = "new text";  // wrong way to change the state.
  // setText("hello");   // correct way to change the state.
  return (
    <div className="container my-3">
      <h2>{props.heading}</h2>
      <div className="mb-3">
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="8"
          value={text}
          onChange={handleOnChange}
        ></textarea>
      </div>
      <button className="btn btn-primary" onClick={handleUpClick}>Convert to uppercase</button>
    </div>
  );
}
```

`App.js`

```js
// import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Textform from "./components/Textform";

function App() {
  return (
    <>
      {/* <Navbar title="TextUtils" aboutText="About Textutils" /> */}
      {/* <Navbar/> */}
      <Navbar title="TextUtils" />
      <Textform heading="Enter your text below" />
    </>
  );
}

export default App;

```

## Tut6 : props and propTypes

### export default

We made two new files named module1.mjs and module.mjs. Note that .mjs is there instead of .js as terminal gives (Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.)

We can import default by any name but for non-defaults we have to use the same name along with {}. Also `node ./module1.mjs` is used to run the code.

contents of `module2.mjs`

```js
const a = "Eren";
const b = "Mikasa";
const c = "Armin";
const d = "Levi";

export default a;
export { b };
export { c };
export { d };
```

contents of `module1.mjs`

```js
import titan, { b, c, d } from "./module2.mjs";
console.log(titan);
console.log(b);
console.log(c);
console.log(d);
```

### props and propTypes

We will make all the components in `src/components`. Here we will make Navbar.js.

We can pass different `props` to components by required syntax given in the code below, we can also pass `propTypes` along with `defaultProps`.

Command shorcuts used:
> rfc --> 
  ```js
    import React from 'react'
    export default function $1() {
    return <div>$0</div>
    }
  ```

> impt -->	import PropTypes from 'prop-types'

Here, `propTypes` ensure that arguments passed are of string type and also we can make them required if necessary and `defaultProps` specifies the default values for props.

`Navbar.js`

```js
import React from "react"; // used command 'rfc'
import PropTypes from "prop-types"; //used command 'impt'

export default function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          {props.title}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                {props.aboutText}
              </a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  aboutText: PropTypes.string,
};

// Specifies the default values for props:
Navbar.defaultProps = {
  title: "Title",
  aboutText: "About",
};
```

`App.js`

```js
// import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      {/* <Navbar title="TextUtils" aboutText="About Textutils" /> */}
      {/* <Navbar/> */}
      <Navbar title="TextUtils"/>
    </>
  );
}

export default App;
```

## Tut5 : Project-1 : Setup and adding bootstrap

I included the following bootstrap code in `public/index.html`

```html
<!-- bootstrap code  -->
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
  crossorigin="anonymous"
/>
<script
  src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js"
  integrity="sha384-Xe+8cL9oJa6tN/veChSP7q+mnSPaj5Bcu9mPX5F5xIGE0DVittaqT5lorf0EI7Vk"
  crossorigin="anonymous"
></script>
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.min.js"
  integrity="sha384-kjU+l4N0Yf4ZOJErLsIcvOU2qSb74wXpOhqTvwVx3OElZRweTnQ6d31fXEoRD1Jy"
  crossorigin="anonymous"
></script>
```

I made sure that all errors and warnings are resolved by replacing class by `className`, adding terminating tags for `<a>` or `<hr/>` tag and replacing href="#" by `href="/"`.

And make sure that, you don't put your secrets or important credentials in `public` directory.

Final code in `src/App.js` looks like:

```js
// import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            TextUtils
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  About
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default App;
```

## Tut4 : Understanding JSX

JSX is basically HTML with JS included in it by {}. React DOM uses `camelCase` property naming convention instead of HTML attribute names.
For example, class becomes `className` in JSX, for becomes `htmlFor` and tabindex becomes `tabIndex`.

Babel compiles JSX down to React.createElement() calls.

Always remember to return a single element in ReactJS. To return multiple elements include them in &lt;&gt;...&lt;/&gt;. Also never forget to insert only terminated tags in JSX like `<img/>` instead of `<img>`.

```js
// import logo from "./logo.svg";
import "./App.css";

let name = "Sourabh";
function App() {
  return (
    <>
      <nav>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </nav>
      <div className="container">
        <h2>Hello {name} </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
          ducimus quod voluptate, dolore quas, id magnam sunt nesciunt a facilis
          neque. Maxime quidem sed, illo soluta ducimus ipsum esse, unde
          perferendis ipsa optio quo?
        </p>
      </div>
    </>
  );
}

export default App;
```

## Tut3 : JS refresher

Not much new things. Just the use of `"use strict"` for avoiding future bugs in JS is recommended.

Do learn other topics like ajax, promises, fetch later on.

```js
"use strict";
// b=53;    // throws error.
// console.log(b);
let a = 34;
console.log(a);
```

## Tut2 : create-react-app

1. first navigate to respective directory (hre it is ReactJS).
2. now run following:

```js
        npx create-react-app my-app
        cd my-app
        npm start
```

3. It will start running in browser, you can see changes by editing `src/App.js`.


That's all folks! ❤️

