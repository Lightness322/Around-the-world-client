export interface IMap {
  updateSize: () => void
  addMarkers: (markers: ICity | ICity[]) => void
  removeMarkers: () => void
  setFocus: (region: { region: string; animate: boolean }) => void
  clearSelectedRegions: () => void
  scale: number
  _markers: { config: ICity }[]
  _setSelected: (regionsName: string, regions: string[]) => void
  addLines: (lines: ILine | ILine[]) => void
  removeLines: () => void
}

export interface ICity {
  _id?: string
  coords: number[]
  name: string
  country: string
  population: number
  is_capital: boolean
}

export interface ILine {
  _id?: string
  from: string
  to: string
}

export interface IRoute {
  _id?: string
  lines: ILine[]
  markers: ICity[]
}
