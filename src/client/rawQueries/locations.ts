import { ICoord, ILocationRequest } from "../../models/express";
import { prisma } from "../prismaClient";

export const insertLocation = async (lat: number, long : number) => {
  try {
    const [insertResponse, locations] = await prisma.$transaction([
      prisma.$executeRaw`INSERT INTO locations (coordinate) VALUES (ST_SetSRID(ST_MakePoint(${long}, ${lat}), 4326))`,
      prisma.$queryRaw<ILocationRequest[]>`SELECT currval(pg_get_serial_sequence('locations','location_id')) as id`
    ]);

    return locations.length === 1 && typeof locations[0].id === "bigint"
      ? Number(locations[0].id) 
      : -1;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

export const selectLocationByAnimal = async (animalId : number) => {
  try {
    return await prisma.$queryRaw<ICoord[]>`SELECT ST_X(l.coordinate) AS longitude, ST_Y(l.coordinate) AS latitude
                                              FROM locations l 
                                              INNER JOIN sighting s ON l.location_id = s.location_id 
                                              WHERE s.animal_id = ${animalId} AND l.location_id IS NOT NULL`;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}