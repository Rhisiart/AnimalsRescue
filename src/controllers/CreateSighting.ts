import { Request, Response } from "express";
import { prisma } from "../client/prismaClient";
import { insertLocation } from "../client/rawQueries/locations";
import { IAnimalRequest, ISightingRequest } from "../models/express";

export class CreateSightingController {
  createInputWithAnimalAndLocation(animalId : number, locationId: number) {
    return {
      animal_id : animalId, 
      location_id : locationId 
    }
  }

  createInputWithLocationAndNewAnimal(animalName : string, locationId: number) {
    return { 
      locations : { 
        connect : { 
          location_id : locationId 
        } 
      }, 
      animal : { 
        create : { 
          animal_name : animalName 
        }
      }
    }
  }

  getCreateInput(animal: IAnimalRequest, locationId: number | undefined) {
    if(animal.id && locationId ) {
      return this.createInputWithAnimalAndLocation(animal.id, locationId);
    } else if(!animal.id && animal.name && locationId) {
      return this.createInputWithLocationAndNewAnimal(animal.name, locationId);
    }
    
    return undefined;
  }

  async handle(request: Request<{}, {}, ISightingRequest>, response: Response) {
    const { animal, location } = request.body;
    
    const locationId = location.id
                      ? location.id
                      : location.coordinate
                        ? await insertLocation(location.coordinate.latitude, location.coordinate.longitude)
                        : undefined;

    const createInput = this.getCreateInput(animal, locationId);

    if(!createInput)
      return;

    const sighting = await prisma.sighting.create({
     data : createInput
    });

    return response.json(sighting);
  }
}