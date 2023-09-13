import { Request, Response } from "express";
import { insertLocation } from "../client/rawQueries/locations";
import { ILocationRequest } from "../models/express";

export class CreateLocationsController {
  async handle(request : Request<{}, {}, ILocationRequest>, response: Response) {
    const { coordinate } = request.body;

    if(!coordinate)
      return response.json({ error: "need coordinate to create a location" });

    const location = await insertLocation(coordinate.latitude, coordinate.longitude);

    return response.json(location);
  }
}