import { ITemporada } from 'app/shared/model/temporada.model';

export interface ILocalidad {
  id?: number;
  idLocalidad?: number;
  tipoLocalidad?: number;
  nombre?: string;
  simbolo?: string;
  temporada?: ITemporada;
}

export const defaultValue: Readonly<ILocalidad> = {};
