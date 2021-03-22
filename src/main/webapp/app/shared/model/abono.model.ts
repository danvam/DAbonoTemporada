import { Moment } from 'moment';
import { IApplicationUser } from 'app/shared/model/application-user.model';
import { ITemporada } from 'app/shared/model/temporada.model';

export interface IAbono {
  id?: number;
  fechaAlquilerDesde?: string;
  fechaAlquilerHasta?: string;
  direccion?: string;
  idLocalidad?: number;
  internalUser?: IApplicationUser;
  temporada?: ITemporada;
}

export const defaultValue: Readonly<IAbono> = {};
