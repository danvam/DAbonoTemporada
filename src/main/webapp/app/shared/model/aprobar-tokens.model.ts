import { ITemporada } from 'app/shared/model/temporada.model';
import { IApplicationUser } from 'app/shared/model/application-user.model';

export interface IAprobarTokens {
  id?: number;
  cantidad?: number;
  password?: string;
  temporada?: ITemporada;
  applicationUser?: IApplicationUser;
}

export const defaultValue: Readonly<IAprobarTokens> = {};
