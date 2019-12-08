/* Material UI Import ------------------------------------------------------------ */
import React from 'react';


/* Ajax Import ------------------------------------------------------------------- */
import {BackendGET, BACKEND_URL} from "./backendCommunication";


/* Material UI Import ------------------------------------------------------------ */
import {
	Snackbar,
	SnackbarContent
} from '@material-ui/core';

/* Hook Linking Imports ---------------------------------------------------------- */
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";


import SelectPage from "./SelectPage/SelectPage";
import MapPage from "./MapPage/MapPage";

const styles = theme => ({
	snackbar: {
		margin: theme.spacing(1)
	},
	snackbarContentError: {
		backgroundColor: theme.palette.primary.main,
	},
});


class App extends React.Component {
	constructor(props) {
		super(props);

		this.selectOptions = {
			dataset: {
				0: "Edgar",
				1: "Odiac"
			},
			edgarYears: {},
			odiacYears: {},
			months: {},
		};

		for (let year = 1970; year <= 2018; year++) {
			this.selectOptions.edgarYears[year] = year;
		}

		for (let year = 2000; year <= 2017; year++) {
			this.selectOptions.odiacYears[year] = year;
		}

		for (let month = 1; month <= 12; month++) {
			this.selectOptions.months[month] = month;
		}

		this.state = {
			mapView: false,
			fetching: false,

			data: [],
			units: [],

			selection: {
				dataset: 1,
				fromMonth: 1,
				fromYear: 2016,
				toMonth: 12,
				toYear: 2016
			},

			selectionValid: true,

			errorMessageVisible: false,
			errorMessageText: "",
		};

		this.handleSelect = this.handleSelect.bind(this);
		this.handleFetch = this.handleFetch.bind(this);
	}

	handleSelect(newSelection) {
		let selection = this.state.selection;
		Object.assign(selection, newSelection);

		if (this.state.selection.fromYear > this.state.selection.toYear) {
			this.setState({
				selection: selection,
				selectionValid: false,
				errorMessageVisible: true,
				errorMessageText: "Requirement: From Year <= To Year",
			});
			return;
		} else if (this.state.selection.fromYear === this.state.selection.toYear) {
			if (this.state.selection.fromMonth > this.state.selection.toMonth) {
				this.setState({
					selection: selection,
					selectionValid: false,
					errorMessageVisible: true,
					errorMessageText: "Requirement: From Month <= To Month",
				});
				return;
			}
		}

		this.setState({
			selection: selection,
			selectionValid: true,
			errorMessageVisible: false,
			errorMessageText: "",
		});
	}

	handleFetch() {
		if (this.state.selectionValid) {
			this.setState({fetching: true});

			const params = {
				dataset: this.selectOptions.dataset[this.state.selection.dataset],
				from_month: this.state.selection.fromMonth,
				to_month: this.state.selection.toMonth,
				from_year: this.state.selection.fromYear,
				to_year: this.state.selection.toYear,
			};

			console.log({
				url: BACKEND_URL,
				params: params,
			});

			BackendGET(BACKEND_URL, params).then((resolveMessage) => {
				const resolveJSON = JSON.parse(resolveMessage);
				this.setState({
					fetching: false,
					mapView: true,
					data: resolveJSON["Datasets"],
					units: resolveJSON["Maximum"],
				});
			}).catch((rejectMessage) => {
				console.log(rejectMessage);
				const rejectJSON = JSON.parse(JSON.stringify(rejectMessage));
				this.setState({
					fetching: false,
					errorMessageVisible: true,
					errorMessageText: rejectJSON["Status"],
				});
			});
		}
	}

	render() {

		const {classes} = this.props;

		return (
			<div className="App">
				{(!this.state.mapView || this.state.errorMessageVisible) && (
					<SelectPage selection={this.state.selection}
					            selectOptions={this.selectOptions}
					            onChange={this.handleSelect}
					            onFetch={this.handleFetch}
					            fetching={this.state.fetching}/>)}
				{(this.state.mapView && !this.state.errorMessageVisible) && (<MapPage data={this.state.data} units={this.state.units} selection={this.state.selection}/>)}
				{this.state.errorMessageVisible && (
					<Snackbar className={classes.snackbar}
					          open={true}
					          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
						<SnackbarContent
							className={classes.snackbarContentError}
							aria-describedby="message-id"
							message={<span id="message-id">{this.state.errorMessageText}</span>}
						/>
					</Snackbar>
				)}
			</div>
		);
	}

}

App.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
