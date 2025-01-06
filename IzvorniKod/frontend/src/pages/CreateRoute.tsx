import React, { useEffect, useRef, useState } from 'react';
import '../components/createroute.css';

function CreateRoute() {
    const mapRef = useRef<HTMLDivElement>(null);
    const [routeMap, setRouteMap] = useState<google.maps.Map | null>(null);
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
    const [startLocation, setStartLocation] = useState<string>('');
    const [endLocation, setEndLocation] = useState<string>('');
    const [route, setRoute] = useState<google.maps.DirectionsResult | null>(null);

    useEffect(() => {
        const fetchGoogleMapsKey = async () => {
            try {
                const response = await fetch('/api/env');
                const data = await response.json();
                return data.mapsApiKey;
            } catch (error) {
                console.error('Error fetching Google Maps API key:', error);
                return null;
            }
        };

        const loadGoogleMapsScript = (mapsApiKey: string, callback: () => void) => {
            const existingScript = document.getElementById('googleMaps');
            if (!existingScript) {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&libraries=places`;
                script.id = 'googleMaps';
                document.body.appendChild(script);
                script.onload = () => {
                    if (callback) callback();
                };
            } else {
                if (callback) callback();
            }
        };

        const initializeMap = async () => {
            const mapsApiKey = await fetchGoogleMapsKey();
            if (mapsApiKey) {
                loadGoogleMapsScript(mapsApiKey, () => {
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
            }
        };
        initializeMap();
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
                        setRoute(response);
                    } else if (status === 'NOT_FOUND') {
                        window.alert('One or both of the locations could not be found. Please check the addresses and try again.');
                    } else {
                        window.alert('Directions request failed due to ' + status);
                    }
                }
            );
        }
    };

    const handleExportRoute = async () => {
        if (route) {
            try {
                const response = await fetch('/api/saveRoute', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/xml',
                    },
                    body: route,
                });
                if (response.ok) {
                    window.alert('Route saved successfully!');
                } else {
                    window.alert('Failed to save the route.');
                }
            } catch (error) {
                console.error('Error saving the route:', error);
                window.alert('Error saving the route.');
            }
        } else {
            window.alert('No route to export.');
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
                    <button onClick={handleExportRoute}>Export Route</button>
                </div>
                <div ref={mapRef} style={{ height: '500px', width: '100%' }}></div>
            </div>
        </div>
    ); 
}

export default CreateRoute;