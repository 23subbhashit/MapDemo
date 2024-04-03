// src/components/Map.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet'; // Import leaflet library
import 'leaflet/dist/leaflet.css';
import iconImage from './th (2).jpg'; // Import the local image file

// Define the custom icon for the pin marker
const customIcon = L.icon({
  iconUrl: iconImage, // Use the local image file as icon
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const Map = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [mapVisible, setMapVisible] = useState(false);

  const point1 = [12.844583, 77.662717];
  const point2 = [12.844578, 77.663758];

  const getUserLocation = () => {
    setUserPosition(point1);
    setMapVisible(true); // Set map visibility to true after setting user location
  };

  return (
    <>
      <button onClick={getUserLocation}>Get Current Location</button>
      {mapVisible && userPosition && (
        <MapContainer
          center={userPosition}
          zoom={15}
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
          {/* Add Marker for point 1 */}
          <Marker position={point1} icon={customIcon}>
            <Popup>Point 1</Popup>
          </Marker>
          {/* Add Marker for point 2 */}
          <Marker position={point2} icon={customIcon}>
            <Popup>Point 2</Popup>
          </Marker>
          {/* Draw polyline between the two points */}
          <Polyline positions={[point1, point2]} color="blue" />
        </MapContainer>
      )}
    </>
  );
};

export default Map;
