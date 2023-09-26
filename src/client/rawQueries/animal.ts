import { Prisma } from "@prisma/client";
import { ICoord, ILastedSightingByArea } from "../../models/express";
import { prisma } from "../prismaClient";

export const getAnimalFromArea = async (coordinate : ICoord, distance : number) => {
  try {
    const query = `SELECT DISTINCT ON (a.animal_id) a.animal_id, a.animal_name, ST_X(l.coordinate) AS longitude, ST_Y(l.coordinate) AS latitude
                    FROM animal a
                    INNER JOIN sighting s ON s.animal_id = a.animal_id
                    INNER JOIN locations l ON l.location_id = s.location_id
                    WHERE ST_DWithin(l.coordinate, ST_SetSRID(ST_MakePoint(${coordinate.longitude}, ${coordinate.latitude}), 4326), ${distance})
                    ORDER BY a.animal_id, s."createdAt" DESC`;

    return await prisma.$queryRaw<ILastedSightingByArea[]>`${Prisma.raw(query)}`;
  } catch (error) {
    console.error('Error:', error);
  }
}