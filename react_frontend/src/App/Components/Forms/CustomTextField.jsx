
/* General Imports --------------------------------------------------------------- */
import React from "react";


/* Material UI Imports ----------------------------------------------------------- */
import {TextField} from "@material-ui/core";


/* Component --------------------------------------------------------------------- */


export const CustomTextField = React.forwardRef((props, ref) => {

	/*

	REQUIRED props:
	* label (label of the input field)

	OPTIONAL props:
	* value (initial value)
	* className (actual classname strings)

	* onChange (function handler for value change (when focused))
	* onTab (function handler for pressed Tab keys (when focused))
	* onEnter (function handler for pressed Enter keys (when focused))
	* onEscape (function handler for pressed Escape keys (when focused))

	* inputRef (the react-ref belonging to the actual input)

	*/

	const [value, setValue] = React.useState("value" in props ? props["value"] : "");

	const handleChange = (event) => {
		setValue(event.target.value);
		if ("onChange" in props) {
			props.onChange(event.target.value);
		}
	};

	const handleKeyDown = (event) => {
		if ("onTab" in props && event.which === 9) {
			event.preventDefault();
			props.onTab(event.target.value);
		} else if ("onEnter" in props && event.which === 13) {
			event.preventDefault();
			props.onEnter(event.target.value);
		} else if ("onEscape" in props && event.which === 27) {
			console.log("Triggering Escape");
			event.preventDefault();
			props.onEscape(event.target.value);
		}
	};

	const handleBlur = (event) => {
		if ("onBlur" in props) {
			props.onBlur(event.target.value);
		}
	};

	return (
			<TextField fullWidth={("fullWidth" in props) ? props["fullWidth"] : false}
			           className={("className" in props) ? props["className"] : ""}
			           multiline={("multiline" in props) ? props["multiline"] : false}
			           rowsMax={("rowsMax" in props) ? props["rowsMax"] : "1"}

			           value={value}
			           inputRef={ref}
			           onChange={handleChange}
			           onKeyDown={handleKeyDown}
			           onBlur={handleBlur}
			           label={props.label}/>
		);
});
