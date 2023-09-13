import { Request, Response } from "express";
import { getAnimalFromArea } from "../client/rawQueries/animal";
import { IArea } from "../models/express";

export class ReadAnimalFromAreaController {
  async handle(request : Request<{}, {}, IArea>, response: Response) {
    const { coordinate, distance } = request.body;

    const animals = await getAnimalFromArea(coordinate, distance);

    return response.json(animals);
  }
}