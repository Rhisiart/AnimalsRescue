export interface IAnimalRequest {
  id : number | undefined,
  name : string | undefined  
}

export interface ICoord {
  latitude : number,
  longitude : number
}

export interface IArea {
  distance : number,
  coordinate : ICoord
}

export interface ILocationRequest {
  id : number | undefined,
  coordinate : ICoord | undefined
}

export interface ISightingRequest {
  animal : IAnimalRequest,
  location : ILocationRequest
}