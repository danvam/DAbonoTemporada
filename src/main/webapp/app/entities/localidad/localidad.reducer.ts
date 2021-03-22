import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILocalidad, defaultValue } from 'app/shared/model/localidad.model';

import { getEntity as getTemporada } from 'app/entities/temporada/temporada.reducer';
import { WEB3_PROVIDER } from 'app/config/constants';
import Web3 from 'web3';

export const ACTION_TYPES = {
  FETCH_LOCALIDAD_LIST: 'localidad/FETCH_LOCALIDAD_LIST',
  FETCH_LOCALIDAD: 'localidad/FETCH_LOCALIDAD',
  CREATE_LOCALIDAD: 'localidad/CREATE_LOCALIDAD',
  UPDATE_LOCALIDAD: 'localidad/UPDATE_LOCALIDAD',
  DELETE_LOCALIDAD: 'localidad/DELETE_LOCALIDAD',
  RESET: 'localidad/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILocalidad>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type LocalidadState = Readonly<typeof initialState>;

// Reducer

export default (state: LocalidadState = initialState, action): LocalidadState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LOCALIDAD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LOCALIDAD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_LOCALIDAD):
    case REQUEST(ACTION_TYPES.UPDATE_LOCALIDAD):
    case REQUEST(ACTION_TYPES.DELETE_LOCALIDAD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_LOCALIDAD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LOCALIDAD):
    case FAILURE(ACTION_TYPES.CREATE_LOCALIDAD):
    case FAILURE(ACTION_TYPES.UPDATE_LOCALIDAD):
    case FAILURE(ACTION_TYPES.DELETE_LOCALIDAD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOCALIDAD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_LOCALIDAD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_LOCALIDAD):
    case SUCCESS(ACTION_TYPES.UPDATE_LOCALIDAD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_LOCALIDAD):
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

const apiUrl = 'api/localidads';

// Actions

export const getEntities: ICrudGetAllAction<ILocalidad> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_LOCALIDAD_LIST,
  payload: axios.get<ILocalidad>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ILocalidad> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LOCALIDAD,
    payload: axios.get<ILocalidad>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ILocalidad> = entity => async dispatch => {

  const web3 = new Web3(WEB3_PROVIDER);
  const temporada = (await dispatch(getTemporada(entity.temporada.id))).value.data;
  const instanciaTemporada = new web3.eth.Contract(JSON.parse(temporada.abi), temporada.direccion);

  const owner = await instanciaTemporada.methods.owner().call();
  await instanciaTemporada.methods.creaLocalidad(entity.tipoLocalidad, entity.nombre, entity.simbolo, '/api/localidad/')
  .send({from: owner, gas: 500000})
  .once('receipt', (receipt) => {
    if(receipt.events.LoalidadCreada != null){
      entity.idLocalidad = receipt.events.LoalidadCreada.returnValues.id;
    }
   });

   const result = await dispatch({
    type: ACTION_TYPES.CREATE_LOCALIDAD,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
  
};

export const updateEntity: ICrudPutAction<ILocalidad> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LOCALIDAD,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILocalidad> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LOCALIDAD,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
