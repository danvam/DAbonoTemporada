import { ILocalidad } from 'app/shared/model/localidad.model';
import { IApplicationUser } from 'app/shared/model/application-user.model';

export interface ICompraAbono {
  id?: number;
  localidad?: ILocalidad;
  internalUser?: IApplicationUser;
}

export const defaultValue: Readonly<ICompraAbono> = {};
