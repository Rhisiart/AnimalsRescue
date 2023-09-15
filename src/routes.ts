import { Router } from "express";
import { CreateSightingController } from "./controllers/CreateSighting";
import { CreateAnimalController } from "./controllers/createAnimal";
import { CreateLocationsController } from "./controllers/createLocations";
import { ReadAnimalFromAreaController } from "./controllers/readAnimalFromArea";
import { ReadLocationsByAnimalController } from "./controllers/readLocationsByAnimal";

const router = Router();

const readLocationsByAnimal = new ReadLocationsByAnimalController();
const createAnimal = new CreateAnimalController();
const createSighting = new CreateSightingController();
const createLocations = new CreateLocationsController();
const readAnimalFromArea = new ReadAnimalFromAreaController();

router.post("/animal", createAnimal.handle);
router.post("/sighting", createSighting.handle.bind(createSighting));
router.post("/locations", createLocations.handle);
router.get("/animals/area", readAnimalFromArea.handle);
router.get("/locations/animal/:id", readLocationsByAnimal.handle);

export { router };

