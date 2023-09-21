import { Request, Response } from "express";
import { selectLocationByAnimal } from "../client/rawQueries/locations";

export class ReadLocationsByAnimalController {

  async handle(request: Request<{id : string}, {}, {}>, response: Response) {
    const { id } = request.params;
    const animalId = Number(id);

    if(isNaN(animalId))
      return;

    const locations = await selectLocationByAnimal(animalId);

    return response.json(locations);
  }
}