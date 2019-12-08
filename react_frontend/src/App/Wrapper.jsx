/* General Imports --------------------------------------------------------------- */
import React from 'react';


/* Styling Imports --------------------------------------------------------------- */
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import {BreakpointProvider} from 'react-socks';


/* Component Imports ------------------------------------------------------------- */
import App from './App';


/* Theme ------------------------------------------------------------------------- */


const theme = createMuiTheme({
	palette : {
		primary: {
			main: '#282c34'
		},
		secondary: {
			main: 'hsl(340, 100%, 50%)'
		},
	}
});


/* Component --------------------------------------------------------------------- */


export const Wrapper = () => {
	return (
		<ThemeProvider theme={theme}>
			<BreakpointProvider>
				<App/>
			</BreakpointProvider>
		</ThemeProvider>
	);
};
