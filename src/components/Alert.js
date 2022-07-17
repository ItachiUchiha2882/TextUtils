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
