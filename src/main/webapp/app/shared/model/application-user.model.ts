import { IUser } from 'app/shared/model/user.model';

export interface IApplicationUser {
  id?: number;
  direccion?: string;
  internalUser?: IUser;
}

export const defaultValue: Readonly<IApplicationUser> = {};
