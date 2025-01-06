import React, { useEffect, useRef, useState } from 'react';
import '../components/createroute.css';

function CreateRoute() {
    const mapRef = useRef<HTMLDivElement>(null);
    const [routeMap, setRouteMap] = useState<google.maps.Map | null>(null);
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
    const [startLocation, setStartLocation] = useState<string>('Zagreb, Croatia');
    const [endLocation, setEndLocation] = useState<string>('Split, Croatia');

    useEffect(() => {
        const fetchGoogleMapsKey = async () => { // trying to fetch the api key, not sure if it works securely
            try {
                const response = await fetch('/api/env');
                const data = await response.json();
                return data.mapsApiKey;
            } catch (error) {
                console.error('Error fetching Google Maps API key:', error);
                return null;
            }
        };

        const loadGoogleMapsScript = (callback: () => void) => {
            const existingScript = document.getElementById('googleMaps');
            if (!existingScript) {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
                script.id = 'googleMaps';
                document.body.appendChild(script);
                script.onload = () => {
                    if (callback) callback();
                };
            } else {
                if (callback) callback();
            }
        };

        loadGoogleMapsScript(() => {
            if (mapRef.current) {
                const map = new google.maps.Map(mapRef.current, {
                    center: { lat: 45.8150, lng: 15.9780 },
                    zoom: 8,
                });
                setRouteMap(map);

                const renderer = new google.maps.DirectionsRenderer();
                renderer.setMap(map);
                setDirectionsRenderer(renderer);
            }
        });
    }, []);

    const handleStartLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartLocation(event.target.value);
    };

    const handleEndLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndLocation(event.target.value);
    };

    const handleCalculateRoute = () => {
        if (routeMap && directionsRenderer) {
            const directionsService = new google.maps.DirectionsService();
            directionsRenderer.set('directions', null); // Clear previous directions

            directionsService.route(
                {
                    origin: startLocation,
                    destination: endLocation,
                    travelMode: google.maps.TravelMode.WALKING,
                },
                (response, status) => {
                    if (status === 'OK') {
                        directionsRenderer.setDirections(response);
                    } else {
                        window.alert('Directions request failed due to ' + status);
                    }
                }
            );
        }
    };

    return (
        <div className="createRoute">
            <div className='createRoute-container'>
                <p className='naslov'>Create Route</p>
                <div>
                    <label>
                        Start Location:
                        <input type="text" value={startLocation} onChange={handleStartLocationChange} />
                    </label>
                    <label>
                        End Location:
                        <input type="text" value={endLocation} onChange={handleEndLocationChange} />
                    </label>
                    <button onClick={handleCalculateRoute}>Calculate Route</button>
                </div>
                <div ref={mapRef} style={{ height: '500px', width: '100%' }}></div>
            </div>
        </div>
    ); 
}

export default CreateRoute;