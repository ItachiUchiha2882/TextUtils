import React, { useState } from "react";

export default function Textform(props) {
	// 'text' declared here refers to users input.
	const [text, setText] = useState('');

	const handleOnChange = (event) => {
		setText(event.target.value);
	}
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
	// function for 'remove extra spaces' button
	const handleExtraSpaces = () => {
		let newText = text.replace(/\s+/g, ' ').trim();
		setText(newText);
		props.showAlert('success', 'Removed extra spaces.');
	}
	// function for 'clear' button
	const handleClear = () => {
		let newText = "";
		setText(newText);
		props.showAlert('danger', 'Text cleared.');
	}
	// CSS object for style of <textarea>
	const textareaStyle = {
		backgroundColor: props.mode === 'light' ? 'white' : '#282c33',
		// color : `${props.mode==='light'?'black':'white'}`  // this also works.
		color: props.mode === 'light' ? 'black' : 'white'
	};

	// `Your text summary` section. 
	let words = text.trim().split(/\s+/).length;
	if (text.trim() === "") words = 0;
	let timeToRead = (0.004 * words);

	// function for preview button
	const handlePreview = () => {
		document.getElementById('preview').innerHTML = text;
	}

	return (
		<>
			<div className="container my-3" style={{ color: props.mode === 'light' ? 'black' : 'white' }}>
				<h2 className="mb-3">{props.heading}</h2>
				<div className="mb-3">
					<textarea className="form-control" style={textareaStyle} id="exampleFormControlTextarea1" rows="8" value={text} onChange={handleOnChange}></textarea>
				</div>
				<button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to uppercase</button>
				<button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleLowClick}>Convert to lowercase</button>
				<button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy</button>
				<button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove extra spaces</button>
				<button disabled={text.length === 0} className="btn btn-danger mx-1 my-1" onClick={handleClear}>Clear</button>
			</div>
			<div className="container" style={{ color: props.mode === 'light' ? 'black' : 'white' }}>
				<h3>Your text summary</h3>
				<p><strong>{words}</strong> words and <strong>{text.length}</strong> characters</p>
				<p>{timeToRead} minutes read</p>
			</div>
			<div className="container" style={{ color: props.mode === 'light' ? 'black' : 'white' }}>
				<button disabled={text.length === 0} className="btn btn-primary mx-1" onClick={handlePreview}>Preview</button>
				<p id="preview" className="container my-3"></p>
			</div>
		</>
	);
}
