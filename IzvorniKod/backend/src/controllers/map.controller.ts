// backend/src/controllers/mapController.ts
import { Request, Response } from "express";
import { GoogleApiService } from "../services/googleApi.service";
import express from "express";
import path from "path";
import fs from "fs";
import axios from "axios";
export class MapController {
	private googleApiService: GoogleApiService;

	constructor() {
		this.googleApiService = new GoogleApiService();
	}

	public createRoute = async (req: Request, res: Response) => {
		const { origin, destination, waypoints } = req.body;

		try {
			const route = await this.googleApiService.createRoute(origin, destination, waypoints);
			res.json(route);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ error: error.message });
			} else {
				res.status(500).json({ error: "An unknown error occurred" });
			}
		}
	};
	public saveRoute = async (req: Request, res: Response) => {
		try {
			const { polyline } = req.body;

			if (!polyline) {
				return res.status(400).json({ error: "Polyline is required" });
			}

			// Generiraj URL za Google Maps Static API
			const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=800x600&path=enc:${polyline}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

			// Preuzmi sliku pomoću Axiosa
			const response = await axios.get(staticMapUrl, { responseType: "arraybuffer" });

			// Spremi sliku na disk
			const outputDir = path.join(__dirname, "images"); // Promijeni direktorij po potrebi
			if (!fs.existsSync(outputDir)) {
				fs.mkdirSync(outputDir);
			}

			const fileName = `route-${Date.now()}.png`;
			const filePath = path.join(outputDir, fileName);

			fs.writeFileSync(filePath, response.data);

			// Pošalji klijentu URL ili putanju spremljene slike
			res.status(200).json({ message: "Image saved successfully", filePath });
		} catch (error) {
			console.error("Error saving route image:", error);
			res.status(500).json({ error: "Failed to save route image" });
		}
	};
}
