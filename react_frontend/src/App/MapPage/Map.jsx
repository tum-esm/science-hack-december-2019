/// app.js
import React from 'react';
import DeckGL from '@deck.gl/react';
import {StaticMap} from 'react-map-gl';
import {HexagonLayer} from '@deck.gl/aggregation-layers';

// Set your mapbox access token here
import {MAPBOX_ACCESS_TOKEN} from '../../secrets';

// Initial viewport settings
const initialViewState = {
	longitude: 11.576124,
	latitude: 48.137154,
	zoom: 5,
	pitch: 30,
	bearing: 0
};


export class Map extends React.Component {
	render() {

		const hexLayer = new HexagonLayer({
			id: 'hexagon-layer',
			data: this.props.dataset,
			pickable: false,
			extruded: true,
			radius: 50000,
			coverage: 0.6,

			colorDomain: [0.0, 5.0],
			colorRange: [
				[13, 8, 135],
				[62, 4, 156],
				[99, 0, 167],
				[135, 7, 166],
				[166, 32, 152],
				[192, 58, 131],
				[213, 84, 110],
				[231, 111, 90],
				[245, 140, 70],
				[253, 173, 50],
				[252, 210, 37],
				[240, 249, 33]
			],
			getColorWeight: d => Math.round(d.value * 5),
			colorAggregation: "MEAN",

			elevationScale: 3000,
			getPosition: d => {
				if (this.props.selection.dataset === 0) {
					let lng = d.coordinates[1] + 180;
					if (lng > 180) {
						lng -= 360;
					}
					return [lng, d.coordinates[0]];
				} else {
					return [d.coordinates[1], d.coordinates[0]];
				}},
			elevationAggregation: "MEAN",
			getElevationWeight: d => d.value,
		});

		const layers = [hexLayer];

		return (
			<DeckGL
				initialViewState={initialViewState}
				controller={true}
				layers={layers}
			>
				<StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}/>
			</DeckGL>
		);
	}
}