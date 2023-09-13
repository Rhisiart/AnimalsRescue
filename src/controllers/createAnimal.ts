import { Request, Response } from "express";
import { prisma } from "../client/prismaClient";
import { IAnimalRequest } from "../models/express";

export class CreateAnimalController {
  async handle(request : Request<{}, {}, IAnimalRequest>, response: Response) {
    const { name } = request.body;

    if(!name)
      return response.json({ error: "need name for animal" });

    const animal = await prisma.animal.create({
      data: {
         animal_name: name
      },
    });

    return response.json(animal);
  }
}