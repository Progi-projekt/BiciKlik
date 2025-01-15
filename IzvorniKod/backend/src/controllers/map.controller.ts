// backend/src/controllers/mapController.ts
import { Request, Response } from "express";
import express from "express";
import path from "path";
import fs from "fs";
import axios from "axios";
import { decode } from "@googlemaps/polyline-codec";
import { MapService } from "../services/map.services";
export class MapController {
	private new_route_id: number;
	private mapService: MapService;
	constructor() {
		this.new_route_id = 0;
		this.mapService = new MapService();
	}

	public saveRoute = async (req: Request, res: Response) => {
		try {
			this.new_route_id = Date.now();
			const { polyline, routeName } = req.body;

			if (!polyline) {
				return res.status(400).json({ error: "Polyline is required" });
			}

			// Generiraj URL za Google Maps Static API
			const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=800x600&path=enc:${polyline}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

			// Preuzmi sliku pomoću Axiosa
			const response = await axios.get(staticMapUrl, { responseType: "arraybuffer" });

			// Spremi sliku na disk
			const outputDir = path.join(__dirname, "../../../static/images"); // Promijeni direktorij po potrebi
			if (!fs.existsSync(outputDir)) {
				fs.mkdirSync(outputDir);
			}

			const fileName = `route-${this.new_route_id}.png`;
			const filePath = path.join(outputDir, fileName);

			fs.writeFileSync(filePath, response.data);

			// Pošalji klijentu URL ili putanju spremljene slike
			res.status(200).json({ message: "Image saved successfully", filePath });
		} catch (error) {
			console.error("Error saving route image:", error);
			res.status(500).json({ error: "Failed to save route image" });
		}
	};
	public saveGPX = async (req: Request, res: Response) => {
		try {
			const { polyline } = req.body;

			if (!polyline) {
				return res.status(400).json({ error: "Polyline is required" });
			}

			// Dekodiraj polyline u koordinate
			const decodedPath = decode(polyline);

			// Generiraj GPX podatke
			const gpxData = `
            <gpx version="1.1" creator="MapController">
                <trk>
                    <name>Generated Route</name>
                    <trkseg>
                        ${decodedPath
													.map(
														([lat, lng]: [number, number]) => `
                            <trkpt lat="${lat}" lon="${lng}">
                            </trkpt>`
													)
													.join("")}
                    </trkseg>
                </trk>
            </gpx>
        `;

			// Definiraj direktorij za spremanje
			const outputDir = path.resolve(__dirname, "../../../static/gpx");
			if (!fs.existsSync(outputDir)) {
				fs.mkdirSync(outputDir, { recursive: true });
			}

			const fileName = `route-${this.new_route_id}.gpx`;
			const filePath = path.join(outputDir, fileName);

			// Spremi GPX datoteku
			fs.writeFileSync(filePath, gpxData.trim());

			res.status(200).json({ message: "GPX saved successfully", filePath });
		} catch (error) {
			console.error("Error saving GPX:", error);
			res.status(500).json({ error: "Failed to save GPX" });
		}

		const newRoute = await this.mapService.saveRoute({
			route_id: this.new_route_id.toString(),
			route_name: req.body.routeName,
			route_data_path_gpx: `/IzvorniKod/static/gpx/route-${this.new_route_id}`,
			creator_email: req.cookies.loggedInAs,
		});
	};
}
