import { animal } from "@prisma/client"

export interface IAnimalRequest {
  id : number | undefined,
  name : string | undefined  
}

export interface ICoord {
  latitude : number,
  longitude : number
}

export interface ILastedSightingByArea extends ICoord, animal { }

export interface IArea extends ICoord {
  distance : number
}

export interface ILocationRequest {
  id : number | undefined,
  coordinate : ICoord | undefined
}

export interface ISightingRequest {
  animal : IAnimalRequest,
  location : ILocationRequest
}