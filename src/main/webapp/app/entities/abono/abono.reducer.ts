import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAbono, defaultValue } from 'app/shared/model/abono.model';

import { getEntity as getTemporada } from 'app/entities/temporada/temporada.reducer';
import { getEntity as getLocalidad } from 'app/entities/localidad/localidad.reducer';
import { getEntity as getCompraAbono } from 'app/entities/compra-abono/compra-abono.reducer';
import { getEntity as getApplicationUser } from 'app/entities/application-user/application-user.reducer';
import { convertDateTimeBlockchain } from 'app/shared/util/date-utils';
import { WEB3_PROVIDER } from 'app/config/constants';
import Web3 from 'web3';

export const ACTION_TYPES = {
  FETCH_ABONO_LIST: 'abono/FETCH_ABONO_LIST',
  FETCH_ABONO: 'abono/FETCH_ABONO',
  CREATE_ABONO: 'abono/CREATE_ABONO',
  UPDATE_ABONO: 'abono/UPDATE_ABONO',
  DELETE_ABONO: 'abono/DELETE_ABONO',
  RESET: 'abono/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAbono>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type AbonoState = Readonly<typeof initialState>;

// Reducer

export default (state: AbonoState = initialState, action): AbonoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ABONO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ABONO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ABONO):
    case REQUEST(ACTION_TYPES.UPDATE_ABONO):
    case REQUEST(ACTION_TYPES.DELETE_ABONO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ABONO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ABONO):
    case FAILURE(ACTION_TYPES.CREATE_ABONO):
    case FAILURE(ACTION_TYPES.UPDATE_ABONO):
    case FAILURE(ACTION_TYPES.DELETE_ABONO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ABONO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ABONO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ABONO):
    case SUCCESS(ACTION_TYPES.UPDATE_ABONO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ABONO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/abonos';

// Actions

export const getEntities: ICrudGetAllAction<IAbono> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ABONO_LIST,
  payload: axios.get<IAbono>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IAbono> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ABONO,
    payload: axios.get<IAbono>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IAbono> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ABONO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAbono> = entity => async dispatch => {

  const web3 = new Web3(WEB3_PROVIDER);
  const temporada = (await dispatch(getTemporada(entity.temporada.id))).value.data;
  const applicationUser = (await dispatch(getApplicationUser(entity.internalUser.id))).value.data;

  const instanciaTemporada = new web3.eth.Contract(JSON.parse(temporada.abi), temporada.direccion);
  await instanciaTemporada.methods.actualizaFechas(entity.idLocalidad ,convertDateTimeBlockchain(entity.fechaAlquilerDesde), convertDateTimeBlockchain(entity.fechaAlquilerHasta))
  .send({from: applicationUser.direccion, gas: 500000});

  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ABONO,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAbono> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ABONO,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
