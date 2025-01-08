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

    const handleExportGPX = () => {
        if (route) {
            const polyline = route.routes[0].overview_polyline; // Direktan pristup enkodiranom poliliniju
            const decodedPath = google.maps.geometry.encoding.decodePath(polyline);
    
            const gpxData = `
                <gpx version="1.1" creator="CreateRoute">
                    <trk>
                        <name>Generated Route</name>
                        <trkseg>
                            ${decodedPath
                                .map(
                                    (point) => `
                                <trkpt lat="${point.lat()}" lon="${point.lng()}">
                                </trkpt>`
                                )
                                .join('')}
                        </trkseg>
                    </trk>
                </gpx>
            `;
    
            const blob = new Blob([gpxData.trim()], { type: 'application/gpx+xml' });
            const url = URL.createObjectURL(blob);
    
            const a = document.createElement('a');
            a.href = url;
            a.download = 'route.gpx';
            a.click();
            URL.revokeObjectURL(url);
        } else {
            window.alert('No route to export.');
        }
    };
    

    const handleGenerateRouteImage = async () => {
        if (route) {
            const polyline = route.routes[0].overview_polyline; // Direktan pristup enkodiranom poliliniju
            try {
                const response = await fetch('/map/save-route-image', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ polyline }),
                });
                if (response.ok) {
                    const data = await response.json();
                    window.alert(`Route image saved successfully! Image URL: ${data.filePath}`);
                } else {
                    window.alert('Failed to save the route image.');
                }
            } catch (error) {
                console.error('Error saving the route image:', error);
                window.alert('Error saving the route image.');
            }
        } else {
            window.alert('No route to generate an image.');
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
                        <input type="text" value={startLocation} onChange={handleStartLocationChange} />
                    </label> </div>
                    <div> <label>
                        End Location:&nbsp;&nbsp;   
                        <input type="text" value={endLocation} onChange={handleEndLocationChange} />
                    </label> </div>
                    </div>
                    <button onClick={handleCalculateRoute}>Calculate Route</button>
                    <button onClick={handleExportGPX}>Export GPX</button>
                    <button onClick={handleGenerateRouteImage}>Generate Route Image</button>
                </div>
                <div ref={mapRef} style={{ height: '500px', width: '100%' }}></div>
            </div>
        </div>
    );
}

export default CreateRoute;
