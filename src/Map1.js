// src/components/Map.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip } from 'react-leaflet';
import L from 'leaflet'; // Import leaflet library
import 'leaflet/dist/leaflet.css';
import iconImage from './th (2).jpg'; // Import the local image file

// Define the custom icon for the pin marker
const customIcon = L.icon({
  iconUrl: iconImage, // Use the local image file as icon
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const Map1 = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [mapVisible, setMapVisible] = useState(false);

  const locations = {
    1: ["T1", [12.844583, 77.662717]],
    2: ["Ramanujan Block", [12.844578, 77.663758]],
    3: ["Entrance Gate", [12.845345, 77.663795]]
  };

  const getUserLocation = () => {
    setUserPosition(locations[1][1]);
    setMapVisible(true); // Set map visibility to true after setting user location
  };

  return (
    <>
      <button onClick={getUserLocation}>Get Current Location</button>

      <br />
      <br/>
      {mapVisible && userPosition && (
        <MapContainer
          center={userPosition}
          zoom={22}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Add Marker with custom icon at the user's current position */}
          <Marker position={userPosition} icon={customIcon}>
            <Popup>You are here</Popup>
          </Marker>
          {/* Iterate over locations and add Markers */}
          {Object.values(locations).map(([name, position], index) => (
            <Marker key={index} position={position} icon={customIcon}>
              <Popup>{name}</Popup>
              {/* Show the name of the location as Tooltip */}
              <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent>
                <span>{name}</span>
              </Tooltip>
            </Marker>
          ))}
          {/* Draw polyline between the points */}
          <Polyline positions={Object.values(locations).map(location => location[1])} color="blue" />
        </MapContainer>
      )}
    </>
  );
};

export default Map1;
