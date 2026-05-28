import React, { useState } from 'react';
import { MapContainer, TileLayer, LayersControl, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for the default Leaflet marker icon not showing up properly in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Helper component to animate/pan the map view when a user searches for a location
function MapController({ center }) {
  const map = useMap();
  if (center) {
    map.flyTo(center, 13, { animate: true, duration: 1.5 });
  }
  return null;
}

function MapClickHandler({ onAddressSelect, setMarkerPosition, setLocationName }) {
  useMapEvents({
    click: async (event) => {
      const coords = [event.latlng.lat, event.latlng.lng];
      const fetchedAddress = await reverseGeocode(coords);

      if (setMarkerPosition) {
        setMarkerPosition(coords);
      }
      if (setLocationName) {
        setLocationName(fetchedAddress);
      }
      if (onAddressSelect && fetchedAddress) {
        onAddressSelect(fetchedAddress);
      }
    },
  });

  return null;
}

const reverseGeocode = async ([lat, lon]) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`
    );
    const data = await response.json();
    return data.display_name || '';
  } catch (error) {
    console.error('Reverse geocoding failed:', error);
    return '';
  }
};

export default function InteractiveMap({ onAddressSelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]); // Default to London
  const [markerPosition, setMarkerPosition] = useState(null);
  const [locationName, setLocationName] = useState('');

  // Handle the location search using OpenStreetMap's free Nominatim API
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const newCoordinates = [parseFloat(lat), parseFloat(lon)];
        
        setMapCenter(newCoordinates);
        setMarkerPosition(newCoordinates);
        setLocationName(display_name);
        if (onAddressSelect) {
          onAddressSelect(display_name);
        }
      } else {
        alert('Location not found. Try being more specific!');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto', height: '70vh' }}>
      
      {/* Floating Search Bar UI */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        background: 'white',
        padding: '8px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        width: '90%',
        maxWidth: '400px'
      }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Search for a city or place..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Search
          </button>
        </form>
      </div>

      {/* Map Element */}
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Listen for map clicks to place a marker and reverse geocode */}
        <MapClickHandler
          onAddressSelect={onAddressSelect}
          setMarkerPosition={setMarkerPosition}
          setLocationName={setLocationName}
        />
        <MapController center={mapCenter} />

        {/* Layer Control Toggle (Top Right Corner) */}
        <LayersControl position="topright">
          
          {/* Standard Street View */}
          <LayersControl.BaseLayer checked name="Standard Streets">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          {/* Free Satellite View Layer (Esri World Imagery) */}
          <LayersControl.BaseLayer name="Satellite Imagery">
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
          
        </LayersControl>

        {/* Places a marker on the searched location */}
        {markerPosition && (
          <Marker position={markerPosition}>
            <Popup>
              <div style={{ fontSize: '13px', fontWeight: '500' }}>{locationName}</div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}