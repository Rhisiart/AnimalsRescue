import { Prisma, animal } from "@prisma/client";
import { ICoord } from "../../models/express";
import { prisma } from "../prismaClient";

export const getAnimalFromArea = async (coordinate : ICoord, distance : number) => {
  try {
    const query = `SELECT a.animal_id, a.animal_name
                    FROM animal a
                    INNER JOIN sighting s ON s.animal_id = a.animal_id
                    INNER JOIN locations l ON l.location_id = s.location_id
                    WHERE ST_DWithin(l.coordinate, ST_SetSRID(ST_MakePoint(${coordinate.longitude}, ${coordinate.latitude}), 4326), ${distance})`;

    const animals = await prisma.$queryRaw<animal[]>`${Prisma.raw(query)}`;
           
    return animals;
  } catch (error) {
    console.error('Error:', error);
  }
}