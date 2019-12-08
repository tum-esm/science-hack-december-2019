
/* General Imports --------------------------------------------------------------- */
import React from 'react';
import './SelectPage.scss'


/* Material UI Import ------------------------------------------------------------ */
import {
	Container,
	Typography,
	Card,
	CardContent,
	Grid,
	Button,
	CircularProgress} from '@material-ui/core';


/* Hook Linking Imports ---------------------------------------------------------- */
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";


/* Component Imports ------------------------------------------------------------- */
import {CustomSelect} from "../Components/Forms/CustomSelect";


/* Styles ------------------------------------------------------------------------ */


const styles = theme => ({
	container: {
	},
	headline: {
		display: "block",
		textAlign: "center",
		marginBottom: theme.spacing(3)
	},
	gridItem: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	selectDataset: {
		minWidth: 200,
		textAlign: "center"
	},
	selectTime: {
		minWidth: 100,
		marginLeft: theme.spacing(4),
		marginRight: theme.spacing(4),
		textAlign: "center"
	},
	button: {
		color: "white",
		fontWeight: "500",
	},
	wrapper: {
		marginLeft: theme.spacing(0.5),
		marginRight: theme.spacing(0.5),
		position: 'relative',
	},
	buttonProgress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
});


/* Component --------------------------------------------------------------------- */


class SelectPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		const {classes} = this.props;
		let yearSelectOptions;
		let monthSelectOptions = this.props.selectOptions.months;
		if (this.props.selectOptions.dataset[this.props.selection.dataset] === "Odiac") {
			yearSelectOptions = this.props.selectOptions.odiacYears;
		} else {
			yearSelectOptions = this.props.selectOptions.edgarYears;
		}

		return (
			<div className="SelectPage">
				<Container maxWidth="xs" className={classes.container}>
					<Card className={classes.card} elevation={3}>
						<CardContent>
							<Typography variant="h5" className={classes.headline}>Configure Visualisation</Typography>
							<Grid container className={classes.root} spacing={4} justify="center">
								<Grid item xs={12} className={classes.gridItem}>
									<CustomSelect className={classes.selectDataset}
									              label="Dataset"
									              value={this.props.selection.dataset}
									              selectOptions={this.props.selectOptions.dataset}
									              onChange={value => this.props.onChange({dataset: value})}/>
								</Grid>
								<Grid item xs={12} className={classes.gridItem}>
									<CustomSelect className={classes.selectTime}
									              label="From Month"
									              value={this.props.selection.fromMonth}
									              selectOptions={monthSelectOptions}
									              onChange={value => this.props.onChange({fromMonth: value})}/>
									<CustomSelect className={classes.selectTime}
									              label="To Month"
									              value={this.props.selection.toMonth}
									              selectOptions={monthSelectOptions}
									              onChange={value => this.props.onChange({toMonth: value})}/>
								</Grid>

								<Grid item xs={12} className={classes.gridItem}>
									<CustomSelect className={classes.selectTime}
									              label="From Year"
									              value={this.props.selection.fromYear}
									              selectOptions={yearSelectOptions}
									              onChange={value => this.props.onChange({fromYear: value})}/>
									<CustomSelect className={classes.selectTime}
									              label="To Year"
									              value={this.props.selection.toYear}
									              selectOptions={yearSelectOptions}
									              onChange={value => this.props.onChange({toYear: value})}/>
								</Grid>
								<Grid item xs={12} className={classes.gridItem}>
									<div className="ButtonBox">
										<div className={classes.wrapper}>
											<Button variant="contained"
											        color={this.props.fetching ? "default" : "secondary"}
											        onClick={this.props.onFetch}
											        className={classes.button}>Fetch Data</Button>
											{this.props.fetching && (
												<CircularProgress size={24}
												                  className={classes.buttonProgress}
												                  color="secondary"/>
											)
											}
										</div>
									</div>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Container>
			</div>
		);
	}

}


/* Hook Linking & Export --------------------------------------------------------- */


SelectPage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectPage);
