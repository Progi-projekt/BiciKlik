import React, { useEffect, useRef, useState } from 'react';
import '../components/createroute.css';

function CreateRoute() {
    const mapRef = useRef<HTMLDivElement>(null);
    const [routeMap, setRouteMap] = useState<google.maps.Map | null>(null);
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
    const [startLocation, setStartLocation] = useState<string>('');
    const [stops, setStops] = useState<string[]>(['']); // support for stops in between Start and End
    const [endLocation, setEndLocation] = useState<string>('');
    const [route, setRoute] = useState<google.maps.DirectionsResult | null>(null);
    const startLocationRef = useRef<HTMLInputElement>(null); // for autocomplete
    const endLocationRef = useRef<HTMLInputElement>(null);
    const stopRefs = useRef<(HTMLInputElement | null)[]>([]);

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
                script.src = `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&libraries=places,geometry`;
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
                            center: { lat: 45.815, lng: 15.978 },
                            zoom: 8,
                        });
                        setRouteMap(map);

                        const renderer = new google.maps.DirectionsRenderer();
                        renderer.setMap(map);
                        setDirectionsRenderer(renderer);
                        
                        // Initialize autocomplete for start and end locations
                        if (startLocationRef.current) {
                            new google.maps.places.Autocomplete(startLocationRef.current);
                        }
                        if (endLocationRef.current) {
                            new google.maps.places.Autocomplete(endLocationRef.current);
                        }
                        // Initialize autocomplete for stops
                        stopRefs.current.forEach((ref) => {
                            if (ref) {
                                new google.maps.places.Autocomplete(ref);
                            }
                        });
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

    const handleAddStop = () => {
        setStops([...stops, '']);
    };

    const handleStopChange = (index: number, value: string) => {
        const newStops = [...stops];
        newStops[index] = value;
        setStops(newStops);
    };

    const handleCreateRoute = async () => {
        if (!routeMap || !directionsRenderer) {
            window.alert('Map is not initialized.');
            return;
        }

        if (!startLocation || !endLocation) {
            window.alert('Please provide start and end locations.');
            return;
        }

        const waypoints = stops.filter(stop => stop).map(stop => ({ // adding stops to the route
            location: stop,
            stopover: true,
        }));

        const directionsService = new google.maps.DirectionsService();

        try {
            // Step 1: Generate Route
            const response = await new Promise<google.maps.DirectionsResult>((resolve, reject) => {
                directionsService.route(
                    {
                        origin: startLocation,
                        destination: endLocation,
                        waypoints: waypoints,
                        travelMode: google.maps.TravelMode.DRIVING, //todo: omogućit  da korisnik bira jel walking ili driving, msm da nebu uvijek ista ruta po tom pitanju, ali idk
                    },
                    (result, status) => {
                        if (status === 'OK') {
                            resolve(result);
                        } else {
                            reject('Directions request failed due to ' + status);
                        }
                    }
                );
            });

            directionsRenderer.setDirections(response);
            setRoute(response);
        } catch (error) {
            console.error('Error creating the route:', error);
            window.alert('Failed to create the route. Please try again.');
        }
    };

    const handleSaveRoute = async () => {
        if (!route) {
            window.alert('Please create a route first.');
            return;
        }

        try {
            // Step 2: Generate and Save Image
            const polyline = route.routes[0].overview_polyline;
            const saveImageResponse = await fetch('/map/save-route-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ polyline }),
            });
            
            const imageData = await saveImageResponse.json();
            console.log('Image saved at:', imageData.filePath);
            
            const saveGpxResponse = await fetch('/map/save-gpx',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ polyline }),
            });
            if (!saveGpxResponse.ok) {
                throw new Error('Failed to save the route image.');
            }
            const gpxData = await saveGpxResponse.json();
            console.log('Gpx saved at: ', gpxData.filePath);

            // Step 4: Success Message
            window.alert('Ruta uspješno generirana!');
        } catch (error) {
            console.error('Error saving the route:', error);
            window.alert('Failed to save the route. Please try again.');
        }
    };
    

    return (
        <div className="createRoute">
            <div className="createRoute-container">
                <p className="naslov">Create Route</p>
                <div className="route-form-container">
                    <div className='route-inputs'>
                    <div> <label>
                         Start Location: 
                        <input type="text" ref={startLocationRef} value={startLocation} onChange={handleStartLocationChange} />
                    </label> </div>
                    <div> <label>
                        End Location:&nbsp;&nbsp;   
                        <input type="text" ref={endLocationRef} value={endLocation} onChange={handleEndLocationChange} />
                    </label> </div>
                    <button onClick={handleAddStop}>+</button>
                    {stops.map((stop, index) => ( //new stops
                        <div key={index}>
                            <label>
                                Stop {index + 1}:&nbsp;&nbsp;
                                <input type="text" ref={(el) => (stopRefs.current[index] = el)} value={stop} onChange={event => handleStopChange(index, event.target.value)} />
                            </label>
                        </div>
                    ))}
                    </div>
                    <button onClick={handleCreateRoute}>Calculate Route</button>
                    <button onClick={handleSaveRoute}>Save Route</button>
                </div>
                <div ref={mapRef} style={{ height: '500px', width: '100%' }}></div>
            </div>
        </div>
    );
}

export default CreateRoute;
