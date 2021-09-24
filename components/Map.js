import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";
import { LocationMarkerIcon } from "@heroicons/react/solid";

const Map = ({ searchResults }) => {
	const coords = searchResults.map((result) => ({
		longitude: result.long,
		latitude: result.lat,
	}));
	//transform searchresults into long/lat only
	const center = getCenter(coords);

	const [viewport, setViewport] = useState({
		width: "100%",
		height: "100%",
		latitude: center.latitude,
		longitude: center.longitude,
		zoom: 11,
	});

	const [selectedLocation, setSelectedLocation] = useState({});

	return (
		<ReactMapGL
			mapStyle="mapbox://styles/thicccfila/cktxvj1c022tx18pc9534r89x"
			mapboxApiAccessToken={process.env.mapbox_key}
			{...viewport}
			onViewportChange={(viewport) => setViewport(viewport)}
		>
			{searchResults.map((result) => (
				<div key={result.long}>
					<Marker
						longitude={result.long}
						latitude={result.lat}
						offsetLeft={-20}
						offsetTop={-10}
					>
						<LocationMarkerIcon
							onClick={() => setSelectedLocation(result)}
							className="cursor-pointer animate-bounce text-red-400 h-5 w-5"
						/>
					</Marker>
					{selectedLocation.long === result.long ? (
						<Popup
							closeOnClick={true}
							onClose={() => setSelectedLocation({})}
							latitude={result.lat}
							longitude={result.long}
                            className="z-50 rounded-2xl"
						>
							{result.title}
						</Popup>
					) : (
						false
					)}
				</div>
			))}
		</ReactMapGL>
	);
};

export default Map;
