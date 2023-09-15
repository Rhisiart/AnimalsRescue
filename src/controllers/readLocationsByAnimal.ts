import { Request, Response } from "express";
import { selectLocationByAnimal } from "../client/rawQueries/locations";
import { IAnimalRequest } from "../models/express";

export class ReadLocationsByAnimalController {

  async handle(request: Request<IAnimalRequest, {}, {}>, response: Response) {
    const { id } = request.params;

    if(!id)
      return;

    const locations = await selectLocationByAnimal(id);

    return response.json(locations);
  }
}