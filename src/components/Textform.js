import React, { useState } from "react";
// import PropTypes from 'prop-types'

export default function Textform(props) {
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
	const handleClear = () => {
		let newText = "";
		setText(newText);
	}

	const handleOnChange = (event) => {
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
	const handlePreview = () => {
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
