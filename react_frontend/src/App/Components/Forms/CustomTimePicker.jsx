
/* General Imports --------------------------------------------------------------- */
import React from "react";


/* Date/Time Imports ------------------------------------------------------------- */
import {KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


/* Component --------------------------------------------------------------------- */


export const CustomTimePicker = (props) => {

	/*

	REQUIRED props:
	* timestamp (The initial timestamp)

	OPTIONAL props:
	* updateTimestamp (function that takes in the new timestamp after changing it)
	* className (actual classname strings)

	*/

	const [selectedDate, setSelectedDate] = React.useState(new Date(props.timestamp * 1000));

	const handleDateChange = date => {
		setSelectedDate(date);
		if ("updateTimestamp" in props) {
			props.updateTimestamp(Math.round(date.getTime() / 1000));
		}
	};

	const className = ("className" in props ? props["className"] : undefined);

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardTimePicker
				className={className !== undefined ? className : ""}
				margin="normal"
				id="time-picker"
				label="Time"
				value={selectedDate}
				onChange={handleDateChange}
				KeyboardButtonProps={{
					'aria-label': 'change time',
				}}
			/>
		</MuiPickersUtilsProvider>
	);
};
