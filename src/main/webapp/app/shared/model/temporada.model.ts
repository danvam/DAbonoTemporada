import { Etapas } from 'app/shared/model/enumerations/etapas.model';

export interface ITemporada {
  id?: number;
  faseEtapa?: Etapas;
  nombre?: string;
  actualIdLocalidad?: number;
  actualIdEspectaculo?: number;
  actualIdAbono?: number;
  precioBase?: number;
  tiposLocalidad?: number;
  factorIncrementoTipo?: number;
  porcentajeAlquiler?: number;
  dineroAbono?: string;
  direccion?: string;
  abi?: string;
  abiDAbono?: string;
}

export const defaultValue: Readonly<ITemporada> = {};
