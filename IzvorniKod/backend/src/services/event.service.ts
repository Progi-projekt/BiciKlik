import { Event } from "../models/event.model";
import { Route } from "../models/route.model";
import { Organizer } from "../models/organizer.model";
import { AppUser } from "../models/appuser.model";
import { Participation } from "../models/participation.model";
import { or } from "sequelize";
import App from "../app";

export class EventService {
	// for getting last 10 events
	public async getLastTenEvents() {
		const events = await Event.findAll({
			limit: 10,
			order: [["createdAt", "DESC"]],
			attributes: ["event_id", "event_name", "event_time", "short_description", "route_id"],
			include: [
				{
					model: Route,
					attributes: ["route_id", "route_name"],
				},
				{
					model: Organizer,
					include: [
						{
							model: AppUser,
							attributes: ["name"],
						},
					],
					attributes: ["email"],
				},
			],
		});

		return events.map((event) => ({
			event_id: event.event_id,
			route_id: event.route_id,
			short_description: event.short_description,
			organizer: event.organizer.appUser.name,
			event_name: event.event_name,
			event_time: event.event_time,
		}));
	}

	public async createEvent(eventData: any) {
		const eventId = Date.now();
		try {
			const newEvent = await Event.create({
				organizer_email: eventData.organizerEmail,
				event_id: eventId,
				event_name: eventData.eventName,
				event_time: eventData.eventTime,
				short_description: eventData.shortDescription,
				route_id: eventData.routeId,
				description: eventData.description,
			});

			return newEvent;
		} catch (error) {
			console.error("Error creating an event:", error);
			throw error;
		}
	}

	// for getting event by id
	public async getEventById(eventId: string): Promise<any> {
		const event = await Event.findByPk(eventId, {
			include: [
				{
					model: Organizer,
					include: [
						{
							model: AppUser,
							attributes: ["name"],
						},
					],
					attributes: ["email"],
				},
			],
		});

		if (!event) {
			throw new Error("Event not found");
		}

		return {
			event_id: event.event_id,
			short_description: event.description,
			organizer: event.organizer.appUser.name,
			event_name: event.event_name,
			event_time: event.event_time,
			route_id: event.route_id,
		};
	}

	//saving result
	public async saveResult(eventId: string, email: string, result: string) {
		try {
			let participation = await Participation.findOne({
				where: {
					event_id: eventId,
					email: email,
				},
			});

			if (!participation) {
				console.log("Participation not found, creating a new one");
				participation = await Participation.create({
					event_id: eventId,
					email: email,
					achieved_result: 0, // Initialize with a default value
				});
			}

			// Convert time string to total seconds
			const [hours, minutes, seconds] = result.split(":").map(Number);
			const totalSeconds = hours * 3600 + minutes * 60 + seconds;

			participation.achieved_result = totalSeconds;
			await participation.save();
			return participation;
		} catch (error) {
			console.error("Error in saveResult:", error);
			throw error;
		}
	}

	public async removeResult(eventId: string, email: string) {
		try {
			const participation = await Participation.findOne({
				where: {
					event_id: eventId,
					email: email,
				},
			});

			if (!participation) {
				return false;
			}
			await participation.destroy();
			return true;
		} catch (error) {
			console.error("Error in removeResult:", error);
			throw error;
		}
	}

	// for getting participants from the leaderboard
	public async getParticipants(eventId: string) {
		const participations = await Participation.findAll({
			where: {
				event_id: eventId,
			},

			attributes: ["achieved_result", "email"],
			include: [
				{
					model: AppUser,
					attributes: ["email", "name"],
				},
			],
		});

		// sort by achieved_result (lower is better, so the first one is the winner)
		// result, as of right now, reflects the time it took to complete the event in some time unit

		participations.sort((a, b) => {
			return a.achieved_result - b.achieved_result;
		});

		return participations.map((participation) => ({
			email: participation.user.email,
			name: participation.user.name,
			achieved_result: this.secondsToHHMMSS(participation.achieved_result),
		}));
	}

	// for getting events I'm participating in
	public async getParticipatingEvents(email: string) {
		const participations = await Participation.findAll({
			where: {
				email: email,
			},
			attributes: ["event_id"],
			include: [
				{
					model: Event,
					attributes: ["event_name", "event_time"],
				},
			],
		});

		return participations.map((participation) => ({
			event_id: participation.event.event_id,
			event_name: participation.event.event_name,
			event_time: participation.event.event_time,
		}));
	}

	public async eraseEvent(eventId: string) {
		const event = await Event.findByPk(eventId);
		if (!event) {
			return false;
		}
		const participations = await Participation.findAll({
			where: {
				event_id: eventId,
			},
		});
		await Promise.all(
			participations.map(async (participation) => {
				await participation.destroy();
			})
		);
		await event.destroy();
		return true;
	}

	private secondsToHHMMSS = (totalSeconds: number): string => {
		// converting seconds back to HH:MM:SS
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		return [
			hours.toString().padStart(2, "0"),
			minutes.toString().padStart(2, "0"),
			seconds.toString().padStart(2, "0"),
		].join(":");
	};
	public async getAllEvents() {
		const events = await Event.findAll({
			attributes: ["event_id", "event_name"],
		});
		return events;
	}
}
