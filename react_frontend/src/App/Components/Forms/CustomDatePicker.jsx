
/* General Imports --------------------------------------------------------------- */
import React from "react";


/* Date/Time Imports ------------------------------------------------------------- */
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


/* Component --------------------------------------------------------------------- */


export const CustomDatePicker = (props) => {

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
			<KeyboardDatePicker
				className={className !== undefined ? className : ""}
				margin="normal"
				id="date-picker"
				label="Date"
				format="dd/MM/yyyy"
				value={selectedDate}
				onChange={handleDateChange}
				KeyboardButtonProps={{
					'aria-label': 'change date',
				}}
			/>
		</MuiPickersUtilsProvider>
	);
};
