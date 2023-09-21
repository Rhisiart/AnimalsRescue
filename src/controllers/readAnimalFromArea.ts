import { Request, Response } from "express";
import { getAnimalFromArea } from "../client/rawQueries/animal";
import { IArea } from "../models/express";

export class ReadAnimalFromAreaController {
  async handle(request : Request<{}, {}, {}, IArea>, response: Response) {
    const { latitude, longitude, distance } = request.query;

    const lat = Number(latitude);
    const lon = Number(longitude);
    const dist = Number(distance);

    if(isNaN(lat) || isNaN(lon) || isNaN(dist))
      return;

    const coordinate = {
      latitude: lat,
      longitude: lon
    }

    const animals = await getAnimalFromArea(coordinate, distance);

    return response.json(animals);
  }
}