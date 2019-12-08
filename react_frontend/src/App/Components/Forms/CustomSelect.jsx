
/* General Imports --------------------------------------------------------------- */
import React from "react";


/* Material UI Imports ----------------------------------------------------------- */
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem} from "@material-ui/core";


/* Component --------------------------------------------------------------------- */


export const CustomSelect = (props) => {

	/*

	REQUIRED props:
	* label (label of the select box)
	* value (initial value)
	* selectOptions (JS Object storing all possible values as keys
					 and their labels as the respective values)

	OPTIONAL props:
	* onChange (function that takes in the value of the select after changing it)
	* className (actual classname strings)

	*/

	const [value, setValue] = React.useState(props.value);

	const handleChange = (event) => {
		setValue(event.target.value);
		if ("onChange" in props) {
			props.onChange(parseInt(event.target.value));
		}
	};

	return (
		<FormControl className={"className" in props ? props["className"] : ""}>
			<InputLabel id="select-label">{props.label}</InputLabel>
			<Select
				labelId="select-label"
				id="demo-simple-select"
				value={value}
				onChange={handleChange}>
				{Object.keys(props.selectOptions).map(value => (
					<MenuItem value={value}>{props.selectOptions[value]}</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};
