import { ILocalidad } from 'app/shared/model/localidad.model';
import { IEspectaculo } from 'app/shared/model/espectaculo.model';
import { IApplicationUser } from 'app/shared/model/application-user.model';

export interface IAlquilaAbono {
  id?: number;
  localidad?: ILocalidad;
  espectaculo?: IEspectaculo;
  internalUser?: IApplicationUser;
}

export const defaultValue: Readonly<IAlquilaAbono> = {};
