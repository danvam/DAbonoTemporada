import { IApplicationUser } from 'app/shared/model/application-user.model';
import { ITemporada } from 'app/shared/model/temporada.model';

export interface ITransferirTokens {
  id?: number;
  cantidad?: number;
  password?: string;
  applicationUser?: IApplicationUser;
  temporada?: ITemporada;
}

export const defaultValue: Readonly<ITransferirTokens> = {};
