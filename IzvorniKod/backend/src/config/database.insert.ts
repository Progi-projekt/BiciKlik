import { QueryInterface } from "sequelize";

export async function insertRoutes(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('Route', [
        { route_id: 1, route_name: 'Route 1', route_data_path_gpx: 'path/to/route1.gpx', creator_email: 'andrej.filipciczagreb@gmail.com', createdAt: new Date('2023-01-01 10:00:00'), updatedAt: new Date('2023-01-01 10:00:00') },
        { route_id: 2, route_name: 'Route 2', route_data_path_gpx: 'path/to/route2.gpx', creator_email: 'ante.iivancic@gmail.com', createdAt: new Date('2023-01-02 10:00:00'), updatedAt: new Date('2023-01-02 10:00:00') },
        { route_id: 3, route_name: 'Route 3', route_data_path_gpx: 'path/to/route3.gpx', creator_email: 'semafor332@gmail.com', createdAt: new Date('2023-01-03 10:00:00'), updatedAt: new Date('2023-01-03 10:00:00') },
        { route_id: 4, route_name: 'Route 4', route_data_path_gpx: 'path/to/route4.gpx', creator_email: 'petra.turkovic01@gmail.com', createdAt: new Date('2023-01-04 10:00:00'), updatedAt: new Date('2023-01-04 10:00:00') },
        { route_id: 5, route_name: 'Route 5', route_data_path_gpx: 'path/to/route5.gpx', creator_email: 'oliverkreitmeyer@gmail.com', createdAt: new Date('2023-01-05 10:00:00'), updatedAt: new Date('2023-01-05 10:00:00') },
    ]);
}

export async function insertEvents(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('Event', [
        { event_id: 1, event_time: new Date('2025-01-01 10:00:00'), short_description: 'Jarun lap', description: 'A lap around Jarun lake. It is approx. 6.3km long, and has a very well made bike lane', event_name: 'Bike Club Training', route_id: 1, organizer_email: 'andrej.filipciczagreb@gmail.com', createdAt: new Date('2023-01-01 10:00:00'), updatedAt: new Date('2023-01-01 10:00:00') },
        { event_id: 2, event_time: new Date('2025-01-02 10:00:00'), short_description: 'Sava ride', description: 'A short ride from the sava bridge along the river to Rakitje lakes.', event_name: 'Fishing at Rakitje', route_id: 2, organizer_email: 'ante.iivancic@gmail.com', createdAt: new Date('2023-01-02 10:00:00'), updatedAt: new Date('2023-01-02 10:00:00') },
        { event_id: 3, event_time: new Date('2025-01-03 10:00:00'), short_description: 'Sljeme lap', description: 'A lap up to sljeme peak, and on the way down we\'ll stop for a cold one at Medvedgrad. Start and finish are near the main city square.', event_name: 'Event 3', route_id: 3, organizer_email: 'semafor332@gmail.com', createdAt: new Date('2023-01-03 10:00:00'), updatedAt: new Date('2023-01-03 10:00:00') },
        { event_id: 4, event_time: new Date('2025-01-04 10:00:00'), short_description: 'Jurjevčani visit', description: 'Ride from podsused through Samobor to Jurjevčani', event_name: 'Chill training', route_id: 4, organizer_email: 'petra.turkovic01@gmail.com', createdAt: new Date('2023-01-04 10:00:00'), updatedAt: new Date('2023-01-04 10:00:00') },
        { event_id: 5, event_time: new Date('2025-01-05 10:00:00'), short_description: 'Žumberak mountain', description: 'Fun ride up and down the Žumberak mountains. Up down, left right', event_name: 'Basically TDF training', route_id: 5, organizer_email: 'oliverkreitmeyer@gmail.com', createdAt: new Date('2023-01-05 10:00:00'), updatedAt: new Date('2023-01-05 10:00:00') },
        { event_id: 6, event_time: new Date('2025-02-01 10:00:00'), short_description: 'Jarun lap', description: 'A lap around Jarun lake. It is approx. 6.3km long, and has a very well made bike lane', event_name: 'Bike Club Training', route_id: 1, organizer_email: 'andrej.filipciczagreb@gmail.com', createdAt: new Date('2023-02-01 10:00:00'), updatedAt: new Date('2023-02-01 10:00:00') },
        { event_id: 7, event_time: new Date('2025-02-02 10:00:00'), short_description: 'Sava ride', description: 'A short ride from the sava bridge along the river to Rakitje lakes.', event_name: 'Fishing at Rakitje', route_id: 2, organizer_email: 'ante.iivancic@gmail.com', createdAt: new Date('2023-02-02 10:00:00'), updatedAt: new Date('2023-02-02 10:00:00') },
        { event_id: 8, event_time: new Date('2025-02-03 10:00:00'), short_description: 'Sljeme lap', description: 'A lap up to sljeme peak, and on the way down we\'ll stop for a cold one at Medvedgrad. Start and finish are near the main city square.', event_name: 'Event 3', route_id: 3, organizer_email: 'semafor332@gmail.com', createdAt: new Date('2023-02-03 10:00:00'), updatedAt: new Date('2023-02-03 10:00:00') },
        { event_id: 9, event_time: new Date('2025-02-04 10:00:00'), short_description: 'Jurjevčani visit', description: 'Ride from podsused through Samobor to Jurjevčani', event_name: 'Chill training', route_id: 4, organizer_email: 'petra.turkovic01@gmail.com', createdAt: new Date('2023-02-04 10:00:00'), updatedAt: new Date('2023-02-04 10:00:00') },
        { event_id: 10, event_time: new Date('2025-02-05 10:00:00'), short_description: 'Žumberak mountain', description: 'Fun ride up and down the Žumberak mountains. Up down, left right', event_name: 'Basically TDF training', route_id: 5, organizer_email: 'oliverkreitmeyer@gmail.com', createdAt: new Date('2023-02-05 10:00:00'), updatedAt: new Date('2023-02-05 10:00:00') },
        { event_id: 11, event_time: new Date('2025-03-01 10:00:00'), short_description: 'Jarun lap', description: 'A lap around Jarun lake. It is approx. 6.3km long, and has a very well made bike lane', event_name: 'Bike Club Training', route_id: 1, organizer_email: 'andrej.filipciczagreb@gmail.com', createdAt: new Date('2023-03-01 10:00:00'), updatedAt: new Date('2023-03-01 10:00:00') },
        { event_id: 12, event_time: new Date('2025-03-02 10:00:00'), short_description: 'Sava ride', description: 'A short ride from the sava bridge along the river to Rakitje lakes.', event_name: 'Fishing at Rakitje', route_id: 2, organizer_email: 'ante.iivancic@gmail.com', createdAt: new Date('2023-03-02 10:00:00'), updatedAt: new Date('2023-03-02 10:00:00') },
        { event_id: 13, event_time: new Date('2025-03-03 10:00:00'), short_description: 'Sljeme lap', description: 'A lap up to sljeme peak, and on the way down we\'ll stop for a cold one at Medvedgrad. Start and finish are near the main city square.', event_name: 'Event 3', route_id: 3, organizer_email: 'semafor332@gmail.com', createdAt: new Date('2023-03-03 10:00:00'), updatedAt: new Date('2023-03-03 10:00:00') },
        { event_id: 14, event_time: new Date('2025-03-04 10:00:00'), short_description: 'Jurjevčani visit', description: 'Ride from podsused through Samobor to Jurjevčani', event_name: 'Chill training', route_id: 4, organizer_email: 'petra.turkovic01@gmail.com', createdAt: new Date('2023-03-04 10:00:00'), updatedAt: new Date('2023-03-04 10:00:00') },
        { event_id: 15, event_time: new Date('2025-03-05 10:00:00'), short_description: 'Žumberak mountain', description: 'Fun ride up and down the Žumberak mountains. Up down, left right', event_name: 'Basically TDF training', route_id: 5, organizer_email: 'oliverkreitmeyer@gmail.com', createdAt: new Date('2023-03-05 10:00:00'), updatedAt: new Date('2023-03-05 10:00:00') },
    ]);
}

export async function insertOrganizers(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('Organizer', [
        { email: 'andrej.filipciczagreb@gmail.com', createdAt: new Date('2023-01-01 10:00:00'), updatedAt: new Date('2023-01-01 10:00:00') },
        { email: 'ante.iivancic@gmail.com', createdAt: new Date('2023-01-02 10:00:00'), updatedAt: new Date('2023-01-02 10:00:00') },
        { email: 'semafor332@gmail.com', createdAt: new Date('2023-01-03 10:00:00'), updatedAt: new Date('2023-01-03 10:00:00') },
        { email: 'petra.turkovic01@gmail.com', createdAt: new Date('2023-01-04 10:00:00'), updatedAt: new Date('2023-01-04 10:00:00') },
        { email: 'oliverkreitmeyer@gmail.com', createdAt: new Date('2023-01-05 10:00:00'), updatedAt: new Date('2023-01-05 10:00:00') },
    ]);
}