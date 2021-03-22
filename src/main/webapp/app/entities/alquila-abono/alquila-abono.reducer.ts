import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAlquilaAbono, defaultValue } from 'app/shared/model/alquila-abono.model';

import { getEntity as getTemporada } from 'app/entities/temporada/temporada.reducer';
import { getEntity as getLocalidad } from 'app/entities/localidad/localidad.reducer';
import { getEntity as getEspectaculo } from 'app/entities/espectaculo/espectaculo.reducer';
import { getEntity as getApplicationUser } from 'app/entities/application-user/application-user.reducer';
import { WEB3_PROVIDER } from 'app/config/constants';
import Web3 from 'web3';

export const ACTION_TYPES = {
  FETCH_ALQUILAABONO_LIST: 'alquilaAbono/FETCH_ALQUILAABONO_LIST',
  FETCH_ALQUILAABONO: 'alquilaAbono/FETCH_ALQUILAABONO',
  CREATE_ALQUILAABONO: 'alquilaAbono/CREATE_ALQUILAABONO',
  UPDATE_ALQUILAABONO: 'alquilaAbono/UPDATE_ALQUILAABONO',
  DELETE_ALQUILAABONO: 'alquilaAbono/DELETE_ALQUILAABONO',
  RESET: 'alquilaAbono/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAlquilaAbono>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type AlquilaAbonoState = Readonly<typeof initialState>;

// Reducer

export default (state: AlquilaAbonoState = initialState, action): AlquilaAbonoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ALQUILAABONO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ALQUILAABONO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ALQUILAABONO):
    case REQUEST(ACTION_TYPES.UPDATE_ALQUILAABONO):
    case REQUEST(ACTION_TYPES.DELETE_ALQUILAABONO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ALQUILAABONO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ALQUILAABONO):
    case FAILURE(ACTION_TYPES.CREATE_ALQUILAABONO):
    case FAILURE(ACTION_TYPES.UPDATE_ALQUILAABONO):
    case FAILURE(ACTION_TYPES.DELETE_ALQUILAABONO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ALQUILAABONO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ALQUILAABONO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ALQUILAABONO):
    case SUCCESS(ACTION_TYPES.UPDATE_ALQUILAABONO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ALQUILAABONO):
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

const apiUrl = 'api/alquila-abonos';

// Actions

export const getEntities: ICrudGetAllAction<IAlquilaAbono> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ALQUILAABONO_LIST,
  payload: axios.get<IAlquilaAbono>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IAlquilaAbono> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ALQUILAABONO,
    payload: axios.get<IAlquilaAbono>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IAlquilaAbono> = entity => async dispatch => {

  const web3 = new Web3(WEB3_PROVIDER);
  const localidad = (await dispatch(getLocalidad(entity.localidad.id))).value.data;
  const temporada = (await dispatch(getTemporada(localidad.temporada.id))).value.data;
  const applicationUser = (await dispatch(getApplicationUser(entity.internalUser.id))).value.data;
  const espectaculo = (await dispatch(getEspectaculo(entity.espectaculo.id))).value.data;

  const instanciaTemporada = new web3.eth.Contract(JSON.parse(temporada.abi), temporada.direccion);
  await instanciaTemporada.methods.alquilaAbono(localidad.idLocalidad, espectaculo.idEspectaculo)
  .send({from: applicationUser.direccion, gas: 500000});

  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ALQUILAABONO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAlquilaAbono> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ALQUILAABONO,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAlquilaAbono> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ALQUILAABONO,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
