/* General Imports --------------------------------------------------------------- */
import React from 'react';
import clsx from 'clsx';

/* Hook Linking Imports ----------------------------------------------------------*/
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles/withStyles";


/* Component Imports ------------------------------------------------------------- */
import {Map} from './Map';
import {Card, CardContent, Typography} from "@material-ui/core";


/* Styles ------------------------------------------------------------------------ */

const COLORS = [
	"#0D0887",
	"#3E049C",
	"#6300A7",
	"#8707A6",
	"#A62098",
	"#C03A83",
	"#D5546E",
	"#E76F5A",
	"#F58C46",
	"#FDAD32",
	"#FCD225",
	"#F0F921",
];

const styles = theme => ({
	headline: {
		display: "block",
		textAlign: "center",
		marginBottom: theme.spacing(4)
	},
	card: {
		position: "absolute",
		top: theme.spacing(2),
		left: theme.spacing(2),
		zIndex: "1000",
	},
	legendMonth: {
		textAlign: "center",
		marginBottom: theme.spacing(1),
	},
	legend: {
		width: 200,
	},
	legendLine: {
		display: "block",
		width: 200,
		borderRadius: 3,
		overflow: "hidden",
		textAlign: "center",
		marginBottom: theme.spacing(0.5),
		"&:last-child": {
			marginBottom: theme.spacing(0),
		}
	},
	legendLineLabel: {
		display: "inline-block",
		padding: theme.spacing(1),
		color: "rgb(255, 255, 255)",
		fontWeight: "500",
		textShadow: "0 0 1.5px rgb(0,0,0)",
	},
	cardContent: {
		paddingTop: theme.spacing(2),
		paddingRight: theme.spacing(2),
		paddingBottom: theme.spacing(1),
		paddingLeft: theme.spacing(2),
		margin: 0,
		"&:last-child": {
			paddingBottom: theme.spacing(2),
		}
	},
});


/* Component --------------------------------------------------------------------- */


class MapPage extends React.Component {
	constructor(props) {
		super(props);

		this.numberOfDatasets = this.props.data.length;
		this.state = {
			selectedDataset: 0,
			intervalId: undefined,
			playing: false
		};

		this.prepareDataset = this.prepareDataset.bind(this);
		this.prevDataset = this.prevDataset.bind(this);
		this.nextDataset = this.nextDataset.bind(this);

		this.onPlay = this.onPlay.bind(this);
		this.onPause = this.onPause.bind(this);

		this.getLegend = this.getLegend.bind(this);

		document.addEventListener('keypress', event => {
			if (event.key === "d") {
				this.onPause();
				this.nextDataset();

			} else if (event.key === "a") {
				this.onPause();
				this.prevDataset();

			} else if (event.key === " ") {
				if (this.state.playing) {
					this.onPause();
				} else {
					this.onPlay();
				}

			}
		});
	}

	prepareDataset() {
		return this.props.data[this.state.selectedDataset];
	}

	prevDataset() {
		this.setState({
			selectedDataset: (this.state.selectedDataset - 1 + this.numberOfDatasets) % this.numberOfDatasets,
		});
	}

	nextDataset() {
		this.setState({
			selectedDataset: (this.state.selectedDataset + 1) % this.numberOfDatasets,
		});
	}

	onPlay() {
		let intervalId = setInterval(this.nextDataset, 500);
		this.setState({
			intervalId: intervalId,
			playing: true,
		});
	}

	onPause() {
		clearInterval(this.state.intervalId);
		this.setState({
			intervalId: undefined,
			playing: false,
		});
	}

	getLegend() {
		const {classes} = this.props;

		let timeLabel;

		if (this.props.selection.dataset === 0) {
			// edgar (only years)
			let currentYear = this.props.selection.fromYear + this.state.selectedDataset;
			timeLabel = currentYear.toString();
		} else {
			// odiac (month and year)
			let currentYear = this.props.selection.fromYear + Math.round(((this.props.selection.fromMonth + this.state.selectedDataset)/12) - 0.5001);
			let currentMonth = ((this.props.selection.fromMonth + this.state.selectedDataset - 1) % 12) + 1;
			console.log(this.props.selection.fromYear, this.props.selection.fromMonth, currentYear, currentMonth);
			timeLabel = currentMonth.toString() + "/" + currentYear.toString();
		}

		const maxValue = this.props.units[this.state.selectedDataset];
		const unit = "µg/(m2*s)";

		let colorBlock = COLORS.map((COLOR, index) => {
			const lowerBoundary = Math.round((maxValue/12.0)*index, 3);
			const upperBoundary = Math.round((maxValue/12.0)*(index + 1), 3);
			return (
				<div className={classes.legendLine} style={{backgroundColor: COLOR}}>
						<p className={classes.legendLineLabel}>{lowerBoundary} - {upperBoundary} {unit}</p>
					</div>
			);
		});

		return (
			<Card className={classes.card} elevation={3}>
				<CardContent className={clsx(classes.legend, classes.cardContent)}>
					<Typography variant="h5" className={classes.legendMonth}>{timeLabel}</Typography>
					{colorBlock}
				</CardContent>
			</Card>
		);
	}

	render() {
		return (
			<div className="MapPage">
				{this.getLegend()}
				<Map dataset={this.prepareDataset()} selection={this.props.selection}/>
			</div>
		);
	}

}


/* Hook Linking & Export --------------------------------------------------------- */


MapPage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MapPage);
