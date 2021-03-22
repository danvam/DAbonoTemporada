import { Moment } from 'moment';
import { ITemporada } from 'app/shared/model/temporada.model';

export interface IEspectaculo {
  id?: number;
  idEspectaculo?: number;
  fechaEspectaculo?: string;
  nombre?: string;
  simbolo?: string;
  temporada?: ITemporada;
}

export const defaultValue: Readonly<IEspectaculo> = {};
